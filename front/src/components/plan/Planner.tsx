function Planner() {
  return (
    <>
      <h1>Planner 일정추가</h1>
      <div className=" w-96 h-96 flex-col justify-center items-start gap-8 inline-flex">
        <div className="Group2326 w-96 h-14 relative">
          <div className=" left-0 top-[17px] absolute text-zinc-900 text-xl font-semibold leading-relaxed">
            제목
          </div>
          <div className="Rectangle318 w-96 h-14 left-[59px] top-0 absolute bg-white bg-opacity-95 rounded-3xl" />
          <div className=" left-[87px] top-[20px] absolute text-white text-opacity-50 text-sm font-normal leading-tight">
            방 제목을 입력해주세요.
          </div>
        </div>
        <div className="Group2325 w-96 h-14 relative">
          <div className=" left-0 top-[17px] absolute text-zinc-900 text-xl font-semibold leading-relaxed">
            날짜
          </div>
          <div className=" left-[337px] top-[17px] absolute text-zinc-900 text-xl font-semibold leading-relaxed">
            시간
          </div>
          <div className="Rectangle319 w-60 h-14 left-[59px] top-0 absolute bg-white bg-opacity-95 rounded-3xl" />
          <div className="Rectangle321 w-60 h-14 left-[396px] top-0 absolute bg-white bg-opacity-95 rounded-3xl" />
        </div>
        <div className="Group2324 w-96 h-72 relative">
          <div className=" left-0 top-[17px] absolute text-zinc-900 text-xl font-semibold leading-relaxed">
            초대
          </div>
          <div className="Rectangle320 w-96 h-72 left-[59px] top-0 absolute bg-grey1 bg-opacity-95 rounded-3xl" />
          <div className=" left-[87px] top-[20px] absolute text-white text-opacity-50 text-sm font-normal leading-tight">
            세부내용을 입력하세요.
          </div>
        </div>
      </div>
      {/* <a>
      개인 일정 + 그룹일정 , 어디서 들어왔는지,, props로 받기?
      </a> */}
    </>
  );
}

export default Planner;
