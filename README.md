# Intro
Very basic face detection, as of 7/14/2026, it just opens the default webcam (if you have one), and by running `py faceDetect.py` in your terminal, you can use it live.
It uses OpenCV's Haar Casscade classifier, it doesnt do well when you tilt or angle your face in the frame, but im going to change it to something more advanced.

#Current Features
- Detects faces in both live webcam feed and in video files.
- Blurs faces in both live webcam feed and video files.

# Set up
Clone the repo:
```
git clone https://github.com/Ohcanorof/face-detection.git
```
Once you move into the project folder using `cd face-detection`, create the virtual environtment using 
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


# Project Status and Purpose
This tool is still in progress, so it doesnt completely work, just put this in a github repo to update it as i build it out.
My purpose with this is to learn more about face detection, and make this into a sort of tool anyone can use. Obviously there are tools 
out there that can do this already, but i thought "why not make my own?". Eventually  i want to scale it into something you can use live on the web
or download it as an app, as well as add more features and maybe even add AI functionality, but for now im just going to speed through refining it some more (better face detection and blurring), and then make the app/website.








