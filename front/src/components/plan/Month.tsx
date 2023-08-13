import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
// import newPlanIcon from '../../assets/icons/newPlansButton.svg'
import "./cal.css";
import React from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
} from "@fullcalendar/core";

import newPlanIcon from "../../assets/icons/newPlansButton.svg";
import { Modal } from "react-bootstrap";

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  // onClick:()=> void;
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
interface PlanData {
  events: Test[];
  color: string;
  textColor: string;
}
interface Test {
  id: string;
  start: string;
  title: string;
}
interface Props {
  navigate: () => void;
  planData: EventInput[]; //string|Array<string>|PlanData|EventInput[];
}
export default class Month extends React.Component<Props, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
  };

  handleButtonClick = () => {
    // Call the onClick prop when the button is clicked
    console.log("inside button");
    this.props.navigate();
  };

  render() {
    // const navigate = useNavigate();
    return (
      <div className="demo-app font-SUIT">
        {/* {this.renderSidebar()} */}
        <div className="demo-app-main font-SUIT">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            customButtons={{
              newPlan: {
                // themeIcon: newPlanIcon,
                text: "일정추가",
                click: this.handleButtonClick,
              },
            }}
            headerToolbar={{
              right: "today newPlan",
              center: "prev,title,next",
              left: "dayGridMonth timeGridWeek timeGridDay",
            }}
            buttonText={{
              today: "오늘",
              month: "월",
              week: "주",
              day: "일",
            }}
            buttonIcons={{
              prev: "chevron-left",
              newPlan: "plus-square",
            }}
            views={{
              dayGridMonth: {
                titleFormat: {
                  month: 'numeric',
                },

              }
            }}

            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            locale={"ko"}
            weekends={this.state.weekendsVisible}
            // events={} //type EventSourceInput = EventSourceInputObject | // object in extended form EventInput[] | EventSourceFunc | // just a function string;
            events={this.props.planData}
            initialEvents={this.props.planData} // alternatively, use the `events` setting to fetch from a feed
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
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        {/* <div className='demo-app-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div> */}
        <div className="demo-app-sidebar-section">
          {/* <label>
              <input
                type='checkbox'
                checked={this.state.weekendsVisible}
                onChange={this.handleWeekendsToggle}
              ></input>
              toggle weekends
            </label> */}
        </div>
        <div className="demo-app-sidebar-section">
          <h5>All Events ({this.state.currentEvents.length})</h5>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleHover = (clickInfo: EventHoveringArg) => {};
  handleEventClick = (clickInfo: EventClickArg) => {
    // clickInfo.event.
    if (
      confirm(
        `'${clickInfo.event.title}'\n
        ${clickInfo.event.extendedProps.description}\n
        시작: ${clickInfo.event.start}'\n
        종료: ${clickInfo.event.end}'\n
        그룸명: ${clickInfo.event.extendedProps.teamName}'\n
                `
      )
    ) {
      // clickInfo.event.remove();
    }
  };

  handleEvents = (events: EventApi[]) => {
    //get props ? or appselector
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <><div className="">

    
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
      </div>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
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
