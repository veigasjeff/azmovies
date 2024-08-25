      // // Function to load the ad code
      // function loadAdCode() {
      //   var adScript = document.createElement('script');
      //   adScript.async = true;
      //   adScript.setAttribute('data-cfasync', 'false');
      //   adScript.src = '//thubanoa.com/1?z=7762649';
      //   document.body.appendChild(adScript);
      // }

      // // Set a timeout to load the ad code after 5 seconds
      // setTimeout(loadAdCode, 8000); // 5000 milliseconds = 5 seconds


      // // <script async="async" data-cfasync="false" src="//thubanoa.com/1?z=7762649"></script>

      // Function to load the ad code
function loadAdCode() {
  var adScript = document.createElement('script');
  adScript.src = 'https://alwingulla.com/88/tag.min.js';
  adScript.setAttribute('data-zone', '92408');
  adScript.async = true;
  adScript.setAttribute('data-cfasync', 'false');

  // Handle script load errors
  adScript.onerror = function() {
    console.error('Failed to load ad script');
  };

  document.body.appendChild(adScript);
}

// Set a timeout to load the ad code after 15 seconds
setTimeout(loadAdCode, 10000); // 15000 milliseconds = 15 seconds

      // <script src="https://alwingulla.com/88/tag.min.js" data-zone="92408" async data-cfasync="false"></script>