// import "babel-polyfill";
import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import home from "./home";
import match from "./match";
import news from "./news";
import shop from "./shop";
import pay from "./pay";
import garden from "./garden";
import treasure from "./treasure";
import turntable from "./turntable";
import isDialogShow from "./isDialogShow";
import mall from "./mall";
import rebate from "./rebate";
import modifymessage from "./modifymessage";
import promoter from "./promoter";
import activity from "./activity";
import advertise from './advertise'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        home,
        match,
        news,
        shop,
        pay,
        turntable,
        isDialogShow,
        mall,
        garden,
        treasure,
        rebate,
        modifymessage,
        promoter,
        activity,
        advertise
    }
});

export default store;