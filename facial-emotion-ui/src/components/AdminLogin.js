
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css";

// const AdminLogin = () => {
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (password === "admin123") navigate("/dashboard");
//     else alert("Wrong password!");
//   };

//   return (
//     <div className="login-container">
//       <h2>Admin Login</h2>
//       <input
//         type="password"
//         placeholder="Enter Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default AdminLogin;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("role", data.role);
//         localStorage.setItem("username", data.username);
//         navigate("/dashboard");
//       } else {
//         setError(data.error || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Enter Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Enter Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       {error && <p className="error-msg">{error}</p>}
//     </div>
//   );
// };

// export default AdminLogin;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Restaurant Facial Feedback System </h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default AdminLogin;
