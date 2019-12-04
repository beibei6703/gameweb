import Http from "./../common/http";
import router from "@/router";
const COMPETE_LIST = "compete_list";
const COMPETE_SINGLE = "compete_single";
const COMPETE_WIN = "compete_Win"; //丰收
const CBI_LIST = "cbi_list"; //菜币
const SKINS_LIST = "skins_list"; //道具
const CAIMY_LIST = "caimy_list"; //道具
const SKINSMY_LIST = "skinsmy_list"; //道具
const BATTLE_ID = "battle_id"; //获取battle_id
// const Mu = "guessTeam_message"; //详情获取战队基本信息
const GUESSTEAM_POST = "guessTeam_post"; //详情获取战队基本信息
const MUTATION_NEWPHONE = "newPhone"; //详情获取战队基本信息
const MUTATION_RICHRANK = "richRank"; //预测详情的土豪榜
const GETGUESSTALK_MUTATION = "getguesstalkmutation";
const TALKCALLIN_MUTATION = "talkcallinmutation";

// const GUESS_ID= 'guess_id'//详情获取战队基本信息
let match = {
    state: {
        challenge_gee: null, //极验
        compete_list: null, // 预测列表
        competeBooleam: false,
        compete_single: null, // 预测列表
        compete_Win: null, // 丰收
        showForgetDa: false, // 忘记密码
        stateGuessId: null,
        cbi_list: null,
        skins_list: null,
        caimy_list: null,
        skinsmy_list: null,
        battle_id: null,
        guessTeam_message: null,
        guessTeam_post: null,
        new_Phone: null,
        richRank: null,
        isSigninTools: false,
        myBag_tools: [],
        pull_tools: [],
        sumNum: 0,
        sendtalkinfo: null, //预测聊天
        Inequality: {
            show: false,
            text: "",
            phoneTell: "",
            username: "",
            password: "",
            remember_me: "",
            typeLogin: ""
        },
        isShowStatu: false,
        Caisum: 0,
        Cardssum: 0,
        upTime: 60,
        uptimeTrue: false,
        upDataName: 2,
        uptimeText: "获取验证码",
        loginCode: "",
        commonPop: false,
        loginBooleam: false,
        loginPupop: false,
        guessdata: [], //聊天数据
        timeUp: null,
        startTime: null,
        Connect: null,
        competeIndex: 0,
        competePages: 1,
        competeBooleams: false,
        competeMore: true,
        guessTime: 0, //聊天倒计时
        guessContent: null,
        timeSetTime: null,
        isReload: false,
        firstCompete: true, //默认显示第一条
        CountDown: null,
        CountTimeUp: null,
        // guessId: {
        //     guessId: null
        // },
        battleId: {
            battle_id: "",
            upper_id: null,
        },
        competeListdata: [],
        //预测我的预测金额
        myMoney: 0,
        compete_singlefirst: null,
        showPubgPupBooleam: {
            isShow: false,
            optionFrom: 0,
            optionTo: null,
            dataType: 0,
            Length: 0
        },
        pubgmarginTop: 0,
        guessMessageTeamLen: 0,
        teamListMarginTop: 291,
        detailIndexAndStrings: {
            index: null,
            strings: null
        },
        myToolsHeight: 0,
        pullToolsHeight: 0,
        myToosStorage: null,
        pullToosStorage: null,
        TeamName: "",
        choiceTeamIndex: null,
        choiceTeamType: "cai",
        isCurrentIndex: null, //预测列表点击索引
        //新增的
        iconValue: 0, //碎片价值
        cardsValue: 0, //道具价值
        signData: null, //签到数据
        myGuessDataList: null, //我的预测数据
        myguessPage: 1, //我的预测的页数
        myguessReload: true, //我的预测的是否加载
        myguessCbMore: true, //我的菜币预测的是否存在下一页
        myguessCardsMore: true, //我的道具预测的是否存在下一页
        guessMainData: null, //预测详情主要数据
        myGuessHoverData: null, //鼠标经过我的预测显示数据
        choiceBoxNodeIndex: null,
        setGuessValue: {
            guessId: null,
            oddsType: null,
            battleId: null,
        }, //获取guess_id和是否为固盘
        isSendDispath: true, //是否发送请求
        isStartSend: false,
        isStartUpdate: false,
        isIndex: 1,
        isUpdatedData: false,
        isShowRecharge: false, //是否显示充值弹出框
        isSaveReachargePath: null, //保存重页面路劲
        scrolltopValue: 0, //滚轮的距离
        mygrandGuessData: null, //我的菜园预测数据
        guessDataWin: null,
        isUpdateOdds: false, //是否更新我的赔率
        isShowNewsOdds: null, //显示最新的赔率
        isShowNewsDesc: null, //显示最新的描述
    },
    actions: {
        //土豪榜
        richRank: function(store, paload) {
            Http.get("/guesses/certainRank", paload)
                .then(response => {
                    store.commit("richRank", response.data.data);
                })
                .catch(Http.onError);
        },
        // 预测列表
        compete_list: function(store, paload) {
            Http.get("/guesses/list", paload)
                .then(response => {
                    var data = response.data.data;
                    if (data.items.length < 1) {} else {
                        // store.dispatch("compete_singleFirst", {
                        //     battle_id: data.items[0].battle_id
                        // });
                    }
                    data.page = paload.page;
                    store.commit("compete_list", data);
                    store.commit("isReloading", false);
                })
                .catch(Http.onError);
        },
        // 预测列表
        compete_singleFirst: function(store, paload) {
            return Http.get("/guesses/details", paload)
                .then(response => {
                    store.commit("iscompete_singleFirst", response.data.data);
                    return response;
                    if (response.data.data.length > 0) {
                        store.commit("IsFirstCompeteShow", true);
                    }
                })
                .catch(Http.onError);
        },
        compete_single: function(store, paload) {
            return Http.get("/guesses/details", paload)
                .then(response => {
                    store.commit("compete_single", response.data.data);
                    return response;
                    if (response.data.data.length > 0) {
                        store.commit("IsFirstCompeteShow", true);
                    }
                })
                .catch(Http.onError);
        },
        // 丰收列表
        compete_Win: function(store, paload) {
            Http.get(paload)
                .then(response => {
                    store.commit("compete_Win", response.data.data);
                })
                .catch(Http.onError);
        },
        cbi_list: function(store, payload) {
            Http.get("/guesses/recentCai", payload)
                .then(response => {
                    store.commit("cbi_list", response.data.data);
                })
                .catch(Http.onError);
        },
        skins_list: function(store, payload) {
            Http.get("/guesses/recentCard", payload)
                .then(response => {
                    store.commit("skins_list", response.data.data);
                })
                .catch(Http.onError);
        },
        caimy_list: function(store, payload) {
            console.log('我来了么', payload)
            Http.get("/guess/caiDetail", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("caimy_list", response.data.data);
                    }

                })
                .catch(Http.onError);
        },
        skinsmy_list: function(store, payload) {
            Http.get("/guess/cardDetail", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("skinsmy_list", response.data.data);
                    }
                })
                .catch(Http.onError);
        },
        getMenuList: function(store, payload) {
            console.log('预测简述的参数', payload)
            Http.get("/battle/detail", payload).then(response => {
                    if (response.data.code == 0) {
                        console.log('预测简述数据', response.data.data)
                        store.commit("battle_id", response.data.data);
                        store.commit("mutationGuessMainData", response.data.data);
                        // console.log('预测简述的数据', response.data.data)
                    }
                })
                .catch(Http.onError);
        },
        getBattleId: function(store, payload) {
            console.log('我输出了没有呢getBattleId', payload)
            Http.get("/guesses/abstract", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        // if (!state.battleId.upper_id) {
                        //     store.commit("isBattleId", response.data.data);
                        // }
                        store.commit("isBattleId", response.data.data);

                        store.dispatch("getMenuList", {
                            battle_id: response.data.data.battle_id
                        });
                        store.dispatch('guessTeam_message', response.data.data)
                            // return;


                    }
                }).catch(Http.onError);
        },

        guessTeam_message: function(store, payload) {
            console.log('预测详情请求了吗', payload);
            Http.get("/guesses/details", payload).then(response => {
                    if (response.data.code == 0) {
                        store.commit("mutationGuessTeamData", response.data.data);
                    }
                })
                .catch(Http.onError);
        },
        guessTeam_post: function(store, payload) {
            Http.get("/guesses/detail", payload)
                .then(response => {
                    store.commit("guessTeam_post", response.data.data);
                })
                .catch(Http.onError);
        },
        myBag_tools: function(store) {
            Http.get("/shop/cards").then(response => {
                store.commit("myBag_tools", {
                    data: response.data.data,
                    type: 'dispatch'
                });
            }).catch(Http.onError);
        },
        //世界喊话
        getguesstalkdis: function(store, payload) {
            return Http.get("chat/guessMessages", payload)
                .then(response => {
                    store.commit("getguesstalkmutation", response.data.data.messages);
                })
                .catch(Http.onError);
        },
        getguesstalkdata: function(store, message) {
            store.commit("getguesstalkmutation", message);
        },
        //世界喊话--输入喊话内容
        postguesstalkdis: function(store, payload) {
            Http.post("/chat/guess", payload)
                .then(response => {
                    if (response.data.code != 0) {
                        let dataOption = {
                            masseges: response.data.message
                        };
                        store.commit("isSigninPupopDis", true);
                        store.commit("isSigninPupopDis", dataOption);

                        return;
                    } else {
                        store.commit("isChatWaitTime", 5);
                    }
                })
                .catch(Http.onError);
        },
        //我的背包数据
        actionMybagValue: function(store) {
            Http.get("/shop/package").then(response => {
                store.commit("mutationsMyBagValue", response.data.data);
            }).catch(Http.onError);
        },
        //我的签到状态
        actionSignData: function(store) {
            Http.get("/getCheckInData").then(response => {
                store.commit("mutationsSignData", response.data.data);
            }).catch(Http.onError);
        },
        //我的菜币预测记录
        actionMycaiData: function(store, payload) {
            Http.get('guess/caiLogs', payload).then(response => {
                // console.log('我的C币预测记录', payload)
                if (response.data.code == 0) {
                    // console.log('我的菜币预测数据', response.data.data, store.state.myguessCbMore)
                    store.commit("mutationMyguessData", {
                        datatypes: 'cai',
                        payloadData: response.data.data
                    });
                    if (store.state.myguessCardsMore || store.state.myguessPage < 2) {
                        store.dispatch("actionMycardsData", payload);
                    }
                }
            }).catch(Http.onError);
        },
        actionMycardsData: function(store, payload) {
            Http.get('guess/cardLogs', payload).then(response => {
                // console.log('我的道具预测记录', payload)
                if (response.data.code == 0) {
                    // console.log('我的道具预测数据', response.data.data)
                    store.commit("mutationMyguessData", {
                        datatypes: 'cards',
                        payloadData: response.data.data
                    });
                }
            }).catch(Http.onError);
        },
        actionsMygrandGuessData(store, payload) {
            Http.get('/guesses/list', payload).then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationMygrandGuessData", response.data.data);
                }
            }).catch(Http.onError);
        },
        actionsguessDataWin(store, payload) {
            Http.get("/guesses/list", payload).then(response => {
                if (response.data.code == 0) {
                    var data = response.data.data;
                    store.commit("mutationsguessDataWin", data);
                }
            }).catch(Http.onError);
        },
    },
    mutations: {
        mutationsguessDataWin(state, payload) {
            state.guessDataWin = payload.items
        },
        [COMPETE_LIST]: function(state, payload) {
            var data = payload.items;
            if (
                state.compete_list == null ||
                state.compete_list.length == 0 ||
                payload.page == 1
            ) {
                state.compete_list = data;
            } else {
                state.compete_list = state.compete_list.concat(data);
            }
            if (payload && payload.items.length > 0) {
                state.competeMore = payload.meta.has_more;
            } else {
                state.competeMore = false;
            }
        },
        // 预测列表2
        [COMPETE_SINGLE]: function(state, payload) {
            state.compete_single = payload;
        },
        iscompete_singleFirst: function(state, payload) {
            if (state.competePages != 1) return;
            state.compete_singlefirst = payload;
        },
        // 每周丰收榜和天台榜
        [COMPETE_WIN]: function(state, payload) {
            state.compete_Win = payload;
        },
        showForget: function(state, payload) {
            state.showForgetDa = payload;
        },
        mutationStateGuessId: function(state, payload) {
            state.stateGuessId = payload;
        },
        [CBI_LIST]: function(state, payload) {
            state.cbi_list = payload;
        },
        [SKINS_LIST]: function(state, payload) {
            state.skins_list = payload;
        },
        [CAIMY_LIST]: function(state, payload) {
            state.Caisum = 0;
            state.caimy_list = payload;
            console.log('state.caimy_list', state.caimy_list)

            if (payload) {
                for (var i = 0; i < payload.length; i++) {
                    state.Caisum += parseInt(payload[i].chip);
                    console.log('我预测的菜币', parseInt(payload[i].chip))

                }
            } else {
                state.Caisum = 0;
            }
            console.log('我预测的菜币总额', state.Caisum)
            return state.Caisum;
        },
        [SKINSMY_LIST]: function(state, payload) {
            state.Cardssum = 0;
            state.skinsmy_list = payload;
            if (payload) {
                for (var i = 0; i < payload.length; i++) {
                    state.Cardssum = state.Cardssum + parseInt(payload[i].chip);
                }
            } else {
                state.Cardssum = 0;
            }
            return state.Cardssum;
        },
        [BATTLE_ID]: function(state, payload) {
            state.battle_id = payload;
            // console.log("测试一下", payload);
            state.isShowStatu = false;
            for (var i = 0; i < payload.upper_data.length; i++) {
                if (payload.upper_data[i].status === "start") {
                    return (state.isShowStatu = true);
                    break;
                }
                if (payload.upper_data[i].status === "wait") {
                    return (state.isShowStatu = true);
                    break;
                }
            }
        },
        // isGetBattleId: function(state, payload) {
        //     state.battle_id = payload;
        // },
        mutationGuessTeamData: function(state, payload) {
            state.isStartSend = false; //在5分钟的是否开始发送请求
            state.isStartUpdate = false; //在倒计时结束是否更新数据
            console.log('结束了么mutationGuessTeamData', state.isStartUpdate)
            let timeArray = []; //日期的数据
            state.isUpdatedData = true;
            if (!payload) {
                state.guessTeam_message = payload;
                return;
            };
            if (payload) {
                state.guessTeam_message = payload;
                let isHaveId = false;
                let guessid = parseInt(state.stateGuessId);
                let params;

                Object.keys(payload).forEach((key) => {
                    if (payload[key].id == guessid) {
                        params = {
                            guessId: payload[key].id,
                            oddsType: payload[key].odds_type,
                            battleId: payload[key].battle_id,
                        }
                        isHaveId = true;
                        this.commit('mutationSetGuessValue', params);
                    }
                    if (payload[key].status == 'wait') {
                        let NTime = Number(new Date()),
                            differTime = 0,
                            timeDiffer = Date.parse(new Date(payload[key].date)),
                            CountTimeUp = null;
                        if (CountTimeUp) {
                            clearInterval(CountTimeUp);
                        }
                        differTime = parseInt((timeDiffer - NTime) / 1000);

                        if (differTime > 300) {
                            let differs = (differTime - 300);
                            timeArray.push(differs);
                            state.isStartSend = true;
                        }
                        if (differTime > 0 && differTime <= 300) {
                            // state.isSendDispath = false;
                            payload[key].status_name = "即将开赛 " + differTime + " s";
                            CountTimeUp = setInterval(() => {
                                differTime -= 1;
                                if (differTime > 0) {
                                    differTime < 10 ? (differTime = "0" + differTime) : (differTime = differTime);
                                    payload[key].status_name = "即将开赛 " + differTime + " s";
                                } else {
                                    // state.isStartUpdate = true;
                                    payload[key].status_name = "即将开赛";
                                    differTime = 0;
                                    clearInterval(CountTimeUp);

                                    setTimeout(() => {
                                        if (window.location.href.indexOf('/guess/') != -1) {
                                            this.dispatch('guessTeam_message', state.battleId)
                                            this.dispatch("getMenuList", {
                                                battle_id: state.battleId.battle_id
                                            });
                                        }
                                    }, 5000);

                                    return;
                                }
                            }, 1000);
                        }
                    }
                })

                if (!isHaveId) {
                    // state.isSendDispath = false;
                    let guessID = payload[0].id;
                    state.isIndex = 0
                    state.stateGuessId = guessID
                        // console.log('guessID是多少呢', guessID);
                    params = {
                        guessId: payload[0].id,
                        oddsType: payload[0].odds_type,
                        battleId: payload[0].battle_id,
                    }
                    if (window.location.href.indexOf('/guess/') != -1) {
                        router.push(`/guess/${guessID}`);
                    }
                    this.commit('mutationSetGuessValue', params)
                }
                if (state.isStartSend && timeArray.length) {
                    let differs = timeArray[0];
                    if (differs < 0) return false;
                    if (differs > 12 * 60 * 60) return false;
                    let countTime = differs * 1000
                    console.log('日期排序', differs, countTime)

                    setTimeout(() => {
                        if (window.location.href.indexOf('/guess/') != -1) {
                            console.log('我来啦', differs);
                            this.dispatch('guessTeam_message', state.battleId)
                            this.dispatch("getMenuList", {
                                battle_id: state.battleId.battle_id
                            });

                            return;
                        }
                    }, countTime);

                }
            }



        },

        [GUESSTEAM_POST]: function(state, payload) {
            state.guessTeam_post = payload;
        },
        [MUTATION_RICHRANK]: function(state, payload) {
            state.richRank = payload;
        },
        isSigninTools: function(state, payload) {
            state.isSigninTools = payload;
        },
        myBag_tools: function(state, payload) {
            console.log("state.myBag_tools", state.myBag_tools);
            if (payload) {
                if (payload.type == 'dispatch') {
                    state.myBag_tools = payload.data;
                    state.pull_tools = [];
                    state.sumNum = 0;
                    return;
                }
                if (state.myBag_tools.length > 0) {
                    for (var i = 0; i < state.myBag_tools.length; i++) {
                        if (payload.product_id == state.myBag_tools[i].product_id) {
                            if (state.myBag_tools[i].product_count < 0) {
                                // todo:
                                return state.myBag_tools;
                            }
                            if (payload.typeReduce) {
                                state.myBag_tools[i].product_count = Math.abs(
                                    parseInt(state.myBag_tools[i].product_count) +
                                    Math.abs(parseInt(payload.product_count))
                                );
                                this.commit("getMyTollsH", state.myBag_tools);
                                return state.myBag_tools;
                            } else {
                                state.myBag_tools[i].product_count = Math.abs(
                                    parseInt(state.myBag_tools[i].product_count) -
                                    Math.abs(parseInt(payload.product_count))
                                );
                                this.commit("getMyTollsH", state.myBag_tools);
                                return state.myBag_tools;
                            }
                        }
                    }

                    console.log("payloadaaaaaaaaaaaa", payload);
                    if (payload.typeReduce) {
                        state.myBag_tools[state.myBag_tools.length] = payload;
                    }
                } else {
                    console.log("我来了么", payload, state.myBag_tools);
                    // payload.length > 0 ? state.myBag_tools = payload : state.myBag_tools
                    state.myBag_tools = state.myBag_tools.concat(payload);
                }
            } else {
                state.myBag_tools = payload;
            }
            this.commit("getMyTollsH", state.myBag_tools);
            return state.myBag_tools;
        },
        push_tools: function(state, payload) {
            if (state.pull_tools.length > 0) {
                for (var i = 0; i < state.pull_tools.length; i++) {
                    if (payload.product_id == state.pull_tools[i].product_id) {
                        state.pull_tools[i].product_count = Math.abs(
                            parseInt(state.pull_tools[i].product_count) - parseInt(payload.product_count)
                        );
                        if (payload.typeAdd) {
                            state.sumNum =
                                state.sumNum + Math.abs(payload.product_count) * payload.product_cprice;
                        }
                        if (payload.typeReduce) {
                            state.sumNum =
                                state.sumNum -
                                Math.abs(payload.product_count) * state.pull_tools[i].product_cprice;
                        }

                        this.commit("getPullTollsH", state.pull_tools);
                        return;
                    }
                }
                payload.product_count = -payload.product_count;
                state.pull_tools[state.pull_tools.length] = payload;

                if (payload.typeAdd) {
                    state.sumNum = state.sumNum + payload.product_count * payload.product_cprice;
                }

                this.commit("getPullTollsH", state.pull_tools);
            } else {
                payload.product_count = -payload.product_count;
                state.pull_tools = state.pull_tools.concat(payload);
                if (payload.typeAdd) {
                    state.sumNum = state.sumNum + payload.product_count * payload.product_cprice;
                }
                this.commit("getPullTollsH", state.pull_tools);
            }
        },

        //世界喊话
        [TALKCALLIN_MUTATION]: function(state, payload) {
            state.talkcallinlist = payload;
        },
        [GETGUESSTALK_MUTATION]: function(state, payload) {
            return (state.getguesstalkdata = payload);
        },
        //通用弹出框
        isSigninPupopDis: function(state, payload) {
            state.commonPop = payload;
        },
        //异步浏览器登录发送手机验证码
        isInequalityShowDis: function(state, payload) {
            state.Inequality = payload;
            state.upDataName = 2;

            if (state.uptimeTrue == true) {
                clearInterval(state.timeUp);
                state.upTime = 60;
                state.timeUp = null;
                state.uptimeText = "重新获取 " + state.upTime + "s";
                if (!state.timeUp) {
                    state.timeUp = setInterval(function() {
                        state.upTime = state.upTime - 1;
                        if (state.upTime >= 1) {
                            state.uptimeText = "重新获取 " + state.upTime + "s";
                        } else {
                            state.upDataName = 1;
                            state.upTime = 60;
                            state.uptimeText = "获取验证码";
                            state.uptimeTrue = false;
                            clearInterval(state.timeUp);
                        }
                    }, 1000);
                }
            }
        },
        isloginBooleam: function(state, payload) {
            state.loginBooleam = payload;
        },
        isCompetePages: function(state, payload) {
            state.competePages = payload;
        },
        isCompeteIndex: function(state, payload) {
            state.competeIndex = payload;
        },
        isCompeteBooleams: function(state, payload) {
            state.competeBooleams = payload;
        },
        //是否加载
        isReloading: function(state, payload) {
            state.isReload = payload;
        },
        isChatWaitTime: function(state, payload) {
            state.guessTime = payload;
            state.timeSetTime = null;
            clearInterval(state.timeSetTime);
            state.guessContent = state.guessTime + "s";
            if (!state.timeSetTime) {
                state.timeSetTime = setInterval(function() {
                    state.guessTime = state.guessTime - 1;
                    if (state.guessTime >= 1) {
                        state.guessContent = state.guessTime + "s";
                    } else {
                        state.guessTime = 0;
                        state.guessContent = "";
                        clearInterval(state.timeSetTime);
                    }
                }, 1000);
            }
        },
        IsFirstCompeteShow: function(state, payload) {
            state.firstCompete = payload;
        },
        isGuessId: function(state, payload) {
            state.guessId = payload;
        },
        isBattleId: function(state, payload) {
            if (payload) {
                state.battleId = payload;
                // console.log("我获得了battleId", state.battleId);
            }
        },
        isCompeteListdata: function(state, payload) {
            state.competeListdata = payload;
        },
        isMyMoney: function(state, payload) {
            state.myMoney = payload;
        },
        //pubg换队弹出框
        isShowPubgPup: function(state, payload) {
            state.showPubgPupBooleam = payload;
        },
        getPubgmarginTop: function(state, payload) {
            state.pubgmarginTop = payload;
        },
        getTeamListMarginTop: function(state, payload) {
            state.teamListMarginTop = payload;
        },
        getDetailIndexAndStrings: function(state, payload) {
            state.detailIndexAndStrings = payload;
        },
        //获取我的背包高度
        getMyTollsH: function(state, payload) {
            let mytoolsdata = null
            if (payload) {
                state.myToosStorage = payload;
                mytoolsdata = state.myToosStorage;
                for (var i = 0; i < state.myToosStorage.length; i++) {
                    if (state.myToosStorage[i].product_count == 0) {
                        state.myToosStorage.splice(i, 1);
                    }
                }
                if (state.myToosStorage.length > 0) {
                    state.myToolsHeight =
                        102 + Math.ceil(state.myToosStorage.length / 8) * 96;
                } else {
                    state.myToolsHeight = 0;
                }
            }
        },
        getPullTollsH: function(state, payload) {
            let pulldata = null
            if (payload) {
                state.pullToosStorage = payload;
                pulldata = state.pullToosStorage;
                for (var i = 0; i < state.pullToosStorage.length; i++) {
                    if (state.pullToosStorage[i].product_count == 0) {
                        state.pullToosStorage.splice(i, 1);
                    }
                }
                if (state.pullToosStorage.length > 0) {
                    state.pullToolsHeight =
                        Math.ceil(state.pullToosStorage.length / 8) * 80 - 20;
                } else {
                    state.pullToolsHeight = 0;
                }
                console.log("我要预测的数据", state.pull_tools, state.pullToosStorage);
            }
        },
        clearmytools: function(state, payload) {
            state.myToosStorage = payload;
            state.myBag_tools = payload;
        },
        clearpulltools: function(state, payload) {
            state.pullToosStorage = payload;
            state.pull_tools = payload;
        },
        getsumNum: function(state, payload) {
            state.sumNum = payload;
        },
        getTeamName: function(state, payload) {
            state.TeamName = payload;
        },
        getChoiceTeamIndex: function(state, payload) {
            state.choiceTeamIndex = payload;
        },
        getchoiceTeamType: function(state, payload) {
            state.choiceTeamType = payload;
        },
        getMutationCurrentIndex: function(state, payload) {
            state.isCurrentIndex = payload;
        },
        challenge_muta: function(state, payload) {
            state.challenge_gee = payload;
        },
        mutationsMyBagValue: function(state, payload) {
            if (payload) {
                state.iconValue = 0;
                state.cardsValue = 0;
                // console.log('我的背包数据', payload)
                for (var i = 0; i < payload.length; i++) {
                    if (payload[i].product_id == 0) {
                        state.iconValue = payload[i].product_count
                    } else {
                        state.cardsValue += parseInt(payload[i].product_count) * parseInt(payload[i].product_cprice)
                    }
                }
            }
        },
        mutationsSignData: function(state, payload) {
            state.signData = payload;
        },
        mutationMyguessData: function(state, payload) {
            console.log('传过来的是啥', payload)
            let myGuessData = [];
            if (!payload) {
                state.myGuessDataList = payload
                return;
            }
            if (payload.datatypes == 'cai') {
                if (!payload.payloadData) {
                    state.myguessCbMore = false;
                } else if (payload.payloadData.meta == undefined) {
                    state.myguessCbMore = false;
                } else {
                    state.myguessCbMore = payload.payloadData.meta.has_more;
                }
                if (!state.myGuessDataList) {
                    let myGuessCbData = payload.payloadData.items;
                    state.myGuessDataList = [];
                    for (let i = 0; i < myGuessCbData.length; i++) {
                        let params = {
                            total_chips: myGuessCbData[i].chip,
                            total_income: parseInt(myGuessCbData[i].income),
                            game_id: myGuessCbData[i].game_id,
                            guess_id: myGuessCbData[i].guess_id,
                            guess_type_name: myGuessCbData[i].guess_type_name,
                            income_message: myGuessCbData[i].income_message,
                            match_name: myGuessCbData[i].match_name,
                            odds_type: myGuessCbData[i].odds_type,
                            option_type: myGuessCbData[i].option_type,
                            option: myGuessCbData[i].option,
                            options: myGuessCbData[i].options,
                            status: myGuessCbData[i].status,
                            status_name: myGuessCbData[i].status_name,
                            team_name: myGuessCbData[i].team_name,
                            team_odds: myGuessCbData[i].team_odds,
                            updated_at: myGuessCbData[i].updated_at,
                            times: Date.parse(new Date(myGuessCbData[i].updated_at)) / 1000,
                            cais: {
                                chip: myGuessCbData[i].chip,
                                income: parseInt(myGuessCbData[i].income),
                            },
                            cards_data: {
                                chip: 0,
                                income: 0,
                            },
                            cards: [],
                        }
                        state.myGuessDataList.push(params);
                    }
                } else {
                    let myGuessCbData = payload.payloadData.items;
                    let myGuessTotalData = state.myGuessDataList;
                    Object.keys(myGuessCbData).forEach((key) => {
                        let isHaveguessId = false;
                        Object.keys(myGuessTotalData).forEach((index) => {
                            if (myGuessCbData[key].guess_id == myGuessTotalData[index].guess_id && myGuessCbData[key].option == myGuessTotalData[index].option) {
                                isHaveguessId = true;
                                myGuessTotalData[index].total_chips += parseInt(myGuessCbData[key].chip)
                                myGuessTotalData[index].total_income += parseInt(myGuessCbData[key].income);
                                myGuessTotalData[index].cais.chip += myGuessCbData[key].chip
                                myGuessTotalData[index].cais.income += parseInt(myGuessCbData[key].income);
                                myGuessTotalData[index].updated_at = myGuessCbData[key].updated_at;
                                myGuessTotalData[index].times = Date.parse(new Date(myGuessCbData[key].updated_at)) / 1000;
                            }
                        });
                        if (!isHaveguessId) {
                            let params = {
                                total_chips: myGuessCbData[key].chip,
                                total_income: parseInt(myGuessCbData[key].income),
                                game_id: myGuessCbData[key].game_id,
                                guess_id: myGuessCbData[key].guess_id,
                                guess_type_name: myGuessCbData[key].guess_type_name,
                                income_message: myGuessCbData[key].income_message,
                                match_name: myGuessCbData[key].match_name,
                                odds_type: myGuessCbData[key].odds_type,
                                option_type: myGuessCbData[key].option_type,
                                option: myGuessCbData[key].option,
                                options: myGuessCbData[key].options,
                                status: myGuessCbData[key].status,
                                status_name: myGuessCbData[key].status_name,
                                team_name: myGuessCbData[key].team_name,
                                team_odds: myGuessCbData[key].team_odds,
                                updated_at: myGuessCbData[key].updated_at,
                                times: Date.parse(new Date(myGuessCbData[key].updated_at)) / 1000,
                                cais: {
                                    chip: myGuessCbData[key].chip,
                                    income: parseInt(myGuessCbData[key].income),
                                },
                                cards_data: {
                                    chip: 0,
                                    income: 0,
                                },
                                cards: [],
                            }
                            state.myGuessDataList.push(params)
                        }
                    })
                }
            } else {
                if (!payload.payloadData) {
                    state.myguessCardsMore = false;
                } else if (payload.payloadData.meta == undefined) {
                    state.myguessCardsMore = false;
                } else {
                    state.myguessCardsMore = payload.payloadData.meta.has_more;
                }
                let myguessCardsdata = payload.payloadData.items;
                let myGuessTotalData = state.myGuessDataList;
                Object.keys(myguessCardsdata).forEach((key) => {
                    let isHaveguessId = false;
                    Object.keys(myGuessTotalData).forEach((index) => {
                        if (myguessCardsdata[key].guess_id == myGuessTotalData[index].guess_id && myguessCardsdata[key].option == myGuessTotalData[index].option) {
                            let totalDate = Date.parse(new Date(myGuessTotalData[key].updated_at));
                            let currentDate = Date.parse(new Date(myguessCardsdata[key].updated_at));
                            let times = new Date(totalDate >= currentDate ? totalDate : currentDate);
                            let years = times.getFullYear() + '-';
                            let months = (times.getMonth() + 1) < 10 ? ('0' + (times.getMonth() + 1) + '-') : (times.getMonth() + 1) + '-';
                            let days = times.getDate() < 10 ? ('0' + times.getDate() + ' ') : times.getDate() + ' ';
                            let hours = times.getHours() < 10 ? ('0' + times.getHours() + ':') : times.getHours() + ':';
                            let minutes = times.getMinutes() < 10 ? ('0' + times.getMinutes() + ':') : times.getMinutes() + ':';
                            let seconds = times.getSeconds() < 10 ? ('0' + times.getSeconds()) : times.getSeconds();
                            let updateTime = years + months + days + hours + minutes + seconds;
                            isHaveguessId = true;
                            myGuessTotalData[index].total_chips += parseInt(myguessCardsdata[key].chip);
                            myGuessTotalData[index].total_income += parseInt(myguessCardsdata[key].income);
                            myGuessTotalData[index].cards = myGuessTotalData[index].cards.concat(myguessCardsdata[key].cards);
                            myGuessTotalData[index].cards_data.chip += parseInt(myguessCardsdata[key].chip);
                            myGuessTotalData[index].cards_data.income += parseInt(myguessCardsdata[key].income);
                            // cardsData=

                            myGuessTotalData[index].updated_at = updateTime;
                            myGuessTotalData[index].times = times / 1000;
                        }
                    });
                    if (!isHaveguessId) {
                        let params = {
                            total_chips: parseInt(myguessCardsdata[key].chip),
                            total_income: parseInt(myguessCardsdata[key].income),
                            game_id: myguessCardsdata[key].game_id,
                            guess_id: myguessCardsdata[key].guess_id,
                            guess_type_name: myguessCardsdata[key].guess_type_name,
                            income_message: myguessCardsdata[key].income_message,
                            match_name: myguessCardsdata[key].match_name,
                            odds_type: myguessCardsdata[key].odds_type,
                            option_type: myguessCardsdata[key].option_type,
                            option: myguessCardsdata[key].option,
                            options: myguessCardsdata[key].options,
                            status: myguessCardsdata[key].status,
                            status_name: myguessCardsdata[key].status_name,
                            team_name: myguessCardsdata[key].team_name,
                            team_odds: myguessCardsdata[key].team_odds,
                            updated_at: myguessCardsdata[key].updated_at,
                            times: Date.parse(new Date(myguessCardsdata[key].updated_at)) / 1000,
                            cais: {
                                chip: 0,
                                income: 0,
                            },
                            cards_data: {
                                chip: parseInt(myguessCardsdata[key].chip),
                                income: parseInt(myguessCardsdata[key].income),
                            },
                            cards: myguessCardsdata[key].cards,
                        }
                        state.myGuessDataList.push(params);
                    }

                })
            }
            state.myguessReload = true;
            return state.myGuessDataList = state.myGuessDataList.sort((a, b) => {
                let x = a.times;
                let y = b.times;
                // return a.times < b.times
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            })
        },
        //我的预测当前页数
        mutationMyguessPage: function(state, payload) {
            state.myguessPage = payload
        },
        //我的预测是否加载完毕
        mutationMyguessReload: function(state, payload) {
            state.myguessReload = payload;
        },
        mutationGuessMainData: function(state, payload) {
            state.guessMainData = payload;
        },
        mutationMyGuessHoverData: function(state, payload) {
            state.myGuessHoverData = state.myGuessDataList[payload];
        },
        mutationChoiceBoxNodeIndex: function(state, payload) {
            state.choiceBoxNodeIndex = payload;
        },
        mutationSetGuessValue: function(state, payload) {
            state.setGuessValue = payload;
            if (payload.oddsType != 2) {
                let datas = {
                    guess_id: payload.guessId
                }
                this.dispatch("richRank", datas)
            } else {
                this.commit("richRank", null)
            }
        },
        mutationIsSendDispath: function(state, payload) {
            state.isSendDispath = payload;
        },
        mutationIsIndex: function(state, payload) {
            state.isIndex = payload;
        },
        mutationIsUpdatedData: function(state, payload) {
            state.isUpdatedData = payload;
        },
        mutationIsShowRecharge: function(state, payload) {
            state.isShowRecharge = payload
        },
        mutationIsSaveReachargePath: function(state, payload) {
            state.isSaveReachargePath = payload
        },
        mutationScrolltopValue: function(state, payload) {
            state.scrolltopValue = payload
        },
        mutationMygrandGuessData(state, payload) {
            if (payload) {
                // state.mygrandGuessData = payload.items;
                let mygrandGuessData = payload.items
                for (var i = 0; i < mygrandGuessData.length; i++) {
                    mygrandGuessData[i].short_date = mygrandGuessData[i].short_date.split(' ');
                    if (i > 3) {
                        mygrandGuessData.splice(i, 1)

                    }
                }

                return state.mygrandGuessData = mygrandGuessData;
            }


        },
        mutationsisUpdateOdds(state, payload) {
            state.isUpdateOdds = payload;
        },
        mutationsisShowNewsOdds(state, payload) {
            state.isShowNewsOdds = payload;
        },
        mutationsisShowNewsdesc(state, payload) {
            state.isShowNewsDesc = payload;
        },

    }

};
export default match;