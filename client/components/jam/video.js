"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { socket, peerConnection } from "@/utils/socket";

const VideoChat = () => {
  const [stream, setStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const myVideo = useRef();
  const remoteVideo = useRef();
  const connectionRef = useRef();

  const setup = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    try {
      setStream(stream);
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));
      myVideo.current.srcObject = stream;
      peerConnection.addEventListener("track", (event) => {
        const [stream] = event.streams;
        remoteVideo.current.srcObject = stream;
      });
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };
  useEffect(() => {
    setup();
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
        <video
          ref={remoteVideo}
          className="h-full rounded-lg flex"
          playsInline
          autoPlay
          controls={false}
        />
        {/* {remoteStream ? (
        ) : (
          <Image
            src="/loading.svg"
            alt="loading"
            className="h-full w-full rounded-lg flex bg-gray-900"
            width={50}
            height={50}
          />
        )} */}
        <div className="flex justify-between p-2">
          <h3>Naman Arora</h3>
          <p>Singer</p>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
