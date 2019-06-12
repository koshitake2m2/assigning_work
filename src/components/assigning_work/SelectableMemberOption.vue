<template lang="html">
  <option>{{ member_info.name }}: {{ past_work_count }}</option>
</template>

<script>
export default {
  props: {
    member_info: Object,
    work: Object
  },
  computed: {
    past_work_count: function() {
      const this_work_count = String(
        this.member_info.work_count_by_category[this.work.work_id]
      );
      const sum_work_count = String(this.member_info.work_count);
      return `(${this_work_count}/${sum_work_count})`;
    }
  }
};
</script>

<style lang="css" scoped></style>
