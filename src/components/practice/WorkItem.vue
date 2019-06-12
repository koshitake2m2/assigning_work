<template>
  <li>
    {{ work.id }}: {{ work.name }}
    <!-- workの削除 -->
    <button v-on:click="removeWorkItem">Remove</button>
    <!-- 当番候補のメンバー追加 -->
    <form v-on:submit.prevent="addNewMember(memberName)">
      <table>
        <tr>
          <label>Add member</label>
          <td><input v-model="memberName" placeholder="E.g. member Z" /></td>
          <td>
            <select-add-member
              v-bind:allMembers="allMembers"
              v-bind:memberName="memberName"
              v-on:set="setMemberName"
            ></select-add-member>
          </td>
          <td><button>Add</button></td>
        </tr>
      </table>
    </form>
    <slot></slot></li
></template>

<script>
import SelectAddMember from "@/components/practice/SelectAddMember";
export default {
  components: {
    SelectAddMember
  },
  props: {
    work: Object,
    allMembers: Array
  },
  data: function() {
    return {
      m_members: this.work.members, // 当番候補のメンバー
      memberName: ""
    };
  },
  methods: {
    addNewMember: function(memberName) {
      this.work.members.push({
        id: 10,
        name: memberName
      });
      this.memberName = "";
    },
    setMemberName: function(memberName) {
      this.memberName = memberName;
    },
    removeWorkItem: function() {
      this.$emit("remove");
    }
  }
};
</script>
