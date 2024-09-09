<template>
    <b-alert
    
      v-if="show"
      :variant="variant"
      dismissible
      @dismissed="show = false"
    >
      {{ message }}
    </b-alert>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      variant: {
        type: String,
        default: 'danger'
      }
    }
  }
  </script>