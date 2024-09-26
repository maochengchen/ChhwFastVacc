// LocalStorageManager.js

export default {
  // 存入localStorage
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // 從localStorage取得資料
  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  // 刪除某一項
  removeItem(key) {
    localStorage.removeItem(key);
  },

  // 清空所有localStorage資料
  clear() {
    localStorage.clear();
  },

  // 檢查某一項是否存在
  hasItem(key) {
    return localStorage.getItem(key) !== null;
  },

  // 取得疫苗資訊
  GetCodeInfo() {
    return JSON.parse(this.getItem("CodeInfo"));
  },
  SetCodeInfo(codeinfo) {
    this.setItem("CodeInfo", JSON.stringify(codeinfo));
  },

  SetIcCardData(icdata) {
    this.setItem("icdata", JSON.stringify(icdata));
  },
  GetIcCardData() {
    return JSON.parse(this.getItem("icdata"));
  },

  SetHospNo(hospNo){
    this.setItem("hospNo", hospNo);
  },
  GetHospNo() {
    return this.getItem("hospNo");
  },

  SetToken(token){
    this.setItem("token", token);
  },
  GetToken() {
    return this.getItem("token");
  },
};
