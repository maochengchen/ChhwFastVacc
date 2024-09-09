<template>
  <card class="card" >
    <div class="d-flex " style="justify-content: space-between;">
      <div class="mr-1">
        <b-button @click="show = true" variant="danger">異常流程</b-button>
      </div>
      <div class="mr-1">
        <b-button @click="show = true" variant="success">正常流程</b-button>
      </div>
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
