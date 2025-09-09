
// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import { fetchEmotionStats } from "../api";
// import "./AnalyticsDashboard.css";
// import Navbar from "./Navbar";

// const AnalyticsDashboard = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchEmotionStats().then(res => setData(res.data));
//   }, []);

//   const pieData = {
//     labels: ["Happy", "Neutral", "Sad", "Angry", "Fear", "Disgust", "Surprise"],
//     datasets: [
//       {
//         data: data.map(d => d.count),
//         backgroundColor: ["#ffcc00", "#999", "#0099ff", "#ff3300", "#cc66ff", "#00cc99", "#ff99cc"]
//       }
//     ]
//   };

//   return (
//     <div className="analytics">
//       <Navbar />
//       <h2>Emotion Analytics Dashboard</h2>
//       <Pie data={pieData} />
//     </div>
//   );
// };

// export default AnalyticsDashboard;





// import React, { useEffect, useState } from "react";
// import {
//   PieChart, Pie, Cell, Tooltip, Legend,
//   LineChart, Line, XAxis, YAxis, CartesianGrid,
// } from "recharts";
// import "./AnalyticsDashboard.css";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F", "#FFBB28", "#FF8042"];

// const AnalyticsDashboard = () => {
//   const [emotionCounts, setEmotionCounts] = useState([]);
//   const [feedbackTimeline, setFeedbackTimeline] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/analytics")
//       .then((res) => res.json())
//       .then((data) => {
//         const chartData = Object.entries(data).map(([emotion, count]) => ({
//           name: emotion,
//           value: count,
//         }));
//         setEmotionCounts(chartData);
//       });

//     fetch("http://127.0.0.1:5000/get-feedback")
//       .then((res) => res.json())
//       .then((data) => {
//         const timelineData = data.map(([emotion, timestamp]) => ({
//           time: new Date(timestamp).toLocaleString(),
//           emotion,
//         }));
//         setFeedbackTimeline(timelineData);
//       });
//   }, []);

//   const emotionCountMap = feedbackTimeline.reduce((acc, { time, emotion }) => {
//     const date = time.split(",")[0]; // Just the date part
//     if (!acc[date]) acc[date] = {};
//     acc[date][emotion] = (acc[date][emotion] || 0) + 1;
//     return acc;
//   }, {});

//   const timelineChartData = Object.entries(emotionCountMap).map(([date, counts]) => ({
//     date,
//     ...counts,
//   }));

//   return (
//     <div className="analytics-container">
//       <h2>Emotion Analytics</h2>

//       <div className="chart-section">
//         <h3>Emotion Distribution</h3>
//         <PieChart width={400} height={300}>
//           <Pie
//             data={emotionCounts}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             fill="#8884d8"
//             label
//           >
//             {emotionCounts.map((_, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>

//       <div className="chart-section">
//         <h3>Daily Emotion Trends</h3>
//         <LineChart
//           width={600}
//           height={300}
//           data={timelineChartData}
//           margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Legend />
//           {["happy", "sad", "angry", "surprise", "neutral", "fear", "disgust"].map((emotion, i) => (
//             <Line key={emotion} type="monotone" dataKey={emotion} stroke={COLORS[i]} />
//           ))}
//         </LineChart>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;





// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import "./AnalyticsDashboard.css";

// const AnalyticsDashboard = () => {
//   const [emotionData, setEmotionData] = useState({});
//   const [trendData, setTrendData] = useState({});

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/analytics")
//       .then((res) => res.json())
//       .then((data) => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);

//         setEmotionData({
//           labels,
//           datasets: [
//             {
//               label: "Emotion Distribution",
//               data: values,
//               backgroundColor: [
//                 "#ff6384",
//                 "#36a2eb",
//                 "#ffce56",
//                 "#8e44ad",
//                 "#2ecc71",
//                 "#f39c12",
//                 "#34495e",
//               ],
//             },
//           ],
//         });
//       });

//     fetch("http://127.0.0.1:5000/get-feedback")
//       .then((res) => res.json())
//       .then((data) => {
//         const grouped = {};

//         data.forEach(([emotion, timestamp]) => {
//           const date = timestamp.split("T")[0];
//           if (!grouped[date]) grouped[date] = {};
//           grouped[date][emotion] = (grouped[date][emotion] || 0) + 1;
//         });

//         const dates = Object.keys(grouped).sort();
//         const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];

//         const datasets = emotions.map((emotion) => ({
//           label: emotion,
//           data: dates.map((date) => grouped[date][emotion] || 0),
//           fill: false,
//           borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
//         }));

//         setTrendData({
//           labels: dates,
//           datasets,
//         });
//       });
//   }, []);

//   return (
//     <div className="analytics-container">
//       <h2>Analytics Dashboard</h2>

//       <div className="chart-box">
//         <h3>Pie Chart - Emotion Distribution</h3>
//         <Pie data={emotionData} />
//       </div>

//       <div className="chart-box">
//         <h3>Line Chart - Daily Emotion Trends</h3>
//         <Line data={trendData} />
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;









// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import "./AnalyticsDashboard.css";
//  // Optional: Your styling

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);

//   useEffect(() => {
//     // Fetch pie chart data
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);
//         setPieData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     // Fetch line chart data
//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         const dailyData = {};

//         data.forEach(([emotion, timestamp]) => {
//           const date = new Date(timestamp).toLocaleDateString();
//           if (!dailyData[date]) {
//             dailyData[date] = {};
//           }
//           if (!dailyData[date][emotion]) {
//             dailyData[date][emotion] = 0;
//           }
//           dailyData[date][emotion]++;
//         });

//         const dates = Object.keys(dailyData).sort();
//         const emotions = [
//           "angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"
//         ];

//         const datasets = emotions.map(emotion => ({
//           label: emotion,
//           data: dates.map(date => dailyData[date][emotion] || 0),
//           fill: false,
//           borderColor: getRandomColor(),
//           tension: 0.1,
//         }));

//         setLineData({
//           labels: dates,
//           datasets: datasets
//         });
//       });
//   }, []);

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       <h2>Analytics Dashboard</h2>

//       <div className="chart-container">
//         <h3>Emotion Distribution (Pie Chart)</h3>
//         {pieData ? (
//           <Pie data={pieData} />
//         ) : (
//           <p>Loading Pie Chart...</p>
//         )}
//       </div>

//       <div className="chart-container">
//         <h3>Daily Emotion Trends (Line Chart)</h3>
//         {lineData ? (
//           <Line data={lineData} />
//         ) : (
//           <p>Loading Line Chart...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;






// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import Navbar from "./Navbar"; // ✅ Add this line
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);
//         setPieData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         const dailyData = {};

//         data.forEach(([emotion, timestamp]) => {
//           const date = new Date(timestamp).toLocaleDateString();
//           if (!dailyData[date]) {
//             dailyData[date] = {};
//           }
//           if (!dailyData[date][emotion]) {
//             dailyData[date][emotion] = 0;
//           }
//           dailyData[date][emotion]++;
//         });

//         const dates = Object.keys(dailyData).sort();
//         const emotions = [
//           "angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"
//         ];

//         const datasets = emotions.map(emotion => ({
//           label: emotion,
//           data: dates.map(date => dailyData[date][emotion] || 0),
//           fill: false,
//           borderColor: getRandomColor(),
//           tension: 0.1,
//         }));

//         setLineData({
//           labels: dates,
//           datasets: datasets
//         });
//       });
//   }, []);

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> ✅ Include Navbar here */}
//       <h2>Analytics Dashboard</h2>

//       <div className="chart-container">
//         <h3>Emotion Distribution (Pie Chart)</h3>
//         {pieData ? (
//           <Pie data={pieData} />
//         ) : (
//           <p>Loading Pie Chart...</p>
//         )}
//       </div>

//       <div className="chart-container">
//         <h3>Daily Emotion Trends (Line Chart)</h3>
//         {lineData ? (
//           <Line data={lineData} />
//         ) : (
//           <p>Loading Line Chart...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;




// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import Navbar from "./Navbar"; // ✅ Optional Navbar
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);
//         setPieData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         const dailyData = {};

//         data.forEach(([emotion, timestamp]) => {
//           const date = new Date(timestamp).toLocaleDateString();
//           if (!dailyData[date]) {
//             dailyData[date] = {};
//           }
//           if (!dailyData[date][emotion]) {
//             dailyData[date][emotion] = 0;
//           }
//           dailyData[date][emotion]++;
//         });

//         const dates = Object.keys(dailyData).sort();
//         const emotions = [
//           "angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"
//         ];

//         const datasets = emotions.map(emotion => ({
//           label: emotion,
//           data: dates.map(date => dailyData[date][emotion] || 0),
//           fill: false,
//           borderColor: getRandomColor(),
//           tension: 0.1,
//         }));

//         setLineData({
//           labels: dates,
//           datasets: datasets
//         });
//       });
//   }, []);

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> */}
//       <h2>Analytics Dashboard</h2>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: {
//                   tooltip: {
//                     callbacks: {
//                       label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw;
//                         const total = context.chart._metasets[0].total;
//                         const percentage = ((value / total) * 100).toFixed(1);
//                         return `${label}: ${value} (${percentage}%)`;
//                       }
//                     }
//                   },
//                   legend: {
//                     position: "top"
//                   }
//                 }
//               }}
//             />
//           ) : (
//             <p>Loading Pie Chart...</p>
//           )}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>
//           {lineData ? (
//             <Line data={lineData} />
//           ) : (
//             <p>Loading Line Chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;






// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels"; // ✅ NEW
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// // ✅ Register everything including plugin
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels // ✅ NEW
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);
//         const total = values.reduce((sum, val) => sum + val, 0);

//         setPieData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         const dailyData = {};

//         data.forEach(([emotion, timestamp]) => {
//           const date = new Date(timestamp).toLocaleDateString();
//           if (!dailyData[date]) {
//             dailyData[date] = {};
//           }
//           if (!dailyData[date][emotion]) {
//             dailyData[date][emotion] = 0;
//           }
//           dailyData[date][emotion]++;
//         });

//         const dates = Object.keys(dailyData).sort();
//         const emotions = [
//           "angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"
//         ];

//         const datasets = emotions.map(emotion => ({
//           label: emotion,
//           data: dates.map(date => dailyData[date][emotion] || 0),
//           fill: false,
//           borderColor: getRandomColor(),
//           tension: 0.1,
//         }));

//         setLineData({
//           labels: dates,
//           datasets: datasets
//         });
//       });
//   }, []);

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> */}
//       <h2>Analytics Dashboard</h2>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: {
//                   datalabels: {
//                     color: "#fff",
//                     font: {
//                       weight: "bold",
//                       size: 14,
//                     },
//                     formatter: (value, context) => {
//                       const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                       const percentage = ((value / total) * 100).toFixed(1);
//                       return `${percentage}%`;
//                     },
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw;
//                         const total = context.chart._metasets[0].total;
//                         const percentage = ((value / total) * 100).toFixed(1);
//                         return `${label}: ${value} (${percentage}%)`;
//                       }
//                     }
//                   },
//                   legend: {
//                     position: "top"
//                   }
//                 }
//               }}
//               plugins={[ChartDataLabels]} // ✅ Plugin added
//             />
//           ) : (
//             <p>Loading Pie Chart...</p>
//           )}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>
//           {lineData ? (
//             <Line data={lineData} />
//           ) : (
//             <p>Loading Line Chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;




// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [allFeedback, setAllFeedback] = useState([]); // Full data from backend
//   const [selectedDate, setSelectedDate] = useState(""); // Date filter

//   useEffect(() => {
//     // Fetch pie chart data
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);

//         setPieData({
//           labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     // Fetch line chart raw feedback
//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         setAllFeedback(data); // Store all feedback once
//         generateLineChart(data); // Initially show full graph
//       });
//   }, []);

//   const generateLineChart = (feedbackData) => {
//     const dailyData = {};

//     feedbackData.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp).toLocaleDateString();
//       if (!dailyData[date]) dailyData[date] = {};
//       if (!dailyData[date][emotion]) dailyData[date][emotion] = 0;
//       dailyData[date][emotion]++;
//     });

//     const dates = Object.keys(dailyData).sort();
//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];

//     const datasets = emotions.map(emotion => ({
//       label: emotion,
//       data: dates.map(date => dailyData[date][emotion] || 0),
//       fill: false,
//       borderColor: getRandomColor(),
//       tension: 0.1,
//     }));

//     setLineData({
//       labels: dates,
//       datasets: datasets
//     });
//   };

//   const handleDateChange = (e) => {
//     const selected = e.target.value;
//     setSelectedDate(selected);

//     // Convert selected date to locale string format used in chart
//     const formattedDate = new Date(selected).toLocaleDateString();

//     const filtered = allFeedback.filter(([emotion, timestamp]) =>
//       new Date(timestamp).toLocaleDateString() === formattedDate
//     );

//     const emotionCounts = {};
//     filtered.forEach(([emotion]) => {
//       if (!emotionCounts[emotion]) emotionCounts[emotion] = 0;
//       emotionCounts[emotion]++;
//     });

//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];
//     const dataset = emotions.map(emotion => ({
//       label: emotion,
//       data: [emotionCounts[emotion] || 0],
//       borderColor: getRandomColor(),
//       fill: false,
//       tension: 0.1,
//     }));

//     setLineData({
//       labels: [formattedDate],
//       datasets: dataset
//     });
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> */}
//       <h2>Analytics Dashboard</h2>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: {
//                   datalabels: {
//                     color: "#fff",
//                     font: { weight: "bold", size: 14 },
//                     formatter: (value, context) => {
//                       const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                       const percentage = ((value / total) * 100).toFixed(1);
//                       return `${percentage}%`;
//                     },
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw;
//                         const total = context.chart._metasets[0].total;
//                         const percentage = ((value / total) * 100).toFixed(1);
//                         return `${label}: ${value} (${percentage}%)`;
//                       }
//                     }
//                   }
//                 }
//               }}
//               plugins={[ChartDataLabels]}
//             />
//           ) : <p>Loading Pie Chart...</p>}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>

//           {/* ✅ Date filter input */}
//           <div style={{ textAlign: "center", marginBottom: "1rem" }}>
//             <label htmlFor="dateFilter"><strong>Select Date: </strong></label>
//             <input
//               type="date"
//               id="dateFilter"
//               value={selectedDate}
//               onChange={handleDateChange}
//               style={{ padding: "0.4rem", marginLeft: "0.5rem" }}
//             />
//           </div>

//           {lineData ? (
//             <Line data={lineData} />
//           ) : (
//             <p>Loading Line Chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;



// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [allFeedback, setAllFeedback] = useState([]); // Full data from backend
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     // Fetch pie chart data
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);

//         setPieData({
//           labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     // Fetch line chart raw feedback
//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         setAllFeedback(data); // Store all feedback once
//         generateLineChart(data); // Initially show full graph
//       });
//   }, []);

//   const generateLineChart = (feedbackData) => {
//     const dailyData = {};

//     feedbackData.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp).toLocaleDateString();
//       if (!dailyData[date]) dailyData[date] = {};
//       if (!dailyData[date][emotion]) dailyData[date][emotion] = 0;
//       dailyData[date][emotion]++;
//     });

//     const dates = Object.keys(dailyData).sort();
//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];

//     const datasets = emotions.map(emotion => ({
//       label: emotion,
//       data: dates.map(date => dailyData[date][emotion] || 0),
//       fill: false,
//       borderColor: getRandomColor(),
//       tension: 0.1,
//     }));

//     setLineData({
//       labels: dates,
//       datasets: datasets
//     });
//   };

//   const handleDateRangeChange = () => {
//     if (!startDate || !endDate) return;

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const filtered = allFeedback.filter(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       return date >= start && date <= end;
//     });

//     generateLineChart(filtered);
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> */}
//       <h2>Analytics Dashboard</h2>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: {
//                   datalabels: {
//                     color: "#fff",
//                     font: { weight: "bold", size: 14 },
//                     formatter: (value, context) => {
//                       const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                       const percentage = ((value / total) * 100).toFixed(1);
//                       return `${percentage}%`;
//                     },
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw;
//                         const total = context.chart._metasets[0].total;
//                         const percentage = ((value / total) * 100).toFixed(1);
//                         return `${label}: ${value} (${percentage}%)`;
//                       }
//                     }
//                   }
//                 }
//               }}
//               plugins={[ChartDataLabels]}
//             />
//           ) : <p>Loading Pie Chart...</p>}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>

//           {/* 🔁 Date Range Filters */}
//           <div style={{ textAlign: "center", marginBottom: "1rem" }}>
//             <label><strong>Start Date:</strong></label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <label><strong>End Date:</strong></label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <button
//               onClick={handleDateRangeChange}
//               style={{
//                 padding: "0.4rem 1rem",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer"
//               }}
//             >
//               Apply Filter
//             </button>
//           </div>

//           {lineData ? (
//             <Line data={lineData} />
//           ) : (
//             <p>Loading Line Chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;








// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [allFeedback, setAllFeedback] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     // Fetch pie chart data
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);

//         setPieData({
//           labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     // Fetch all feedback once
//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         setAllFeedback(data);
//         generateLineChart(data);
//       });
//   }, []);

//   const generateLineChart = (feedbackData) => {
//     const dailyData = {};

//     feedbackData.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       const isoDate = date.toISOString().split("T")[0]; // yyyy-mm-dd

//       if (!dailyData[isoDate]) dailyData[isoDate] = {};
//       if (!dailyData[isoDate][emotion]) dailyData[isoDate][emotion] = 0;
//       dailyData[isoDate][emotion]++;
//     });

//     const dates = Object.keys(dailyData).sort(); // Sort ISO dates
//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];

//     const datasets = emotions.map(emotion => ({
//       label: emotion,
//       data: dates.map(date => dailyData[date][emotion] || 0),
//       fill: false,
//       borderColor: getRandomColor(),
//       tension: 0.1,
//     }));

//     setLineData({
//       labels: dates,
//       datasets: datasets
//     });
//   };

//   const handleDateRangeChange = () => {
//     if (!startDate || !endDate) return;

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const filtered = allFeedback.filter(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       return date >= start && date <= end;
//     });

//     generateLineChart(filtered);
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> */}
//       <h2>Analytics Dashboard</h2>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: {
//                   datalabels: {
//                     color: "#fff",
//                     font: { weight: "bold", size: 14 },
//                     formatter: (value, context) => {
//                       const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                       const percentage = ((value / total) * 100).toFixed(1);
//                       return `${percentage}%`;
//                     },
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw;
//                         const total = context.chart._metasets[0].total;
//                         const percentage = ((value / total) * 100).toFixed(1);
//                         return `${label}: ${value} (${percentage}%)`;
//                       }
//                     }
//                   }
//                 }
//               }}
//               plugins={[ChartDataLabels]}
//             />
//           ) : <p>Loading Pie Chart...</p>}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>

//           <div style={{ textAlign: "center", marginBottom: "1rem" }}>
//             <label><strong>Start Date:</strong></label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <label><strong>End Date:</strong></label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <button
//               onClick={handleDateRangeChange}
//               style={{
//                 padding: "0.4rem 1rem",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer"
//               }}
//             >
//               Apply Filter
//             </button>
//           </div>

//           {lineData ? (
//             <Line data={lineData} />
//           ) : (
//             <p>Loading Line Chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;






// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [allFeedback, setAllFeedback] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     // Pie Chart Data
//     fetch("http://localhost:5000/analytics")
//       .then(res => res.json())
//       .then(data => {
//         const labels = Object.keys(data);
//         const values = Object.values(data);

//         setPieData({
//           labels,
//           datasets: [
//             {
//               label: "Emotions Count",
//               data: values,
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56",
//                 "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//               ],
//               borderWidth: 1,
//             }
//           ]
//         });
//       });

//     // All feedback for Line Chart
//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         setAllFeedback(data);
//         generateLineChart(data);
//       });
//   }, []);

//   const generateLineChart = (feedbackData) => {
//     const dailyData = {};

//     feedbackData.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       const isoDate = date.toISOString().split("T")[0]; // yyyy-mm-dd

//       if (!dailyData[isoDate]) dailyData[isoDate] = {};
//       if (!dailyData[isoDate][emotion]) dailyData[isoDate][emotion] = 0;
//       dailyData[isoDate][emotion]++;
//     });

//     const sortedDates = Object.keys(dailyData).sort();
//     const displayDates = sortedDates.map(date => {
//       const [y, m, d] = date.split("-");
//       return `${d}-${m}-${y}`; // Convert to dd-mm-yyyy
//     });

//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];
//     const datasets = emotions.map(emotion => ({
//       label: emotion,
//       data: sortedDates.map(date => dailyData[date][emotion] || 0),
//       fill: false,
//       borderColor: getRandomColor(),
//       tension: 0.1,
//     }));

//     setLineData({
//       labels: displayDates,
//       datasets: datasets
//     });
//   };

//   const handleDateRangeChange = () => {
//     if (!startDate || !endDate) return;

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     end.setHours(23, 59, 59, 999); // Include full end date

//     const filtered = allFeedback.filter(([_, timestamp]) => {
//       const date = new Date(timestamp);
//       return date >= start && date <= end;
//     });

//     generateLineChart(filtered);
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> */}
//       <h2>Analytics Dashboard</h2>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: {
//                   datalabels: {
//                     color: "#fff",
//                     font: { weight: "bold", size: 14 },
//                     formatter: (value, context) => {
//                       const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                       const percentage = ((value / total) * 100).toFixed(1);
//                       return `${percentage}%`;
//                     },
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw;
//                         const total = context.chart._metasets[0].total;
//                         const percentage = ((value / total) * 100).toFixed(1);
//                         return `${label}: ${value} (${percentage}%)`;
//                       }
//                     }
//                   }
//                 }
//               }}
//               plugins={[ChartDataLabels]}
//             />
//           ) : <p>Loading Pie Chart...</p>}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>

//           <div style={{ textAlign: "center", marginBottom: "1rem" }}>
//             <label><strong>Start Date:</strong></label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <label><strong>End Date:</strong></label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <button
//               onClick={handleDateRangeChange}
//               style={{
//                 padding: "0.4rem 1rem",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer"
//               }}
//             >
//               Apply Filter
//             </button>
//           </div>

//           {lineData ? (
//             <Line data={lineData} />
//           ) : (
//             <p>Loading Line Chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;





// import React, { useEffect, useState } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [allFeedback, setAllFeedback] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/get-feedback")
//       .then(res => res.json())
//       .then(data => {
//         setAllFeedback(data);
//         generateCharts(data);
//       });
//   }, []);

//   const generateCharts = (feedbackData) => {
//     generateLineChart(feedbackData);
//     generatePieChart(feedbackData);
//   };

//   const generatePieChart = (feedbackData) => {
//     const emotionCounts = {};

//     feedbackData.forEach(([emotion]) => {
//       if (!emotionCounts[emotion]) emotionCounts[emotion] = 0;
//       emotionCounts[emotion]++;
//     });

//     const labels = Object.keys(emotionCounts);
//     const values = Object.values(emotionCounts);

//     setPieData({
//       labels,
//       datasets: [
//         {
//           label: "Emotions Count",
//           data: values,
//           backgroundColor: [
//             "#FF6384", "#36A2EB", "#FFCE56",
//             "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//           ],
//           borderWidth: 1,
//         }
//       ]
//     });
//   };

//   const generateLineChart = (feedbackData) => {
//     const dailyData = {};

//     feedbackData.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       const isoDate = date.toISOString().split("T")[0]; // yyyy-mm-dd

//       if (!dailyData[isoDate]) dailyData[isoDate] = {};
//       if (!dailyData[isoDate][emotion]) dailyData[isoDate][emotion] = 0;
//       dailyData[isoDate][emotion]++;
//     });

//     const sortedDates = Object.keys(dailyData).sort();
//     const displayDates = sortedDates.map(date => {
//       const [y, m, d] = date.split("-");
//       return `${d}-${m}-${y}`; // Convert to dd-mm-yyyy
//     });

//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];
//     const datasets = emotions.map(emotion => ({
//       label: emotion,
//       data: sortedDates.map(date => dailyData[date][emotion] || 0),
//       fill: false,
//       borderColor: getRandomColor(),
//       tension: 0.1,
//     }));

//     setLineData({
//       labels: displayDates,
//       datasets: datasets
//     });
//   };

//   const handleDateRangeChange = () => {
//     if (!startDate || !endDate) return;

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     end.setHours(23, 59, 59, 999); // Include the entire end date

//     const filtered = allFeedback.filter(([_, timestamp]) => {
//       const date = new Date(timestamp);
//       return date >= start && date <= end;
//     });

//     generateCharts(filtered);
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   return (
//     <div className="analytics-dashboard">
//       {/* <Navbar /> */}
//       <h2>Analytics Dashboard</h2>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <Pie
//               data={pieData}
//               options={{
//                 plugins: {
//                   datalabels: {
//                     color: "#fff",
//                     font: { weight: "bold", size: 14 },
//                     formatter: (value, context) => {
//                       const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                       const percentage = ((value / total) * 100).toFixed(1);
//                       return `${percentage}%`;
//                     },
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw;
//                         const total = context.chart._metasets[0].total;
//                         const percentage = ((value / total) * 100).toFixed(1);
//                         return `${label}: ${value} (${percentage}%)`;
//                       }
//                     }
//                   }
//                 }
//               }}
//               plugins={[ChartDataLabels]}
//             />
//           ) : <p>Loading Pie Chart...</p>}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>

//           <div style={{ textAlign: "center", marginBottom: "1rem" }}>
//             <label><strong>Start Date:</strong></label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <label><strong>End Date:</strong></label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               style={{ margin: "0 1rem", padding: "0.4rem" }}
//             />

//             <button
//               onClick={handleDateRangeChange}
//               style={{
//                 padding: "0.4rem 1rem",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer"
//               }}
//             >
//               Apply Filter
//             </button>
//           </div>

//           {lineData ? (
//             <Line data={lineData} />
//           ) : (
//             <p>Loading Line Chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;






// import React, { useEffect, useState, useRef } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [allFeedback, setAllFeedback] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const pieRef = useRef(null);
//   const lineRef = useRef(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/get-feedback")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllFeedback(data);
//         generateCharts(data);
//       });
//   }, []);

//   const generateCharts = (feedback) => {
//     const filteredData = filterByDate(feedback, startDate, endDate);
//     generatePieChart(filteredData);
//     generateLineChart(filteredData);
//   };

//   const filterByDate = (data, start, end) => {
//     if (!start || !end) return data;
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     endDate.setHours(23, 59, 59, 999); // Include full day
//     return data.filter(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       return date >= startDate && date <= endDate;
//     });
//   };

//   const generatePieChart = (feedbackData) => {
//     const counts = {};
//     feedbackData.forEach(([emotion]) => {
//       counts[emotion] = (counts[emotion] || 0) + 1;
//     });

//     const labels = Object.keys(counts);
//     const values = Object.values(counts);

//     setPieData({
//       labels,
//       datasets: [
//         {
//           label: "Emotions Count",
//           data: values,
//           backgroundColor: [
//             "#FF6384", "#36A2EB", "#FFCE56",
//             "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
//           ],
//           borderWidth: 1,
//         }
//       ]
//     });
//   };

//   const generateLineChart = (feedbackData) => {
//     const dailyData = {};

//     feedbackData.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       const formatted = date.toLocaleDateString("en-GB"); // dd-mm-yyyy
//       if (!dailyData[formatted]) dailyData[formatted] = {};
//       if (!dailyData[formatted][emotion]) dailyData[formatted][emotion] = 0;
//       dailyData[formatted][emotion]++;
//     });

//     const dates = Object.keys(dailyData).sort(
//       (a, b) => new Date(a.split("/").reverse().join("/")) - new Date(b.split("/").reverse().join("/"))
//     );
//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];

//     const datasets = emotions.map((emotion) => ({
//       label: emotion,
//       data: dates.map((date) => dailyData[date][emotion] || 0),
//       borderColor: getRandomColor(),
//       tension: 0.2,
//       fill: false,
//     }));

//     setLineData({ labels: dates, datasets });
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     return "#" + Array(6).fill().map(() => letters[Math.floor(Math.random() * 16)]).join("");
//   };

//   const handleFilter = () => {
//     generateCharts(allFeedback);
//   };

//   const exportChartAsPDF = async (chartRef, filename) => {
//     const canvas = await html2canvas(chartRef.current);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
//     pdf.save(`${filename}.pdf`);
//   };

//   return (
//     <div className="analytics-dashboard">
//       <Navbar />
//       <h2>Analytics Dashboard</h2>

//       <div className="filter-bar">
//         <label>Start Date:</label>
//         <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

//         <label>End Date:</label>
//         <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

//         <button onClick={handleFilter}>Apply Filter</button>
//       </div>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie Chart)</h3>
//           {pieData ? (
//             <>
//               <div ref={pieRef}>
//                 <Pie
//                   data={pieData}
//                   options={{
//                     plugins: {
//                       datalabels: {
//                         color: "#fff",
//                         font: { weight: "bold" },
//                         formatter: (value, context) => {
//                           const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                           return `${((value / total) * 100).toFixed(1)}%`;
//                         },
//                       }
//                     }
//                   }}
//                   plugins={[ChartDataLabels]}
//                 />
//               </div>
//               <button onClick={() => exportChartAsPDF(pieRef, "pie-chart")}>Export Pie as PDF</button>
//             </>
//           ) : <p>Loading...</p>}
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line Chart)</h3>
//           {lineData ? (
//             <>
//               <div ref={lineRef}>
//                 <Line data={lineData} />
//               </div>
//               <button onClick={() => exportChartAsPDF(lineRef, "line-chart")}>Export Line as PDF</button>
//             </>
//           ) : <p>Loading...</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;



// AnalyticsDashboard.js (updated for combined PDF, styled filters, and CSV export)
// import React, { useEffect, useState, useRef } from "react";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import Navbar from "./Navbar";
// import "./AnalyticsDashboard.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   ChartDataLabels
// );

// const AnalyticsDashboard = () => {
//   const [pieData, setPieData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [allFeedback, setAllFeedback] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const pieRef = useRef(null);
//   const lineRef = useRef(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/get-feedback")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllFeedback(data);
//         generateCharts(data);
//       });
//   }, []);

//   const generateCharts = (feedback) => {
//     const filteredData = filterByDate(feedback, startDate, endDate);
//     generatePieChart(filteredData);
//     generateLineChart(filteredData);
//   };

//   const filterByDate = (data, start, end) => {
//     if (!start || !end) return data;
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     endDate.setHours(23, 59, 59, 999);
//     return data.filter(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       return date >= startDate && date <= endDate;
//     });
//   };

//   const generatePieChart = (feedbackData) => {
//     const counts = {};
//     feedbackData.forEach(([emotion]) => {
//       counts[emotion] = (counts[emotion] || 0) + 1;
//     });

//     const labels = Object.keys(counts);
//     const values = Object.values(counts);

//     setPieData({
//       labels,
//       datasets: [
//         {
//           label: "Emotions Count",
//           data: values,
//           backgroundColor: [
//             "#FF6384",
//             "#36A2EB",
//             "#FFCE56",
//             "#4BC0C0",
//             "#9966FF",
//             "#FF9F40",
//             "#C9CBCF",
//           ],
//           borderWidth: 1,
//         },
//       ],
//     });
//   };

//   const generateLineChart = (feedbackData) => {
//     const dailyData = {};

//     feedbackData.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp);
//       const formatted = date.toLocaleDateString("en-GB");
//       if (!dailyData[formatted]) dailyData[formatted] = {};
//       if (!dailyData[formatted][emotion]) dailyData[formatted][emotion] = 0;
//       dailyData[formatted][emotion]++;
//     });

//     const dates = Object.keys(dailyData).sort(
//       (a, b) => new Date(a.split("/").reverse().join("/")) - new Date(b.split("/").reverse().join("/"))
//     );
//     const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];

//     const datasets = emotions.map((emotion) => ({
//       label: emotion,
//       data: dates.map((date) => dailyData[date][emotion] || 0),
//       borderColor: getRandomColor(),
//       tension: 0.2,
//       fill: false,
//     }));

//     setLineData({ labels: dates, datasets });
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     return "#" + Array(6).fill().map(() => letters[Math.floor(Math.random() * 16)]).join("");
//   };

//   const handleFilter = () => {
//     generateCharts(allFeedback);
//   };

//   const exportCombinedPDF = async () => {
//     const pdf = new jsPDF();
//     const pieCanvas = await html2canvas(pieRef.current);
//     const lineCanvas = await html2canvas(lineRef.current);

//     const pieImg = pieCanvas.toDataURL("image/png");
//     const lineImg = lineCanvas.toDataURL("image/png");

//     pdf.text("Pie Chart", 15, 10);
//     pdf.addImage(pieImg, "PNG", 10, 20, 180, 90);
//     pdf.addPage();
//     pdf.text("Line Chart", 15, 10);
//     pdf.addImage(lineImg, "PNG", 10, 20, 180, 90);

//     pdf.save("analytics_combined.pdf");
//   };

//   const exportCSV = () => {
//     const rows = ["Emotion,Date"];
//     const filtered = filterByDate(allFeedback, startDate, endDate);
//     filtered.forEach(([emotion, timestamp]) => {
//       const date = new Date(timestamp).toLocaleDateString("en-GB");
//       rows.push(`${emotion},${date}`);
//     });
//     const blob = new Blob([rows.join("\n")], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "emotion_data.csv";
//     link.click();
//   };

//   return (
//     <div className="analytics-dashboard">
//       <Navbar />
//       <h2>Analytics Dashboard</h2>

//       <div className="filter-bar center">
//         <label>Start Date:</label>
//         <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

//         <label>End Date:</label>
//         <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

//         <button className="btn-filter" onClick={handleFilter}>Apply Filter</button>
//         <button className="btn-export" onClick={exportCombinedPDF}>Export Charts as PDF</button>
//         <button className="btn-export" onClick={exportCSV}>Export CSV</button>
//       </div>

//       <div className="charts-flex">
//         <div className="chart-box">
//           <h3>Emotion Distribution (Pie)</h3>
//           <div ref={pieRef}>
//             {pieData ? (
//               <Pie
//                 data={pieData}
//                 options={{
//                   plugins: {
//                     datalabels: {
//                       color: "#fff",
//                       font: { weight: "bold" },
//                       formatter: (value, context) => {
//                         const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
//                         return `${((value / total) * 100).toFixed(1)}%`;
//                       },
//                     },
//                   },
//                 }}
//                 plugins={[ChartDataLabels]}
//               />
//             ) : <p>Loading Pie Chart...</p>}
//           </div>
//         </div>

//         <div className="chart-box">
//           <h3>Daily Emotion Trends (Line)</h3>
//           <div ref={lineRef}>
//             {lineData ? <Line data={lineData} /> : <p>Loading Line Chart...</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;





import React, { useEffect, useRef, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from "./Navbar";
import "./AnalyticsDashboard.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartDataLabels
);

const AnalyticsDashboard = () => {
  const [pieData, setPieData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [allFeedback, setAllFeedback] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const pieRef = useRef();
  const lineRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/get-feedback")
      .then((res) => res.json())
      .then((data) => {
        setAllFeedback(data);
        generateCharts(data);
      });
  }, []);

  const generateCharts = (feedbackData) => {
    const dailyData = {};
    const emotionCounts = {};

    feedbackData.forEach(([emotion, timestamp]) => {
      const date = new Date(timestamp);
      const formatted = date.toLocaleDateString("en-GB");

      if (!dailyData[formatted]) dailyData[formatted] = {};
      if (!dailyData[formatted][emotion]) dailyData[formatted][emotion] = 0;
      dailyData[formatted][emotion]++;

      if (!emotionCounts[emotion]) emotionCounts[emotion] = 0;
      emotionCounts[emotion]++;
    });

    const dates = Object.keys(dailyData).sort();
    const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];

    const datasets = emotions.map((emotion) => ({
      label: emotion,
      data: dates.map((date) => dailyData[date][emotion] || 0),
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.3,
    }));

    setLineData({ labels: dates, datasets });

    setPieData({
      labels: Object.keys(emotionCounts),
      datasets: [
        {
          data: Object.values(emotionCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#C9CBCF",
          ],
        },
      ],
    });
  };

  const handleDateRangeChange = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = allFeedback.filter(([emotion, timestamp]) => {
      const date = new Date(timestamp);
      return date >= start && date <= end;
    });
    generateCharts(filtered);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleExportPDF = async () => {
    const pdf = new jsPDF();

    const pieCanvas = await html2canvas(pieRef.current);
    const pieImg = pieCanvas.toDataURL("image/png");
    pdf.text("Emotion Distribution (Pie Chart)", 10, 10);
    pdf.addImage(pieImg, "PNG", 10, 15, 180, 100);

    const lineCanvas = await html2canvas(lineRef.current);
    const lineImg = lineCanvas.toDataURL("image/png");
    pdf.addPage();
    pdf.text("Daily Emotion Trends (Line Chart)", 10, 10);
    pdf.addImage(lineImg, "PNG", 10, 15, 180, 100);

    pdf.save("analytics.pdf");
  };

  const handleExportCSV = () => {
    let csv = "Date,Emotion\n";
    allFeedback.forEach(([emotion, timestamp]) => {
      const date = new Date(timestamp).toLocaleDateString("en-GB");
      csv += `${date},${emotion}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="analytics-dashboard">
      <Navbar />
      <h2>Analytics Dashboard</h2>

      <div className="date-filter-container">
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button className="apply-filter-btn" onClick={handleDateRangeChange}>Apply Filter</button>
      </div>

      <div className="charts-flex">
        <div className="chart-box" ref={pieRef}>
          <h3>Emotion Distribution (Pie)</h3>
          {pieData ? (
            <Pie
              data={pieData}
              options={{
                plugins: {
                  datalabels: {
                    color: "#fff",
                    font: { weight: "bold" },
                    formatter: (value, context) => {
                      const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                      return `${((value / total) * 100).toFixed(1)}%`;
                    },
                  },
                },
              }}
              plugins={[ChartDataLabels]}
            />
          ) : (
            <p>Loading Pie Chart...</p>
          )}
        </div>

        <div className="chart-box" ref={lineRef}>
          <h3>Daily Emotion Trends (Line)</h3>
          {lineData ? <Line data={lineData} /> : <p>Loading Line Chart...</p>}
        </div>
      </div>

      <div className="export-buttons">
        <button className="export-btn pdf" onClick={handleExportPDF}>Export to PDF</button>
        <button className="export-btn csv" onClick={handleExportCSV}>Export to CSV</button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;


