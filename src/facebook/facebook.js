window.fbAsyncInit = function() {
  FB.init({
    appId      : '1647467498871111',
    xfbml      : true,
    version    : 'v2.4'
  });

  function onLogin(){
      
  }

  FB.getLoginStatus(function(response) {
    // Check login status on load, and if the user is
    // already logged in, go directly to the welcome message.
    if (response.status === 'connected') {
        onLogin();
    } else {
      // Show Login dialog first.
      FB.login(function(response) {
        onLogin();
      }, {scope: 'user_friends, email'});
    }
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
