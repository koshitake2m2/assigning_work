<template lang="html">
  <div>
    <table class="table is-hoverable">
      <tbody>
        <tr>
          <th>仕事</th>
          <th>必要人数</th>
          <th></th>
        </tr>
        <tr
          is="second-choice-work-list-item"
          v-for="(work, index) in part_of_all_works"
          v-bind:key="work.work_id"
          v-bind:work="work"
          v-bind:member_info_list="member_info_list"
        ></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SecondChoiceWorkListItem from "@/components/assigning_work/SecondChoiceWorkListItem";
export default {
  components: {
    SecondChoiceWorkListItem
  },
  props: {
    all_works: Array,
    member_info_list: Array,
    meeting_info: Object,
    part_of_all_works: Array
  }
};
</script>

<style lang="css" scoped></style>
