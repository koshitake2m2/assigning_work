<template lang="html">
  <li>
    {{ member.name }} <button v-on:click="removeMember">Remove</button>
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: ["member"],
  methods: {
    removeMember: function() {
      this.$emit("remove");
    }
  }
};
</script>

<style lang="css" scoped></style>
