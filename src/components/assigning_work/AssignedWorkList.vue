<template lang="html">
  <div>
    当番：
    <ul>
      <li
        is="assigned-work-list-item"
        v-for="(work, index) in all_works"
        v-bind:key="work.work_id"
        v-bind:work="work"
        v-bind:member_info_list="member_info_list"
      ></li>
    </ul>
  </div>
</template>

<script>
import AssignedWorkListItem from "@/components/assigning_work/AssignedWorkListItem.vue";

export default {
  components: {
    AssignedWorkListItem
  },
  props: {
    member_info_list: Array,
    all_works: Array
  }
};
</script>

<style lang="css" scoped></style>
