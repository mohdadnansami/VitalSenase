console.log(" VitalSense pj.js Loaded");

/* ================= GLOBAL STATE ================= */
let demoRunning = false;
let demoInterval = null;
let socket = null;

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- HELPERS ---------- */
  const el = (id) => document.getElementById(id);
  const safeSet = (node, val) => node && (node.innerText = val);

  /* ---------- ELEMENTS ---------- */
  const statusText = el("status-text");
  const riskText = el("risk-score");
  const timeText = el("status-time");

  const hrValue = el("hr-value");
  const spo2Value = el("spo2-value");
  const tempValue = el("temp-value");
  const gsrValue = el("gsr-value");
  const moveValue = el("movement-value");

  const demoBtn = el("demoBtn");
  const alertsBody = el("alertsTableBody");

  /* ---------- CHARTS ---------- */
  const labels = [];
  const hrData = [];
  const spo2Data = [];
  const tempData = [];

  const hrChart = new Chart(el("hrChart"), {
    type: "line",
    data: { labels, datasets: [{ label: "HR", data: hrData, borderColor: "#3b82f6" }] },
    options: { responsive: true }
  });

  const spo2Chart = new Chart(el("spo2Chart"), {
    type: "line",
    data: { labels, datasets: [{ label: "SpO₂", data: spo2Data, borderColor: "#22c55e" }] },
    options: { responsive: true }
  });

  const tempChart = new Chart(el("tempChart"), {
    type: "line",
    data: { labels, datasets: [{ label: "Temp", data: tempData, borderColor: "#f97316" }] },
    options: { responsive: true }
  });

  /* ================= CORE FUNCTIONS ================= */

  function updateUI(d) {
    const now = new Date().toLocaleTimeString();

    safeSet(hrValue, d.hr);
    safeSet(spo2Value, d.spo2);
    safeSet(tempValue, d.temp);
    safeSet(gsrValue, d.gsr);
    safeSet(moveValue, d.move);

    const risk = calculateRisk(d);
    safeSet(riskText, risk);
    safeSet(timeText, now);

    labels.push(now);
    hrData.push(d.hr);
    spo2Data.push(d.spo2);
    tempData.push(d.temp);

    if (labels.length > 12) {
      labels.shift();
      hrData.shift();
      spo2Data.shift();
      tempData.shift();
    }

    hrChart.update();
    spo2Chart.update();
    tempChart.update();

    addAlert(now, d, risk);
  }

  function calculateRisk(d) {
    let r = 0;
    if (d.hr < 50 || d.hr > 120) r++;
    if (d.spo2 < 94) r++;
    if (d.temp > 38) r++;
    return r;
  }

  function addAlert(time, d, risk) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${time}</td>
      <td>${d.hr}</td>
      <td>${d.spo2}</td>
      <td>${d.temp}</td>
      <td>${risk}</td>
      <td>${risk > 0 ? "⚠ Alert" : "Normal"}</td>
    `;
    alertsBody.prepend(row);

    if (alertsBody.children.length > 8)
      alertsBody.removeChild(alertsBody.lastChild);
  }

  /* ================= DEMO MODE ================= */

  function startDemo() {
    if (demoRunning) return;

    demoRunning = true;
    demoBtn.innerText = "Stop";
    safeSet(statusText, "DEMO MODE");

    demoInterval = setInterval(() => {
      updateUI({
        hr: Math.floor(Math.random() * 40) + 60,
        spo2: Math.floor(Math.random() * 4) + 95,
        temp: (Math.random() * 1.5 + 36).toFixed(1),
        gsr: Math.floor(Math.random() * 300) + 200,
        move: Math.floor(Math.random() * 2)
      });
    }, 2000);
  }

  function stopDemo() {
    demoRunning = false;
    clearInterval(demoInterval);
    demoInterval = null;
    demoBtn.innerText = "Demo";
  }

  demoBtn.addEventListener("click", () => {
    demoRunning ? stopDemo() : startDemo();
  });

  /* ================= BACKEND CONNECTION ================= */

  function connectBackend() {
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log(" Backend Connected");
      safeSet(statusText, "LIVE (Backend)");
      stopDemo();
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        updateUI(data);
      } catch (err) {
        console.warn("Invalid backend data");
      }
    };

    socket.onerror = () => {
      console.error("Backend not running");
    };
  }

  // Auto connect backend
  connectBackend();
  
});