<template lang="html">
  <div>
    <div class="columns is-multiline">
      <div
        class="column is-narrow"
        is="column-of-check-attendance-by-grade"
        v-for="member_info_list_by_grade in member_info_list_by_grade_list"
        v-bind:key="member_info_list_by_grade.grade"
        v-bind:member_info_list="member_info_list"
        v-bind:member_info_list_by_grade="member_info_list_by_grade"
        v-bind:member_info_list_by_grade_list="member_info_list_by_grade_list"
      ></div>
    </div>
  </div>
</template>

<script>
import ColumnOfCheckAttendanceByGrade from "@/components/assigning_work/ColumnOfCheckAttendanceByGrade";

export default {
  components: {
    ColumnOfCheckAttendanceByGrade
  },
  props: {
    member_info_list: Array
  },
  computed: {
    member_info_list_by_grade_list: function() {
      let member_info_list_by_grade_dic = {};
      let grade_list = [];
      for (const member_info of this.member_info_list) {
        const grade = member_info.grade;
        if (grade_list.includes(grade)) {
          member_info_list_by_grade_dic[grade].member_info_list.push(
            member_info
          );
        } else {
          grade_list.push(grade);
          member_info_list_by_grade_dic[grade] = {
            grade: grade,
            member_info_list: [member_info]
          };
        }
      }
      let member_info_list_by_grade_list = [];
      for (const key of Object.keys(member_info_list_by_grade_dic)
        .sort()
        .reverse()) {
        member_info_list_by_grade_list.push(member_info_list_by_grade_dic[key]);
      }
      return member_info_list_by_grade_list;
    }
  },
  methods: {
    clearAssignedWork: function() {
      for (const member_info of this.member_info_list) {
        member_info.assigned_work = "";
        member_info.assigned_work_id = "";
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
