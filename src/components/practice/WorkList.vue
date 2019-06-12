<template lang="html">
  <div>
    <p>work-list</p>
    <form v-on:submit.prevent="addNewWork">
      <label for="new-work">Add work</label>
      <input v-model="newWorkText" id="new-work" placeholder="E.g. 廊下" />
      <button>Add</button>
    </form>
    <div>newWorkText: {{ newWorkText }}</div>
    <ul>
      <li
        is="work-item"
        v-for="(work, index) in works"
        v-bind:key="work.id"
        v-bind:work="work"
        v-bind:all-members="optionMembers"
        v-on:remove="works.splice(index, 1)"
      >
        <!-- リスト消去 -->
        <div v-if="work.members.length > 0">
          <ul>
            <li
              is="option-members"
              v-for="(member, m_index) in work.members"
              v-bind:key="member.id"
              v-bind:member="member"
              v-on:remove="work.members.splice(m_index, 1)"
            ></li>
          </ul>
        </div>
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import WorkItem from "@/components/practice/WorkItem";
import OptionMembers from "@/components/practice/OptionMembers";
export default {
  components: {
    WorkItem,
    OptionMembers
  },
  data: function() {
    return {
      newWorkText: "",
      works: [
        {
          id: 1,
          name: "Shoki",
          members: [
            {
              id: 1,
              name: "member A"
            }
          ]
        },
        {
          id: 2,
          name: "Memo",
          members: []
        },
        {
          id: 3,
          name: "Printer",
          members: []
        }
      ],
      nextWorkId: 4,
      optionMembers: [
        {
          id: 1,
          name: "member A"
        },
        {
          id: 2,
          name: "member B"
        },
        {
          id: 3,
          name: "member C"
        },
        {
          id: 4,
          name: "member D"
        }
      ]
    };
  },
  methods: {
    addNewWork: function() {
      this.works.push({
        id: this.nextWorkId++,
        name: this.newWorkText,
        members: []
      });
      this.newWorkText = "";
    },
    addMemberToWork: function(workIndex, selectedMember) {
      //alert('hello' + member)
      //this.works[w_index].members.push(member)
      this.work[workIndex].members.push({
        id: 10,
        name: selectedMember
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
