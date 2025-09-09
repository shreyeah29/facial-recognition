// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AdminLogin from "./components/AdminLogin";
// import AdminDashboard from "./components/AdminDashboard";
// import AnalyticsDashboard from "./components/AnalyticsDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Admin login routes */}
//         <Route path="/" element={<AdminLogin />} />
//         <Route path="/admin-login" element={<AdminLogin />} />

//         {/* Protected pages */}
//         <Route path="/dashboard" element={<AdminDashboard />} />
//          //<Route path="/analytics" element={<AnalyticsDashboard />} /> 

//         {/* Redirect any unknown routes to login */}
//         <Route path="*" element={<Navigate to="/" />} />
        

//       </Routes>
//     </Router>
//   );
// }
// export default App;








import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ProtectedLayout from "./components/ProtectedLayout";
function App() {
  const isAuthenticated = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {isAuthenticated && (
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

