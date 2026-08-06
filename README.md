# Live Demo

Web version is live here:

https://faceblurmesh.vercel.app

# Intro
Very basic face detection / face blur project. This started as a Python/OpenCV tool that can detect and blur faces from a webcam or a video file.

The first version used OpenCV's Haar Cascade classifier. It works okay when a face is clear and mostly centered, but it does not do great when the face is tilted, angled, partially visible, or farther away from the camera.

I am now also building out a web version using Next.js, where the webcam can run directly in the browser and the blur can be toggled on/off live.

# Current Features
- Detects faces in a live webcam feed.
- Blurs faces in a live webcam feed.
- Detects and blurs faces in video files using the Python version.
- Web version can access the webcam.
- Web version can display the webcam through a canvas.
- Web version currently has a blur toggle working on the canvas.

# Set up
Clone the repo:
```
git clone https://github.com/Ohcanorof/face-detection.git
```
Once you move into the project folder using `cd face-detection`
# Python version
Create the virtual environtment using 
`py -m venv .venv`, and then activate it using `.\.venv\Scripts\Activate.ps1`.

Install OpenCV using `pip install opencv-python`.

# How to use it
- If you want to run the live face blur:
Run: 
```
py faceBlur.py
```
Pressing q on your keyboard closes the window.

-if you want to blur faces automatically, you need to place your video in the `videos` folder, then run 
```
py video_blur.py
```
-it processess the video frame by frame so it might take a while for it to save a blurred output video to the same folder.

# Web Version
Move into the web folder:

`cd web`

Install the packages:

`npm install`

Run the dev server:

`npm run dev`

Then open:

`http://localhost:3000`

Then open the local site and use the webcam demo. Right now, the web version can access the camera and toggle a blur effect on the canvas. I am still working on connecting the blur directly to the detected face region.

# Project Status and Purpose
This tool is still in progress, so it doesnt completely work, just put this in a github repo to update it as i build it out.
My purpose with this is to learn more about face detection, and make this into a sort of tool anyone can use. Obviously there are tools 
out there that can do this already, but i thought "why not make my own?". Eventually  i want to scale it into something you can use live on the web
or download it as an app, as well as add more features and maybe even add AI functionality, but for now im just going to speed through refining it some more (better face detection and blurring), and then make the app/website.








