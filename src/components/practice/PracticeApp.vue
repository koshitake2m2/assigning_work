<template>
  <div id="wwww">
    <div>PracticeApp</div>
    <div id="work-list">
      <input v-model="message" />
      <p>Message: {{ message }}</p>
      <work-list></work-list>
    </div>
  </div>
</template>

<script>
import WorkList from "@/components/practice/WorkList";

export default {
  data: function() {
    return {
      message: ""
    };
  },
  components: {
    WorkList
  }
};
</script>

<style lang="css" scoped></style>
