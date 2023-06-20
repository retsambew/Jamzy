import VideoChat from "./video";

const Jam = () => {
  return (
    <div className="flex justify-end flex-col items-center gap-3 pb-10 h-screen overflow-hidden">
      <VideoChat />

      {/* Text Chat */}
      <div className="h-1/4 w-5/6 flex flex-col justify-end text-[#BBBBBB] max-sm:hidden">
        <p>Your video is being monitored. Kindly maintain the terms.</p>
        <p>Connecting...</p>
      </div>
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
