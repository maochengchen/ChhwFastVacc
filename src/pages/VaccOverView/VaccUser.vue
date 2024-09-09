<template>
  <card class="card" title="患者基本資料" style="height: 500px">
    <div style="display: flex; height: 100%; flex-direction: column">
      <div class="row" style="flex: 1">
        <div class="col-md-6">
          <fg-input
            type="text"
            label="姓名"
            :disabled="true"
            v-model="user.patientName"
          >
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            type="text"
            label="病歷號"
            :disabled="true"
            v-model="user.patientNo"
          >
          </fg-input>
        </div>
        <div class="col-md-8">
          <fg-input
            type="text"
            label="生日"
            :disabled="true"
            v-model="user.birthDate"
          >
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="text"
            label="年齡"
            :disabled="true"
            v-model="user.age"
          >
          </fg-input>
        </div>

        <div class="col-md-12">
          <fg-input
            type="text"
            label="身分證"
            :disabled="true"
            v-model="user.idNo"
          >
          </fg-input>
        </div>
        <div class="col-12">
          <div
            class="d-flex"
            style="justify-content: space-between; align-items: center"
          >
            <label style="color: #9a9a9a">身分別</label>
            <IdentifyTypePickBoard @identifyTypeSelected="handelIdentifySelect"
              >123</IdentifyTypePickBoard
            >
          </div>
          <fg-input
            type="text"
            v-model="user.identifyTypeStr"
            readonly
          ></fg-input>
        </div>
      </div>
      <div class="d-flex" style="justify-content: space-between">
        <div class="mr-1">
          <b-button @click="show = true" variant="danger">異常流程</b-button>
        </div>
        <div class="mr-1">
          <b-button @click="getIcBasic" variant="success">正常流程</b-button>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import IdentifyTypePickBoard from "../Board/IdentifyTypePickBoard.vue";
import { GetPatientInfo } from "@/api";
import WebSocketClient from "../../webSocket";
export default {
  components: {
    IdentifyTypePickBoard,
  },
  data() {
    return {
      websocketClient: null,
      user: {
        patientNo: "",
        patientName: "",
        birthDate: "",
        idNo: "",
        age: "",
        identifyType: "",
        identifyTypeStr: "",
      },
    };
  },
  methods: {
    handelIdentifySelect(item) {
      this.user.identifyType = item.code;
      this.user.identifyTypeStr = item.desc;
    },
    getIcBasic() {
      var obj = JSON.stringify({
        cmd: "GetBasicData",
        jsonstring: "",
      });
      console.log(obj);
      this.websocketClient.sendMessage(obj, this.onMessageReceived);
    },
    sendMessage() {
      this.websocketClient.sendMessage(this.inputMessage); // 發送消息
      this.inputMessage = ""; // 清空輸入框
    },
    async onMessageReceived(data) {
      var obj = JSON.parse(data);
      if (!obj.success) 
      {
        alert(obj.message);
        return;
      }

      console.log(obj);
      this.user.idNo = obj.retdata.IdNo;
      this.user.patientName = obj.retdata.PtName;
      this.user.birthDate = obj.retdata.BirthDate;

      var response = await GetPatientInfo(this.user.idNo);
      console.log(response);
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      this.user.patientNo = response.data.result.patientNo;
    },
  },
  mounted() {
    // 初始化 WebSocket 客戶端並傳遞回調函數
    this.websocketClient = new WebSocketClient(
      "ws://127.0.0.1:10407/Broadcast",
    );
    this.websocketClient.connect(); // 建立連接
  },
};
</script>
<style></style>
