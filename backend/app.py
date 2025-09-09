
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from deepface import DeepFace
# import cv2
# import os
# import datetime
# import sqlite3

# app = Flask(__name__)
# CORS(app)

# DB_PATH = "database.db"

# def init_db():
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute('''CREATE TABLE IF NOT EXISTS feedback (
#                             id INTEGER PRIMARY KEY AUTOINCREMENT,
#                             emotion TEXT,
#                             timestamp TEXT
#                         )''')

# init_db()

# def save_feedback(emotion):
#     now = datetime.datetime.now().isoformat()
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute("INSERT INTO feedback (emotion, timestamp) VALUES (?, ?)", (emotion, now))

# @app.route("/upload-photo", methods=["POST"])
# def photo_upload():
#     file = request.files["file"]
#     file.save("temp.jpg")
#     try:
#         result = DeepFace.analyze(img_path="temp.jpg", actions=["emotion"])[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion)
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})
    
# @app.route("/upload-video", methods=["POST"])
# def video_upload():
#     file = request.files["file"]
#     file.save("temp.mp4")

#     cap = cv2.VideoCapture("temp.mp4")
#     emotions = []
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#         try:
#             result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
#             emotions.append(result["dominant_emotion"])
#         except:
#             continue
#     cap.release()

#     if emotions:
#         dominant_emotion = max(set(emotions), key=emotions.count)
#         save_feedback(dominant_emotion)
#         return jsonify({"dominant_emotion": dominant_emotion})
#     return jsonify({"dominant_emotion": "No emotion detected"})

# @app.route("/get-feedback", methods=["GET"])
# def get_feedback():
#     with sqlite3.connect(DB_PATH) as conn:
#         rows = conn.execute("SELECT emotion, timestamp FROM feedback").fetchall()
#     return jsonify(rows)

# if __name__ == "__main__":
#     app.run(debug=True)





# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from deepface import DeepFace
# import cv2
# import os
# import datetime
# import sqlite3
# import base64
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# DB_PATH = "database.db"

# # Initialize DB if it doesn't exist
# def init_db():
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute('''CREATE TABLE IF NOT EXISTS feedback (
#                             id INTEGER PRIMARY KEY AUTOINCREMENT,
#                             emotion TEXT,
#                             timestamp TEXT
#                         )''')

# init_db()

# # Save detected emotion with timestamp
# def save_feedback(emotion):
#     now = datetime.datetime.now().isoformat()
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute("INSERT INTO feedback (emotion, timestamp) VALUES (?, ?)", (emotion, now))

# # Photo Upload Route
# @app.route("/upload-photo", methods=["POST"])
# def photo_upload():
#     file = request.files["file"]
#     file.save("temp.jpg")
#     try:
#         result = DeepFace.analyze(img_path="temp.jpg", actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion)
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# # Video Upload Route
# @app.route("/upload-video", methods=["POST"])
# def video_upload():
#     file = request.files["file"]
#     file.save("temp.mp4")

#     cap = cv2.VideoCapture("temp.mp4")
#     emotions = []
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#         try:
#             result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
#             emotions.append(result["dominant_emotion"])
#         except:
#             continue
#     cap.release()

#     if emotions:
#         dominant_emotion = max(set(emotions), key=emotions.count)
#         save_feedback(dominant_emotion)
#         return jsonify({"dominant_emotion": dominant_emotion})
#     return jsonify({"dominant_emotion": "No emotion detected"})

# # Webcam Route
# @app.route("/webcam", methods=["POST"])
# def webcam():
#     data = request.json
#     img_data = base64.b64decode(data["image"].split(",")[1])
#     nparr = np.frombuffer(img_data, np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     try:
#         result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion)
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# # CCTV Route
# @app.route("/cctv", methods=["POST"])
# def cctv():
#     data = request.json
#     url = data.get("url")

#     cap = cv2.VideoCapture(url)
#     ret, frame = cap.read()
#     cap.release()

#     if not ret:
#         return jsonify({"error": "Unable to access CCTV stream"})

#     try:
#         result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion)
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# # Analytics Route
# @app.route("/analytics", methods=["GET"])
# def analytics():
#     with sqlite3.connect(DB_PATH) as conn:
#         cursor = conn.cursor()
#         cursor.execute("SELECT emotion, COUNT(*) FROM feedback GROUP BY emotion")
#         data = cursor.fetchall()
#         return jsonify({row[0]: row[1] for row in data})

# # Get full feedback data
# @app.route("/get-feedback", methods=["GET"])
# def get_feedback():
#     with sqlite3.connect(DB_PATH) as conn:
#         rows = conn.execute("SELECT emotion, timestamp FROM feedback").fetchall()
#     return jsonify(rows)

# # Start Flask app
# if __name__ == "__main__":
#     app.run(debug=True)






# from flask import Flask, request, jsonify 
# from flask_cors import CORS
# from deepface import DeepFace
# import cv2
# import os
# import datetime
# import sqlite3
# import base64
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# DB_PATH = "database.db"

# # Initialize DB if it doesn't exist
# def init_db():
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute('''CREATE TABLE IF NOT EXISTS feedback (
#                             id INTEGER PRIMARY KEY AUTOINCREMENT,
#                             emotion TEXT,
#                             timestamp TEXT
#                         )''')
#         conn.execute('''CREATE TABLE IF NOT EXISTS users (
#                             id INTEGER PRIMARY KEY AUTOINCREMENT,
#                             username TEXT UNIQUE,
#                             password TEXT,
#                             role TEXT
#                         )''')

# init_db()

# # Save detected emotion with timestamp
# def save_feedback(emotion):
#     now = datetime.datetime.now().isoformat()
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute("INSERT INTO feedback (emotion, timestamp) VALUES (?, ?)", (emotion, now))

# # --------- Emotion Detection Routes ---------

# @app.route("/upload-photo", methods=["POST"])
# def photo_upload():
#     file = request.files["file"]
#     file.save("temp.jpg")
#     try:
#         result = DeepFace.analyze(img_path="temp.jpg", actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion)
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# @app.route("/upload-video", methods=["POST"])
# def video_upload():
#     file = request.files["file"]
#     file.save("temp.mp4")

#     cap = cv2.VideoCapture("temp.mp4")
#     emotions = []
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#         try:
#             result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
#             emotions.append(result["dominant_emotion"])
#         except:
#             continue
#     cap.release()

#     if emotions:
#         dominant_emotion = max(set(emotions), key=emotions.count)
#         save_feedback(dominant_emotion)
#         return jsonify({"dominant_emotion": dominant_emotion})
#     return jsonify({"dominant_emotion": "No emotion detected"})

# @app.route("/webcam", methods=["POST"])
# def webcam():
#     data = request.json
#     img_data = base64.b64decode(data["image"].split(",")[1])
#     nparr = np.frombuffer(img_data, np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     try:
#         result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion)
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# @app.route("/cctv", methods=["POST"])
# def cctv():
#     data = request.json
#     url = data.get("url")

#     cap = cv2.VideoCapture(url)
#     ret, frame = cap.read()
#     cap.release()

#     if not ret:
#         return jsonify({"error": "Unable to access CCTV stream"})

#     try:
#         result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion)
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# # --------- Analytics Routes ---------

# @app.route("/analytics", methods=["GET"])
# def analytics():
#     with sqlite3.connect(DB_PATH) as conn:
#         cursor = conn.cursor()
#         cursor.execute("SELECT emotion, COUNT(*) FROM feedback GROUP BY emotion")
#         data = cursor.fetchall()
#         return jsonify({row[0]: row[1] for row in data})

# @app.route("/get-feedback", methods=["GET"])
# def get_feedback():
#     with sqlite3.connect(DB_PATH) as conn:
#         rows = conn.execute("SELECT emotion, timestamp FROM feedback").fetchall()
#     return jsonify(rows)

# # --------- Login Route ---------

# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     with sqlite3.connect(DB_PATH) as conn:
#         user = conn.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password)).fetchone()

#     if user:
#         return jsonify({"status": "success", "role": user[3]})  # role is at index 3
#     else:
#         return jsonify({"status": "error", "message": "Invalid credentials"}), 401

# # --------- Run App ---------

# if __name__ == "__main__":
#     app.run(debug=True)




from flask import Flask, request, jsonify 
from flask_cors import CORS
from deepface import DeepFace
import cv2
import os
import datetime
import sqlite3
import base64
import numpy as np

app = Flask(__name__)
CORS(app)

DB_PATH = "database.db"

# Initialize DB if it doesn't exist
def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS feedback (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            emotion TEXT,
                            timestamp TEXT
                        )''')
        conn.execute('''CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT UNIQUE,
                            password TEXT,
                            role TEXT
                        )''')

init_db()

# Save detected emotion with timestamp
def save_feedback(emotion):
    now = datetime.datetime.now().isoformat()
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("INSERT INTO feedback (emotion, timestamp) VALUES (?, ?)", (emotion, now))

# --------- Emotion Detection Routes ---------

@app.route("/upload-photo", methods=["POST"])
def photo_upload():
    file = request.files["file"]
    file.save("temp.jpg")
    try:
        result = DeepFace.analyze(img_path="temp.jpg", actions=["emotion"], enforce_detection=False)[0]
        emotion = result["dominant_emotion"]
        save_feedback(emotion)
        return jsonify({"emotion": emotion})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/upload-video", methods=["POST"])
def video_upload():
    file = request.files["file"]
    file.save("temp.mp4")

    cap = cv2.VideoCapture("temp.mp4")
    emotions = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        try:
            result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
            emotions.append(result["dominant_emotion"])
        except:
            continue
    cap.release()

    if emotions:
        dominant_emotion = max(set(emotions), key=emotions.count)
        save_feedback(dominant_emotion)
        return jsonify({"dominant_emotion": dominant_emotion})
    return jsonify({"dominant_emotion": "No emotion detected"})

@app.route("/webcam", methods=["POST"])
def webcam():
    data = request.json
    img_data = base64.b64decode(data["image"].split(",")[1])
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    try:
        result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)[0]
        emotion = result["dominant_emotion"]
        save_feedback(emotion)
        return jsonify({"emotion": emotion})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/cctv", methods=["POST"])
def cctv():
    data = request.json
    url = data.get("url")

    cap = cv2.VideoCapture(url)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return jsonify({"error": "Unable to access CCTV stream"})

    try:
        result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
        emotion = result["dominant_emotion"]
        save_feedback(emotion)
        return jsonify({"emotion": emotion})
    except Exception as e:
        return jsonify({"error": str(e)})

# --------- Analytics Routes ---------

@app.route("/analytics", methods=["GET"])
def analytics():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT emotion, COUNT(*) FROM feedback GROUP BY emotion")
        data = cursor.fetchall()
        return jsonify({row[0]: row[1] for row in data})

@app.route("/get-feedback", methods=["GET"])
def get_feedback():
    with sqlite3.connect(DB_PATH) as conn:
        rows = conn.execute("SELECT emotion, timestamp FROM feedback").fetchall()
    return jsonify(rows)

# --------- Login Route ---------

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    with sqlite3.connect(DB_PATH) as conn:
        user = conn.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password)).fetchone()

    if user:
        return jsonify({
            "status": "success",
            "username": user[1],
            "role": user[3]
        })
    else:
        return jsonify({
            "status": "error",
            "message": "Invalid credentials"
        }), 401

# --------- Run App ---------

if __name__ == "__main__":
    app.run(debug=True)





# from flask import Flask, request, jsonify 
# from flask_cors import CORS
# from deepface import DeepFace
# import cv2
# import os
# import datetime
# import sqlite3
# import base64
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# DB_PATH = "database.db"

# # Initialize DB if it doesn't exist
# def init_db():
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute('''CREATE TABLE IF NOT EXISTS feedback (
#                             id INTEGER PRIMARY KEY AUTOINCREMENT,
#                             emotion TEXT,
#                             timestamp TEXT,
#                             source TEXT
#                         )''')
#         conn.execute('''CREATE TABLE IF NOT EXISTS users (
#                             id INTEGER PRIMARY KEY AUTOINCREMENT,
#                             username TEXT UNIQUE,
#                             password TEXT,
#                             role TEXT
#                         )''')

# init_db()

# # Save detected emotion with timestamp and source
# def save_feedback(emotion, source):
#     now = datetime.datetime.now().isoformat()
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.execute("INSERT INTO feedback (emotion, timestamp, source) VALUES (?, ?, ?)", (emotion, now, source))

# # --------- Emotion Detection Routes ---------

# @app.route("/upload-photo", methods=["POST"])
# def photo_upload():
#     file = request.files["file"]
#     file.save("temp.jpg")
#     try:
#         result = DeepFace.analyze(img_path="temp.jpg", actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion, "photo")
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# @app.route("/upload-video", methods=["POST"])
# def video_upload():
#     file = request.files["file"]
#     file.save("temp.mp4")

#     cap = cv2.VideoCapture("temp.mp4")
#     emotions = []
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#         try:
#             result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
#             emotions.append(result["dominant_emotion"])
#         except:
#             continue
#     cap.release()

#     if emotions:
#         dominant_emotion = max(set(emotions), key=emotions.count)
#         save_feedback(dominant_emotion, "video")
#         return jsonify({"dominant_emotion": dominant_emotion})
#     return jsonify({"dominant_emotion": "No emotion detected"})

# @app.route("/webcam", methods=["POST"])
# def webcam():
#     data = request.json
#     img_data = base64.b64decode(data["image"].split(",")[1])
#     nparr = np.frombuffer(img_data, np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     try:
#         result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion, "webcam")
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# @app.route("/cctv", methods=["POST"])
# def cctv():
#     data = request.json
#     url = data.get("url")

#     cap = cv2.VideoCapture(url)
#     ret, frame = cap.read()
#     cap.release()

#     if not ret:
#         return jsonify({"error": "Unable to access CCTV stream"})

#     try:
#         result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)[0]
#         emotion = result["dominant_emotion"]
#         save_feedback(emotion, "cctv")
#         return jsonify({"emotion": emotion})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# # --------- Analytics Routes ---------

# @app.route("/analytics", methods=["GET"])
# def analytics():
#     with sqlite3.connect(DB_PATH) as conn:
#         cursor = conn.cursor()
#         cursor.execute("SELECT emotion, COUNT(*) FROM feedback GROUP BY emotion")
#         data = cursor.fetchall()
#         return jsonify({row[0]: row[1] for row in data})

# @app.route("/get-feedback", methods=["GET"])
# def get_feedback():
#     source = request.args.get("source")
#     with sqlite3.connect(DB_PATH) as conn:
#         if source and source != "all":
#             rows = conn.execute("SELECT emotion, timestamp FROM feedback WHERE source = ?", (source,)).fetchall()
#         else:
#             rows = conn.execute("SELECT emotion, timestamp FROM feedback").fetchall()
#     return jsonify(rows)

# # --------- Login Route ---------

# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     with sqlite3.connect(DB_PATH) as conn:
#         user = conn.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password)).fetchone()

#     if user:
#         return jsonify({
#             "status": "success",
#             "username": user[1],
#             "role": user[3]
#         })
#     else:
#         return jsonify({
#             "status": "error",
#             "message": "Invalid credentials"
#         }), 401

# # --------- Run App ---------

# if __name__ == "__main__":
#     app.run(debug=True)
