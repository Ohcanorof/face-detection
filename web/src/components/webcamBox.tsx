/*
is the camera on? is there an error message? 
which video element needs to receive the camera stream?

useState should store the cam status and any errors, and useRef should 
point to the <video> element

*/

"use client";
import {useRef, useState} from "react";

export default function WebcamBox() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isBlurOn, setIsBlurOn] = useState(false);

    //camera start, needs to get video feed, and display error if permision is not allowed
    async function startCamera(){
        setErrorMessage("");

        try{
            const videoStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false,});
            
            if(videoRef.current){
                videoRef.current.srcObject = videoStream;
            }
            setIsCameraOn(true);
        } catch(error){
            console.error(error);
            setErrorMessage("Could not access camera, allow camera permisions!");
        }
        
    }

    //no need to check for permissions, if video feed is on, stop it and each stream track, then the video element is set to null
    async function stopCamera(){
        const stream = videoRef.current?.srcObject;
        
        if (stream instanceof MediaStream) {
            stream.getTracks().forEach((track) => track.stop());
        }

        if(videoRef.current){
            videoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
    }
     
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold">Camera Preview</h3>

      <div className="mt-4 aspect-video rounded-lg bg-slate-950">
        <video
            ref={videoRef}
            className= "h-full w-full object-cover"
            autoPlay
            playsInline
            muted
        />
      </div>

        {isCameraOn && (
        <p className="mt-3 text-sm text-green-300">
            Camera is running
        </p>
        )}

        {errorMessage && (
        <p className="mt-3 text-sm text-red-300">
            {errorMessage}
        </p>
        )}

      <div className="mt-4 flex gap-3">
        <button onClick={startCamera} className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">
            Start Camera
        </button>
        <button onClick={() => setIsBlurOn((current) => !current)} className="rounded-lg border border-slate-600 px-4 py-2 font-semibold">
            Toggle Blur
        </button>

        <button onClick={stopCamera} className="rounded-lg border border-slate-600 px-4 py-2 font-semibold">
            Stop Camera
        </button>

      </div>
    </div>
  );
}