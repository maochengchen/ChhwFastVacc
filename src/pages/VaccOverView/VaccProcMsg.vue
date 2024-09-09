<template>
  <card class="card" title="系統訊息">
    <div>
      <textarea
                rows="18"
                class="form-control border-input"
                v-model="memo"
                readonly
              >
              </textarea>

    
    </div>
  </card>
</template>
<script>
export default {
  props: {
    procMemo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      memo: this.procMemo,
    };
  },
  methods: {
    updateMemo() {
      this.$emit('memo-updated', this.memo);
    },
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    },
  },
  watch: {
    procMemo(newVal) {
      this.memo = newVal;
    }
  }
};
</script>
<style></style>
