<template lang="html"
  ><div>
    {{ work.name }} :
    <input type="number" min="0" v-model="work.second_require" />
    <button v-on:click="incrementSecondRequire">+</button>
    <button v-on:click="decrementSecondRequire">-</button>
  </div>
</template>

<script>
export default {
  props: {
    work: Object,
    member_info_list: Array
  },
  data: function() {
    return {
      //second_require: this.work.second_require
    };
  },
  methods: {
    incrementSecondRequire: function() {
      this.work.second_require++;
    },
    decrementSecondRequire: function() {
      if (this.work.second_require > 0) {
        this.work.second_require--;
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
