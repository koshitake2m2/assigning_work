<template lang="html">
  <div>
    <div class="columns">
      <!--
      手動決めできる仕事を追加
      -->
      <div class="column">
        <h2 class="subtitle">3.1. 手動決めできる仕事を追加</h2>
        <form v-on:submit.prevent="addFirstChoiceWork(selected_work_id)">
          <div class="select">
            <select v-model="selected_work_id">
              <option value="" disabled>どの仕事を？</option>
              <option
                v-for="work in not_first_choice_works"
                v-bind:key="work.work_id"
                v-bind:value="work.work_id"
              >
                {{ work.name }}
              </option>
            </select>
          </div>
          <button class="button is-info">Add</button>
        </form>
        <br />
        <div class="content">
          <h3 class="subtitle">先に決める仕事</h3>
          <ul>
            <li
              v-for="(work, index) in first_choice_works"
              v-bind:key="work.work_id"
            >
              {{ work.name }}
            </li>
          </ul>
        </div>
      </div>

      <!--
      手動決め
      -->
      <div class="column">
        <h2 class="subtitle">3.2. 各仕事ごと当番を決める</h2>
        決まった人数 : 残りの人数 = {{ n_selected_members }} :
        {{ n_not_selected_members }}
        <p>{{ meeting_info.can_run }}</p>
        <ul>
          <li
            is="first-choice-work-list-item"
            v-for="(work, index) in first_choice_works"
            v-bind:key="work.work_id"
            v-bind:work="work"
            v-bind:selectable_members="selectable_members"
            v-bind:member_info_list="member_info_list"
            v-bind:meeting_info="meeting_info"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import FirstChoiceWorkListItem from "@/components/assigning_work/FirstChoiceWorkListItem";
export default {
  components: {
    FirstChoiceWorkListItem
  },
  props: {
    all_works: Array,
    selectable_members: Array,
    member_info_list: Array,
    meeting_info: Object
  },
  data: function() {
    return {
      selected_work_id: ""
    };
  },
  computed: {
    n_selected_members: function() {
      return this.member_info_list.filter(member_info => {
        return member_info.assigned_work_id !== "";
      }).length;
    },
    n_not_selected_members: function() {
      return this.member_info_list
        .filter(member_info => {
          switch (member_info.attendance) {
            case "o":
            case "l":
              return true;
            default:
              return false;
          }
        })
        .filter(member_info => {
          return member_info.assigned_work_id === "";
        }).length;
    },
    first_choice_works: function() {
      return this.all_works.filter(work => {
        return Number(work.first_require) > 0;
      });
    },
    not_first_choice_works: function() {
      return this.all_works.filter(work => {
        return Number(work.first_require) == 0;
      });
    }
  },
  methods: {
    addFirstChoiceWork: function(selected_work_id) {
      const index = this.all_works.findIndex(
        ({ work_id }) => work_id === selected_work_id
      );
      if (index >= 0) {
        this.all_works[index].first_require = "1";
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
