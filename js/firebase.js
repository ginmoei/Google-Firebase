
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDO0_s07YXLWpaZ0_n8iBnqNUmWy8AhVJQ",
    authDomain: "ec2m6xb.firebaseapp.com",
    databaseURL: "https://ec2m6xb.firebaseio.com",
    storageBucket: "ec2m6xb.appspot.com",
  };
  firebase.initializeApp(config);


  //var firebaseRef = firebase.database();

  window.onload = function() {
    initApp();
  };

  function initApp() {

    // Result from Redirect auth flow.
    // [START getidptoken]
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // [START_EXCLUDE]
        // document.getElementById('quickstart-oauthtoken').textContent = token;
      } else {
        // document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // [START_EXCLUDE]
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END getidptoken]
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        console.log(displayName);
        // [START_EXCLUDE]
        // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        // document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
        // document.getElementById('quickstart-account-details').textContent = 'null';
        // document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]

        if (!firebase.auth().currentUser) {
           // [START createprovider]
           var provider = new firebase.auth.GoogleAuthProvider();
           // [END createprovider]
           // [START addscopes]
           provider.addScope('https://www.googleapis.com/auth/plus.login');
           // [END addscopes]
           // [START signin]
           firebase.auth().signInWithRedirect(provider);
           // [END signin]
         }

      }
      // [START_EXCLUDE]
      // document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authstatelistener]
    // document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  }



      // auth.getRedirectResult().then(function(result) {
      //
      //   console.log(result);
      //   if (result.credential) {
      //     // This gives you a Google Access Token. You can use it to access the Google API.
      //     var token = result.credential.accessToken;
      //     // ...
      //   }
      //   // The signed-in user info.
      //   var user = result.user;
      // }).catch(function(error) {
      //   // Handle Errors here.
      //   console.log(error);
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      //   // ...
      // });
