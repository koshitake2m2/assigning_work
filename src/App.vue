<template>
  <div id="app">
    <!-- ヘッダー -->
    <header>
      <nav class="navbar is-light">
        <div class="container">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <template v-if="visiting_user.is_loggedin">
              <div>
                <img
                  v-bind:src="visiting_user.info.photoURL"
                  width="40"
                  height="40"
                  style="border-radius: 50%;"
                />
              </div>
            </template>

            <template v-if="visiting_user.is_admin">
              管理者:
            </template>
            <template v-else-if="visiting_user.is_loggedin">
              一般ユーザ:
            </template>
            <template v-else>
              ゲスト
            </template>

            <template v-if="visiting_user.is_loggedin">
              <div>{{ visiting_user.info.displayName }} さん</div>

              <logout v-bind:visiting_user="visiting_user"></logout>
            </template>
            <template v-else>
              <button class="button is-info" v-on:click="my_login">
                ログイン pop up
              </button>
              <button class="button is-info" v-on:click="my_login_redirect">
                ログイン redirect
              </button>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <!-- ルーター -->
    <router-view v-bind:visiting_user="visiting_user" />

    <!-- フッター -->
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>AssigningWork</strong> by
          <a href="https://github.com/koshitake2m2">輿水猛</a>. The source code
          is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase";
import Logout from "@/components/Logout";

export default {
  name: "App",
  components: {
    Logout
  },
  data: function() {
    return {
      visiting_user: {
        is_loggedin: false,
        is_admin: false,
        info: null
      }
    };
  },
  created() {
    console.log("app created");
    firebase.auth().onAuthStateChanged(msg => {
      console.log("onAuthStateChanged by App", msg);
      const user = firebase.auth().currentUser;
      if (!user) {
        console.log("already logged out. hello! guest!");
        this.visiting_user.is_loggedin = false;
        this.visiting_user.is_admin = false;
        this.visiting_user.info = null;
        return;
      }

      this.visiting_user.is_loggedin = true;
      user.getIdTokenResult(true).then(idTokenResult => {
        if (idTokenResult.claims.admin) {
          // current user has admin
          console.log("hello! admin!");
          this.visiting_user.is_admin = true;
        } else {
          console.log("hello! not admin!");
        }
      });

      this.visiting_user.info = user;
    });
  },
  methods: {
    my_login: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          // ...
        });
    },
    my_login_redirect: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          // ...
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
