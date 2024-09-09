<template>
  <div>
    <b-button @click="OpenModal" variant="primary">選擇身分別</b-button>
    <PickedBoard v-model="show" :title="modalTitle" :fields="fields" :data="dataSource"
      @data-selected="handleDataSelected" @update:isVisible="handleShow" size="lg"></PickedBoard>
  </div>
</template>
<script>
import PickedBoard from "../../components/Board/PickedBoard.vue";
import { GetIdentifyType } from "@/api";
export default {
  components: {
    PickedBoard,
  },
  data() {
    return {
      show: false,
      fields: [
      { key: "tpye", label: "類型" },
        { key: "code", label: "身分別" },
        { key: "desc", label: "名稱" },
      ],
      dataSource: [],
      modalTitle: "選擇身分別",
    };
  },
  methods: {
    handleDataSelected(item) {
      this.$emit("identifyTypeSelected", item);
    },
    handleShow(show) {
      this.show = show;
    },
    async OpenModal() {
      
      var response = await GetIdentifyType();
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      
      var divdata = response.data.result;
      this.dataSource=  divdata.map(x=>{
        return {tpye: x.vacctype, code:x.code,desc:x.name};
      });
      console.log(this.dataSource);
      this.show=true;
    }
  },
};
</script>
