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
        <div
          class="column is-half-desktop is-offset-one-quarter-desktop is-full-mobile"
        >
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
export default {
  name: "Home",
  props: {
    visiting_user: Object
  }
};
</script>
