const Jam = () => {
  return (
    <div className="flex justify-end flex-col items-center gap-3 pb-10 h-screen overflow-hidden">
      {/* Video Chat */}
      <div className="flex gap-10 items-center justify-evenly flex-wrap w-full h-1/2 max-md:h-auto">
        <div className="h-[300px] w-[420px] max-sm:w-5/6">
          <div className="h-full rounded-lg flex bg-slate-50"></div>
          <div className="flex justify-between p-2">
            <h3>Naman Arora</h3>
            <p>Singer</p>
          </div>
        </div>
        <div className="h-[300px] w-[420px] max-sm:w-5/6">
          <div className="h-full rounded-lg flex bg-slate-50"></div>
          <div className="flex justify-between p-2">
            <h3>Naman Arora</h3>
            <p>Singer</p>
          </div>
        </div>
      </div>
      {/* Text Chat */}
      <div className="h-1/4 w-5/6 max-sm:hidden"></div>
      {/* Text Field & Buttons */}
      <div className="flex items-center">
        <input
          type="text"
          className="w-[75vw] h-10 rounded-md p-2 placeholder-slateBlue max-sm:hidden"
          placeholder='Say "Hello"'
        />
        <button className="px-4 py-3 ml-3 mr-2 bg-slateBlue text-lightYellow rounded-lg max-sm:hidden">
          Send
        </button>
        <button className="px-5 py-3 bg-red text-lightYellow rounded-lg max-sm:mt-8 max-sm:px-10">
          Skip
        </button>
      </div>
    </div>
  );
};

export default Jam;
