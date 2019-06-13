<template lang="html">
  <tr>
    <td>
      <b>{{ member_info.name }}</b>
    </td>
    <td>
      <div class="control">
        <button
          class="button is-info"
          v-bind:class="[member_info.attendance === 'o' ? '' : 'is-outlined']"
          v-on:click="checkAttendance('o')"
        >
          出席
        </button>
        <button
          class="button is-success"
          v-bind:class="[member_info.attendance === 'e' ? '' : 'is-outlined']"
          v-on:click="checkAttendance('e')"
        >
          早退
        </button>
        <button
          class="button is-danger"
          v-bind:class="[member_info.attendance === 'x' ? '' : 'is-outlined']"
          v-on:click="checkAttendance('x')"
        >
          欠席
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    member_info: Object
  },
  data: function() {
    return {};
  },
  computed: {
    attendance_jp: function() {
      switch (this.member_info.attendance) {
        case "o":
          return "出席";
        case "e":
          return "早退";
        case "l":
          return "遅刻";
        case "x":
          return "欠席";
        case "-":
          return "無断欠席";
      }
    }
  },
  methods: {
    checkAttendance: function(attendance) {
      this.member_info.attendance = attendance;
    }
  }
};
</script>

<style lang="css" scoped></style>
