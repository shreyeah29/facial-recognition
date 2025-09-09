
// import React, { useState } from "react";
// import { uploadPhoto, uploadVideo, sendWebcamImage, analyzeCCTV } from "../api";
// import "./AdminDashboard.css";
// import Navbar from "./Navbar";

// const AdminDashboard = () => {
//   const [preview, setPreview] = useState(null);
//   const [emotion, setEmotion] = useState("");
//   const [cctvUrl, setCctvUrl] = useState("");

//   const handleFile = async (e, type) => {
//     const file = e.target.files[0];
//     setPreview(URL.createObjectURL(file));
//     const api = type === "photo" ? uploadPhoto : uploadVideo;
//     const res = await api(file);
//     setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//   };

//   const handleCCTV = async () => {
//     const res = await analyzeCCTV(cctvUrl);
//     setEmotion(res.data.emotion);
//   };

//   return (
//     <div className="dashboard">
//       <Navbar />
//       <h2>Admin Dashboard</h2>
//       <div className="upload-section">
//         <button onClick={() => document.getElementById("photoInput").click()}>📷 Upload Photo</button>
//         <input id="photoInput" type="file" accept="image/*" hidden onChange={(e) => handleFile(e, "photo")} />

//         <button onClick={() => document.getElementById("videoInput").click()}>🎥 Upload Video</button>
//         <input id="videoInput" type="file" accept="video/*" hidden onChange={(e) => handleFile(e, "video")} />

//         <div className="cctv-input">
//           <input
//             type="text"
//             placeholder="Enter CCTV stream URL"
//             value={cctvUrl}
//             onChange={(e) => setCctvUrl(e.target.value)}
//           />
//           <button onClick={handleCCTV}>Analyze CCTV</button>
//         </div>
//       </div>

//       {preview && <div className="preview"><video src={preview} controls width="300" /></div>}

//       <div className="emotion">Detected Emotion: <strong>{emotion}</strong></div>
//     </div>
//   );
// };

// export default AdminDashboard;




// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { uploadPhoto, uploadVideo, sendWebcamImage, analyzeCCTV } from "../api";
// import "./AdminDashboard.css";
// import Navbar from "./Navbar";

// const AdminDashboard = () => {
//   const [preview, setPreview] = useState(null);
//   const [emotion, setEmotion] = useState("");
//   const [cctvUrl, setCctvUrl] = useState("");
//   const [webcamEnabled, setWebcamEnabled] = useState(false);
//   const webcamRef = useRef(null);

//   const handleFile = async (e, type) => {
//     const file = e.target.files[0];
//     setPreview(URL.createObjectURL(file));
//     const api = type === "photo" ? uploadPhoto : uploadVideo;
//     const res = await api(file);
//     setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//   };

//   const handleCCTV = async () => {
//     const res = await analyzeCCTV(cctvUrl);
//     setEmotion(res.data.emotion);
//   };

//   const captureWebcam = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       const res = await sendWebcamImage(imageSrc);
//       setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Navbar />
//       <h2>Admin Dashboard</h2>
//       <div className="upload-section">
//         <button onClick={() => document.getElementById("photoInput").click()}>
//           📷 Upload Photo
//         </button>
//         <input
//           id="photoInput"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={(e) => handleFile(e, "photo")}
//         />

//         <button onClick={() => document.getElementById("videoInput").click()}>
//           🎥 Upload Video
//         </button>
//         <input
//           id="videoInput"
//           type="file"
//           accept="video/*"
//           hidden
//           onChange={(e) => handleFile(e, "video")}
//         />

//         <div className="cctv-input">
//           <input
//             type="text"
//             placeholder="Enter CCTV stream URL"
//             value={cctvUrl}
//             onChange={(e) => setCctvUrl(e.target.value)}
//           />
//           <button onClick={handleCCTV}>Analyze CCTV</button>
//         </div>

//         <button onClick={() => setWebcamEnabled(!webcamEnabled)}>
//           {webcamEnabled ? "❌ Close Webcam" : "📸 Use Webcam"}
//         </button>

//         {webcamEnabled && (
//           <div className="webcam-section">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={300}
//               videoConstraints={{ facingMode: "user" }}
//             />
//             <button onClick={captureWebcam}>Capture Emotion</button>
//           </div>
//         )}
//       </div>

//       {preview && (
//         <div className="preview">
//           <video src={preview} controls width="300" />
//         </div>
//       )}

//       <div className="emotion">
//         Detected Emotion: <strong>{emotion}</strong>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { uploadPhoto, uploadVideo, sendWebcamImage, analyzeCCTV } from "../api";
// import "./AdminDashboard.css";
// import Navbar from "./Navbar";

// const AdminDashboard = () => {
//   const [preview, setPreview] = useState(null);
//   const [isImage, setIsImage] = useState(false); // <-- Track preview type
//   const [emotion, setEmotion] = useState("");
//   const [cctvUrl, setCctvUrl] = useState("");
//   const [webcamEnabled, setWebcamEnabled] = useState(false);
//   const webcamRef = useRef(null);

//   const handleFile = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const objectURL = URL.createObjectURL(file);
//     setPreview(objectURL);
//     setIsImage(type === "photo"); // <-- Decide how to preview

//     try {
//       const api = type === "photo" ? uploadPhoto : uploadVideo;
//       const res = await api(file);
//       setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//     } catch (error) {
//       console.error("File Upload Error:", error);
//       setEmotion("Error detecting emotion");
//     }
//   };

//   const handleCCTV = async () => {
//     try {
//       const res = await analyzeCCTV(cctvUrl);
//       setEmotion(res.data.emotion || "None");
//     } catch (error) {
//       console.error("CCTV Error:", error);
//       setEmotion("Error analyzing CCTV");
//     }
//   };

//   const captureWebcam = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       try {
//         const res = await sendWebcamImage(imageSrc);
//         setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//       } catch (error) {
//         console.error("Webcam Error:", error);
//         setEmotion("Error detecting emotion");
//       }
//     }
//   };

//   return (
//     <div className="dashboard">
//       {/* <Navbar /> */}
//       <h2>Admin Dashboard</h2>

//       <div className="upload-section">
//         {/* Upload Photo */}
//         <button onClick={() => document.getElementById("photoInput").click()}>
//           📷 Upload Photo
//         </button>
//         <input
//           id="photoInput"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={(e) => handleFile(e, "photo")}
//         />

//         {/* Upload Video */}
//         <button onClick={() => document.getElementById("videoInput").click()}>
//           🎥 Upload Video
//         </button>
//         <input
//           id="videoInput"
//           type="file"
//           accept="video/*"
//           hidden
//           onChange={(e) => handleFile(e, "video")}
//         />

//         {/* CCTV */}
//         <div className="cctv-input">
//           <input
//             type="text"
//             placeholder="Enter CCTV stream URL"
//             value={cctvUrl}
//             onChange={(e) => setCctvUrl(e.target.value)}
//           />
//           <button onClick={handleCCTV}>Analyze CCTV</button>
//         </div>

//         {/* Webcam */}
//         <button onClick={() => setWebcamEnabled(!webcamEnabled)}>
//           {webcamEnabled ? "❌ Close Webcam" : "📸 Use Webcam"}
//         </button>

//         {webcamEnabled && (
//           <div className="webcam-section">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={300}
//               videoConstraints={{ facingMode: "user" }}
//             />
//             <button onClick={captureWebcam}>Capture Emotion</button>
//           </div>
//         )}
//       </div>

//       {/* Preview Section */}
//       {preview && (
//         <div className="preview">
//           {isImage ? (
//             <img src={preview} alt="Preview" width="300" />
//           ) : (
//             <video src={preview} controls width="300" />
//           )}
//         </div>
//       )}

//       {/* Detected Emotion */}
//       {/* <div className="emotion">
//         Detected Emotion: <strong>{emotion}</strong>
//       </div> */}
//       <div className="emotion-box">
//   <h2>Detected Emotion: {emotion}</h2>
// </div>

//     </div>
//   );
// };

// export default AdminDashboard;






// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { uploadPhoto, uploadVideo, sendWebcamImage, analyzeCCTV } from "../api";
// import "./AdminDashboard.css";
// import Navbar from "./Navbar";

// const AdminDashboard = () => {
//   const [preview, setPreview] = useState(null);
//   const [isImage, setIsImage] = useState(false); // <-- Track preview type
//   const [emotion, setEmotion] = useState("");
//   const [cctvUrl, setCctvUrl] = useState("");
//   const [webcamEnabled, setWebcamEnabled] = useState(false);
//   const webcamRef = useRef(null);

//   const handleFile = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const objectURL = URL.createObjectURL(file);
//     setPreview(objectURL);
//     setIsImage(type === "photo"); // <-- Decide how to preview

//     try {
//       const api = type === "photo" ? uploadPhoto : uploadVideo;
//       const res = await api(file);
//       setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//     } catch (error) {
//       console.error("File Upload Error:", error);
//       setEmotion("Error detecting emotion");
//     }
//   };

//   const handleCCTV = async () => {
//     try {
//       const res = await analyzeCCTV(cctvUrl);
//       setEmotion(res.data.emotion || "None");
//     } catch (error) {
//       console.error("CCTV Error:", error);
//       setEmotion("Error analyzing CCTV");
//     }
//   };

//   const captureWebcam = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       try {
//         const res = await sendWebcamImage(imageSrc);
//         setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//       } catch (error) {
//         console.error("Webcam Error:", error);
//         setEmotion("Error detecting emotion");
//       }
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Navbar />
//       <h2>Admin Dashboard</h2>

//       <div className="upload-section">
//         {/* Upload Photo */}
//         <button onClick={() => document.getElementById("photoInput").click()}>
//           📷 Upload Photo
//         </button>
//         <input
//           id="photoInput"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={(e) => handleFile(e, "photo")}
//         />

//         {/* Upload Video */}
//         <button onClick={() => document.getElementById("videoInput").click()}>
//           🎥 Upload Video
//         </button>
//         <input
//           id="videoInput"
//           type="file"
//           accept="video/*"
//           hidden
//           onChange={(e) => handleFile(e, "video")}
//         />

//         {/* CCTV */}
//         <div className="cctv-input">
//           <input
//             type="text"
//             placeholder="Enter CCTV stream URL"
//             value={cctvUrl}
//             onChange={(e) => setCctvUrl(e.target.value)}
//           />
//           <button onClick={handleCCTV}>Analyze CCTV</button>
//         </div>

//         {/* Webcam */}
//         <button onClick={() => setWebcamEnabled(!webcamEnabled)}>
//           {webcamEnabled ? "❌ Close Webcam" : "📸 Use Webcam"}
//         </button>

//         {webcamEnabled && (
//           <div className="webcam-section">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={300}
//               videoConstraints={{ facingMode: "user" }}
//             />
//             <button onClick={captureWebcam}>Capture Emotion</button>
//           </div>
//         )}
//       </div>

//       {/* Preview Section */}
//       {preview && (
//         <div className="preview">
//           {isImage ? (
//             <img src={preview} alt="Preview" width="300" />
//           ) : (
//             <video src={preview} controls width="300" />
//           )}
//         </div>
//       )}

//       {/* Detected Emotion */}
//       <div className="emotion">
//         Detected Emotion: <strong>{emotion}</strong>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;







// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { uploadPhoto, uploadVideo, sendWebcamImage, analyzeCCTV } from "../api";
// import "./AdminDashboard.css";
// import Navbar from "./Navbar";

// const AdminDashboard = () => {
//   const [preview, setPreview] = useState(null);
//   const [isImage, setIsImage] = useState(false);
//   const [emotion, setEmotion] = useState("");
//   const [cctvUrl, setCctvUrl] = useState("");
//   const [webcamEnabled, setWebcamEnabled] = useState(false);
//   const webcamRef = useRef(null);

//   const handleFile = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const objectURL = URL.createObjectURL(file);
//     setPreview(objectURL);
//     setIsImage(type === "photo");

//     try {
//       const api = type === "photo" ? uploadPhoto : uploadVideo;
//       const res = await api(file, type); // <- Sending type to backend
//       setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//     } catch (error) {
//       console.error(`${type} Upload Error:`, error);
//       setEmotion("Error detecting emotion");
//     }
//   };

//   const handleCCTV = async () => {
//     try {
//       const res = await analyzeCCTV(cctvUrl, "cctv"); // <- Send source
//       setEmotion(res.data.emotion || "None");
//     } catch (error) {
//       console.error("CCTV Error:", error);
//       setEmotion("Error analyzing CCTV");
//     }
//   };

//   const captureWebcam = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       try {
//         const res = await sendWebcamImage(imageSrc, "webcam"); // <- Send source
//         setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//       } catch (error) {
//         console.error("Webcam Error:", error);
//         setEmotion("Error detecting emotion");
//       }
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Navbar />
//       <h2>Admin Dashboard</h2>

//       <div className="upload-section">
//         {/* Upload Photo */}
//         <button onClick={() => document.getElementById("photoInput").click()}>
//           📷 Upload Photo
//         </button>
//         <input
//           id="photoInput"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={(e) => handleFile(e, "photo")}
//         />

//         {/* Upload Video */}
//         <button onClick={() => document.getElementById("videoInput").click()}>
//           🎥 Upload Video
//         </button>
//         <input
//           id="videoInput"
//           type="file"
//           accept="video/*"
//           hidden
//           onChange={(e) => handleFile(e, "video")}
//         />

//         {/* CCTV Stream */}
//         <div className="cctv-input">
//           <input
//             type="text"
//             placeholder="Enter CCTV stream URL"
//             value={cctvUrl}
//             onChange={(e) => setCctvUrl(e.target.value)}
//           />
//           <button onClick={handleCCTV}>Analyze CCTV</button>
//         </div>

//         {/* Webcam Access */}
//         <button onClick={() => setWebcamEnabled(!webcamEnabled)}>
//           {webcamEnabled ? "❌ Close Webcam" : "📸 Use Webcam"}
//         </button>

//         {webcamEnabled && (
//           <div className="webcam-section">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={300}
//               videoConstraints={{ facingMode: "user" }}
//             />
//             <button onClick={captureWebcam}>Capture Emotion</button>
//           </div>
//         )}
//       </div>

//       {/* Preview Section */}
//       {preview && (
//         <div className="preview">
//           {isImage ? (
//             <img src={preview} alt="Preview" width="300" />
//           ) : (
//             <video src={preview} controls width="300" />
//           )}
//         </div>
//       )}

//       {/* Detected Emotion Display */}
//       <div className="emotion-box">
//         <h2>Detected Emotion: {emotion}</h2>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




  // const handleCCTV = async () => {
  //   try {
  //     const res = await analyzeCCTV(cctvUrl);
  //     setEmotion(res.data.emotion || "None");
  //   } catch (error) {
  //     console.error("CCTV Error:", error);
  //     setEmotion("Error analyzing CCTV");
  //   }
  // };










import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { uploadPhoto, uploadVideo, sendWebcamImage, analyzeCCTV } from "../api";
import "./AdminDashboard.css";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [preview, setPreview] = useState(null);
  const [isImage, setIsImage] = useState(false); // <-- Track preview type
  const [emotion, setEmotion] = useState("");
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const webcamRef = useRef(null);

  const handleFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);
    setIsImage(type === "photo"); // <-- Decide how to preview

    try {
      const api = type === "photo" ? uploadPhoto : uploadVideo;
      const res = await api(file);
      setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
    } catch (error) {
      console.error("File Upload Error:", error);
      setEmotion("Error detecting emotion");
    }
  };

  const captureWebcam = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        const res = await sendWebcamImage(imageSrc);
        setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
      } catch (error) {
        console.error("Webcam Error:", error);
        setEmotion("Error detecting emotion");
      }
    }
  };

  return (
    <div className="dashboard">
      {/* <Navbar /> */}
      <h2>Admin Dashboard</h2>

      <div className="upload-section">
        {/* Upload Photo */}
        <button onClick={() => document.getElementById("photoInput").click()}>
          📷 Upload Photo
        </button>
        <input
          id="photoInput"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e, "photo")}
        />

        {/* Upload Video */}
        <button onClick={() => document.getElementById("videoInput").click()}>
          🎥 Upload Video
        </button>
        <input
          id="videoInput"
          type="file"
          accept="video/*"
          hidden
          onChange={(e) => handleFile(e, "video")}
        />
        <button onClick={() => setWebcamEnabled(!webcamEnabled)}>
          {webcamEnabled ? "❌ Close Webcam" : "📸 Use Webcam"}
        </button>

        {webcamEnabled && (
          <div className="webcam-section">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={{ facingMode: "user" }}
            />
            <button onClick={captureWebcam}>Capture Emotion</button>
          </div>
        )}
      </div>

      {/* Preview Section */}
      {preview && (
        <div className="preview">
          {isImage ? (
            <img src={preview} alt="Preview" width="300" />
          ) : (
            <video src={preview} controls width="300" />
          )}
        </div>
      )}
      <div className="emotion-box">
  <h2>Detected Emotion: {emotion}</h2>
</div>

    </div>
  );
};

export default AdminDashboard;




// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { uploadPhoto, uploadVideo, sendWebcamImage, analyzeCCTV } from "../api";
// import "./AdminDashboard.css";
// import Navbar from "./Navbar";

// const AdminDashboard = () => {
//   const [preview, setPreview] = useState(null);
//   const [isImage, setIsImage] = useState(false);
//   const [emotion, setEmotion] = useState("");
//   const [cctvUrl, setCctvUrl] = useState("");
//   const [webcamEnabled, setWebcamEnabled] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const webcamRef = useRef(null);

//   const handleFile = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const objectURL = URL.createObjectURL(file);
//     setPreview(objectURL);
//     setIsImage(type === "photo");

//     try {
//       const api = type === "photo" ? uploadPhoto : uploadVideo;
//       const res = await api(file);
//       setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//     } catch (error) {
//       console.error("File Upload Error:", error);
//       setEmotion("Error detecting emotion");
//     }
//   };

//   const handleCCTV = async () => {
//     try {
//       const res = await analyzeCCTV(cctvUrl);
//       setEmotion(res.data.emotion || "None");
//     } catch (error) {
//       console.error("CCTV Error:", error);
//       setEmotion("Error analyzing CCTV");
//     }
//   };

//   const captureWebcam = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       try {
//         const res = await sendWebcamImage({ image: imageSrc, phone: phoneNumber });
//         setEmotion(res.data.emotion || res.data.dominant_emotion || "None");
//       } catch (error) {
//         console.error("Webcam Error:", error);
//         setEmotion("Error detecting emotion");
//       }
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Navbar />
//       <h2>Admin Dashboard</h2>

//       <div className="upload-section">
//         <button onClick={() => document.getElementById("photoInput").click()}>
//           📷 Upload Photo
//         </button>
//         <input
//           id="photoInput"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={(e) => handleFile(e, "photo")}
//         />

//         <button onClick={() => document.getElementById("videoInput").click()}>
//           🎥 Upload Video
//         </button>
//         <input
//           id="videoInput"
//           type="file"
//           accept="video/*"
//           hidden
//           onChange={(e) => handleFile(e, "video")}
//         />

//         <div className="cctv-input">
//           <input
//             type="text"
//             placeholder="Enter CCTV stream URL"
//             value={cctvUrl}
//             onChange={(e) => setCctvUrl(e.target.value)}
//           />
//           <button onClick={handleCCTV}>Analyze CCTV</button>
//         </div>

//         {/* Webcam Section */}
//         <button onClick={() => setWebcamEnabled(!webcamEnabled)}>
//           {webcamEnabled ? "❌ Close Webcam" : "📸 Use Webcam"}
//         </button>

//         {webcamEnabled && (
//           <div className="webcam-section">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={300}
//               videoConstraints={{ facingMode: "user" }}
//             />
//             <input
//               type="tel"
//               placeholder="Enter phone number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               style={{ marginTop: "10px", padding: "8px", width: "80%" }}
//             />
//             <button onClick={captureWebcam}>Capture Emotion & Send SMS</button>
//           </div>
//         )}
//       </div>

//       {/* Preview */}
//       {preview && (
//         <div className="preview">
//           {isImage ? (
//             <img src={preview} alt="Preview" width="300" />
//           ) : (
//             <video src={preview} controls width="300" />
//           )}
//         </div>
//       )}

//       {/* Detected Emotion */}
//       <div className="emotion-box">
//         <h2>Detected Emotion: {emotion}</h2>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
