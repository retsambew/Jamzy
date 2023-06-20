"use client";
import { useEffect, useRef, useState } from "react";
import socket from "@/utils/socket";

const VideoChat = () => {
  const [stream, setStream] = useState();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    socket.on("me", (id) => {
      setMe(id);
    });
  }, []);

  return (
    <div className="flex gap-10 items-center justify-evenly flex-wrap w-full h-1/2 max-md:h-auto">
      <div className="h-[300px] w-[420px] max-sm:w-5/6">
        <video
          ref={myVideo}
          className="h-full rounded-lg flex"
          playsInline
          autoPlay
          controls={false}
        />
        {/* <div className="h-full rounded-lg flex bg-slate-50"></div> */}
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
  );
};

export default VideoChat;
