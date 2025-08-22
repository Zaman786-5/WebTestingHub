
// filter.js (validation + visitor control)
let cachedIP = null;

async function getIPInfo() {
  if (cachedIP) return cachedIP;
  try {
    const res = await fetch("https://ipapi.co/json/");
    cachedIP = await res.json();
    return cachedIP;
  } catch (e) {
    console.error("IP fetch failed:", e);
    cachedIP = { ip: "0.0.0.0", country_code: "XX" };
    return cachedIP;
  }
}

async function getDeviceID() {
  const ip = await getIPInfo();
  const ua = navigator.userAgent;
  return btoa(ua + (ip.ip || "")).substring(0, 16);
}

function saveVisitor(deviceID, logs) {
  const visitors = JSON.parse(localStorage.getItem("visitors") || "{}");
  visitors[deviceID] = logs;
  localStorage.setItem("visitors", JSON.stringify(visitors));
}

function loadVisitor(deviceID) {
  const visitors = JSON.parse(localStorage.getItem("visitors") || "{}");
  return visitors[deviceID] || { warm: 0, real: 0, expired: false, timestamp: Date.now() };
}

function disableButtons() {
  ["warmBtn", "realBtn"].forEach(id => {
    let btn = document.getElementById(id);
    if (btn) {
      btn.style.background = "grey";
      btn.style.pointerEvents = "none";
      btn.disabled = true;
    }
  });
}

function expireLink(deviceID, logs) {
  logs.expired = true;
  logs.timestamp = Date.now();
  saveVisitor(deviceID, logs);
  disableButtons();
  if (!window.location.pathname.includes("expired.html")) {
    window.location.href = "expired.html";
  }
}

async function validateVisitor() {
  try {
    const deviceID = await getDeviceID();
    const logs = loadVisitor(deviceID);
    const ip = await getIPInfo();

    if (ip.country_code !== "US") {
      expireLink(deviceID, logs);
      return;
    }

    if (logs.expired && Date.now() - logs.timestamp < 365 * 24 * 60 * 60 * 1000) {
      expireLink(deviceID, logs);
      return;
    }

    let warmBtn = document.getElementById("warmBtn");
    let realBtn = document.getElementById("realBtn");

    if (logs.real >= 1) {
      expireLink(deviceID, logs);
      return;
    }

    if (warmBtn) warmBtn.style.display = "inline-block";
    if (realBtn) realBtn.style.display = "inline-block";

    if (logs.warm > 0 && realBtn) {
      realBtn.style.background = "grey";
      realBtn.style.pointerEvents = "none";
      realBtn.disabled = true;
    }

  } catch (e) {
    console.error("Validation failed:", e);
  }
}

async function handleClick(type) {
  const deviceID = await getDeviceID();
  const logs = loadVisitor(deviceID);

  if (logs.expired) {
    expireLink(deviceID, logs);
    return;
  }

  disableButtons();

  if (type === "warm") {
    if (logs.real >= 1 || logs.warm >= 10) {
      expireLink(deviceID, logs);
      return;
    }
    logs.warm++;
  }

  if (type === "real") {
    if (logs.warm > 0 || logs.real >= 1) {
      expireLink(deviceID, logs);
      return;
    }
    logs.real = 1;
  }

  saveVisitor(deviceID, logs);
  const offer = spoofRedirect(CONFIG.CPA_LINK);
  window.location.href = offer;
}

window.addEventListener("DOMContentLoaded", () => {
  let warmBtn = document.getElementById("warmBtn");
  let realBtn = document.getElementById("realBtn");
  if (warmBtn) warmBtn.onclick = () => handleClick("warm");
  if (realBtn) realBtn.onclick = () => handleClick("real");
  validateVisitor();
});
