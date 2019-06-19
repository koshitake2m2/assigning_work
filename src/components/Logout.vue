<template>
  <div><button class="button" v-on:click="logout()">ログアウト</button></div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Logout",
  props: {
    visiting_user: Object
  },
  methods: {
    // ログアウト
    logout() {
      let vm = this;
      if (!firebase.auth().currentUser) {
        alert("ログインしてください。");
        return;
      }
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logout");
          alert("ログアウトしました。");
          vm.visiting_user.is_loggedin = false;
          vm.visiting_user.is_admin = false;
          vm.visiting_user.info = null;
          //vm.$router.go();
          // memo: vm.$router.go()を使えばそれが呼ばれた時に、App.vueが再描画されて、visiting_userが初期化されて、ログアウト状態になる。
        })
        .catch(err => {
          console.log(err);
        });
    },
    accountDelete() {
      let vm = this;
      // アカウント削除
      if (!firebase.auth().currentUser) {
        alert("ログインしてください。");
        return;
      }
      firebase
        .auth()
        .currentUser.delete()
        .then(res => {
          console.log("currentUser.delete", res);
          alert("アカウントを削除しました。");
          vm.$router.go();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
