<template lang="html"
  ><tr>
    <td>{{ work.name }}</td>
    <td>{{ work.second_require }}</td>
    <td>
      <button class="button is-info" v-on:click="incrementSecondRequire">
        +
      </button>
      <button class="button is-danger" v-on:click="decrementSecondRequire">
        -
      </button>
    </td>
  </tr>
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
