
// // src/components/Navbar.js
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <Link to="/dashboard" className="nav-link">Dashboard</Link>
//       <Link to="/analytics" className="nav-link">Analytics</Link>
//       <Link to="/admin-login" className="nav-link logout">Logout</Link>
//     </nav>
//   );
// };

// export default Navbar;



//src/components/Navbar.js
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Optional: remove any login state (like token)
//     localStorage.removeItem("adminToken");

//     // Redirect to login page
//     navigate("/admin-login");
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/dashboard" className="nav-link">Dashboard</Link>
//       <Link to="/analytics" className="nav-link">Analytics</Link>
//       <Link to="/admin-login" className="nav-link logout">Logout</Link>
//       <button className="nav-link logout" onClick={handleLogout}>
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Navbar;






// src/components/Navbar.js
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username") || "User";

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("role");
//     navigate("/admin-login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//       <span className="navbar-title">Facial Emotion Feedback</span>

//         <Link to="/dashboard" className="nav-link">
//           Dashboard
//         </Link>
//         <Link to="/analytics" className="nav-link">
//           Analytics
//         </Link>
//       </div>
//       <div className="nav-right">
//         <span className="username">Hi, {username}</span>
//         <button className="logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Move styles here or use inline

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/admin-login");
  };


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Facial Emotion Feedback</span>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/analytics" className="nav-link">Analytics</Link>
      </div>
      <div className="navbar-right">
        <span className="username">Hi, {username}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

