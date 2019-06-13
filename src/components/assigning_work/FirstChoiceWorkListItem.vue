<template lang="html">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ work.name }}</p>
    </header>
    <div class="card-content">
      <form v-on:submit.prevent="addMemberInfo(selected_member_id_info)">
        <div class="select">
          <select v-model="selected_member_id" v-on:change="checkNotAddYet">
            <option value="" disabled>だれを？</option>
            <option value="" disabled>名前: (回数/合計数)</option>
            <option
              is="selectable-member-option"
              v-for="(member_info, index) in recommended_members_by_work"
              v-bind:key="member_info.stu_num"
              v-bind:value="member_info.stu_num"
              v-bind:member_info="member_info"
              v-bind:work="work"
            >
            </option>
          </select>
        </div>
        <button class="button is-info">Add</button>
        <button class="button is-danger" v-on:click="clearWork">Clear</button>
      </form>
      <b>当番： {{ selected_member_names }}</b>
    </div>
  </div>
</template>

<script>
import {
  arrayShuffle,
  compareValues,
  compareDeepValues
} from "@/assets/js/function_of_member_info_list.js";

import SelectableMemberOption from "@/components/assigning_work/SelectableMemberOption";

export default {
  components: {
    SelectableMemberOption
  },
  props: {
    work: Object,
    selectable_members: Array,
    member_info_list: Array,
    meeting_info: Object
  },
  data: function() {
    return {
      selected_member_id: "",
      first_require: this.work.first_require
    };
  },
  computed: {
    selected_member_names: function() {
      let selected_member_names = "";
      for (const member_info of this.selected_member_ids_by_work) {
        selected_member_names += member_info.name + ", ";
      }
      if (selected_member_names === "") {
        selected_member_names = "なし";
      } else {
        selected_member_names = selected_member_names.slice(0, -2);
      }
      return selected_member_names;
    },
    recommended_members_by_work: function() {
      // ある仕事においてオススメのメンバー順
      let recommended_members_by_work = this.selectable_members;
      recommended_members_by_work = arrayShuffle(
        arrayShuffle(arrayShuffle(recommended_members_by_work))
      );
      return recommended_members_by_work
        .sort(compareValues("work_count"))
        .sort(compareDeepValues("work_count_by_category", this.work.work_id));
    },
    selected_member_ids_by_work: function() {
      return this.member_info_list.filter(member_info => {
        return member_info.assigned_work_id === this.work.work_id;
      });
    },
    n_selected_member_ids: function() {
      return this.selected_member_ids_by_work.length;
    },
    selected_member_id_info: function() {
      let index = this.member_info_list.findIndex(
        ({ stu_num }) => stu_num === this.selected_member_id
      );
      if (index >= 0) {
        return this.member_info_list[index];
      }
      return "";
    },
    assignable_members: function() {
      return this.member_info_list.filter(member_info => {
        switch (member_info.attendance) {
          case "o":
          case "l":
            return true;
          default:
            return false;
        }
      });
    }
  },
  methods: {
    addMemberInfo: function(member_info) {
      let assignable_members = this.assignable_members;
      let index = assignable_members.findIndex(
        ({ stu_num }) => stu_num === this.selected_member_id
      );
      if (index >= 0) {
        if (
          assignable_members[index]["assigned_work"] === "" &&
          assignable_members[index]["assigned_work_id"] === ""
        ) {
          assignable_members[index]["assigned_work"] = this.work.name;
          assignable_members[index]["assigned_work_id"] = this.work.work_id;
        }
        this.selected_member_id = "";
        this.meeting_info.can_run = true;
      }
    },
    clearWork: function() {
      const indexes = this.member_info_list.reduce(
        (indexes, member_info, index) => {
          if (member_info.assigned_work_id == this.work.work_id) {
            indexes.push(index);
          }
          return indexes;
        },
        []
      );
      for (const index of indexes) {
        this.member_info_list[index]["assigned_work"] = "";
        this.member_info_list[index]["assigned_work_id"] = "";
      }
      this.selected_member_id = "";
      this.meeting_info.can_run = true;
    },
    checkNotAddYet: function() {
      if (this.selected_member_id !== "") {
        this.meeting_info.can_run = false;
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
