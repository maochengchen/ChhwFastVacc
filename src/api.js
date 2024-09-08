import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",  
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    // 定義範圍，例如：所有狀態碼 200 - 499 都視為成功
    return status >= 200 && status < 500;
  }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  }, error => {
    return Promise.reject(error);
});

export const loginApi = (account, pwd) => {
  return apiClient.post("api/Auth/UserLogin",{
    account: account,
    password: pwd,
  });
};

export const CheckVacc = (vacccode) => {
  return apiClient.post(`/api/Vacc/GetVaccInfo?code=${vacccode}`);
};

export const GetDiviosn = (divno) => {
  return apiClient.post(`/api/Vacc/GetDiv?divno=${divno}`);
};

export const GetDoctor = (doctor) => {
  return apiClient.post(`/api/Vacc/GetDoctor?doctor=${doctor}`);
};

export const GetICD = (icdcode) => {
  return apiClient.post(`/api/Vacc/GetICD?icd=${icdcode}`);
};


export const GetToken = () => {
  return apiClient.post("/Auth/RegMachineLogin", {
    account: "ChhwApi",
    password: "Chhw$048298686@Api",
  });
};

export const DivisionData = () => {
  return apiClient.get("/api/DataBase/GetDiviosn");
};
