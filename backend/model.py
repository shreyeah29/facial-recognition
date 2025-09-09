
# # model.py
# from deepface import DeepFace
# import cv2

# # For image emotion detection
# def detect_emotion_image(img_path):
#     result = DeepFace.analyze(img_path=img_path, actions=['emotion'])
#     dominant_emotion = result[0]['dominant_emotion']
#     return dominant_emotion

# # For video emotion detection
# def detect_emotion_video(video_path):
#     cap = cv2.VideoCapture(video_path)
#     emotions = []

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break
#         try:
#             result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
#             emotions.append(result[0]['dominant_emotion'])
#         except:
#             continue

#     cap.release()

#     # Most frequent emotion
#     if emotions:
#         return max(set(emotions), key=emotions.count)
#     else:
#         return "No face detected"
