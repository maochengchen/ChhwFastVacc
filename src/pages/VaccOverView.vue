<template>
  <div class="row">
    <div class="col-12 mb-3">
      <VaccSetting></VaccSetting>
    </div>
    <div class="row " style="margin: 0;">
      <div class="col-xl-4 col-lg-5 col-md-4">
      <VaccUser> </VaccUser>
    </div>
    <div class="col-xl-8 col-lg-5 col-md-8">
      <VaccProcMsg :procMemo="procMemo" @memo-updated="handleMemoUpdate"> </VaccProcMsg>
    </div>
    </div>
    <button @click="changeMemo">更改系統訊息</button>
    <p>Updated Memo: {{ procMemo }}</p>
  </div>
  
</template>

<script>
import VaccList from "./VaccOverView/VaccList.vue"; 
import VaccSetting from "./VaccOverView/VaccSetting.vue";
import VaccUser from "./VaccOverView/VaccUser.vue";
import VaccProcMsg from "./VaccOverView/VaccProcMsg.vue"; 
export default {
  components: {
    VaccList,
    VaccSetting,
    VaccUser,
    VaccProcMsg
  },
  data() {
    return {
      procMemo: ""
    };
  },
  methods: {
    handleMemoUpdate(newMemo) {
      console.log(newMemo);
      this.procMemo = newMemo;
    },
    changeMemo() {
      this.procMemo += "\n"+ new Date().toLocaleTimeString() + " 新的一行訊息 " ;
    }
  }
};
</script>
