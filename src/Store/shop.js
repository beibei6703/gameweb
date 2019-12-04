import Http from "./../common/http";
//  商城mall
const TOOLS_LIST = "tools_list";
const CARDS_LIST = "cards_list";
const LOL_LIST = "lol_list";
const DOTA_LIST = "dota_list";
const COMPOSE_LOL = "compose_lol";
const COMPOSE_DOTA = "compose_dota";
const COMPOSE_BTN = "compose_btn";
const POP_GETBTN = "pop_getbtn";
const POP_BUYBTN = "pop_buybtn";
const CARDS_BUYBTN = "cards_buybtn";
const MYBAG = "mybag";
const GETLIST = "getList";
const GETNEWS = "getNews";
const GET_REWARD = "get_reward";
const GET_NEWREWARD = "get_newreward";
const ACHIEVMENT_LIST = "achievment_list";
const MYBAG_POP = "maybag_pop";
const GAME_LSIT = "game_list";
const SELF = "self";
const USERLIST = "userlist";
// const ISERROR = 'iserror'
// const TOOLS_POP = 'tools_pop';
const FREETURNSELF = "freeturnself";
const TREASURE_BOX_MUT = "treasureBoxMut"; //商城-宝箱-列表
const BAG_TREASURE_MUT = "bag_treasure_mut"; //我的背包-宝箱-列表

const TREASURE_DIA_MUT = 'treasureDia'; //背包-宝箱-使用-弹窗-状态

const OPEN_TREASURE_MUT = 'openTreasureMut'; //背包-宝箱-使用成功-包裹列表
const shop = {
    state: {
        // 商城mall
        self: null, //商城余额
        selfMine: 0, //商城余额
        tools_list: null, // 商城道具卡
        cards_list: null, // 商城道具卡
        lol_list: null, //商城英雄联盟
        dota_list: null, //商城DOTA2
        treasure_list: null, //商城-宝箱
        compose_lol: null, //合成英雄联盟
        compose_dota: null, //合成刀塔
        compose_btn: null, //合成碎片
        getList: null, //日常任务
        getNews: null, //新手任务
        get_reward: null, //日常任务奖励
        get_newreward: null, //新手任务奖励
        achievment_list: null, //成就
        game_list: null, //获取游戏区服
        pop_getbtn: null,
        pop_buybtn: null,
        tools_pop: null,
        userlist: null,
        maybag_pop: null, //背包品质框1
        mybag: null, //菜园我的背包
        dada: ";asjdklasjdkl",
        isShow: false,
        cards_buybtn: false,
        isCards: false,
        isCase: false,
        test: false,
        tan_kuang: false,
        givehide: false,
        //免费ROLL
        freeturnself: true,
        freeturndata: null,
        freeturnplayer: null, //免费roll参与人数据
        freeturnPools: null, //免费roll奖池
        winRecord: null,
        gametype: 2,
        gameIndex: 0,
        bag_treasure_list: null, //菜园-宝箱-列表
        treasureDiaShow: false, //菜园-宝箱-使用-宝箱物品弹窗
        treasureBoxList: null, //菜园-宝箱-使用成功-包裹列表
        freeturnTimes: 0, //免费roll倒计时
        countDownTime: null, //免费roll定时器
    },
    actions: {
        //免费ROLL数据
        freeturndata: function(store, payload) {
            console.log(payload, "qwe");
            Http.get("/freeWheel/getData", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        console.log(response.data, "asd");
                        store.commit('mutationsFreeturnTimes', response.data.data.count_down)
                        store.commit("getFreeturnData", response.data.data);
                        store.commit("mutationsFreeturnplayer", { type: 1, data: response.data.data.players });
                        store.commit("mutationsFreeturnPools", { type: 1, data: response.data.data.pool });
                    }
                })
                .catch(Http.onError);
        },
        //免费ROLL
        freeturnself: function(store, payload) {
            Http.get("/freeWheel/isCanJoin", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("getFreeturnself", response.data.data);
                    }
                })
                .catch(Http.onError);
        },
        // 商城mall
        userlist: function(store) {
            Http.get("/user/getByNickname")
                .then(response => {
                    store.commit("userlist", response.data.data);
                })
                .catch(Http.onError);
        },
        maybag_pop: function(store) {
            Http.get("/shop/product?category=1&page=1&size=1")
                .then(response => {
                    store.commit("maybag_pop", response.data.data.items);
                })
                .catch(Http.onError);
        },
        self: function(store) {
            Http.get("/self")
                .then(response => {
                    store.commit("self", response.data.data.cai);
                })
                .catch(Http.onError);
        },
        tools_list: function(store) {
            //商城下的道具卡
            Http.get("/shop/product?category=1&top=1&page=1&size=8")
                .then(response => {
                    store.commit("tools_list", response.data.data.items);
                })
                .catch(Http.onError);
        },
        lol_list: function(store) {
            //商城下的英雄联盟
            Http.get("/shop/product?category=1&page=1&size=12&game_id=2")
                .then(response => {
                    store.commit("lol_list", response.data.data.items);
                })
                .catch(Http.onError);
        },
        dota_list: function(store) {
            //商城下的DOTA2
            Http.get("/shop/product?category=1&page=1&size=12&game_id=1")
                .then(response => {
                    store.commit("dota_list", response.data.data.items);
                })
                .catch(Http.onError);
        },
        treasureBoxDis: function(store) {
            //商城下的虚拟卡
            Http.get("/shop/product?category=3&page=1&size=12")
                .then(response => {
                    store.commit("treasureBoxMut", response.data.data.items);
                })
                .catch(Http.onError);
        },
        cards_list: function(store) {
            //商城下的虚拟卡
            Http.get("/shop/product?category=2&page=1&size=12")
                .then(response => {
                    store.commit("cards_list", response.data.data.items);
                })
                .catch(Http.onError);
        },
        compose_lol: function(store) {
            //商城下的英雄联盟
            Http.get("/shop/product?category=1&page=1&size=8&game_id=2")
                .then(response => {
                    store.commit("compose_lol", response.data.data.items);
                })
                .catch(Http.onError);
        },
        compose_dota: function(store) {
            //商城下的英雄联盟
            Http.get("/shop/product?category=1&page=1&size=8&game_id=1")
                .then(response => {
                    store.commit("compose_dota", response.data.data.items);
                })
                .catch(Http.onError);
        },
        getList: function(store) {
            //日常任务
            Http.get("/dailyTask/getList")
                .then(response => {
                    for (var i in response.data) {
                        store.commit("getList", response.data[i]);
                    }
                })
                .catch(Http.onError);
        },
        getNews: function(store) {
            //日常任务
            Http.get("/task/getList")
                .then(response => {
                    for (var i in response.data) {
                        store.commit("getNews", response.data[i]);
                    }
                })
                .catch(Http.onError);
        },
        achievment_list: function(store) {
            //成就列表
            Http.get("/achievement/getList")
                .then(response => {
                    for (var i in response.data.data.list.common) {
                        store.commit("achievment_list", response.data.data.list.common);
                    }
                })
                .catch(Http.onError);
        },

        mybag: function(store) {
            //菜园我的背包
            Http.get("/shop/package")
                .then(response => {
                    store.commit("mybag", response.data.data);
                })
                .catch(Http.onError);
        },
        bag_treasure_dis: function(store) {
            //菜园我的背包-宝箱-列表
            Http.get("/shop/treasureBoxes")
                .then(response => {
                    store.commit("bag_treasure_mut", response.data.data);
                })
                .catch(Http.onError);
        },
        game_list: function(store, payload) {
            //菜园我的背包
            Http.get("/shop/game_server")
                .then(response => {
                    store.commit("game_list", response.data.data);
                })
                .catch(Http.onError);
        },
        openTreasure: function(store, payload) {
            //我的菜园-宝箱-使用宝箱
            console.log(payload, '使用宝箱')
            return Http.post("shop/treasureBoxes/open", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("openTreasureMut", response.data.data.items);
                    }
                    return response;
                })
                .catch(Http.onError);
        },
    },
    mutations: {
        // 商城道具卡
        [GAME_LSIT]: function(state, payload) {
            state.game_list = payload;
        },
        [SELF]: function(state, payload) {
            state.selfMine = payload;
        },
        [MYBAG_POP]: function(state, payload) {
            state.maybag_pop = payload;
        },
        [TOOLS_LIST]: function(state, payload) {
            //商城
            state.tools_list = payload;
        },
        [CARDS_LIST]: function(state, payload) {
            //商城
            state.cards_list = payload;
        },
        [POP_GETBTN]: function(state, payload) {
            //商城
            state.pop_getbtn = payload;
        },
        [POP_BUYBTN]: function(state, payload) {
            //商城
            state.pop_buybtn = payload;
        },
        [LOL_LIST]: function(state, payload) {
            //商城
            state.lol_list = payload;
        },
        [TREASURE_BOX_MUT]: function(state, payload) {
            //商城-宝箱
            state.treasure_list = payload;
        },
        [DOTA_LIST]: function(state, payload) {
            //商城
            state.dota_list = payload;
        },
        [CARDS_BUYBTN]: function(state, payload) {
            //商城虚拟卡
            state.cards_buybtn = payload;
        },
        [MYBAG]: function(state, payload) {
            //菜园我的背包
            state.mybag = payload;
        },
        [BAG_TREASURE_MUT]: function(state, payload) {
            //菜园我的背包-宝箱-列表
            state.bag_treasure_list = payload;
        },
        [COMPOSE_LOL]: function(state, payload) {
            //菜园我的背包合成英雄联盟
            state.compose_lol = payload;
        },
        [COMPOSE_DOTA]: function(state, payload) {
            //菜园我的背包合成刀塔
            state.compose_dota = payload;
        },
        [COMPOSE_BTN]: function(state, payload) {
            //菜园的背包合成功能
            state.compose_btn = payload;
        },
        [GETLIST]: function(state, payload) {
            //日常任务
            state.getList = payload;
        },
        [GETNEWS]: function(state, payload) {
            //新手任务
            state.getNews = payload;

            if (payload) {
                let isReceiveTask = true;
                console.log('payload', payload)
                Object.keys(payload).forEach((key) => {

                    if (payload[key].is_taken == 0) {
                        isReceiveTask = false;
                    }
                })


                setTimeout(() => {
                    this.commit('mutationisReceiveTask', isReceiveTask);
                    if (!this.state.isDialogShow.isCompleteAll && !this.state.isDialogShow.isShowExchangeNickname && !this.state.isDialogShow.isPathRoute) {
                        if(this.state.advertise.infoArr.length>0&&!this.state.advertise.isShow){

                            this.dispatch('getNewGuidanceDispatch', { guidanceNum: 3 });
                        }
                    }
                }, 300);
            }

        },
        [GET_REWARD]: function(state, payload) {
            //日常任务奖励
            state.get_reward = payload;
        },
        [GET_NEWREWARD]: function(state, payload) {
            //日常任务奖励
            state.get_newreward = payload;
        },
        [ACHIEVMENT_LIST]: function(state, payload) {
            //成就列表
            state.achievment_list = payload;
        },
        [USERLIST]: function(state, payload) {
            state.userlist = payload;
        },
        [FREETURNSELF]: function(state, payload) {
            state.freeturnself = payload;
        },
        test: function(state, payload) {
            state.isShow = payload;
        },
        isCards: function(state, payload) {
            state.isCards = payload;
        },
        isCase: function(state, payload) {
            state.isCase = payload;
        },
        mybag: function(state, payload) {
            state.mybag = payload;
        },
        tankuang: function(state, payload) {
            state.tan_kuang = payload;
        },
        givehide: function(state, payload) {
            state.givehide = payload;
        },
        getFreeturnself: function(state, payload) {
            console.log(payload, "是否可以参与");
            state.freeturnself = payload;
        },
        getFreeturnData: function(state, payload) {
            state.freeturndata = payload;
            state.winRecord = payload.win_record;
        },
        getfreeturntype: function(state, payload) {
            state.gametype = payload;
        },
        getGameIndex: function(state, payload) {
            state.gameIndex = payload;
        },
        treasureDia: function(state, payload) { //菜园-宝箱-使用-弹窗
            state.treasureDiaShow = payload;
        },
        [OPEN_TREASURE_MUT]: function(state, payload) {
            //背包-宝箱-试用成功-包裹列表
            state.treasureBoxList = payload;
        },
        mutationsFreeturnTimes(state, payload) {
            // console.log('我被赋值了么', payload)
            state.freeturnTimes = payload;
            clearInterval(state.countDownTime)
            state.countDownTime = null;
            if (!state.countDownTime) {
                state.countDownTime = setInterval(() => {
                    state.freeturnTimes--;
                    if (state.freeturnTimes <= 0) {
                        state.freeturnTimes = 0;
                        this.dispatch('freeturndata', { type: state.gametype });
                        this.dispatch('freeturnself', { type: state.gametype })
                        clearInterval(state.countDownTime);
                    }

                }, 1000)

            }
            console.log('倒计时', state.freeturnTimes)
            return state.freeturnTimes

        },
        mutationsFreeturnPools(state, payload) {
            if (payload.type == 1) {
                state.freeturnPools = payload.data;
            } else {
                state.freeturnPools
            }
        },
        mutationsFreeturnplayer(state, payload) {
            // state.freeturnplayer = payload;
            if (payload.type == 1) {
                state.freeturnplayer = payload.data;
            } else if (payload.type == 2) {

                state.freeturnplayer.push(payload.data);
                console.log('state.freeturnplayer', state.freeturnplayer)
            } else {
                state.freeturnplayer = payload.data;
            }
        },
        mutationsWinRecord(state, payload) {
            // state.freeturnplayer = payload;
            if (payload.type == 1) {
                state.winRecord = payload.data;
            } else {
                state.winRecord.unshift(payload.data)
                console.log('state.winRecord', state.winRecord)
            }
        },
    }
};

export default shop;