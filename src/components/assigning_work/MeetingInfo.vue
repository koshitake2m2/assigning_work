<template lang="html">
  <div>
    アシスト会議：第<input type="number" v-model="meeting_info.meeting_num" />回
    <br />
    場所：<select v-model="meeting_info.place">
      <option>アシスト室</option>
      <option>実習室</option>
      <option>第一ゼミ室</option>
    </select>
    <br />
    開始時間：<input type="text" v-model="meeting_info.start_time" /><br />
    終了時間：<input type="text" v-model="meeting_info.end_time" /><br />
    日付：<input type="text" v-model="meeting_info.date" /><br />
  </div>
</template>

<script>
export default {
  props: {
    meeting_info: Object
  }
};
</script>

<style lang="css" scoped></style>
