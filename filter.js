// ANDROID-ONLY TRAFFIC CONTROL
const OFFER_URL = "https://singingfiles.com/show.php?l=0&u=2425630&id=68831";

// 1. STRICT ANDROID CHECK
if (!/Android/i.test(navigator.userAgent)) {
  document.body.innerHTML = `<h1>❌ ANDROID ONLY</h1><p>Device blocked</p>`;
  throw new Error('Non-Android device');
}

// 2. US GEO-BLOCK (ipapi.co)
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    if (data.country !== 'US') {
      document.body.innerHTML = `<h1>❌ US ONLY</h1><p>IP: ${data.ip}</p>`;
      throw new Error('Non-US IP');
    }
    
    // 3. FINGERPRINT CHECK
    FingerprintJS.load().then(fp => fp.get()).then(result => {
      const fpKey = `fp_${data.ip}_${result.visitorId}`;
      
      // DUMMY FLOW: 10 VISITS
      if (location.pathname.includes('engagement')) {
        const visits = parseInt(localStorage.getItem(fpKey) || 0;
        if (visits >= 10) {
          document.body.innerHTML = `<h1>⚠️ LIMIT REACHED</h1><p>10 visits used</p>`;
        } else {
          localStorage.setItem(fpKey, visits + 1);
          redirect();
        }
      }
      // PREMIUM FLOW: 1 VISIT
      else {
        if (localStorage.getItem(fpKey)) {
          document.body.innerHTML = `<h1>❌ DUPLICATE</h1><p>Device already used</p>`;
        } else {
          localStorage.setItem(fpKey, 'true');
          redirect();
        }
      }
    });
  });

function redirect() {
  // RANDOM ANDROID LANDING PAGE
  const landings = Array.from({length:500}, (_,i) => `landing-${String(i+1).padStart(3,'0')}.html`);
  setTimeout(() => {
    location.href = landings[Math.floor(Math.random() * landings.length)];
  }, 2000 + Math.random() * 3000); // 2-5s delay
}
