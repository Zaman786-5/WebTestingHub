(function(){
  // Basic referrer filtering: allow only certain domains
  const allowed = ["google.com", "bing.com", "yahoo.com"];
  const ref = document.referrer;
  if (!allowed.some(domain => ref.includes(domain))) {
    document.body.innerHTML = "<h1>Access Denied</h1><p>Invalid referrer.</p>";
  }
})();