<template lang="html">
  <div>
    <select
      v-model="selectedMember"
      v-on:change="setMemberNameToInputText(selectedMember)"
    >
      <option disabled value="">Please select one</option>
      <option
        v-for="(member, index) in allMembers"
        v-bind:key="member.id"
        v-bind:v-bind:member="member"
        >{{ member.name }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  props: {
    //workIndex: Number,
    allMembers: Array,
    memberName: String
  },
  data: function() {
    return {
      selectedMember: ""
    };
  },
  methods: {
    setMemberName: function() {
      this.memberName = this.selectedMember;
    },
    setMemberNameToInputText: function(selectedMember) {
      this.$emit("set", selectedMember);
    }
  }
};
</script>

<style lang="css" scoped></style>
