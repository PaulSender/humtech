import cv2
import threading
from imageai.Detection import ObjectDetection
import os
import sys

def capture():
    videoCaptureObject = cv2.VideoCapture(0)
    ret,frame = videoCaptureObject.read()
    cv2.imwrite("test.jpg",frame)
    totalPeople = 0
    detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , "test.jpg"), output_image_path=os.path.join(execution_path , "testnew.jpg"))
    for eachObject in detections:
     if(eachObject["name"] == "person"):
        totalPeople+=1
    if(totalPeople>0):
        print("ON")
    else:
        print("OFF")
    sys.stdout.flush()
detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
execution_path = os.getcwd()
detector.setModelPath(os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
detector.loadModel("fastest")


def run():
    threading.Timer(5.0, run).start()
    capture()
run()