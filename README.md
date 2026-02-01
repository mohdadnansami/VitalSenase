 VitalSense – Real-Time Health Monitoring System

VitalSense is a real-time health monitoring web application that simulates and visualizes live health data such as Heart Rate, SpO₂, Temperature, GSR, and Movement using a modern web-based dashboard.

⸻

 Problem Statement

Health monitoring systems are often expensive, hardware-dependent, and lack real-time visualization. There is a need for a lightweight, scalable solution that can display health vitals live and detect risks early.

⸻

 Solution

VitalSense provides a real-time dashboard powered by:
	•	WebSockets for live data streaming
	•	A Node.js backend
	•	JSON-based data storage
	•	Interactive frontend charts

It simulates real sensor data and displays it in an intuitive and responsive UI.

⸻

 Features
	•	 Real-time data streaming
	•	 Live charts (Heart Rate, SpO₂, Temperature)
	•	 Risk detection & alert logging
	•	 Demo mode for simulation
	•	 JSON-based backend storage
	•	 Clean & responsive UI

⸻

  Tech Stack

Frontend
	•	HTML
	•	CSS
	•	JavaScript
	•	Chart.js

Backend
	•	Node.js
	•	Express.js
	•	WebSocket (ws)
	•	JSON storage

project structure 
	VitalSense/
│
├── backend/
│   ├── server.js
│   ├── data.json
│   ├── package.json
│
├── frontend/
│   ├── pj.html
│   ├── pj.js
│   ├── pj.css
│
└── README.md

  How to Run
  1️⃣ Install dependencies
  cd backend
  npm install

  2️⃣ Start backend
  node server.js
  
  3️⃣ Open frontend
  Open frontend/pj.html in browser.

   Demo Mode
	•	Click Demo
	•	Live data starts generating
	•	Charts and alerts update automatically


 Risk Detection Logic
 
Parameter
Condition
Risk
Heart Rate
<50 or >120
High
SpO₂
<94%
High
Temperature
>38°C
High

 Future Scope
	•	AI-based health prediction
	•	Cloud database integration
	•	Mobile app version
	•	Real sensor support

 Disclaimer

This project is for educational and demonstration purposes only.
It is not a medical device.

⸻

 License

MIT License © 2026
