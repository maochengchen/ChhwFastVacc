<template>
  <div>
    <!-- 模态框 -->
    <b-modal scrollable v-model="isVisible" :title="title" @hide="resetModal" :size="size">
      <!-- 输入框 -->
      <b-form-input v-model="keyword" @input="filterData" placeholder="關鍵字查詢" style="width: 120px" />

      <!-- 表格 -->
      <b-table hover :items="filteredData" :fields="fields" @row-dblclicked="selectData"></b-table>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    title: "",
    value: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: "100px",
    },
    size: {
      default: "lg",
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {
      keyword: "",
      filteredData: this.data,
    };
  },
  methods: {
    filterData() {
      this.filteredData = this.data.filter((item) => {
        var code = item.code.toLowerCase().includes(this.keyword.toLowerCase())
        var desc = item.desc.toLowerCase().includes(this.keyword.toLowerCase())
        return code || desc;
      });
      console.log(this.filteredData);
    },
    selectData(item) {
      this.$emit("data-selected", item);
      this.$emit("update:isVisible", false);
    },
    resetModal() {
      this.keyword = "";
      this.filteredData = this.data;
    },
  },
  watch: {
    data(newVal) {
      this.data = newVal;
      this.resetModal();
    }
  }
};
</script>
