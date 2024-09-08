<template>
  <div>
    <b-button @click="show = true" variant="primary">選擇科別</b-button>
    <PickedBoard
      v-model="show"
      :title="modalTitle"
      :fields="fields"
      :data="dataSource"
      @data-selected="handleDataSelected"
      @update:isVisible="handleShow"
      size="lg"
    ></PickedBoard>
  </div>
</template>
<script>
import PickedBoard from "../../components/Board/PickedBoard.vue";
export default {
  components: {
    PickedBoard,
  },

  data() {
    return {
      show: false,
      fields: [
        { key: "code", label: "代碼" },
        { key: "desc", label: "名稱" },
      ],
      dataSource: [
        { code: "AA", desc: "胸腔內科" },
        { code: "AB", desc: "骨科" },
      ],
      modalTitle: "選擇科別",
    };
  },
  methods: {
    handleDataSelected(item) {
      this.$emit("divisionData", item);
    },
    handleShow(show){
      this.show=show;
    }
  },
};
</script>
