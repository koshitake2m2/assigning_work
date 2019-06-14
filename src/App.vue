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

              <logout v-bind:loginUser="visiting_user.info"></logout>
            </template>
            <template v-else>
              <router-link to="/login">
                <button class="button is-info">ログイン</button>
              </router-link>
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
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";

export default {
  name: "App",
  components: {
    Login,
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
