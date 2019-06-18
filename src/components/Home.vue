<template lang="html">
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Home</h1>
          <h2 class="subtitle">選択してください</h2>
        </div>
      </div>
    </section>

    <hr />

    <section>
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <router-link to="/assigning_work">
            <button
              class="button is-info is-large is-fullwidth"
              v-bind:disabled="!visiting_user.is_admin"
            >
              出席確認＋当番割り当て
            </button>
          </router-link>
          <template v-if="!visiting_user.is_admin">
            「出席確認＋当番割り当て」は管理者ログインが必要です
          </template>
          <br />
          <router-link to="/assigning_work_dev">
            <button class="button is-info is-large is-fullwidth">
              出席確認＋当番割り当て 練習
            </button>
          </router-link>
          <br />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const firebase = require("firebase");
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";

export default {
  name: "Index",
  props: {
    visiting_user: Object
  },
  components: {
    Login,
    Logout
  },
  data() {
    return {};
  }
  /*
  beforeRouteEnter(route, redirect, next) {
    console.log("Home_beforeRouteEnter");
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      next(vm => {
        const user = firebase.auth().currentUser;
        if (!user) {
          return;
        }

        vm.visiting_user.is_loggedin = true;
        user.getIdTokenResult(true).then(idTokenResult => {
          if (idTokenResult.claims.admin) {
            // current user has admin
            console.log("hello!!!admin!");
            vm.visiting_user.is_admin = true;
          } else {
            console.log("hello!!!");
          }
        });

        vm.visiting_user.info = user;
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Home_beforeRouteUpdate");
    let vm = this;
    vm.visiting_user.info = null;
    vm.visiting_user.is_loggedin = false;
    vm.visiting_user.is_admin = false;
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      if (!user) {
        next();
        return;
      }
      vm.visiting_user.is_loggedin = true;
      user.getIdTokenResult(true).then(idTokenResult => {
        if (idTokenResult.claims.admin) {
          // current user has admin
          console.log("hello!!!admin!");
          vm.visiting_user.is_admin = true;
        } else {
          console.log("hello!!!");
        }
      });
      vm.visiting_user.info = user;
      next();
    });
  }
  */
};
</script>
