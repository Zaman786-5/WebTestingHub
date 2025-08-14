(function(){
  const urls = [
    "https://example.com/path1",
    "https://example.com/path2",
    "https://example.com/path3"
  ];
  const next = urls[Math.floor(Math.random() * urls.length)];
  window.location.href = next;
})();