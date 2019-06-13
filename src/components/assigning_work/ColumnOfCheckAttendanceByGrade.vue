<template lang="html">
  <div>
    <h2 class="subtitle">学年：{{ member_info_list_by_grade.grade }}</h2>
    <table class="table is-hoverable">
      <tbody>
        <tr
          is="check-attendance-item"
          v-for="member_info in member_info_list_by_grade.member_info_list"
          v-bind:key="member_info.stu_num"
          v-bind:member_info="member_info"
        ></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CheckAttendanceItem from "@/components/assigning_work/CheckAttendanceItem";
export default {
  components: {
    CheckAttendanceItem
  },
  props: {
    member_info_list_by_grade_list: Array,
    member_info_list_by_grade: Object,
    member_info_list: Array
  }
};
</script>

<style lang="css" scoped></style>
