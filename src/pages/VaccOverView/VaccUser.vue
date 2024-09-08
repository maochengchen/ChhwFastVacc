<template>
  <card class="card" title="患者基本資料">
    <div>
      <div class="row">
        <div class="col-md-12">
          <fg-input
            type="text"
            label="姓名"
            :readonly="true"
            v-model="user.patientName"
          >
          </fg-input>
        </div>
        <div class="col-md-8">
          <fg-input
            type="text"
            label="生日"
            :readonly="true"
            v-model="user.birthDate"
          >
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="text"
            label="年齡"
            :readonly="true"
            v-model="user.age"
          >
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            type="text"
            label="病歷號"
            :readonly="true"
            v-model="user.patientNo"
          >
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            type="text"
            label="身分證"
            :readonly="true"
            v-model="user.idNo"
          >
          </fg-input>
        </div>
        <div class="col-12">
          <fg-input
            type="text"
            label="疫苗批號"
            v-model="user.idNo"
          >
          </fg-input>
        </div>
        <div class="col-12">
          <fg-input
            type="text"
            label="身分別"
            v-model="user.idNo"
          >
          </fg-input>
        </div>
        
      </div>

      <b-row>
        <b-col>
          <b-button @click="show = true" variant="danger">異常流程</b-button>
        </b-col>
        <b-col>
          <b-button @click="show = true" variant="success">正常流程</b-button>
        </b-col>
      </b-row>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        patientNo: "",
        patientName: "",
        birthDate: "",
        idNo: "",
        age: "",
      },
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    },
  },
};
</script>
<style></style>
