<template>
  <card class="card">
    <b-row style="align-items: center">
      <b-col style="font-size: 1rem">{{ vaccmsg }}</b-col>
      <b-col style="text-align: right">
        <b-button @click="show = true" variant="primary">設定疫苗資訊</b-button>
      </b-col>
    </b-row>
    <b-modal
      v-model="show"
      centered
      scrollable
      title="疫苗設定"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
    >
      <b-container fluid>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">處置代碼</b-col>
          <b-col>
            <b-form-input
              v-model="vaccset.code"
              @focus="setOriData"
              @keyup.enter="handleVaccCodeChange"
              @blur="handleVaccCodeChange"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">ICD10主診斷</b-col>
          <b-col>
            <b-form-input v-model="vaccset.icdCode"
            @focus="setOriData"
              @keyup.enter="handleIcdChange"
              @blur="handleIcdChange"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">次劑量</b-col>
          <b-col>
            <b-form-input type="number" v-model="vaccset.qty"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">日數</b-col>
          <b-col>
            <b-form-input type="number" v-model="vaccset.day"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">總量</b-col>
          <b-col>
            <b-form-input type="number" v-model="vaccset.tqty"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">科別</b-col>
          <b-col>
            <b-form-input v-model="vaccset.divisionStr" readonly></b-form-input>
          </b-col>
          <b-col>
            <DivisionPickBoard
              v-model="isDivisionModalShow"
              @divisionData="handleDivisionData"
            ></DivisionPickBoard>
          </b-col>
        </b-row>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">身分</b-col>
          <b-col>
            <b-form-select
              v-model="vaccset.ptType"
              :options="ptTypes"
            ></b-form-select>
          </b-col>
        </b-row>
        <b-row class="mb-1 align-items-center">
          <b-col cols="3">醫師</b-col>
          <b-col>
            <b-form-input v-model="vaccset.doctor"></b-form-input>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="handleSave"
          >
            存檔
          </b-button>
        </div>
      </template>
    </b-modal>
  </card>
</template>

<script>
import DivisionPickBoard from "../Board/DivisionPickBoard.vue";
import { CheckVacc,GetICD } from "@/api";
export default {
  components: {
    DivisionPickBoard,
  },
  data() {
    return {
      isDivisionModalShow: false,
      selectedData: null,
      vaccmsg: "ABC123,A000,次劑量:1,天數:1,總量:1,科別:02,身分:健保,醫師:S029",
      oridata: "",
      vaccset: {
        code: "",
        icdCode: "",
        qty: 1,
        day: 1,
        tqty: 1,
        division: "",
        divisionStr:"",
        ptType: "41",
        doctor: "",
      },
      show: false,
      ptTypes: [
        { value: "41", text: "健保" },
        { value: "11", text: "自費" },
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
      this.vaccset.division=data.code;
      this.vaccset.divisionStr=data.desc;
      
      console.log("divisiondata", data.code);
    },
    async handleVaccCodeChange(e) {
      if (!e.target.value) return;
      if (e.target.value == this.oridata) return;
      var response = await CheckVacc(this.vaccset.code);
      if (!response.data.success) {
        alert(response.data.message);
        this.vaccset.code='';
      }
    },
    async handleIcdChange(e) {
      if (!e.target.value) return;
      if (e.target.value == this.oridata) return;
      var response = await GetICD(this.vaccset.icdCode);
      if (!response.data.success) {
        alert(response.data.message);
        this.vaccset.icdCode='';
      }
    },
    setOriData(e) {
      this.oridata = e.target.value;
    },
    handleSave(){
      this.vaccmsg =`代碼:${this.vaccset.code},
      診斷碼:${this.vaccset.icdCode},
      次劑量:${this.vaccset.qty},
      天數:${this.vaccset.day},
      總量:${this.vaccset.tqty},
      身分:${this.ptTypes.filter(x=>x.value==this.vaccset.ptType)[0].text},
      醫師:${this.vaccset.doctor}`;
      this.show = false;
    }
  },
  watch: {
    "vaccset.division"(newVal, oldVal) {
      console.log("vaccset.division has changed from", oldVal, "to", newVal);
      // 在這裡添加你希望執行的操作
    },
  },
};
</script>
