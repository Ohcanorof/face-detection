import cv2
#import mediapipe as mp
import numpy as np

#using opencv's face detector, already trained
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

#open webcam
cap = cv2.VideoCapture(0)

#check if opened
if not cap.isOpened():
    print("couldnt open webcam")
    exit()

#read frames
while True:
    ret, frame = cap.read()
    #if cant read frame
    if not ret:
        print("couldnt read frame")
        break

    #else read frame
    #using greyscale here, haar cascade is better with it
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray, scaleFactor = 1.1, minNeighbors =5, minSize = (30,30))

    #rectangle should be drawn around detected faces
    for(x,y,w,h) in faces: 
        faceRegion = frame[y: y+h, x:x +w]
        face_blurr = cv2.GaussianBlur(faceRegion, (99,99),30)
        frame[y: y+h, x:x +w] = face_blurr
        #face detection rectangle
        #cv2.rectangle(frame, (x,y), (x+w, y+h), (0, 255, 0), 2)
        
         #text above the rectangle
        cv2.putText(frame, "OBESSEAN DETECTED!", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)



    cv2.imshow("face detection testing", frame)
    
    #need to press q to exit this, 0xFF used to make sure it is compatible every where, interesting
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()



