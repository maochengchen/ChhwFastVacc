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
      <div
        class="d-flex"
        style="justify-content: space-between; flex-wrap: wrap"
      >
        <div class="mr-1">
          <b-button @click="FailureExcute" variant="danger">異常流程</b-button>
        </div>
        <div class="mr-1">
          <b-button @click="NormalExcute" variant="success">正常流程</b-button>
        </div>
        <!-- <div class="mr-1">
          <b-button @click="GetICCard" variant="success">取卡</b-button>
        </div>
        <div class="mr-1">
          <b-button @click="ClinicProc" variant="success">寫入</b-button>
        </div> -->
      </div>
    </div>
  </card>
</template>
<script>
import IdentifyTypePickBoard from "@/pages/Board/IdentifyTypePickBoard.vue";
import { GetPatientInfo, RegProc, SaveClinic } from "@/api";
import WebSocketClient from "@/webSocket";
import LocalStorageManager from "@/LocalStorageManger";
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
        cardseq: "",
        encounterId: "",
        icCardInfo: null,
        hospNo:""
      },
    };
  },
  methods: {
    clearUser() {
      this.user.patientNo = "";
      this.user.patientName = "";
      this.user.birthDate = "";
      this.user.idNo = "";
      this.user.age = "";
      this.user.identifyType = "";
      this.user.identifyTypeStr = "";
      this.user.cardseq = "";
      this.user.encounterId = "";
      this.user.icCardInfo = null;
      
    },

    handelIdentifySelect(item) {
      this.user.identifyType = item.code;
      this.user.identifyTypeStr = item.desc;
    },

    async NormalExcute() {
      try {
        this.clearMemo();
        await this.getIcBasic();
        await this.ReadPatientInfo();
        await this.RegProc();
        await this.GetICCard();
        await this.ClinicProc();
        this.clearUser();
      } catch (error) {
        this.updateMemo(error);
        alert(error);
      }
    },

    async FailureExcute() {
      try {
        this.clearMemo();
        await this.getIcBasic();
        await this.ReadPatientInfo();
        await this.RegProc();
        await this.GetIcErrorCard();
        await this.ClinicProc();
        this.clearUser();
      } catch (error) {
        this.updateMemo(error);
        alert(error);
      }
    },



    async getIcBasic() {
      if (!LocalStorageManager.GetCodeInfo())
        throw new Error("未設定疫苗資訊!");

      if (!this.user.identifyType) throw new Error("請先選擇身分別!");

      this.updateMemo("讀取健保卡....");
      var obj = JSON.stringify({
        cmd: "GetBasicData",
        jsonstring: "",
      });

      var data = await this.websocketClient.sendMessage(obj);

      var response = JSON.parse(data);
      if (!response.success) 
        throw new Error(response.message);
      

      this.updateMemo("讀取健保卡....OK");
      this.updateMemo('病人基本資訊:');
      this.updateMemo(`           姓名:    ${response.retdata.PtName}`);
      this.updateMemo(`           身分證:  ${response.retdata.IdNo}`);
      this.updateMemo(`           生日:    ${response.retdata.BirthDate}`);
      this.user.idNo = response.retdata.IdNo;
      this.user.patientName = response.retdata.PtName;
      this.user.birthDate = response.retdata.BirthDate;
    },

    async ReadPatientInfo() {
      this.updateMemo("讀取病歷資料..");
      var response = await GetPatientInfo(this.user.idNo);
      if (!response.data.success) throw new Error(response.data.message);

      console.log(response.data);
      this.user.patientNo = response.data.result.patientNo;
      this.user.age = response.data.result.age;
      this.updateMemo("讀取病歷資料..OK");
    },

    async RegProc() {
      this.updateMemo("開始掛號..");
      var codeinfo = LocalStorageManager.GetCodeInfo();
      codeinfo.patientNo = this.user.patientNo;
      console.log(codeinfo);
      var response = await RegProc(codeinfo);
      if (!response.data.success) throw new Error(response.data.message);

      this.user.encounterId = response.data.result.encounterId;
      console.log(response.data.result.encounterId);
      this.updateMemo("開始掛號..OK");
    },

    async ClinicProc() {
      this.updateMemo("產生批價資料..");
      var codeinfo = LocalStorageManager.GetCodeInfo();
      var obj = {
        encounterId: this.user.encounterId,
        doctorNo: codeinfo.doctor,
        vaccPtType: this.user.identifyType,
        orders: [
          {
            code: codeinfo.code,
            batchNo: codeinfo.batchNo,
            batchSeq: codeinfo.batchSeq,
            vaccCode: codeinfo.vaccKind,
          },
        ],
        icData: this.user.icCardInfo,
        icdList: [
          {
            code: codeinfo.icdCode,
            category: "CM",
          },
        ],
      };

      var response = await SaveClinic(obj);
      if (!response.data.success){
        this.clearUser();
        throw new Error(response.data.message);
      } 
      console.log(response);
      this.updateMemo("產生批價資料..OK");
      this.updateMemo("已可取回健保卡");

      // this.updateMemo("開始寫卡..");
      // var cmd = JSON.stringify({
      //   cmd: "WriteCardProc",
      //   jsonstring: JSON.stringify(response.data.result.wIcData.wicn),
      // });
      // var data = await this.websocketClient.sendMessage(cmd);
      // var response = JSON.parse(data);
      // if (!response.success) throw new Error(`寫卡失敗,${response.message}`);

      // this.updateMemo("寫卡完成..已可取回健保卡");
      // console.log(response);
    },

    async GetICCard() {
      this.updateMemo("開始取卡..");
      var cardinfo = {
        treat_item: "AC",
        baby_treat: "0",
        service_code:'01',
        id_no: this.user.idNo,
        state: 0,
      };
      var obj = JSON.stringify({
        cmd: "GetCardSeqEx",
        jsonstring: JSON.stringify(cardinfo),
      });

      var response = await this.websocketClient.sendMessage(obj);
      var retdata = JSON.parse(response);
      if (!retdata.success) {
        this.updateMemo(`取卡失敗 ,${retdata.message}`);
        return;
      }

      var icdata = retdata.retdata;
      if (icdata.err != 0) {
        this.updateMemo(`取卡失敗 ,${icdata.err}:${icdata.err_msg}`);
        return;
      }

      this.updateMemo(`取卡完成,卡號:${icdata.cardseq_data.card_seq}`);
      this.user.cardseq = icdata.cardseq_data.card_seq;
      this.user.icCardInfo = icdata;
      console.log(icdata);
    },

    async GetIcErrorCard() {
      this.updateMemo("異常取卡..");
      var cardinfo = {
        treat_item: "01",
        except_code:"Z1",
        hosp_no:LocalStorageManager.GetHospNo(),
        ic_error:"A000",
        id_no:this.user.idNo,
        baby_treat: "0",
        state: 0,
      };
      var obj = JSON.stringify({
        cmd: "GetICErrorCardEx",
        jsonstring: JSON.stringify(cardinfo),
      });
      console.log(obj);

      var response = await this.websocketClient.sendMessage(obj);
      var retdata = JSON.parse(response);
      if (!retdata.success) {
        this.updateMemo(`異常取卡失敗 ,${retdata.message}`);
        return;
      }

      var icdata = retdata.retdata;
      if (icdata.err != 0) {
        this.updateMemo(`異常取卡失敗 ,${icdata.err}:${icdata.err_msg}`);
        return;
      }

      this.updateMemo(`異常取卡完成,卡號:${icdata.cardseq_data.card_seq}`);
      this.user.cardseq = icdata.cardseq_data.card_seq;
      this.user.icCardInfo = icdata;
      console.log(icdata);
    },

    updateMemo(str) {
      this.$emit("memo-updated", str);
    },

    clearMemo() {
      this.$emit("clear-memo", this);
    },
  },

  mounted() {
    this.websocketClient = new WebSocketClient(
      "ws://127.0.0.1:10407/Broadcast",
    );
    this.websocketClient.connect(); // 建立連接
  },
};
</script>
<style></style>
