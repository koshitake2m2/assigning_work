<template lang="html">
  <li>
    <table>
      <tr>
        <td>{{ member.name }}</td>
        <td>
          <form id="attendance_check">
            <input
              v-model="attendance"
              type="radio"
              name="attendance_check"
              value="o"
              checked
            />
            <input
              v-model="attendance"
              type="radio"
              name="attendance_check"
              value="e"
            />
            <input
              v-model="attendance"
              type="radio"
              name="attendance_check"
              value="l"
            />
            <input
              v-model="attendance"
              type="radio"
              name="attendance_check"
              value="x"
            />
            <input
              v-model="attendance"
              type="radio"
              name="attendance_check"
              value="-"
            />
          </form>
        </td>
        <td>{{ attendance_jp }}: {{ member.assigned_work }}</td>
      </tr>
    </table>
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    member: Object
  },
  data: function() {
    return {
      attendance: "o"
    };
  },
  created() {
    this.attendance = "o";
  },
  methods: {
    changeAttendanceOfOptionMember: function(stu_num, attendance) {
      this.$emit("changeattendance", stu_num, attendance);
    }
  },
  watch: {
    attendance: {
      handler: function() {
        this.changeAttendanceOfOptionMember(
          this.member.stu_num,
          this.attendance
        );
      }
    }
  },
  computed: {
    attendance_jp: function() {
      switch (this.attendance) {
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
    },
    showChoicedWork: function() {}
  }
};
</script>

<style lang="css" scoped></style>
