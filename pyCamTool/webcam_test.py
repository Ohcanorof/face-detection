#test file, just to get access for webcam
#lots of the functions from cv2 will be used, very cool

import cv2

#use default webcam
cap= cv2.VideoCapture(0)

#couldnt find webcam
if not cap.isOpened():
    print("couldnt open webcam")
    exit()

while True:
    ret, frame = cap.read()

    if not ret:
        print("couldnt read the frame")
        break

    cv2.imshow("Webcam Test", frame)

    #need to press q to exit this, 0xFF used to make sure it is compatible every where, interesting
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()



