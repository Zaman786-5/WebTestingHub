(async function(){
  try {
    const res = await fetch("http://ip-api.com/json/?fields=status,country,countryCode,query", { cache: 'no-store' });
    const data = await res.json();
    if (data.status !== "success") {
      document.body.innerHTML = "<h1>Location Check Failed</h1>";
      return;
    }
    console.log("Location:", data.country, data.countryCode, data.query);
  } catch(e) {
    console.error("Geo error:", e);
  }
})();