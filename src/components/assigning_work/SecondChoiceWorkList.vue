<template lang="html">
  <div>
    <div class="columns is-centered is-multiline">
      <div
        class="column is-narrow"
        is="ColumnOfSecondChoiceWorkList"
        v-for="part_of_all_works in all_works_parts"
        v-bind:key="part_of_all_works.work_id"
        v-bind:part_of_all_works="part_of_all_works"
      ></div>
    </div>
    <div class="is-size-3">
      <b>{{ second_choice_info }}</b> <br />
      <br />
    </div>
    <div class="columns is-mobile">
      <div
        class="column is-half-desktop is-offset-one-quarter-desktop is-full-mobile"
      >
        <button
          class="button is-primary is-large is-fullwidth"
          v-bind:disabled="cannot_run"
          v-on:click="decideSecondChoice"
        >
          Run
        </button>
        <br />
      </div>
    </div>
    <div class="columns is-mobile">
      <div
        class="column is-half-desktop is-offset-one-quarter-desktop is-full-mobile"
      >
        <button
          class="button is-danger is-large is-fullwidth"
          v-on:click="clearRandomDecided"
        >
          ランダムで決めた人をリセット
        </button>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import ColumnOfSecondChoiceWorkList from "@/components/assigning_work/ColumnOfSecondChoiceWorkList";

import {
  arrayShuffle,
  compareValues,
  compareDeepValues
} from "@/assets/js/function_of_member_info_list.js";

export default {
  components: {
    ColumnOfSecondChoiceWorkList
  },
  props: {
    all_works: Array,
    member_info_list: Array,
    meeting_info: Object
  },
  computed: {
    selectable_members: function() {
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
          return member_info.assigned_work === "";
        });
    },
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
    sum_second_require: function() {
      return this.all_works.reduce((acc, work) => {
        return acc + Number(work.second_require);
      }, 0);
    },
    second_choice_info: function() {
      const n_member_has_no_work =
        this.n_not_selected_members - this.sum_second_require;
      if (n_member_has_no_work > 0) {
        return String(n_member_has_no_work) + "人仕事がありませんよ！";
      } else if (n_member_has_no_work === 0) {
        return "ちょうどの人数です！";
      } else {
        return String(-1 * n_member_has_no_work) + "人足りません！";
      }
    },
    cannot_run: function() {
      return (
        this.n_not_selected_members < this.sum_second_require ||
        !this.meeting_info.can_run
      );
    },
    all_works_parts: function() {
      let all_works_parts = [];
      let i = 0;
      const part_length = 6;
      while (this.all_works.length > i) {
        all_works_parts.push(this.all_works.slice(i, i + part_length));
        i += part_length;
      }
      console.log(all_works_parts);
      return all_works_parts;
    }
  },
  methods: {
    recommendedMembersByWork: function(work_id, order = "desc") {
      // ある仕事においてオススメのメンバー順
      let recommended_members_by_work = this.selectable_members;
      recommended_members_by_work = arrayShuffle(
        arrayShuffle(arrayShuffle(recommended_members_by_work))
      );
      return recommended_members_by_work
        .sort(compareValues("work_count"))
        .sort(compareDeepValues("work_count_by_category", work_id))
        .sort(compareValues("priority", order));
    },
    decideSecondChoice: function() {
      if (this.sum_second_require > this.n_not_selected_members) {
        alert("仕事の数に対して人数が足りません");
        return;
      }
      // todo: 会議等その他入力事項に見入力がある時、disabled
      for (const work of arrayShuffle(
        arrayShuffle(arrayShuffle(this.all_works))
      )) {
        // 仕事の割り当て人数が2人の時、優先度が低い人が1人だけ優先的に割り当てられる。
        let second_require = Number(work.second_require);
        while (second_require > 0) {
          const recommended_members_by_work =
            second_require == 2
              ? this.recommendedMembersByWork(work.work_id, "asc")
              : this.recommendedMembersByWork(work.work_id, "desc");
          if (recommended_members_by_work.length === 0) {
            alert("仕事の数に対して人数が足りません");
            return;
          }
          const member_info = recommended_members_by_work[0];
          member_info.assigned_work = work.name;
          member_info.assigned_work_id = work.work_id;
          second_require--;
        }
      }
      // ランダム決定した時間を、会議終了時間とする
      const today_date = new Date();
      this.meeting_info.end_time = today_date
        .toLocaleTimeString()
        .split(":")
        .splice(0, 2)
        .join(":");
    },
    clearAssignedWork: function() {
      for (const member_info of this.member_info_list) {
        member_info.assigned_work = "";
        member_info.assigned_work_id = "";
      }
    },
    clearRandomDecided: function() {
      for (const member_info of this.member_info_list.filter(member_info => {
        return !member_info.is_first_choiced;
      })) {
        member_info.assigned_work = "";
        member_info.assigned_work_id = "";
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
