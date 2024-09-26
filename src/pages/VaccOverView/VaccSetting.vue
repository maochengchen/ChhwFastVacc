<template>
  <card class="card">
    <b-row style="align-items: center">
      <b-col class="d-flex" style="align-items: center;">
        <div style="align-items: center;flex: 1;">
          <b-row>
            <b-col cols="12">
              {{settingMsg.codeinfo}}
            </b-col>
            <b-col cols="12">
              {{settingMsg.vaccinfo}}
            </b-col>
          </b-row>
        </div>
        <div>
          <b-button @click="show = true" variant="primary">設定疫苗資訊</b-button>
        </div>

      </b-col>
    </b-row>

    <b-modal v-model="show" centered scrollable title="疫苗設定" :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant" @show="loadVaccSet">


      <b-row class="mb-1 align-items-center">
        <b-col cols="3">處置代碼</b-col>
        <b-col>
          <b-form-input v-model="vaccset.code" @focus="setOriData" @keyup.enter="handleVaccCodeChange"
            @blur="handleVaccCodeChange" required></b-form-input>
          <b-form-invalid-feedback>處置代碼為必填</b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">批號</b-col>
        <b-col cols="5">
          <b-form-input v-model="vaccset.batchNo" ></b-form-input>
        </b-col>
        <b-col cols="1">劑次</b-col>
        <b-col cols="">
          <b-form-input v-model="vaccset.batchSeq"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">ICD10主診斷</b-col>
        <b-col>
          <b-form-input v-model="vaccset.icdCode" @focus="setOriData" @keyup.enter="handleIcdChange"
            @blur="handleIcdChange"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">次劑量</b-col>
        <b-col cols="3">
          <b-form-input type="number" v-model="vaccset.qty"></b-form-input>
        </b-col>
        <b-col cols="">日數</b-col>
        <b-col cols="4">
          <b-form-input type="number" v-model="vaccset.day"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">總量</b-col>
        <b-col cols="3">
          <b-form-input type="number" v-model="vaccset.tqty"></b-form-input>
        </b-col>
        <b-col cols="">時段</b-col>
        <b-col cols="4">
          <b-form-select v-model="vaccset.apn" :options="apnSet"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">診間</b-col>
        <b-col>
          <b-form-input  v-model="vaccset.clinic" 
          @focus="setOriData" @keyup.enter="handleClinicChange"
          @blur="handleClinicChange"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">科別</b-col>
        <b-col>
          <b-form-input v-model="vaccset.divisionStr" readonly></b-form-input>
        </b-col>
        <b-col>
          <DivisionPickBoard v-model="isDivisionModalShow" @divisionData="handleDivisionData"></DivisionPickBoard>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">身分</b-col>
        <b-col>
          <b-form-select v-model="vaccset.ptType" :options="ptTypes"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mb-1 align-items-center">
        <b-col cols="3">醫師</b-col>
        <b-col>
          <b-form-input v-model="vaccset.doctor" @focus="setOriData" @keyup.enter="handleDoctorChange"
            @blur="handleDoctorChange"></b-form-input>
        </b-col>
      </b-row>


      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" type="submit" @click="handleSave">
            存檔
          </b-button>
        </div>
      </template>
    </b-modal>



  </card>
</template>

<script>
import DivisionPickBoard from "@/pages/Board/DivisionPickBoard.vue";
import LocalStorageManager from '@/LocalStorageManger';
import { CheckVacc, GetICD, GetDoctor,GetClinic } from "@/api";
export default {
  prop:{
    vaccMsg:"未設定疫苗資訊"
  },
  components: {
    DivisionPickBoard,
  },
  created() {
    // 組件初始化後立即執行某個方法
    this.settingMsg.codeinfo="未設定疫苗資訊";
    this.loadVaccSet();
    
  },
  data() {
    return {
      isDivisionModalShow: false,
      oridata: "",
      vaccset: {
        code: "",
        icdCode: "",
        qty: 1,
        day: 1,
        tqty: 1,
        division: "",
        divisionStr: "",
        ptType: "41",
        doctor: "",
        apn:1,
        batchNo: "",
        batchSeq:"",
        clinic:"",
        vaccKind:"",
      },
      show: false,
      settingMsg: {
        codeinfo: "",
        vaccinfo: ""
      },
      ptTypes: [
        { value: "41", text: "健保" },
        { value: "11", text: "自費" },
      ],
      apnSet:[
        {value:1,text:"上午"},
        {value:2,text:"下午"},
        {value:3,text:"晚上"}
      ],
      headerBgVariant: "info",
      headerTextVariant: "light",
    };
  },
  methods: {
    showDivisionBoard() {
      this.isDivisionModalShow = true;
    },
    handleDivisionData(data) {
      this.vaccset.division = data.code;
      this.vaccset.divisionStr = data.desc;
    },
    async handleVaccCodeChange(e) {
      if (!e.target.value) return;
      if (e.target.value == this.oridata) return;
      var response = await CheckVacc(this.vaccset.code);
      if (!response.data.success) {
        alert(response.data.message);
        this.vaccset.code = '';
      }
      this.vaccset.vaccKind = response.data.result.vaccType;
    },
    async handleClinicChange(e) {
      if (!e.target.value) return;
      if (e.target.value == this.oridata) return;
      var response = await GetClinic(this.vaccset.clinic);
      if (!response.data.success) {
        alert(response.data.message);
        this.vaccset.clinic = '';
      }
    },
    async handleIcdChange(e) {
      if (!e.target.value) return;
      if (e.target.value == this.oridata) return;
      var response = await GetICD(this.vaccset.icdCode);
      if (!response.data.success) {
        alert(response.data.message);
        this.vaccset.icdCode = '';
      }
    },
    async handleDoctorChange(e) {
      if (!e.target.value) return;
      if (e.target.value == this.oridata) return;
      var response = await GetDoctor(this.vaccset.doctor);
      if (!response.data.success) {
        alert(response.data.message);
        this.vaccset.doctor = '';
      }
    },
    setOriData(e) {
      this.oridata = e.target.value;
    },
    loadVaccSet() {
      const storedVaccSet = LocalStorageManager.GetCodeInfo();
      if (!storedVaccSet) {
        return;
      }

      this.vaccset = storedVaccSet;
      this.SetVaccMsg();

    },
    validateVaccSet() {
      const { code, icdCode, qty, day, tqty, division, doctor,batchNo,batchSeq } = this.vaccset;

      // 檢查是否有任何欄位為空或不正確
      if (!code || !batchNo || !batchSeq || !icdCode || qty <= 0 || day <= 0 || tqty <= 0 || !division || !doctor) {
        return false;
      }

      return true;
    },
    SetVaccMsg() {
      this.settingMsg.codeinfo = `代碼:${this.vaccset.code},
      診斷碼:${this.vaccset.icdCode},
      次劑量:${this.vaccset.qty},
      天數:${this.vaccset.day},
      總量:${this.vaccset.tqty},
      身分:${this.ptTypes.filter(x => x.value == this.vaccset.ptType)[0].text},
      醫師:${this.vaccset.doctor}`;

      this.settingMsg.vaccinfo=`批號:${this.vaccset.batchNo},劑次:${this.vaccset.batchSeq}`;
    },
    handleSave() {
      console.log('handlesave');
      if (!this.validateVaccSet()) {
        alert("所有欄位都必須填寫");
        return;
      }
      this.SetVaccMsg();
      LocalStorageManager.SetCodeInfo(this.vaccset);
      this.show = false;

      this.$emit('updateVaccSet', true);
    },
  },
  watch: {
    "vaccset.division"(newVal, oldVal) {
      console.log("vaccset.division has changed from", oldVal, "to", newVal);
      // 在這裡添加你希望執行的操作
    },
  },
};
</script>
