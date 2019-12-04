import Http from "./../common/http";
import { stringify } from "qs";
import {
    setStore,
    getStore,
    removeStore,
    getCookie,
    setCookie,
    removeCookie
} from "./../utils/storage.js";
// Vue.use(fingerprintjs2)
let user = {
    state: {
        login: false,
        userInfo: null,
        showLoginDialog: false,
        alert: null,
        alertMessage: "",
        username: "",
        testTrue: false,
        qqBind: false,
        wbBind: false,
        wxBind: false,
        thirdMessage: [{
                id: 1,
                title: "QQ账号",
                isbind: false,
                value: "qq"
            },
            {
                id: 2,
                title: "微信账号",
                isbind: false,
                value: "wechat"
            },
            {
                id: 3,
                title: "微博账号",
                isbind: false,
                value: "weibo"
            }
        ],
        isHavetid: false,
        newGuidanceStep: null, //new guidance step
        isFirstGetProps: true, //true is props,false is debris
        isSendNewGuide: false,
        isShowPathTreasure: false //页面是否显示为网维大师
    },
    actions: {
        userInfo: function(store) {
            //用户信息
            return Http.get("self")
                .then(response => {
                    store.commit("userInfo", response.data.data);
                    return response;
                })
                .catch(Http.onError);
        },
        showLoginDialog: function(store) {
            //显示登录弹窗
            store.commit("showLoginDialog", true);
            setTimeout(() => {
                store.commit("istestBooleam", true);
            }, 100);
        },
        hideLoginDialog: function(store) {
            //隐藏登录弹框
            store.commit("showLoginDialog", false);
            store.commit("istestBooleam", false);
        },
        isLogin: function(store) {
            if (getCookie("cid") != null) {
                store.commit("login");
            } else {
                store.commit("logout");
            }
        },
        login: function(store, params) {
            // if(response.data.code==0){
            return Http.post("login", params).then(function(response) {
                if (response.data.code == 0) {
                    //setStore('token',response.data.data.token)
                    // setCookie('cid',response.data.data.token,7)
                    store.dispatch("userInfo");
                    store.dispatch("userinfoshowdispatch");
                    // store.dispatch("userInfo")
                    // store.dispatch('self')
                    store.commit("login", true);
                    store.commit("istestBooleam", false);
                }
                return response;
            });
            // }
        },
        logout: function(store) {
            Http.post("logout").then(response => {
                // removeStore('token')
                // removeCookie('cid')
                // removeCookie('cytoken')
                // removeCookie('debug_uuid')
                // removeCookie("imgUrl")
                store.commit("userInfo", null);
                store.commit("logout");
                var img = new Image();
                img.src = "https://changyan.sohu.com/api/2/logout?client_id=cytn9LfYz";
                store.state.login = false;
                // store.state.loginBooleam=false;
                store.commit("login", false);
                store.commit("istestBooleam", false);
                if (window.location.href.indexOf("mygrand") > -1) {
                    window.location.replace("/");
                }
            });
        },
        alertAdd: function(store, component) {
            store.commit("alertAdd", component);
        },
        alertMessage: function(store, message) {
            store.commit("alertMessage", message);
        },
        actionsThirds(store) {
            Http.get("socials")
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("mutationsThirdMessage", response.data.data);
                    }
                })
                .catch(Http.onError);
        },
        getNewGuidanceFiveStepDispatch(store) {
            Http.post("user/UserGuideStepFiveStart")
                .then(res => {
                    if (res.data.code == 0 && res.data.data.status == 1) {
                        store.commit("mutationOpenGuessShow", true);
                    }
                })
                .catch(Http.onError);
        },
        getNewGuidanceDispatch(store, payload) {
            // get new guidance step
            Http.get(`user/getGuidanceNum?${stringify(payload)}`)
                .then(res => {
                    let ISDialog = this.state.isDialogShow;
                    let isCarryEnroll = ISDialog.isSHowCarryEnroll
                    let isShowTask = ISDialog.isShowTask
                    let isexTask = ISDialog.isShowExchangeNickname
                    let isReciveNewsTask = ISDialog.isShowReciveNewsTask
                    let isWinnerLose = ISDialog.isShowWinner
                    let isGuessBetGuide = ISDialog.isShowGuessBetGuide
                    let isOpenGuessShow = ISDialog.isOpenGuessShow;
                    let isCompleteAll = ISDialog.isCompleteAll;

                    if (!isCompleteAll && !isCarryEnroll && !isShowTask && !isexTask && !isReciveNewsTask && !isWinnerLose && !isGuessBetGuide && !isOpenGuessShow) {
                        switch (payload.guidanceNum) {
                            case 3:

                                if (res.data.code == 0 && res.data.data.status == 1) {
                                    store.commit("mutationIsShowReciveNewsTask", true);
                                }
                                break;
                            case 6:
                                if (res.data.code == 0 && res.data.data.status == 1) {
                                    if (
                                        this.state.shop.mybag &&
                                        this.state.shop.mybag.length > 0 &&
                                        this.state.shop.mybag[this.state.shop.mybag.length - 1]
                                        .product_id != 0
                                    ) {

                                        if (!this.state.isDialogShow.isFirstGetPropsShow) {
                                            // console.log('我来了么')
                                            store.commit("mutationUserFirstGetProps", true);

                                        }
                                        if (this.state.isDialogShow.isTipPropsCanGuessShow) {
                                            store.commit("mutationUserFirstGetProps", false);
                                        }
                                        // store.commit("mutationTipPropsCanGuessShow", true);

                                    }
                                } else {
                                    store.commit("mutationTipPropsCanGuessShow", false);
                                    store.commit("mutationUserFirstGetProps", false);
                                }
                                break;
                            case 7:
                                if (!this.state.isDialogShow.isFirstGetPropsShow) {
                                    if (res.data.code == 0 && res.data.data.status == 1) {
                                        if (
                                            this.state.shop.mybag &&
                                            this.state.shop.mybag.length > 0 &&
                                            this.state.shop.mybag[0].product_id == 0
                                        ) {

                                            if (!this.state.isDialogShow.isFirstGetDebrisShow) {
                                                // console.log('我来了么')
                                                store.commit("mutationUserFirstGetDebris", true);
                                            }
                                            if (this.state.isDialogShow.isCanSystheticShow) {
                                                // console.log('我来了么')
                                                store.commit("mutationUserFirstGetDebris", false);
                                            }

                                            // store.commit("mutationCanSystheticShow", true);
                                            // store.commit("mutationUserFirstGetDebris", false);
                                        }
                                    }
                                } else {
                                    store.commit("mutationCanSystheticShow", false);
                                    store.commit("mutationUserFirstGetDebris", false);
                                }
                                break;
                            case 8:
                                // console.log('啊哈哈哈', this.state.user.isShowPathTreasure)
                                // if (this.state.isDialogShow.isFirstGetDebrisShow || this.state.isDialogShow.isFirstGetPropsShow) {
                                //     return;
                                // }

                                if (res.data.code == 0 && res.data.data.status == 1) {
                                    if (!this.state.isDialogShow.isTipPropsCanGuessShow ||
                                        !this.state.isDialogShow.isCanSystheticShow ||
                                        !this.state.isDialogShow.isFirstGetDebrisShow ||
                                        !this.state.isDialogShow.isFirstGetPropsShow
                                    ) {
                                        store.commit("mutationUserFirstGuessShow", true);
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    if (res.data.code == 0) {
                        store.commit("mutationsNewGuidance", {
                            guidanceNum: payload.guidanceNum,
                            status: res.data.data.status
                        });
                    }
                })
                .catch(Http.onError);
        },
        setNewGuidanceStepDispatch(store, payload) {
            //set new guidance step
            Http.post("user/setGuidanceNum", payload)
                .then(res => {
                    if (res.data.code == 0) {
                        let isCompeteFourHave = !getCookie("isCompeteFour") ?
                            false :
                            getCookie("isCompeteFour") == undefined ?
                            false :
                            true;
                        if (parseFloat(payload.guidanceNum) == 5) {
                            this.dispatch("getNewGuidanceFiveStepDispatch");
                        } else if (parseFloat(payload.guidanceNum) == 4) {
                            if (!isCompeteFourHave) {
                                setCookie("isCompeteFour", true);
                            }
                        } else {
                            if(this.state.advertise.infoArr.length>0&&!this.state.advertise.isShow){
                                this.dispatch("getNewGuidanceDispatch", payload);
                            }
                        }
                    }
                })
                .catch(Http.onError);
        },
        actionsICompeteAll(store) {
            Http.post("user/finishUserGuide")
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("mutationsNewGuidance", { status: 3 });
                    }
                })
                .catch(Http.onError);
        },
        actionsGuideStepFourStart(store) {
            Http.post("user/UserGuideStepFourStart")
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("mutationsNewGuidance", {
                            guidanceNum: 4,
                            status: res.data.data.status
                        });
                    }
                })
                .catch(Http.onError);
        }
    },
    mutations: {
        login: function(state, payload) {
            return (state.login = payload);

            // return state.login = true;
        },
        logout: function(state) {
            removeCookie("isCompleteAll");
            removeCookie("isCompeteFour");
            // this.commit('mutationIsShowPropaganda', false);
            state.isSendNewGuide = false;
            return (state.login = false);
        },
        ["userInfo"]: function(state, payload) {
            //用户信息
            state.userInfo = payload;
            if(state.userInfo && !this.state.advertise.isdispath){
                this.dispatch('getedInfo');
            }
            if (payload == null) return;
            let usern = payload.nickname;
            if (usern.length > 6) {
                usern = usern.substring(0, 7);
                state.username = usern;
            } else {
                state.username = usern;
            }
            if (!state.isShowPathTreasure) {
                if (!state.isSendNewGuide && payload && !this.state.isDialogShow.isPathRoute) {
                    if(this.state.advertise.infoArr.length>0&&!this.state.advertise.isShow){
                        this.dispatch("getNewGuidanceDispatch", { guidanceNum: 2 });
                        state.isSendNewGuide = true;
                    }
                }
            }
            return (state.login = true);
        },
        ["showLoginDialog"]: function(state, payload) {
            state.showLoginDialog = payload;
            if (payload == true) {
                setTimeout(() => {
                    state.testTrue = true;
                });
            } else if (payload == false) {
                state.testTrue = false;
            }
        },
        ["hideLoginDialog"]: function(state, payload) {
            state.showLoginDialog = payload;
            state.testTrue = false;
        },
        alertAdd: function(state, component) {
            state.alert = component;
        },
        alertMessage: function(state, message) {
            state.alertMessage = message;
        },
        istestBooleam: function(state, payload) {
            state.testTrue = payload;
        },
        mutationQqBind(state, payload) {
            state.qqBind = payload;
        },
        mutationWbBind(state, payload) {
            state.wbBind = payload;
        },
        mutationWxBind(state, payload) {
            state.wxBind = payload;
        },
        mutationsThirdMessage(state, payload) {
            let receive = payload;
            console.log(payload, '第三方')
            for (let i = 0; i < receive.length; i++) {
                if (receive[i].social_type == 1) {
                    state.thirdMessage[0].isbind = true;
                }
                if (receive[i].social_type == 3) {
                    state.thirdMessage[2].isbind = true;
                }
                if (receive[i].social_type == 4) {
                    state.thirdMessage[1].isbind = true;
                }
            }
        },
        mutationsIsHavetid(state, payload) {
            state.isHavetid = payload;
            if (!state.isHavetid) {
                this.commit("mutationIsShowPropaganda", true);
            } else {
                this.commit("mutationIsShowPropaganda", false);
            }
        },
        mutationsNewGuidance(state, payload) {
            state.newGuidanceStep = payload;
            // this.commit('mutationIsSHowCarryEnroll', true);
            if (
                state.newGuidanceStep.status == 1 &&
                state.newGuidanceStep.guidanceNum == 2
            ) {
                this.commit("mutationIsSHowCarryEnroll", true);
            }
            if (
                state.newGuidanceStep.status == 1 &&
                state.newGuidanceStep.guidanceNum == 4
            ) {
                this.commit("mutationIsShowGuessBetGuide", true);
            }
            if (
                state.newGuidanceStep.status != 1 &&
                state.newGuidanceStep.guidanceNum == 4
            ) {
                let isCompeteFourHave = !getCookie("isCompeteFour") ?
                    false :
                    getCookie("isCompeteFour") == undefined ?
                    false :
                    true;
                if (!isCompeteFourHave) {
                    setCookie("isCompeteFour", true);
                }
            }
            if (state.newGuidanceStep.status == 3) {
                let isCompleteAllHave = !getCookie("isCompleteAll") ?
                    false :
                    getCookie("isCompleteAll") == undefined ?
                    false :
                    true;
                if (!isCompleteAllHave) {
                    setCookie("isCompleteAll", true);
                }

                this.commit("mutationisCompleteAll", true);
            }
            if (
                state.newGuidanceStep.status == 0 &&
                state.newGuidanceStep.guidanceNum == 2
            ) {
                let isCompleteAllHave = !getCookie("isCompleteAll") ?
                    false :
                    getCookie("isCompleteAll") == undefined ?
                    false :
                    true;
                if (!isCompleteAllHave) {
                    setCookie("isCompleteAll", true);
                }
                this.commit("mutationisCompleteAll", true);
            }
        },
        mutationsIsFirstGetProps(state, payload) {
            state.isFirstGetProps = payload;
        },
        mutationasIsShowPathTreasure(state, payload) {
            state.isShowPathTreasure = payload;
        }
    }
};
export default user;