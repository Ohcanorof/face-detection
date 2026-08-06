/*
is the camera on? is there an error message? 
which video element needs to receive the camera stream?

useState should store the cam status and any errors, and useRef should 
point to the <video> element

*/

"use client";
import {useRef, useState} from "react";
import { FaceDetector, FilesetResolver, } from "@mediapipe/tasks-vision";

export default function WebcamBox() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement |null>(null);
    const blurRef = useRef(false);
    const faceDetectorRef = useRef<FaceDetector | null>(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isBlurOn, setIsBlurOn] = useState(false);

    //camera start, needs to get video feed, and display error if permision is not allowed
    async function startCamera(){
        setErrorMessage("");

        try{
            await setupFaceDetector();
            const videoStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false,});
            
            if(videoRef.current){
                //need to get the camera stream, then attach the stream to video and wait for its metadata
                //then start drawing video frames to canvas
                videoRef.current.srcObject = videoStream;
                videoRef.current.onloadedmetadata =() =>{
                    videoRef.current?.play();
                    drawToCanvas();
                };
            }
            setIsCameraOn(true);
        } catch(error){
            console.error(error);
            setErrorMessage("Could not access camera, allow camera permisions!");
        }
        
    }

    //no need to check for permissions, if video feed is on, stop it and each stream track, then the video element is set to null
    function stopCamera(){
        const stream = videoRef.current?.srcObject;
        
        if (stream instanceof MediaStream) {
            stream.getTracks().forEach((track) => track.stop());
        }

        if(videoRef.current){
            videoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
    }
     
    function drawToCanvas(){
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if(!video || !canvas) return;

        const context = canvas.getContext("2d");
        if(!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        //copies video frame to the canvas for bluring
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        //face blur in the canvas, its really bad, needs improvement
        //needs to wrap the face, and blurr/smooth to skin kind of (featureless face)
        const detector = faceDetectorRef.current;

        if (detector && blurRef.current){
            //blur 
            const detections = detector.detectForVideo(video, performance.now());
            
            for(const detection of detections.detections){
                const boundingBox = detection.boundingBox;

                if(!boundingBox) continue;

                const boxX = boundingBox.originX;
                const boxY = boundingBox.originY;
                const boxWidth = boundingBox.width;
                const boxHeight = boundingBox.height;

                context.save();
                context.filter = "blur(16px)";
                context.drawImage(
                canvas,
                boxX,
                boxY,
                boxWidth,
                boxHeight,
                boxX,
                boxY,
                boxWidth,
                boxHeight
                );
                context.restore();
            }
            
        }


        requestAnimationFrame(drawToCanvas);
    }

    function toggleBlur(){
        const nextValue = !blurRef.current;
        blurRef.current = nextValue;
        setIsBlurOn(nextValue);
    }

    //FilesetResolver needs to load MediaPipe web assembly runtime, thne
    //FaceDetector.createFromOptions makes the actual face detector
    //FaceDetectorRef.current also stores it for reuse
    async function setupFaceDetector(){
        if(faceDetectorRef.current){
            return;
        }

        const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm");

        const detector = await FaceDetector.createFromOptions(vision, {
            baseOptions:{
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
                delegate: "GPU",
            },
            runningMode: "VIDEO",
        });
        faceDetectorRef.current = detector;
    }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold">Camera Preview</h3>

      <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-slate-950">
        <video
            ref={videoRef}
            className= "hidden"
            autoPlay
            playsInline
            muted
        />

        <canvas ref={canvasRef} className="h-full w-full object-cover" />
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

        <button onClick={toggleBlur} className="rounded-lg border border-slate-600 px-4 py-2 font-semibold"> 
            {isBlurOn ? "Blur Off" : "Blur On"}
        </button>

        <button onClick={stopCamera} className="rounded-lg border border-slate-600 px-4 py-2 font-semibold">
            Stop Camera
        </button>

      </div>
    </div>
  );
}