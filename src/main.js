import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./Store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VuePiwik from "vue-piwik";
import ComponnetRegister from "./components/componentRegister";
import popAlert from "@/components/common/popAlert.js";
import 'element-ui/lib/theme-chalk/index.css';

import VCharts from 'v-charts';

import echarts from 'echarts'
import {
    List
} from 'vant';
import 'vant/lib/list/style';

Vue.use(List);
Vue.prototype.$echarts = echarts

import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);
// import Http from "@/common/http";


Vue.use(popAlert);
Vue.use(VCharts);


Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

Vue.use(VuePiwik, {
    // host: "http://matomo.local",
    host: "https://matomo.api.com",
    siteId: 1,
    router: router
});

Vue.prototype.thousandBitSeparator = num => {
    if (num.toString().indexOf('.') !== -1) {
        return num.toLocaleString();
    } else {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }
    // return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};
Vue.prototype.nFormatter = num => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/.0$/, "") + "G";
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/.0$/, "") + "K";
    }
    return num;
};

import {
    setStore,
    getStore,
    removeStore,
    getCookie
} from "./utils/storage.js";

/* eslint-disable no-new */
let thirdmin = null;
router.beforeEach(function(to, from, next) {
    // if (thirdmin) {} else {
    //     thirdmin = setInterval(() => {
    //         store.dispatch("userinfo");
    //         store.dispatch("userInfo");
    //         store.dispatch("self");
    //     }, 1000 * 60 * 28);
    // }

    //  new guidance step of global judgment
    if (!store.state.isDialogShow.isCompleteAll &&
        store.state.user.login &&
        !store.state.isDialogShow.isPathRoute
    ) {
        if (!store.state.user.isShowPathTreasure) {
            store.dispatch("mybag");

            store.dispatch("getNewGuidanceDispatch", {
                guidanceNum: 6
            });
            setTimeout(() => {
                store.dispatch("getNewGuidanceDispatch", {
                    guidanceNum: 7
                });
            }, 200);
            setTimeout(() => {
                store.dispatch("getNewGuidanceDispatch", {
                    guidanceNum: 8
                });
            }, 400);
        }
    }

    var _hmt = window._hmt || [];
    if (to.path) {
        _hmt.push(["_trackPageview", "/" + to.fullPath]);
    }
    if (store.state.user.login == false && to.path.indexOf("mygrand") !== -1) {
        next({
            replace: true,
            path: "/home"
        });
        store.dispatch("logout");
        store.dispatch("getList");
        store.commit("istestBooleam", true);
        store.commit("showLoginDialog", true);
    } else if (
        to.path.indexOf("paymoney") !== -1 &&
        store.state.user.login == false
    ) {
        next({
            replace: true,
            path: "/home"
        });
        store.dispatch("logout");
        store.dispatch("getList");
        store.commit("istestBooleam", true);
        store.commit("showLoginDialog", true);
    } else {
        next();
    }
    // 60s大转盘
    if (store.state.user.login == false && to.path.indexOf("turntable") !== -1) {
        next({
            replace: true,
            path: "/home"
        });
        store.dispatch("logout");
        store.dispatch("getList");
        store.commit("istestBooleam", true);
        store.commit("showLoginDialog", true);
    } else {
        next();
    }
    // 免费大转盘
    // if (store.state.user.login == false && to.path.indexOf("freeturn") !== -1) {
    //     next({ replace: true, path: "/home" });
    //     store.dispatch("logout");
    //     store.dispatch("getList");
    //     store.commit("istestBooleam", true);
    //     store.commit("showLoginDialog", true);
    // } else {
    //     next();
    // }
    setTimeout(() => {
        if (store.state.user.login == false && to.path.indexOf("mygrand") !== -1) {
            next({
                replace: true,
                path: "/home"
            });
        }
    }, 1000 * 60 * 30);

    if (to.path.indexOf("home") !== -1) {
        // store.dispatch("hotcompetedispatch");
        // store.dispatch("bswiperdispatch");
        // store.dispatch("eventcenterdispatch");
        // store.dispatch("exchangedispatch");
        // store.dispatch("hotnewslistdispatch");
        // store.dispatch("recomgoodslistdispatch");
        // store.dispatch("richlistdispatch");
        let guessParams = {
            game: "all",
            status: "open",
            page: 1
        };
        store.dispatch("hotcompetedispatch", guessParams);
    }
    if (to.path.indexOf("home") !== -1 || to.path.indexOf("compete") !== -1) {
        store.dispatch("getList");
    }
    if (to.path.indexOf("mygrand/personinfo") !== -1) {
        store.dispatch("userinfoshowdispatch");
    }
    if (to.path.indexOf("/mygrand/mybag") !== -1) {
        store.dispatch("mybag");
    }
    if (to.path.indexOf("/mygrand/treasureBox") !== -1) {
        store.dispatch("bag_treasure_dis");
    }
    if (to.path.indexOf("/mygrand/myemail") !== -1) {
        store.dispatch("getemaildis", store.state.home.myInforation);
    }
    if (to.path.indexOf("/mygrand/accountrecords") !== -1) {
        store.dispatch("buyrecordsdis", store.state.home.accoutRecord);
    }
    if (to.path.indexOf("/mall/") !== -1) {
        store.dispatch("userInfo");
    }

    if (
        to.path.indexOf("/compete/") !== -1 ||
        to.path.indexOf("/compete/Quizzeszone") !== -1 ||
        to.path.indexOf("/compete/Lol") !== -1 ||
        to.path.indexOf("/compete/Dota2") !== -1 ||
        to.path.indexOf("/compete/Jedi") !== -1 ||
        to.path.indexOf("/compete/Csgo") !== -1
    ) {
        store.commit("isCompetePages", 1);
        store.commit("isCompeteIndex", 0);
        store.commit("isCompeteBooleams", false);
        store.commit("isReloading", false);
        store.commit("IsFirstCompeteShow", true);
        store.commit("isCompeteListdata", []);
    }
    if (to.path.indexOf("/guess/") == -1) {
        store.commit("mutationStateGuessId", null);
        store.commit("mutationGuessTeamData", null);
    }

    if (to.path.indexOf("home") != -1) {
        store.dispatch("bswiperdispatch");
        store.commit("letitautoplay", {
            delay: 2000,
            disableOnInteraction: false
        });
        setTimeout(() => {
            let indexSwpite = store.state.home.swiperIndex;
            let testSwiper = document.getElementById("swiperTest") ?
                document.getElementById("swiperTest").swiper :
                "";
            testSwiper ? testSwiper.slideTo(indexSwpite, 2000, false) : "";
            testSwiper ? store.commit("iSswiperIndex", testSwiper.realIndex) : "";
            testSwiper
                ?
                (store.state.home.swiperTime = setInterval(() => {
                    store.commit("iSswiperIndex", testSwiper.realIndex);
                }, 4000)) :
                "";
        }, 100);
    } else {
        if (store.state.home.swiperTime) {
            clearInterval(store.state.home.swiperTime);
        }
    }

    // next()
});
// baidu
router.afterEach((to, from, next) => {
    setTimeout(() => {
        var _hmt = _hmt || [];
        (function() {
            document.getElementById("baidu_tj") &&
                document.getElementById("baidu_tj").remove();
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?3dfee423a8a27b4738055161ee785856";
            hm.id = "baidu_tj";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }, 0);
});
store.dispatch("isLogin");
new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: {
        App
    }
});