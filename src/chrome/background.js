chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    minWidth: 500,
    minHeight:400,
    state: 'fullscreen',
  });
});
