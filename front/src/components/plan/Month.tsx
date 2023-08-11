  import FullCalendar from '@fullcalendar/react'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import { INITIAL_EVENTS, createEventId } from './event-utils'
  import './cal.css';
  import React from 'react'
  import {
    EventApi,
    DateSelectArg,
    EventClickArg,
    EventContentArg,
    formatDate,
  } from '@fullcalendar/core'

import newPlanIcon from '../../assets/icons/newPlansButton.svg'
import { useNavigate } from 'react-router-dom'

  interface DemoAppState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
  }
  interface CustomButtonInput {
    text?: string;
    hint?: string;
    icon?: string;
    themeIcon?: string;
    bootstrapFontAwesome?: string;
    click?(ev: MouseEvent, element: HTMLElement): void;
}
interface ButtonIconsInput {
  prev?: string;
  next?: string;
  prevYear?: string;
  nextYear?: string;
  today?: string;
  [viewOrCustomButton: string]: string | undefined;
}
  export default class Month extends React.Component<{}, DemoAppState> {
  
    state: DemoAppState = {
      weekendsVisible: true,
      currentEvents: []
    }

    
  
    render() {
      
      // const navigate = useNavigate();
      return (
        <div className='demo-app'>
          {/* {this.renderSidebar()} */}
          <div className='demo-app-main'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              customButtons={{
                newPlan:{
                  themeIcon:newPlanIcon,
                  text:"일정추가"
                  // click:()=>{
                  //     navigate("/dash/calendar/add")
                  // }
                },
              }}
              headerToolbar={{
                right: 'newPlan',
                center: 'prev,title,next',
                left: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={this.state.weekendsVisible}
              initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
            />
          </div>
        </div>
      )
    }
  
    renderSidebar() {
      return (
        <div className='demo-app-sidebar'>
          {/* <div className='demo-app-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div> */}
          <div className='demo-app-sidebar-section'>
            {/* <label>
              <input
                type='checkbox'
                checked={this.state.weekendsVisible}
                onChange={this.handleWeekendsToggle}
              ></input>
              toggle weekends
            </label> */}
          </div>
          <div className='demo-app-sidebar-section'>
            <h5>All Events ({this.state.currentEvents.length})</h5>
            <ul>
              {this.state.currentEvents.map(renderSidebarEvent)}
            </ul>
          </div>
        </div>
      )
    }
  
    handleWeekendsToggle = () => {
      this.setState({
        weekendsVisible: !this.state.weekendsVisible
      })
    }
  
    handleDateSelect = (selectInfo: DateSelectArg) => {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
  
      calendarApi.unselect() // clear date selection
  
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    }
    
    handleHover =(clickInfo:EventHoveringArg)=>{

    }
    handleEventClick = (clickInfo: EventClickArg) => {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    }
  
    handleEvents = (events: EventApi[]) => {
      this.setState({
        currentEvents: events
      })
    }
  
  }
  
  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    )
  }
  
  function renderSidebarEvent(event: EventApi) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
      </li>
    )
  }
  // return (
  //   <>
  //     <h1>
  //       일정 상세조회
  //     </h1>
  //     <a>

  //     </a>
  //   </>
  // )
// }
