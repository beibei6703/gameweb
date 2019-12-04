import Http from "./../common/http";
import { S_IFIFO } from "constants";
let treasure = {
    state: {
        //参与记录
        isShowRecharge: false,
        isShowWechat: false,
        isShowLucky: false,
        isShowLuckyBagInfo: false,
        isShowTabcon: 1,
        isLoginAddActive: false,
        isShowEnergy: false,
        isShowMoneyNoEnough: {
            isShow: false,
            count: 1,
            paymoney: 5,
            payType: 1,
        },
        isSHowRules: false,
        isSHowMyRecord: false,
        energyData: null, //能量值
        freeCount: 1, //获取免费次数
        luckyBagData: [], //获取福袋的数据
        myCardsData: [], //我的道具卡
        myRecordData: [], //我的记录数据
        guessData: null, //赛事推荐数据
        lotteryData: [{
                src: 'https://imgcdn.api.com/images/treasure/tp1.png',
                name: 'C币',
                value: 200,
                id: '8000001',
                probability: '0'

            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp2.png',
                name: '珍宝钥匙',
                value: 3,
                id: '1000032',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp3.png',
                name: 'C币',
                value: 500,
                id: '8000001',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp4.png',
                name: '小红帽 安妮',
                value: 10,
                id: '1000001',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp5.png',
                name: '红牌退场 卡特',
                value: 20,
                id: '1000002',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp6.png',
                name: '黑暗骑士艾希',
                value: 49,
                id: '1000003',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp7.png',
                name: '西部牛仔 亚索',
                value: 69,
                id: '1000008',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp8.png',
                name: '星之守护者 阿狸',
                value: 99,
                id: '1000009',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp9.png',
                name: '女校长 剑姬',
                value: 129,
                id: '1000010',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp11.png',
                name: '守卫',
                value: 7,
                id: '1000035',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp10.png',
                name: '至尊皮肤礼包',
                value: 3999,
                id: '1000036',
                probability: '0'
            },

            {
                src: 'https://imgcdn.api.com/images/treasure/tp12.png',
                name: '风暴女神迦娜',
                value: 159,
                id: '1000011',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp13.png',
                name: '未来战士 伊泽瑞尔',
                value: 199,
                id: '1000012',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp14.png',
                name: '传奇一生 赵云',
                value: 260,
                id: '1000033',
                probability: '0'
            },
            {
                src: 'https://imgcdn.api.com/images/treasure/tp15.png',
                name: '龙的传人 李青',
                value: 1999,
                id: '1000036',
                probability: '0'
            },


        ], //抽奖奖品数据
        isMore: true, //是否存在下一页
        isReload: true, //是否加载完毕
        page: 1, //当前页数
        isStartRoll: false, //是否可以开始转动了
        endPrize: -1, //最终中奖位置
        isShowUpdate: true,
        historyData: null, //中奖记录数据
        isCanClickOne: true, //开启一次是否可以点击
        isCanClickTwelve: true, //12连开是否可以点击
        recordIndex: -1, //中奖的索引
        treasureMycai: 0, //我的菜币数量
    },
    actions: {
        //获取能量值
        actionsEnergyData(store) {
            Http.get('/activity/box/credits').then(response => {
                if (response.data.code == 0) {
                    // console.log('我的能量值', response.data)
                    store.commit('mutationsEnergyData', response.data)
                } else {
                    store.commit('mutationsEnergyData', 0)
                }
            }).catch(Http.onError);
        },
        //获取免费次数
        actionsFreeCount(store) {
            Http.get('/activity/box/freeCount').then(response => {
                if (response.data.code == 0) {
                    // console.log('我的能量值', response.data)
                    store.commit('mutationsFreeCount', response.data.data)
                }
            }).catch(Http.onError);
        },
        //获取我的道具卡
        actionsMycardsData(store) {
            Http.get("/shop/cards").then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationsMycardsData", response.data.data);
                } else {
                    store.commit("mutationsMycardsData", []);
                }
            }).catch(Http.onError);

        },
        actionsMyRecordData(store, payload) {
            Http.get('/activity/box/record', payload).then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationsMyRecordData", response.data.data);
                }
            }).catch(Http.onError);
        },
        actionsGuessData(store, payload) {
            Http.get("/guesses/list", payload).then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationsGuessData", response.data.data);
                }
            }).catch(Http.onError);
        },
        actionsProbability(store) {
            Http.get("/activity/box/config").then(response => {
                if (response.data.code == 0) {
                    store.commit("mutationsLotteryData", response.data.data);
                }
            }).catch(Http.onError);
        },
        actionsHistoryData(store) {
            Http.get("/chat/getBoxMessages").then(response => {
                console.log('response.data', response.data)
                if (response.data.code == 0) {
                    store.commit("mutationsHistoryData", response.data.data.messages);
                }
            }).catch(Http.onError);
        },
    },
    mutations: {
        //选项卡切换
        mutationsIsShowTabcon(state, payload) {
            if (payload == 2) {
                this.dispatch('actionsMycardsData');
                this.dispatch('actionsGuessData', {
                    game: 'all',
                    status: 'open',
                    page: 1,
                })
            }

            state.isShowTabcon = payload
        },
        //充值弹框
        mutationsIsShowRecharge(state, payload) {
            state.isShowRecharge = payload
        },
        //微信支付二维码
        mutationsIsShowWechat(state, payload) {
            state.isShowWechat = payload
        },
        //福袋
        mutationsIsShowLucky(state, payload) {
            state.isShowLucky = payload
        },
        //福袋打开之后
        mutationsIsShowLuckyBagInfo(state, payload) {
            state.isShowLuckyBagInfo = payload
        },
        //登录是否添加样式
        mutationsIsLoginAddActive(state, payload) {
            state.isLoginAddActive = payload
        },
        //显示能量不足
        mutationsIsShowEnergy(state, payload) {
            state.isShowEnergy = payload
        },
        //显示余额不足
        mutationsIsShowMoneyNoEnough(state, payload) {
            state.isShowMoneyNoEnough = payload
        },
        //显示规则介绍
        mutationsIsSHowRules(state, payload) {
            state.isSHowRules = payload
        },
        //显示我的记录
        mutationsIsSHowMyRecord(state, payload) {
            state.isSHowMyRecord = payload
            if (payload == true) {
                this.dispatch('actionsMyRecordData', {
                    page: 1,
                    size: 4,
                })
            }
        },
        mutationsEnergyData(state, payload) {
            state.energyData = payload
        },
        //获取福袋的数据
        mutationsLuckyBagData(state, payload) {
            state.luckyBagData = payload;
            let listdata = state.lotteryData;
            if (payload.length == 0) {
                return;
            }
            if (payload.length >= 1) {
                for (let i = 0; i < state.luckyBagData.length; i++) {
                    if (state.luckyBagData[i].num > 12) {
                        if (state.luckyBagData[i].num == 200) {
                            state.luckyBagData[i].product_pic = 'https://imgcdn.api.com/images/treasure/tp1.png'
                        } else if (state.luckyBagData[i].num == 300) {
                            // state.luckyBagData[i].product_pic = 'https://imgcdn.api.com/images/treasure/tp2.png'
                        } else if (state.luckyBagData[i].num == 500) {
                            state.luckyBagData[i].product_pic = 'https://imgcdn.api.com/images/treasure/tp3.png'
                        }
                    }
                }
            }
            if (payload.length == 1) {
                for (let i = 0; i < listdata.length; i++) {
                    if (payload[0].product_id == listdata[i].id) {
                        if (payload[0].num == 1) {
                            state.endPrize = i;
                        } else if (payload[0].num == listdata[i].value) {
                            state.endPrize = i
                            console.log('我的位置是什么', i, payload[0].num)
                            state.luckyBagData[0].product_pic = 'https://imgcdn.api.com/images/treasure/tp1.png'

                        } else if (payload[0].num == listdata[i].value) {
                            // state.endPrize = i
                            console.log('我的位置是什么', i, payload[0].num)
                                // state.luckyBagData[0].product_pic = 'https://imgcdn.api.com/images/treasure/tp2.png'

                        } else if (payload[0].num == listdata[i].value) {
                            state.endPrize = i;
                            console.log('我的位置是什么', i, payload[0].num)
                            state.luckyBagData[0].product_pic = 'https://imgcdn.api.com/images/treasure/tp3.png'

                        } else {
                            state.luckyBagData[0].product_pic = 'https://imgcdn.api.com/images/treasure/tp1.png'
                        }
                    }
                }

            }
            const shuffle = items => {
                for (var i = items.length - 1; i >= 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    [items[j], items[i]] = [items[i], items[j]];
                }
                return items;
            }

            shuffle(state.luckyBagData)

        },
        mutationsFreeCount(state, payload) {
            state.freeCount = payload;
        },
        mutationsMycardsData(state, payload) {
            state.myCardsData = payload;
        },
        mutationsMyRecordData(state, payload) {
            if (!payload) {
                state.myRecordData = [];
                state.isReload = true;
                state.isMore = true;
                state.page = 1;
                return
            }
            console.log('我的记录我来了么', payload)
            if (state.myRecordData.length == 0 || state.page == 1) {
                state.myRecordData = payload.items;
                state.isReload = true;
                state.isMore = payload.meta.has_more
            } else {
                state.myRecordData = state.myRecordData.concat(payload.items)
                state.isReload = true;
                state.isMore = payload.meta.has_more
            }

        },
        mutationsGuessData(state, payload) {
            state.guessData = payload;
        },
        mutationsLotteryData(state, payload) {
            let probabilityData = payload;
            Object.keys(probabilityData).forEach(key => {
                state.lotteryData[parseInt(probabilityData[key].key) - 1].probability = probabilityData[key].value
            })
        },
        mutationsIsStartRoll(state, payload) {
            state.isStartRoll = payload;
        },
        mutationsEndPrize(state, payload) {

            state.endPrize = payload;
        },
        mutationsIsShowUpdate(state, payload) {
            state.isShowUpdate = payload;
        },
        mutationsHistoryData(state, payload) {

            if (!state.historyData || state.historyData.length == 0) {
                state.historyData = payload;
            } else {
                state.historyData.unshift(payload)
            }
            for (let i = 0; i < state.historyData.length; i++) {
                let datas = state.historyData[i].content.split(',');
                state.historyData[i].datas = state.historyData[i].content.split(',');
                if (i > 20) {
                    state.historyData.splice(i, 1);
                }
            }
            console.log('中奖记录', state.historyData)
        },
        mutationsTreasurePage(state, payload) {
            state.page = payload
        },
        mutationsTreasureIsMore(state, payload) {
            state.isMore = payload
        },
        mutationsTreasureIsReload(state, payload) {
            state.isReload = payload
        },
        mutationsIsCanClickOne(state, payload) {
            state.isCanClickOne = payload;
        },
        mutationsIsCanClickTwelve(state, payload) {
            state.isCanClickTwelve = payload;
        },
        mutationsRecordIndex(state, payload) {
            state.recordIndex = payload;
        },
        mutationsTreasureMycai(state, payload) {
            state.treasureMycai = payload
        },
    }
};
export default treasure;