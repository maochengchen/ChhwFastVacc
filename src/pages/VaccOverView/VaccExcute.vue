<template>
  <card class="card" >
    
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
