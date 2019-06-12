<template lang="html">
  <div>{{ work.name }}: {{ selected_members }}</div>
</template>

<script>
export default {
  props: {
    work: Object,
    member_info_list: Array
  },
  computed: {
    selected_members: function() {
      let selected_members = "";
      //for (const member_info of this.selected_members_by_work) {
      for (const member_info of this.selected_members_by_work) {
        selected_members += member_info.name + ", ";
      }
      if (selected_members === "") {
        selected_members = "なし";
      } else {
        selected_members = selected_members.slice(0, -2);
      }
      return selected_members;
    },
    selected_members_by_work: function() {
      return this.member_info_list.filter(member_info => {
        return member_info.assigned_work_id === this.work.work_id;
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
