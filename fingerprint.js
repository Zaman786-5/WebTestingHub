(function(){
  // Very minimal "fingerprint" - not production-level
  const fp = [
    navigator.userAgent,
    screen.width + "x" + screen.height,
    navigator.language
  ].join(" | ");
  console.log("Fingerprint:", fp);
})();