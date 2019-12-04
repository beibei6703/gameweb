import Http from "./../common/http";
import { S_IFIFO } from "constants";
let turntable = {
    state: {
        // joinRecordData: [], //参与记录
        mineJoinMessage: {
            play_times: 0,
            win_times: 0,
            win_rate: 0
        }, //我的参与的一些信息
        winerUserData: [], // 获胜玩家记录
        mybetData: null, // 我的投注
        isWinChance: 0, // 获胜概率
        recordPage: 1, //页数
        isShowNext: true, //页数
        isreload: true, //是否请求接口
        turnData: null, //转盘的数据
        historyWinnerData: null, //历史获奖记录
        turnCountTime: 60, //倒计时
        countDownTime: null, //倒计时
        isShowCountTime: false, //是否进行倒计时
        isShowCurrentTime: true, //页面是否显示当前的倒计时渲染
        isShowWinnerPlayer: false, //页面是否显示中奖者渲染
        isShowAnimateBg: false, //页面是否显示抽奖动画背景
        isShowindicator: true, //页面是否执行指针动画
        isShowAnimation: false, //页面是否显示抽奖动画
        isShowJoinBtn: true, //页面是否显示我要参加按钮
        isShowPull: false, //页面是否显示我的道具和投入道具
        isShowThird: true, //页面是否显示奖池、我的投注、历史中奖记录
        isShowRecordRender: false, //页面是否参与记录
        mybagData: [], //我的背包数据
        participantData: null, //参与人数据
        joinInplayerData: null, //参与人动画数据
        joinData: [], //参与人动画数据
        pushToolData: [], //投入道具数据
        singerPushIconValue: 0, //单次预测碎片的价值
        mineBetCardsLen: 0, //单次预测道具的个数
        rewardMainValue: 0, //奖池里面的总价值
        minebetValue: 0, //我已投注的价值
        minePushValue: 0, //我投入的价值
        cardsData: {}, //预测的投入参数
        winnerId: null, //获奖者的id
        winnerData: null, //获奖者的信息
        joinPeopleNum: 0, //参与的人数
        WebSocketPid: 0, //获取WebSocket的pid
        isUploadData: false, //是否刷新数据呢
        isAnimationLeft: false, //left的显示
        talkingData: null, //聊天数据
        WebSocketData: null, //获取WebSocket的数据
        rewardPoolData: null, //奖品池的数据
        rewardPoolLen: 0, //奖品池的数量
        WinnerParamsData: null, //中奖者的信息
        mineId: null, //我的id,
        additionalData: null, //当局的额外奖励
        turntableStatus: null, //转盘的状态
        recordTabsType: 2 //参与记录的选项卡状态
    },
    actions: {
        //参与记录
        actionJoinRecord: function(store) {
            Http.get("/wheel/getUserData")
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("mutationjoinRecordData", response.data.data);
                    }
                })
                .catch(Http.onError);
        },
        //获胜玩家记录
        actionWinerUser: function(store, payload) {
            Http.get("/wheel/getUserRecord", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("mutationWinerUserData", response.data.data);
                        store.commit("mutationIsreload", true);
                    } else {
                        store.commit("mutationIsreload", false);
                    }
                })
                .catch(Http.onError);
        },
        //我的投注
        actionUserNowChips: function(store) {
            Http.get(`/wheel/getUserNowChips?type=1`).then(response => {
                console.log("我的投注数据", response);
                if (response.data.code == 0) {
                    store.commit("mutationMybetData", response.data.data);
                }
            });
        },
        //获取数据
        actionWheeldata: function(store, payload) {
            Http.get("/wheel/getData", payload).then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationTurnData", response.data.data);
                    store.commit("mutationParticipantData", response.data.data.play_data);
                    store.commit("mutationTurnCountTime", response.data.data);
                    store.commit("mutationRewardPoolData", response.data.data.pool);
                    store.commit(
                        "mutationHistoryWinnerData",
                        response.data.data.win_record
                    );
                    store.commit("mutationAdditionalData", response.data.data.bonus);
                    store.commit("mutationTurntableStatus", response.data.data.status);
                }
            });
        },
        //获取我的背包数据
        actionMybagdata: function(store) {
            console.log("我请求了吗");
            Http.get("/shop/package").then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationMybagData", response.data.data);
                }
            });
        },
        //获取聊天数据
        actionTalkingdata: function(store, payload) {
            Http.get("/wheel/getChatMsg", payload).then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationTalkingData", response.data.data);
                }
            });
        }
    },
    mutations: {
        //参与记录
        mutationjoinRecordData: function(state, payload) {
            console.log("我的参与信息", payload);
            state.mineJoinMessage = {
                play_times: payload.play_times,
                win_times: payload.win_times,
                win_rate: payload.win_rate,
                income_day: payload.income_day,
                income_week: payload.income_week
            };
        },
        //获胜玩家记录
        mutationWinerUserData: function(state, payload) {
            console.log("获胜玩家记录", state.winerUserData);
            if (!payload) {
                return (state.winerUserData = payload);
            }
            var data = payload.items;
            if (
                state.winerUserData == null ||
                state.winerUserData.length == 0 ||
                payload.page == 1
            ) {
                state.winerUserData = data;
            } else {
                state.winerUserData = state.winerUserData.concat(data);
            }
            if (payload && payload.items.length > 0) {
                state.isShowNext = payload.meta.has_more;
            } else {
                state.isShowNext = false;
            }
        },
        //我的投注
        mutationMybetData: function(state, payload) {
            if (!payload) {
                state.mineBetCardsLen = 0;
                state.minebetValue = 0;
                state.mybetData = {
                    chips: [],
                    chips_c: 0,
                    chips_count: 0,
                    winRate: 0
                };
                state.isWinChance = 0;
                return;
            } else {
                state.mineBetCardsLen = 0;
                state.minebetValue = 0;
                state.mybetData = payload;
                state.isWinChance = payload.winRate * 100;
                if (state.mybetData) {
                    Object.keys(state.mybetData.chips).forEach(key => {
                        if (state.mybetData.chips[key].id == 0) {
                            state.mineBetCardsLen++;
                        } else {
                            state.mineBetCardsLen += state.mybetData.chips[key].count;
                        }
                    });
                    state.minebetValue = payload.chips_c;
                } else {
                    state.mineBetCardsLen = 0;
                    state.minebetValue = 0;
                }
            }
        },
        mutationAdditionalData: function(state, payload) {
            state.additionalData = payload;
        },
        mutationTurntableStatus: function(state, payload) {
            state.turntableStatus = payload;
            if (payload == 'end') {
                state.turnCountTime = 60;
            }
        },
        //参与记录的页数
        mutationRecordPage: function(state, payload) {
            state.recordPage = payload;
        },
        //参与记录是否加载完毕
        mutationIsreload: function(state, payload) {
            state.isreload = payload;
        },
        //获取数据
        mutationTurnData: function(state, payload) {
            console.log("turnData", payload);
            if (!payload) {
                state.rewardMainValue = 0;
                state.joinPeopleNum = 0;
                return;
            }
            state.turnData = payload;
            state.turnCountTime = payload.count_down;
            state.joinPeopleNum = payload.player_num;
            if (payload) {
                state.rewardMainValue = payload.pool_cai;
            } else {
                state.rewardMainValue = 0;
                state.joinPeopleNum = 0;
            }
            //如果奖池里的奖品到达100个时间重置为10s
            if (payload.pool_num >= 100) {
                this.commit("mutationIsShowCountTime", true);
                this.commit("mutationIsShowRender", { type: 4 });
            }
            if (payload.player_num > 1) {} else {
                this.commit("mutationIsShowCountTime", false);
            }
        },
        mutationHistoryWinnerData: function(state, payload) {
            state.historyWinnerData = [];
            let dataArray = payload;
            let params;
            for (var i = 0; i < dataArray.length; i++) {
                (params = {
                    win_rate: parseFloat(dataArray[i].win_rate.slice(0, 5) * 100),
                    name: dataArray[i].winner.name,
                    level: dataArray[i].winner.level,
                    avatar: dataArray[i].winner.avatar,
                    reward_cai: dataArray[i].reward_cai,
                    date: dataArray[i].date,
                    reward: {
                        cards: dataArray[i].reward.cards,
                        debris: dataArray[i].reward.debris,
                        bonus: dataArray[i].reward.bonus
                    }
                }),
                state.historyWinnerData.push(params);
            }
        },
        mutationRewardPoolData: function(state, payload) {
            state.rewardPoolData = payload;
            state.rewardPoolLen = payload.length;
        },
        //参与人数数据
        mutationParticipantData: function(state, payload) {
            state.participantData = [];
            let participantArray = payload;
            let participantData = [],
                params;
            console.log('我接收的排行榜', payload)
                // if (participantArray) {
            Object.keys(participantArray).forEach(key => {
                params = {
                    id: key,
                    avatar: participantArray[key].avatar,
                    chips_cai: parseFloat(participantArray[key].chips_c != undefined ? participantArray[key].chips_c : participantArray[key].chips_cai),
                    chips_num: participantArray[key].chips_num,
                    level: participantArray[key].level,
                    name: participantArray[key].name,
                    vip_level: participantArray[key].vip_level
                };
                participantData.push(params);
            });
            state.joinPeopleNum = participantData.length
            if (state.joinPeopleNum > 1) {
                state.participantData = participantData.sort((a, b) => {
                    return a.chips_cai < b.chips_cai;
                });
            } else {
                state.participantData = participantData;
            }
            // }
        },
        //参与人动画数据
        mutationJoinInplayerData: function(state, payload) {
            if (payload) {
                state.joinInplayerData = [];
                let joinPeopleData = payload;
                if (payload.length != 0) {
                    let multiple = Math.ceil(100 / joinPeopleData.length);
                    for (let j = 0; j < multiple; j++) {
                        state.joinInplayerData = state.joinInplayerData.concat(
                            joinPeopleData
                        );
                    }
                    for (var i = 0; i < state.joinInplayerData.length; i++) {
                        if (i > 99) {
                            state.joinInplayerData.splice(i, 1);
                        }
                    }
                    if (state.winnerData) {
                        // state.joinInplayerData[96] = state.winnerData
                        state.joinInplayerData[97] = state.winnerData;
                        // state.joinInplayerData[98] = state.winnerData
                    }
                }
            } else {
                state.joinInplayerData = [];
            }
        },
        //获取聊天数据
        mutationTalkingData: function(state, payload) {
            state.talkingData = payload;
        },

        //我的背包
        mutationMybagData: function(state, payload) {
            if (payload.type == undefined || !payload.type) {
                state.mybagData = payload;
            }
            if (payload.type == "push") {
                Object.keys(state.mybagData).forEach(key => {
                    if (state.mybagData[key].product_id == payload.product_id) {
                        if (payload.product_id == 0) {
                            state.mybagData[key].product_count =
                                state.mybagData[key].product_count - 100;
                        } else {
                            state.mybagData[key].product_count =
                                state.mybagData[key].product_count - 1;
                        }
                    }
                });
            } else {
                Object.keys(state.mybagData).forEach(key => {
                    if (state.mybagData[key].product_id == payload.product_id) {
                        if (payload.product_id == 0) {
                            state.mybagData[key].product_count =
                                state.mybagData[key].product_count + payload.product_count;
                            return state.mybagData;
                        } else {
                            state.mybagData[key].product_count =
                                state.mybagData[key].product_count + 1;
                            return state.mybagData;
                        }
                    }
                });
            }
        },
        //投入道具数据
        mutationPushToolData: function(state, payload) {
            let isHaveIcon = true;
            if (!payload) {
                state.pushToolData = [];
                state.minePushValue = 0;
                state.singerPushIconValue = 0;
                state.cardsData = {};
                return;
            }
            if (payload.type == "push") {
                if (payload.product_id != 0) {
                    let isAdd = false;
                    state.pushToolData.push({
                        product_id: payload.product_id,
                        product_count: 1,
                        product_cprice: payload.product_cprice,
                        product_name: payload.product_name,
                        product_pic: payload.product_pic,
                        quality: payload.quality
                    });
                    state.minePushValue += parseInt(payload.product_cprice);
                    if (JSON.stringify(state.cardsData) == "{}") {
                        isAdd = false;
                    } else {
                        for (let key in state.cardsData) {
                            if (payload.product_id == key) {
                                isAdd = true;
                                console.log("我存在吗", key, payload.product_id);
                            }
                        }
                    }
                    console.log("isAdd", isAdd);
                    if (isAdd) {
                        state.cardsData[payload.product_id] =
                            parseInt(state.cardsData[payload.product_id]) + 1;
                    } else {
                        state.cardsData[payload.product_id] = 1;
                    }
                    console.log("预测的参数", JSON.stringify(state.cardsData));
                    return state.pushToolData;
                } else {
                    if (!state.pushToolData.length) {
                        isHaveIcon = false;
                    } else {
                        for (var i = 0; i < state.pushToolData.length; i++) {
                            if (state.pushToolData[i].product_id == 0) {
                                console.log(
                                    "我是push数量",
                                    state.pushToolData[i].product_count
                                );

                                state.pushToolData[i].product_count += 100;
                                state.pushToolData[i].product_cprice =
                                    state.pushToolData[i].product_count;
                                state.minePushValue += parseInt(payload.product_cprice);
                                if (state.pushToolData[i].product_count > 21000) {
                                    let dataOption = {
                                        masseges: "碎片单次投入最高限额为21,000",
                                        type: "2"
                                    };
                                    this.commit("isSigninPupopDis", true);
                                    this.commit("isSigninPupopDis", dataOption);
                                    state.pushToolData[i].product_count =
                                        parseInt(state.pushToolData[i].product_count) - 100;
                                    state.singerPushIconValue = parseInt(
                                        state.pushToolData[i].product_count
                                    );
                                    state.pushToolData[i].product_cprice =
                                        state.pushToolData[i].product_count;
                                    state.minePushValue += parseInt(payload.product_cprice);
                                    return state.pushToolData;
                                } else {
                                    console.log("我是else", state.pushToolData[i].product_count);
                                    state.singerPushIconValue = parseInt(
                                        state.pushToolData[i].product_count
                                    );
                                    return state.pushToolData;
                                }
                            } else {
                                isHaveIcon = false;
                            }
                        }
                    }
                    if (!isHaveIcon) {
                        state.pushToolData.push({
                            product_id: payload.product_id,
                            product_count: payload.product_count,
                            product_cprice: 100,
                            product_name: payload.product_name,
                            product_pic: payload.product_pic,
                            quality: payload.quality
                        });
                        state.singerPushIconValue = parseInt(payload.product_count);
                        state.minePushValue += parseInt(payload.product_cprice);
                        return state.pushToolData;
                    }
                }
            } else {
                state.minePushValue -= parseInt(payload.product_cprice);
                if (payload.product_id != 0) {
                    for (let key in state.cardsData) {
                        if (payload.product_id == key) {
                            console.log(key, state.cardsData[payload.product_id]);
                            state.cardsData[payload.product_id] =
                                parseInt(state.cardsData[payload.product_id]) - 1;

                            if (state.cardsData[payload.product_id] == 0) {
                                delete state.cardsData[payload.product_id];
                            }
                        }
                    }
                } else {
                    state.singerPushIconValue = 0;
                }
                console.log("我是delete的预测参数", JSON.stringify(state.cardsData));

                for (var i = 0; i < state.pushToolData.length; i++) {
                    if (state.pushToolData[i].product_id == payload.product_id) {
                        state.pushToolData.splice(i, 1);

                        return state.pushToolData;
                    }
                }
            }
        },
        //倒计时
        mutationTurnCountTime: function(state, payload) {
            if (!isNaN(payload)) {
                state.turnCountTime = payload;
            } else {
                state.turnCountTime = payload.count_down;
            }
            if (state.joinPeopleNum >= 2) {
                this.commit("mutationIsShowCountTime", true);
            } else {
                this.commit("mutationIsShowCountTime", false);
            }
        },
        mutationWinnerId: function(state, payload) {
            let self = this;
            state.winnerId = payload.winner;
            let joinPlayer = payload.player;
            console.log("我是多少呢", payload);
            let params = {};
            let joinData = [];
            let playParams;
            Object.keys(joinPlayer).forEach(key => {
                playParams = {
                    id: key,
                    name: joinPlayer[key].name,
                    level: joinPlayer[key].level,
                    avatar: joinPlayer[key].avatar,
                    chips_cai: joinPlayer[key].chips_cai
                };
                joinData.push(playParams);
            });
            if (payload.winner) {
                Object.keys(joinPlayer).forEach(key => {
                    if (payload.winner == key) {
                        params = {
                            id: key,
                            name: joinPlayer[key].name,
                            level: joinPlayer[key].level,
                            avatar: joinPlayer[key].avatar,
                            chips_cai: joinPlayer[key].chips_cai
                        };
                    }
                });
                state.winnerData = params;
                console.log("动画获奖者的信息", params);
                console.log("参与者动画数据", joinData);
                state.joinData = joinData;
                this.commit("mutationJoinInplayerData", joinData);
                let WinnerParams = {
                    win_rate: parseFloat(
                        parseInt(params.chips_cai) / parseInt(state.rewardMainValue)
                    ) * 100,
                    name: params.name,
                    level: params.level,
                    avatar: params.avatar,
                    reward_cai: payload.rewardC,
                    // rewardC: payload.rewardC,
                    // date: dataArray[i].date,
                    reward: {
                        cards: payload.reward.cards,
                        debris: payload.reward.debris,
                        bonus: payload.reward.bonus
                    }
                };
                state.WinnerParamsData = WinnerParams;
                console.log("历史记录获奖者的信息", state.WinnerParamsData);
                state.isShowJoinBtn = false;
                state.isShowPull = false;
                clearInterval(state.countDownTime);
                if (state.rewardPoolLen >= 100) {
                    let fnCountDown = null;
                    state.turnCountTime = 3;
                    fnCountDown = setInterval(() => {
                        state.turnCountTime--;
                        if (state.turnCountTime <= 0) {
                            state.turnCountTime = 0;
                            clearInterval(fnCountDown);
                            state.isShowAnimateBg = true;
                            state.isShowAnimation = true;
                            state.isShowindicator = true;
                            state.isShowCurrentTime = false;
                            self.commit("mutationIsShowRender", { type: 4 });
                            state.isAnimationLeft = true;
                            state.isShowJoinBtn = false;
                            state.isShowWinnerPlayer = false;
                            // state.minePushValue = 0;
                            state.MinebetValue = 0;
                            // state.MinePushToolValue = 0;
                            setTimeout(() => {
                                if (state.winnerId) {
                                    state.isAnimationLeft = false;
                                    state.isShowindicator = false;
                                    state.isShowWinnerPlayer = true;
                                    this.commit("mutationisUploadData", true);
                                }
                            }, 10000);
                        }
                    }, 1000);
                } else {
                    state.isShowAnimateBg = true;
                    state.isShowAnimation = true;
                    state.isShowindicator = true;
                    state.isShowCurrentTime = false;
                    self.commit("mutationIsShowRender", { type: 4 });
                    state.isAnimationLeft = true;
                    state.isShowJoinBtn = false;
                    state.isShowWinnerPlayer = false;
                    // state.minePushValue = 0;
                    state.MinebetValue = 0;
                    // state.MinePushToolValue = 0;
                    setTimeout(() => {
                        if (state.winnerId) {
                            state.isAnimationLeft = false;
                            state.isShowindicator = false;
                            state.isShowWinnerPlayer = true;
                            this.commit("mutationisUploadData", true);
                        }
                    }, 10000);
                }
            } else {
                state.winnerId = null;
                state.winnerData = null;
            }
        },
        //是否进行倒计时
        mutationIsShowCountTime: function(state, payload) {
            let self = this;
            if (!payload) return;

            console.log("我进来了吗", payload, state.joinPeopleNum);
            state.isShowCountTime = payload;
            // if (!state.isShowCountTime) return;
            if (state.joinPeopleNum >= 2) {
                console.log(state.joinPeopleNum, '是多少人呢', state.countDownTime)
                clearInterval(state.countDownTime);
                state.countDownTime = null;
                if (!state.countDownTime) {
                    state.countDownTime = setInterval(function() {
                        if (state.rewardPoolData.length >= 100) {
                            state.turnCountTime = 3;
                        }
                        if (state.turnCountTime > 0) {
                            state.turnCountTime--;
                        }
                        if (state.turnCountTime < 3) {
                            state.isShowJoinBtn = false;
                            state.isShowPull = false;
                        } else {
                            if (state.isShowCurrentTime) {
                                state.isShowJoinBtn = true;
                            }
                        }
                        if (state.turnCountTime <= 0) {
                            clearInterval(state.countDownTime);
                        }
                    }, 1000);
                }
            }
        },
        mutationIsShowRender: function(state, payload) {
            if (payload.type == 1) {
                state.isShowPull = true;
                state.isShowThird = true;
                state.isShowRecordRender = false;
            } else if (payload.type == 2) {
                state.isShowPull = false;
                state.isShowThird = true;
                state.isShowRecordRender = false;
            } else if (payload.type == 3) {
                state.isShowPull = false;
                state.isShowThird = false;
                state.isShowRecordRender = true;
            } else if (payload.type == 4) {
                state.isShowJoinBtn = false;
                state.isShowPull = false;
            }
        },
        mutationisUploadData: function(state, payload) {
            let self = this;
            state.isUploadData = payload;
            if (state.isUploadData) {
                let nowDate = new Date().getHours();
                setTimeout(() => {
                    let nowHours = new Date().getHours();
                    if (nowDate <= 23 && nowHours <= 23) {
                        let minePlayTimes = parseFloat(state.mineJoinMessage.play_times);
                        let mineWinTimes = parseFloat(state.mineJoinMessage.win_times);
                        let mineInmeDay = parseInt(state.mineJoinMessage.income_day);
                        let mineInmeWeek = parseFloat(state.mineJoinMessage.income_week);
                        let isHavePlay = false;
                        let joinArray = state.joinData;

                        for (var i = 0; i < joinArray.length; i++) {
                            if (state.mineId == joinArray[i].id) {
                                minePlayTimes++;
                                isHavePlay = true;
                            }
                        }
                        if (isHavePlay && state.turntableStatus !== "end") {
                            let is_win = 0;
                            // let bonus = state.additionalData,
                            //     chips = state.mybetData.chips,
                            //     chipsC = state.mybetData.chips_c,
                            //     date = '刚刚',
                            //     fee = 0,
                            //     is_win = 0,
                            //     reward = state.WinnerParamsData.reward.cards,
                            //     rewardC = state.WinnerParamsData.reward_cai,
                            //     win_rate = state.mybetData.winRate;
                            // let userParams = {
                            //     bonus: [],
                            //     chips: [],
                            //     chipsC: 0,
                            //     date: date,
                            //     fee: 0,
                            //     is_win: 0,
                            //     reward: [],
                            //     rewardC: 0,
                            //     win_rate: 0,

                            // }
                            if (state.winnerId == state.mineId) {
                                mineWinTimes++;
                                mineInmeDay += parseInt(state.WinnerParamsData.reward_cai);
                                mineInmeWeek += parseInt(state.WinnerParamsData.reward_cai);
                                self.dispatch("actionMybagdata");
                                self.commit("mutationPushToolData", null);
                                is_win = 1;
                            } else {
                                is_win = 0;
                                mineInmeDay -= parseInt(state.minebetValue);
                                mineInmeWeek -= parseInt(state.minebetValue);
                            }
                            let mineWinRate = parseFloat(
                                mineWinTimes / minePlayTimes
                            ).toFixed(2);
                            state.mineJoinMessage = {
                                play_times: minePlayTimes,
                                win_times: mineWinTimes,
                                win_rate: mineWinRate,
                                income_day: mineInmeDay,
                                income_week: mineInmeWeek
                            };
                            if (state.isShowRecordRender) {
                                state.recordPage = 1;
                                state.winerUserData = [];

                                // let winnerReward = state.WinnerParamsData.reward;
                                // let winnerDebris = state.WinnerParamsData.reward.debris;
                                // let rewardData = winnerReward.cards == undefined ? [] : winnerReward.cards;
                                // console.log('winnerDebris', rewardData, winnerReward.debris)
                                // if (winnerDebris != undefined && winnerDebris.length > 0) {
                                //     for (var i = 0; i < winnerDebris.length; i++) {
                                //         rewardData.push(winnerDebris[i])
                                //     }
                                // } else {
                                //     console.log('我没有碎片哦', winnerDebris, rewardData);
                                // }
                                // userParams = {
                                //         bonus: bonus == undefined ? [] : bonus,
                                //         chips: chips,
                                //         chipsC: chipsC,
                                //         date: date,
                                //         fee: fee,
                                //         is_win: is_win,
                                //         reward: rewardData,
                                //         rewardC: rewardC,
                                //         win_rate: win_rate,
                                //     }
                                // state.winerUserData.splice(0, 0, userParams)
                                if (state.recordTabsType == 2) {
                                    console.log("我是全部", is_win);
                                    let params = {
                                        status: "all",
                                        page: 1
                                    };
                                    self.dispatch("actionWinerUser", params);
                                    // state.winerUserData.splice(0, 0, userParams);
                                    // let winnerDataser = state.winerUserData
                                    // state.winerUserData = Array.from(new Set(winnerDataser))
                                } else if (state.recordTabsType == 0) {
                                    console.log("我是赢", is_win);
                                    if (is_win == 1) {
                                        let params = {
                                            status: "win",
                                            page: 1
                                        };
                                        self.dispatch("actionWinerUser", params);
                                        // state.winerUserData.splice(0, 0, userParams)
                                        // let winnerDataser = state.winerUserData
                                        // state.winerUserData = Array.from(new Set(winnerDataser))
                                    }
                                } else if (state.recordTabsType == 1) {
                                    console.log("我是输", is_win);
                                    if (is_win == 0) {
                                        let params = {
                                            status: "lose",
                                            page: 1
                                        };
                                        self.dispatch("actionWinerUser", params);
                                        // state.winerUserData.splice(0, 0, userParams)
                                        // let winnerDataser = state.winerUserData
                                        // state.winerUserData = Array.from(new Set(winnerDataser))
                                    }
                                }
                            }
                        }
                    } else {
                        self.dispatch("actionJoinRecord");
                    }
                    state.isShowindicator = false;

                    state.isShowJoinBtn = true;
                    state.isShowWinnerPlayer = false;
                    state.isShowCurrentTime = true;
                    state.isShowAnimation = false;
                    state.isUploadData = false;
                    state.winnerId = null;
                    state.winnerData = null;
                    state.participantData = [];
                    state.joinInplayerData = [];
                    state.rewardPoolData = [];
                    state.joinPeopleNum = 0;
                    state.joinData = [];
                    clearInterval(state.countDownTime);
                    state.countDownTime = null;
                    // state.minePushValue = 0;
                    state.MinebetValue = 0;
                    // state.MinePushToolValue = 0;
                    state.rewardMainValue = 0;
                    state.rewardPoolLen = 0;
                    state.isShowCountTime = false;
                    // self.commit('mutationJoinInplayerData', null);
                    // self.commit('mutationPushToolData', null)
                    self.commit("mutationMybetData", null);
                    state.isUploadData = false;
                    // if (state.WinnerParamsData.reward.debris.length > 1) {
                    //     state.WinnerParamsData.reward.debris = state.WinnerParamsData.reward.debris.splice(0, 1)
                    // }
                    if (state.turntableStatus !== "end") {
                        state.historyWinnerData.splice(0, 0, state.WinnerParamsData);
                        if (state.historyWinnerData.length > 10) {
                            state.historyWinnerData.splice(10, 1);
                        }
                    }
                    state.isUploadData = false;
                }, 4000);
            }
        },
        mutationWebSocketData: function(state, payload) {
            state.WebSocketData = payload;
            let self = this;
            if (payload.pid != undefined) {
                if (payload.pid == 2) {
                    console.log('我是预测了吗444', state.turntableStatus);
                    state.turntableStatus = "start";
                    if (state.rewardPoolLen >= 100) {
                        state.turnCountTime = 3;
                    } else {
                        let isHaveMine = false;
                        let betRank = payload.data.bet_rank;
                        this.commit('mutationParticipantData', betRank)
                        for (var i = 0; i < payload.data.chips.length; i++) {
                            state.rewardPoolData.push(payload.data.chips[i]);
                        }
                        Object.keys(betRank).forEach((key) => {
                            if (key == state.mineId) {
                                isHaveMine = true;
                            }
                        })
                        if (!isHaveMine) {
                            state.rewardMainValue = parseInt(state.rewardMainValue) + parseInt(payload.data.chips_cai);
                            state.rewardPoolLen = state.rewardPoolData.length;
                            state.joinPeopleNum = state.participantData.length;
                            if (state.joinPeopleNum >= 2) {
                                clearInterval(state.countDownTime);
                                state.countDownTime = null;
                                self.commit("mutationIsShowCountTime", true);
                            }
                            // console.log()
                            return;
                        } else {
                            // this.commit('mutationPushToolData', null)
                            setTimeout(() => {
                                state.rewardMainValue = parseInt(state.rewardMainValue) + parseInt(payload.data.chips_cai);
                                state.rewardPoolLen = state.rewardPoolData.length;
                                state.joinPeopleNum = state.participantData.length;
                                if (state.joinPeopleNum >= 2) {
                                    clearInterval(state.countDownTime);
                                    state.countDownTime = null;
                                    self.commit("mutationIsShowCountTime", true);
                                }
                            }, 100);
                            return;

                        }

                    }
                } else if (payload.pid == 3) {
                    this.commit("mutationWinnerId", payload.data);
                    state.isShowCountTime = false;
                    clearInterval(state.countDownTime);

                    state.countDownTime = null;
                    // state.minePushValue = 0;
                    state.MinebetValue = 0;
                    // state.MinePushToolValue = 0;
                } else if (payload.pid == 1) {
                    state.turntableStatus = "start";
                    clearInterval(state.countDownTime);
                    state.countDownTime = null;
                    this.commit("mutationIsShowCountTime", true);
                } else if (payload.pid == 5) {
                    state.turnCountTime = payload.data.count_down;
                    state.isUploadData = false;
                } else if (payload.pid == 4) {
                    // this.commit('mutationIsShowCountTime', false);
                    state.turnCountTime = payload.data.count_down;
                    console.log('我是结算了吗444', state.turntableStatus);
                    if (state.turntableStatus == 'end') {
                        console.log('我是结算了吗', state.turntableStatus);
                        state.isShowCountTime = false;
                        state.isShowindicator = false;
                        state.isShowJoinBtn = true;
                        state.isShowWinnerPlayer = false;
                        state.isShowCurrentTime = true;
                        state.isShowAnimation = false;
                        state.isUploadData = false;
                        state.winnerId = null;
                        state.winnerData = null;
                        state.participantData = [];
                        state.joinInplayerData = [];
                        state.rewardPoolData = [];
                        state.joinPeopleNum = 0;
                        state.joinData = [];
                        clearInterval(state.countDownTime);
                        state.countDownTime = null;
                        state.minePushValue = 0;
                        state.MinebetValue = 0;
                        state.rewardMainValue = 0;
                        state.rewardPoolLen = 0;
                        state.isShowCountTime = false;
                        this.commit("mutationMybetData", null);
                        return;
                    }
                    state.isShowCountTime = false;
                    clearInterval(state.countDownTime);
                    state.countDownTime = null;
                    state.turntableStatus = "wait";
                    state.additionalData = payload.data.bonus == undefined ? [] : payload.data.bonus;

                    state.isUploadData = false;
                }
            } else {
                state.turntableStatus = "wait";
            }
        },
        mutationMineId: function(state, payload) {
            state.mineId = payload;
        },
        mutationRecordTabsType: function(state, payload) {
            state.recordTabsType = payload;
        }
    }
};
export default turntable;