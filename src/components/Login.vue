<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Login</h1>
          <h2 class="subtitle">O-Auth 認証</h2>
        </div>
      </div>
    </section>

    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
let firebase = require("firebase");
let firebaseui = require("firebaseui-ja");
require("firebaseui-ja/dist/firebaseui.css");

export default {
  name: "Login",
  mounted() {
    console.log("Login_mounted");
    let vm = this;
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    ui.start("#firebaseui-auth-container", {
      callbacks: {
        uiShown: function() {
          console.log("uiShown");
        },
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          console.log("signInSuccessWithAuthResult", authResult, redirectUrl);

          let isNewUser = authResult.additionalUserInfo.isNewUser;
          let displayName = authResult.user.displayName;
          let photoURL = authResult.user.photoURL;

          // SNSログイン＆で登録済みであればスキップ
          if (displayName != "ゲスト" && !isNewUser) {
            return true;
          }

          switch (authResult.additionalUserInfo.providerId) {
            case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.picture;
              break;
            default:
              displayName = "ゲスト";
              photoURL = "";
              break;
          }

          let user = {
            displayName: displayName,
            photoURL: photoURL
          };

          firebase
            .auth()
            .currentUser.updateProfile(user)
            .then(res => {
              console.log("Auth登録完了", res);
              alert("ログインしました。");
              vm.$router.go();
            });
        },
        signInFailure: function(error) {
          console.log("signInFailure", error);
          alert(error.message);
          vm.$router.go();
        }
      },
      autoUpgradeAnonymousUsers: true,
      signInFlow: "redirect",
      signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: "select_account"
          }
        }
      ]
    });
  }
};
</script>
