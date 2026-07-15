import cv2
from pathlib import Path

#file paths
INPUT_PATH = Path("videos/testvid.mp4")
OUTPUT_PATH = Path("videos/output_blurred.mp4")

#blur vars
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
cap = cv2.VideoCapture(str(INPUT_PATH))

#if video file fails
if not cap.isOpened():
    print(f"error! couldnt open the inputed video file: {INPUT_PATH}")
    exit()

#blur box vars
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

fourcc = cv2.VideoWriter_fourcc(*"mp4v")
out = cv2.VideoWriter(str(OUTPUT_PATH), fourcc, fps, (width, height))

frame_count = 0

while True:
    ret, frame = cap.read()

    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(40, 40))

    for(x,y,w,h) in faces:
        face_region = frame[y:y + h, x:x + w]
        blurred_face = cv2.GaussianBlur(face_region, (99,99), 30)
        frame[y:y + h, x:x + w] = blurred_face

    out.write(frame)

    frame_count += 1
    if frame_count % 30 == 0:
        print(f"finished processing {frame_count} frames! (video processing)")

cap.release()
out.release()

print(f"Finished, blured video has been saved to {OUTPUT_PATH}")






