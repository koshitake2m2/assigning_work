<template lang="html">
  <div>
    <button v-on:click="clearAssignedWork">Clear Work</button>
    <ul>
      <check-attendance-by-grade-li
        v-for="member_info_list_by_grade in member_info_list_by_grade_list"
        v-bind:key="member_info_list_by_grade.grade"
        v-bind:member_info_list="member_info_list"
        v-bind:member_info_list_by_grade="member_info_list_by_grade"
        v-bind:member_info_list_by_grade_list="member_info_list_by_grade_list"
      >
      </check-attendance-by-grade-li>
    </ul>
    <!--
    <ul>
      <li
        is="check-attendance"
        v-for="(member, index) in all_members"
        v-bind:key="member.stu_num"
        v-bind:member="member"
        v-on:changeattendance="changeAttendance"
      ></li>
    </ul>
    -->
  </div>
</template>

<script>
import CheckAttendance from "@/components/assigning_work/CheckAttendance";
import CheckAttendanceByGradeLi from "@/components/assigning_work/CheckAttendanceByGradeLi";

export default {
  components: {
    CheckAttendance,
    CheckAttendanceByGradeLi
  },
  props: {
    all_members: Array,
    member_info_list: Array
  },
  data: function() {
    return {
      //member_info_list_by_grade: []
    };
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
      console.log(member_info_list_by_grade_list);
      return member_info_list_by_grade_list;
    }
  },
  methods: {
    clearAssignedWork: function() {
      for (const member_info of this.member_info_list) {
        member_info.assigned_work = "";
        member_info.assigned_work_id = "";
      }
    },
    changeAttendance: function(target_stu_num, attendance) {
      let index = this.member_info_list.findIndex(
        ({ stu_num }) => stu_num === target_stu_num
      );
      if (index >= 0) {
        this.member_info_list[index]["attendance"] = attendance;
        switch (attendance) {
          case "e":
          case "x":
          case "-":
            this.member_info_list[index]["assigned_work"] = "";
            this.member_info_list[index]["assigned_work_id"] = "";
        }
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
