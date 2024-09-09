<template>
  <card class="card" title="患者基本資料">
    <div>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text" label="姓名" :disabled="true" v-model="user.patientName">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="text" label="病歷號" :disabled="true" v-model="user.patientNo">
          </fg-input>
        </div>
        <div class="col-md-8">
          <fg-input type="text" label="生日" :disabled="true" v-model="user.birthDate">
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input type="text" label="年齡" :disabled="true" v-model="user.age">
          </fg-input>
        </div>

        <div class="col-md-12">
          <fg-input type="text" label="身分證" :disabled="true" v-model="user.idNo">
          </fg-input>
        </div>
        <div class="col-12">
          <div class="d-flex" style="justify-content: space-between;align-items: center;">
            <label style="color: #9A9A9A;">身分別</label>
            <IdentifyTypePickBoard @identifyTypeSelected="handelIdentifySelect">123</IdentifyTypePickBoard>
          </div>
          <fg-input type="text" v-model="user.identifyTypeStr" readonly></fg-input> 
        
          

        </div>

      </div>


    </div>
  </card>
</template>
<script>
import IdentifyTypePickBoard from "../Board/IdentifyTypePickBoard.vue";
export default {
  components: {
    IdentifyTypePickBoard,
  },
  data() {
    return {
      user: {
        patientNo: "",
        patientName: "",
        birthDate: "",
        idNo: "",
        age: "",
        identifyType:"",
        identifyTypeStr:"",
      },
    };
  },
  methods: {
    handelIdentifySelect(item){
      this.user.identifyType=item.code;
      this.user.identifyTypeStr=item.desc;
    }

  },
};
</script>
<style></style>
