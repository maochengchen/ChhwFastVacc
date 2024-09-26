<template>
  <div class="row">
    <div class="col-12">
      <VaccSetting @updateVaccSet="handleVaccSetUpdate" ></VaccSetting>
    </div>
    <div class="row " style="margin: 0;">
      <div class="column"></div>
      <div class="col-lg-4 ">
        <div class="d-flex" style="flex-direction: column;"></div>
        <VaccUser @memo-updated="AppendMemo" @clear-memo="ClearMemo"> </VaccUser>
        <VaccExcute></VaccExcute>
      </div>
      <div class="col-lg-8 ">
        <VaccProcMsg :procMemo="procMemo" @memo-updated="handleMemoUpdate"> </VaccProcMsg>
      </div>
    </div>
    <!-- <button @click="changeMemo">更改系統訊息</button>
    <p>Updated Memo: {{ procMemo }}</p> -->
  </div>

</template>

<script>
import VaccList from "./VaccOverView/VaccList.vue";
import VaccSetting from "./VaccOverView/VaccSetting.vue";
import VaccUser from "./VaccOverView/VaccUser.vue";
import VaccProcMsg from "./VaccOverView/VaccProcMsg.vue";
import VaccExcute from "./VaccOverView/VaccExcute.vue";
export default {
  components: {
    VaccList,
    VaccSetting,
    VaccUser,
    VaccProcMsg,
    VaccExcute
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
    handleVaccSetUpdate(val) {
      console.log('handleVaccSetUpdate');
      this.AppendMemo('更新疫苗代碼資訊!');
    },
    AppendMemo(message) {
      this.procMemo += `\n${new Date().toLocaleTimeString()} ${message}`;
    },
    ClearMemo() {
      this.procMemo = '';
    }

  }
};
</script>
