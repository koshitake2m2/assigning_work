<template lang="html">
  <div>
    <table>
      <tr>
        <td>{{ member_info.name }}</td>
        <td>
          <form id="attendance_check">
            <input
              v-model="member_info.attendance"
              type="radio"
              name="attendance_check"
              value="o"
              checked
            />
            <input
              v-model="member_info.attendance"
              type="radio"
              name="attendance_check"
              value="e"
            />
            <input
              v-model="member_info.attendance"
              type="radio"
              name="attendance_check"
              value="x"
            />
          </form>
        </td>
        <td>{{ attendance_jp }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    member_info: Object
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
  }
};
</script>

<style lang="css" scoped></style>
