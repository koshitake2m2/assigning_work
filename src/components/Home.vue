<template lang="html">
  <div>
    <h2>{{ msg }}</h2>
    <router-link to="/practice">Go to practice</router-link>
    <router-link to="/assigning_work">Go to Assigning Work</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Assigning Work"
    };
  }
};
</script>
