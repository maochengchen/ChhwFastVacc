import Notify from "vue-notifyjs";
import SideBar from "@/components/SidebarPlugin";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import "es6-promise/auto";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

//css assets
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/sass/paper-dashboard.scss";
import "@/assets/css/themify-icons.css";
import 'bootstrap-vue/dist/bootstrap-vue';
import bootstrapVue from "bootstrap-vue/dist/bootstrap-vue";

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(SideBar);
    Vue.use(Notify);
    Vue.use(bootstrapVue);
  },                                                                                                                                                                                                                                            
};
