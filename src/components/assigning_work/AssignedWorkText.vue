<template lang="html">
  <div>
    <form v-on:submit.prevent="copyAssignedWorkText">
      <button v-on:click="copyAssignedWorkText">Copy</button>
      <textarea
        ref="textarea"
        id="assigning_work_text"
        cols="80"
        rows="30"
        readonly
      >
出席者：
{{ attending_members }}

当番：
{{ members_by_assigned_work }}</textarea
      >
    </form>
  </div>
</template>

<script>
export default {
  props: {
    member_info_list: Array,
    all_works: Array
  },
  data: function() {
    return {};
  },
  computed: {
    attending_members: function() {
      let attending_members = "";
      const attending_member_info_list = this.member_info_list.filter(
        member_info => {
          switch (member_info.attendance) {
            case "o":
            case "e":
              return true;
            default:
              return false;
          }
        }
      );
      for (const member_info of attending_member_info_list) {
        attending_members += member_info.name + ", ";
      }
      if (attending_members === "") {
        attending_members = "出席者なし";
      } else {
        attending_members = attending_members.slice(0, -2);
      }
      return attending_members;
    },
    members_by_assigned_work: function() {
      let members_by_assigned_work = "";
      for (const work of this.all_works) {
        let members = work.name + "：";
        const member_info_list_by_work = this.member_info_list.filter(
          member_info => {
            return member_info.assigned_work_id === work.work_id;
          }
        );
        if (member_info_list_by_work.length == 0) {
          continue;
        }
        for (const member_info of member_info_list_by_work) {
          members += member_info.name + ", ";
        }
        members = members.slice(0, -2) + `\n`;
        members_by_assigned_work += members;
      }
      return members_by_assigned_work;
    }
  },
  methods: {
    copyAssignedWorkText: function() {
      // 出席者、当番をクリップボードに貼り付ける
      let target = this.$refs.textarea;
      // 要素に含まれる文字列全てを選択状態にする
      target.selectionStart = 0;
      target.selectionEnd = target.value.length;
      // コピーしたい文字列がある要素をフォーカス
      target.focus();
      // コピーを実行する。失敗した場合はログにメッセージを表示。
      if (!document.execCommand("copy")) {
        console.log("コピーに失敗しました。");
      }
      // フォーカスを外す
      target.blur();
    }
  }
};
</script>

<style lang="css" scoped></style>
