<template lang="html">
  <div>
    <table class="table is-hoverable">
      <tbody>
        <tr>
          <td>第何回目</td>

          <td>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="number"
                  v-model="meeting_info.meeting_num"
                  placeholder="e.g. 8"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>場所</td>
          <td>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="meeting_info.place">
                    <option value="" disabled>どこ？</option>
                    <option>実習室</option>
                    <option>第一ゼミ室</option>
                    <option>アシスト室</option>
                  </select>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>日付</td>
          <td>{{ today_date }}</td>
        </tr>
        <tr>
          <td>開始時間</td>
          <td>{{ meeting_info.start_time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    meeting_info: Object
  },
  data: function() {
    return {
      today_date: ""
    };
  },
  created() {
    this.today_date = this.meeting_info.date
      .split("_")[0]
      .split(":")
      .join("/");
  }
};
</script>

<style lang="css" scoped></style>
