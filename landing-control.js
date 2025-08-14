// This will run on EVERY landing page
if (sessionStorage.getItem('injectAndroidCheck')) {
  document.addEventListener('DOMContentLoaded', function() {
    const scriptTag = document.createElement('div');
    scriptTag.innerHTML = sessionStorage.getItem('injectAndroidCheck');
    document.body.appendChild(scriptTag);
    
    // Add touch event listener for Android
    document.body.addEventListener('touchstart', function() {
      console.log('Android touch detected');
    });
  });
}
