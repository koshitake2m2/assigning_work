<template lang="html">
  <div>
    決まった : まだ = {{ n_selected_members }} : {{ n_not_selected_members }}
    <button v-on:click="decideSecondChoice">Done</button> <br />
    必要な人数 : {{ sum_second_require }}
    <ul>
      <li
        is="second-choice-work-list-item"
        v-for="(work, index) in all_works"
        v-bind:key="work.work_id"
        v-bind:work="work"
        v-bind:member_info_list="member_info_list"
      ></li>
    </ul>
  </div>
</template>

<script>
import SecondChoiceWorkListItem from "@/components/assigning_work/SecondChoiceWorkListItem";

import {
  arrayShuffle,
  compareValues,
  compareDeepValues
} from "@/assets/js/function_of_member_info_list.js";

export default {
  components: {
    SecondChoiceWorkListItem
  },
  props: {
    all_works: Array,
    //selectable_members: Array,
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
    }
  }
};
</script>

<style lang="css" scoped></style>
