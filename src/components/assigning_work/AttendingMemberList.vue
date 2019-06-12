<template lang="html">
  <div>
    <div>出席者：{{ attending_members }}</div>
  </div>
</template>

<script>
export default {
  props: {
    memberList: Array
  },
  data: function() {
    return {};
  },
  computed: {
    attending_members: function() {
      let attending_members = "";
      for (const member_info of this.memberList) {
        attending_members += member_info.name + ", ";
      }
      if (attending_members === "") {
        attending_members = "出席者なし";
      } else {
        attending_members.slice(0, -2);
      }
      return attending_members;
    }
  }
};
</script>

<style lang="css" scoped></style>
