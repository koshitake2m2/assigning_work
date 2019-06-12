<template lang="html">
  <div>
    <p>学年：{{ member_info_list_by_grade.grade }}</p>
    <ul>
      <li
        is="check-attendance-item"
        v-for="member_info in member_info_list_by_grade.member_info_list"
        v-bind:key="member_info.stu_num"
        v-bind:member_info="member_info"
      ></li>
    </ul>
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
