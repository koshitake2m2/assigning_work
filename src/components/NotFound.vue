<template lang="html">
  <div>
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">NotFound</h1>
          <h2 class="subtitle">指定されたページはありません</h2>
        </div>
      </div>
    </section>

    <home v-bind:visiting_user="visiting_user"></home>
  </div>
</template>

<script>
import Home from "@/components/Home";
export default {
  props: {
    visiting_user: Object
  },
  components: {
    Home
  }
};
</script>

<style lang="css" scoped></style>
