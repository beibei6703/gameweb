import Http from "./../common/http";
import pay from "./pay";
import {
    stringify
} from "qs";

const USERINFO_MUTATION = "userinfomutation";
const RECOMGOODS_MUTATION = "recomgoodsmutation";
const EXCHANGE_MUTAION = "exchangemutation";
const HOTNEWSLIST_MUTATION = "hotnewslistmutation";
const RICHLIST_MUTATION = "richlistmutation";
const BSWIPER_MUTATION = "bswipermutation";
const HOTCOMPETE_MUTATION = "hotcompetemutation";
const EVENTCENTER_MUTATION = "eventcentermutation";
const CHANGE_TITLE_MUTATION = "changetitlemutation";
const ISSIGNINDIA_SHOW_MUTATION = "isSigninDiaShowDis";
const CHECKIN_MUTATION = "checkinmutation";
const DAILYTASK_MUTATION = "dailytaskmutation";
const USERINFOSHOW_MUTATION = "userinfoshowmutation";
const CHECKINHARVEST_MUTATION = "checkinharvestmutation";
const CHECKINDIALOG_MUTATION = "checkindialogmutation";
const GETCHECKINDATA_MUTATION = "getCheckIndatamutation";
const GETCBCOMPETE_MUTATION = "getcbcompetemutation";
const QUIZZESLOG_MUTATION = "quizzeslogmutation";
const GETGUESSDATA_MUTATION = "getguessdatamutation";
const CBPAGETOTAL_MUTATION = "cbpagetotalmutation";
const LOSEPAGETOTAL_MUTATION = "losepagetotalmutation";
const WINPAGETOTAL_MUTATION = "winpagetotalmutation";
const GETCARDLOGS_MUTATION = "getcardlogsmutation";
const GETANOUNCEDATA_MUTATION = "getannouncedatamutation";
const GETSYSTEMDATA_MUTATION = "getsystemdatamutation";
const GETWORLDTALK_MUTATION = "getworldtalkmutation";
const POSTTALK_MUTATION = "posttalkkmutation";
const RUNNINGLIST_MUTATION = "runninglistmutation";
const MYGRANDTOP_MUTATION = "mygrandtopmutation";
const GETALLEAMIL_MUTATION = "getallemailmutation";
const GETUNREADEMAIL_MUTATION = "getunreademailmutation";
const GETREADEMAIL_MUTATION = "getreademailmutation";
const GETLOGONLOG_MUTATION = "getlogonlogmutation";
const EMAILDIALOG_CONTENT = "emaildialogcontent";
const BUYRECORDS_MUTATION = "buyrecordsmutation";
const USERECORDS_MUTATION = "userecordmutation";
const GIVERECORDS_MUTATION = "giverecordmutation";
const PAYRECORDS_MUTATION = "payrecordmutation";
const GIVEPAGE_MUTATION = "givepagemutation";
const CURRENTSIGNCOM = "currentsigncom";
const WOQUYAMUTATION = "woquyamutation";
const SUCCESSSTATUS = "successstatus";
const WORLDTALKSTATUS = "worldtakstatus";
const BACKENDCLOSE = "backendclose";
const ECHOSTATUSMU = "echostatusmu";
// const DAILYCHECKWIDTH = "dailycheckwidth";
const USERINFOWIDTHMU = "userinfowidthmu";
const USERINFOEXPMU = "userinfoexpmu";
const USERINFOCAIMU = "userinfocaimu";
const HAVETORECEIVE = "havetoreceive";
const EMPTYVALUE = "emptyvalue";
const HOMELIBG_MUTATION = "homelibgmutation";
// const DAILYCHECKDAY = "dailycheckday";
const WAIT_MUTATION = "wait30s";
const SWIPER_MUTATION = "swipermutation";
const LETITAUTOPLAY = "letitautoplay";
const LETTERSUCCESS = "lettersuccess";
const LEFTADMUTATION = "leftadmutation";

let home = {
    state: {
        title: "api", //网页title
        username: "",
        userinfolist: null, //用户信息
        recomgoodslist: null, //推荐商品
        announcelist: null, //公告
        talkcallinlist: null, //世界喊话
        systemmeglist: null, //系统消息
        exchangelist: null, //热门兑换
        hotnewslist: null, //热门资讯
        richlistofbefore: null, //财富榜
        bswiperlist: [], //banner 轮播
        hotcompetelist: [], //热门预测
        eventcenterlist: null, //赛事中心
        isSigninDiaShow: false, //签到弹窗显示
        checkininfo: null, //签到列表
        dailytask: null, //任务栏
        userinfoshowlist: null, //我的菜园-个人信息-用户基本信息
        checkindialoginfo: null, //我的菜园-个人信息-签到-弹窗信息
        getcheckindatalist: null, //我的菜园-个人信息-签到-节点信息
        getcheckinwidth: "1px", //我的菜园-签到初始宽度
        getcheckinday: 1, //我的菜园-签到初始天数
        hehehenum: 0, //跑马灯初始状态
        positionright: "30px", //跑马灯初始位置
        timers: null, //跑马灯定时器1
        timer: null, //跑马灯定时器
        getcbcompetelist: {
            //我的菜园-个人信息-预测-菜币预测
            items: [],
            meta: {
                total: 0,
                total_page: 0,
                has_more: false
            }
        },
        quizzesloglist: null, //我的菜园-个人信息-预测-预测日志
        getguessdatalist: null, //我的菜园-个人信息-预测-收益估值
        getannouncedatalist: null, //公告
        totalpages: {
            cballpages: 0,
            cblosepages: 0,
            cbwinpages: 0,
            popspages: 0,
            qlpages: 0,
            logpages: 0,
            buypages: 0,
            usepages: 0,
            givepages: 0,
            paypages: 0,
            emailpages: 0,
            readpages: 0,
            unreadpages: 0
        }, //我的菜园-个人信息-总页数
        getsystemdata: null, //系统消息
        getworldtalkdata: null, //世界喊话
        runninglist: null, //跑马灯
        mygrandtopdata: null, //我的菜园公共头部
        getallemaildata: null, //我的菜园-邮箱-全部
        getunreademaildata: null, //我的菜园-邮箱-未读
        getreademaildata: null, //我的菜园-邮箱-已读
        getlogonlog: null, //我的菜园-登录日志
        emaildialog: null, //我的菜园-邮箱-弹窗
        buyrecordsdata: null, //道具购买记录
        userecorddata: null, //道具使用记录
        giverecorddata: null, //赠送记录
        payrecorddata: null, //充值记录
        currentsign: [false, false, false, false, false], //初始签到状态
        htreceivedata: [false, false, false, false, false], //是否领取
        woquya: false, //签到
        whats: false, //领取失败
        worldtalkinfo: "", //世界喊话
        backendstatus: false, //世界喊话后台返回内容
        echostatus: 0, //
        userinfowidth: "1px", //我的菜园用户信息进度条
        userinfoexp: 0, //我的菜园经验值
        userinfocai: 0, //我的菜园金币
        isemptyvalue: false, //世界喊话-是否清空消息
        homeli: [false, false, false, false, false], //首页导航背景
        signclass: {
            thefirst: "treasurechest0",
            thesecond: "treasurechest1",
            thethird: "treasurechest2",
            thefourth: "treasurechest3",
            thefifth: "treasurechest4"
        },
        iswait30s: false, //世界喊话倒计时30s
        // canswiper:false,//测试是否能轮播
        swiperIndex: 1,
        swiperTime: null,
        bswiperautoplay: {
            delay: 2000,
            disableOnInteraction: false
        }, //轮播图自动播放
        //我的信息参数初始值
        myInforation: {
            page: 1,
            category: 0
        },
        myInforationer: null,
        myEmailPage: 0,
        //账户记录参数
        accoutRecord: {
            page: 1,
            size: 10
        },
        myAccountPage: null,
        accoutRecordData: null,
        lettersuccessed: false,
        leftaddata: null,
        isnoregister: false,
        isGuessHasMore: false,
        isCheckinRewardShow: false,
    },
    actions: {
        userinfo: function(store) {
            //用户信息
            Http.get("self")
                .then(response => {
                    store.commit("userinfomutation", response.data.data);
                })
                .catch(Http.onError);
        },
        announcedispatch: function(store) {
            //找到并删除
        },
        recomgoodslistdispatch: function(store) {
            //推荐商品
            Http.get("shop/product?category=1&hot=1&page=1&size=8")
                .then(response => {
                    store.commit("recomgoodsmutation", response.data.data.items);
                })
                .catch(Http.onError);
        },
        exchangedispatch: function(store) {
            //热门兑换(接口需更换)
            Http.get("shop/product?category=2&hot=1&page=1&size=4")
                .then(response => {
                    store.commit("exchangemutation", response.data.data.items);
                })
                .catch(Http.onError);
        },
        hotnewslistdispatch: function(store) {
            //热门资讯
            Http.get("news/list?page=1&size=9&is_hot=1&is_fixed_home=0")
                .then(response => {
                    store.commit("hotnewslistmutation", response.data.data.items);
                })
                .catch(Http.onError);
        },
        richlistdispatch: function(store) {
            //财富榜
            Http.get("rank/cai")
                .then(response => {
                    store.commit("richlistmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        bswiperdispatch: function(store) {
            //banner轮播
            Http.get("banner/list?location=home_slide")
                .then(response => {
                    store.commit("bswipermutation", response.data.data);
                })
                .catch(Http.onError);
        },
        hotcompetedispatch: function(store, payload) {
            //热门预测
            Http.get(`guesses/list?${stringify(payload)}`)
                .then(response => {
                    // store.commit("hotcompetemutation", response.data.data.items);
                    store.commit("hotcompetemutation", {
                        data: response.data.data.items,
                        currentPage: payload.page
                    });
                    store.commit(
                        "isGuessHasMoreMutation",
                        response.data.data.meta.has_more
                    );
                })
                .catch(Http.onError);
        },
        eventcenterdispatch: function(store) {
            //赛事中心
            Http.get("banner/list?location=home_right_banner")
                .then(response => {
                    store.commit("eventcentermutation", response.data.data);
                })
                .catch(Http.onError);
        },
        checkindispatch: function(store) {
            //我的菜园签到按钮
            Http.post("checkIn", {
                    type: 1
                })
                .then(response => {
                    store.commit("checkinmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        dailytaskdispatch: function(store) {
            //任务栏
            Http.get("dailyTask/getList")
                .then(response => {
                    store.commit("dailytaskmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        userinfoshowdispatch: function(store) {
            //我的菜园-个人信息-用户基本信息
            Http.get("self")
                .then(response => {
                    store.commit("userinfoshowmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        checkindialogdis: function(store, payload) {
            //我的菜园-个人信息-签到-弹窗信息
            Http.post("getCheckInReward", payload)
                .then(response => {
                    console.log(response.data, '瞅瞅你的样子');
                    if (response.data.code == -101) {
                        let dataOption = {
                            'masseges': '为了您的账户安全，请先绑定手机号',
                            'type': '2',
                        }
                        store.commit('isSigninPupopDis', true);
                        store.commit('isSigninPupopDis', dataOption);
                    } else {
                        store.commit("checkindialogmutation", response.data.data);
                        store.commit("checkinRewardShow", true);
                    }
                })
                .catch(Http.onError);
        },
        checkinprogessdispatch: function(store) {
            //我的菜园-个人信息-签到-节点信息
            Http.get(`getCheckInData?type=1`)
                .then(response => {
                    store.commit("getCheckIndatamutation", response.data.data);
                })
                .catch(Http.onError);
        },
        getcbcompetedis: function(store, payload) {
            //我的菜园-个人信息-预测-菜币预测
            Http.get(`guess/caiLogs?status=${payload.status}&page=${payload.page}`)
                .then(response => {
                    store.commit("getcbcompetemutation", response.data.data.items);
                    if (payload.status == "all") {
                        store.commit(
                            "cbpagetotalmutation",
                            response.data.data.meta.total_page
                        );
                    } else if (payload.status == "lose") {
                        store.commit(
                            "losepagetotalmutation",
                            response.data.data.meta.total_page
                        );
                    } else if (payload.status == "win") {
                        store.commit(
                            "winpagetotalmutation",
                            response.data.data.meta.total_page
                        );
                    }
                })
                .catch(Http.onError);
        },
        quizzeslogdis: function(store, payload) {
            //我的菜园-个人信息-预测-预测日志
            Http.get(`guess/logs?cursor=&guess_id=&page=${payload}`)
                .then(response => {
                    store.commit("quizzeslogmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        getguessdatadis: function(store) {
            //我的菜园-个人信息-预测-收益估值
            Http.get("getGuessData")
                .then(response => {
                    store.commit("getguessdatamutation", response.data.data);
                })
                .catch(Http.onError);
        },
        getcardlogsdis: function(store, payload) {
            //我的菜园-个人信息-道具预测
            Http.get(`guess/cardLogs?status=${payload.status}&page=${payload.page}`)
                .then(response => {
                    store.commit("getcardlogsmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        getannouncedatadis: function(store) {
            //公告
            Http.get("notice/list")
                .then(response => {
                    store.commit("getannouncedatamutation", response.data.data);
                })
                .catch(Http.onError);
        },
        getsystemdatadis: function(store) {
            //系统消息
            Http.get("chat/systemMessages")
                .then(response => {
                    store.commit("getsystemdatamutation", response.data.data);
                })
                .catch(Http.onError);
        },
        getworldtalkdis: function(store) {
            //世界喊话
            return Http.get("chat/broadcastMessages")
                .then(response => {
                    store.commit("getworldtalkmutation", response.data.data.messages);
                })
                .catch(Http.onError);
        },
        getworldtalkdata: function(store, message) {
            store.commit("getworldtalkmutation", message);
        },
        posttalkdis: function(store, payload) {
            //世界喊话--输入喊话内容
            Http.post("chat/broadcast", payload)
                .then(response => {
                    if (response.data.code == 42000) {
                        store.commit("backendclose", true);
                        store.commit("worldtakstatus", "您当前的C币不足");
                    } else if (response.data.code == 45000) {
                        // store.commit('backendclose',true)
                        // 倒计时30s
                        store.commit("wait30s", true);
                        // store.commit('worldtakstatus','操作太频繁，请稍后再试')
                    } else if (response.data.code == 41000) {
                        store.commit("backendclose", true);
                        store.commit("worldtakstatus", response.data.message);
                    } else if (response.data.code == 0) {
                        console.log("走几次呢");
                        store.commit("emptyvalue", true);
                        store.commit("wait30s", true);
                    } else if (response.data.code == 500) {
                        store.commit("backendclose", true);
                        store.commit("worldtakstatus", "系统开了个小差，请稍后再试");
                    }
                })
                .catch(Http.onError);
        },
        runninglistdis: function(store) {
            //跑马灯
            Http.get("marqueeLogs")
                .then(response => {
                    store.commit("runninglistmutation", response.data.data.messages);
                })
                .catch(Http.onError);
        },
        getemaildis: function(store, payload) {
            //我的菜园-邮箱
            Http.get(`messages`, payload)
                .then(response => {
                    store.commit("getMyInforation", response.data.data);
                    // console.log('我的邮箱记录',response.data.data.items)
                })
                .catch(Http.onError);

            // return Http.get(`messages?page=${payload.page}&size=10&category=${payload.category}`).catch(Http.onError);
        },
        getlogonlogdis: function(store, payload) {
            //登录日志
            Http.get(`loginHistories?page=${payload}`)
                .then(response => {
                    store.commit("getlogonlogmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        taghasbeenreaddis: function(store, payload) {
            //我的菜园-邮箱-标记已读
            Http.post("message/read", payload)
                .then(response => {
                    console.log(response.data, "标记已读成功了嘛");
                })
                .catch(Http.onError);
        },
        getrewardemaildis: function(store, payload) {
            //我的菜园-邮箱-领取
            console.log(payload, "领取一号");
            return Http.post("message/gifts", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("successstatus", true);
                    }
                    return response;
                })
                .catch(Http.onError);
        },
        getrewardgiftdis: function(store, payload) {
            //我的菜园-邮箱-礼物-领取
            console.log(payload, "领取2号");
            return Http.post("message/vipGift", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("successstatus", true);
                    }
                    return response;
                })
                .catch(Http.onError);
        },
        buyrecordsdis: function(store, payload) {
            //道具购买记录
            console.log("道具购买记录", payload);
            Http.get("userAccountChangeList", payload)
                .then(response => {
                    store.commit("buyrecordsmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        letterinstationdis: function(store, payload) {
            Http.post("message/send", payload)
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("lettersuccess", true);
                        store.commit("backendclose", true);
                        store.commit("worldtakstatus", "发送成功啦");
                    }
                    store.commit("backendclose", true);
                    store.commit("worldtakstatus", response.data.message);
                })
                .catch(Http.onError);
        },
        leftad: function(store, payload) {
            //左边广告
            Http.get("banner/list?location=home_left_ad")
                .then(response => {
                    store.commit("leftadmutation", response.data.data);
                })
                .catch(Http.onError);
        }
    },
    mutations: {
        [USERINFO_MUTATION]: function(state, payload) {
            //用户信息
            state.userinfolist = payload;
        },
        [RECOMGOODS_MUTATION]: function(state, payload) {
            //推荐商品
            state.recomgoodslist = payload;
        },
        [EXCHANGE_MUTAION]: function(state, payload) {
            //热门兑换
            state.exchangelist = payload;
        },
        [HOTNEWSLIST_MUTATION]: function(state, payload) {
            //热门资讯
            state.hotnewslist = payload;
        },
        [RICHLIST_MUTATION]: function(state, payload) {
            //财富榜
            state.richlistofbefore = payload;
        },
        [BSWIPER_MUTATION]: function(state, payload) {
            //banner 轮播
            state.bswiperlist = payload;
        },
        [HOTCOMPETE_MUTATION]: function(state, payload) {
            //热门预测
            if (payload.currentPage <= 1) {
                state.hotcompetelist = payload.data;
            } else {
                state.hotcompetelist = state.hotcompetelist.concat(payload.data);
            }
            console.log(state.hotcompetelist);
        },
        [EVENTCENTER_MUTATION]: function(state, payload) {
            //赛事中心
            state.eventcenterlist = payload;
        },
        [CHANGE_TITLE_MUTATION]: function(state, payload) {
            //改变网页title
            state.title = payload;
        },
        [ISSIGNINDIA_SHOW_MUTATION]: function(state, payload) {
            //弹窗显示与隐藏
            state.isSigninDiaShow = payload;
        },
        [CHECKIN_MUTATION]: function(state, payload) {
            //我的菜园签到按钮
            state.checkininfo = payload;
        },
        [DAILYTASK_MUTATION]: function(state, payload) {
            //任务栏
            state.dailytask = payload;
        },
        [USERINFOSHOW_MUTATION]: function(state, payload) {
            //我的菜园-个人信息-用户基本信息
            state.userinfoshowlist = payload;
            // state.userinfowidth = (payload.now_exp / payload.expect_exp) * 300 + "px";
            state.userinfowidth = (payload.now_exp / payload.expect_exp) * 480 + "px";
            state.userinfoexp = payload.now_exp;
            state.userinfocai = payload.cai;
        },
        dailycheckday(state) {
            //我的菜园-个人信息-签到-进度
            if (state.getcheckindatalist.this_month_count < 25) {
                state.getcheckinwidth = parseFloat(state.getcheckinwidth) + 30.32 + "px";
            } else {
                state.getcheckinwidth = parseFloat(state.getcheckinwidth) + 0 + "px";
            }
        },

        [CHECKINDIALOG_MUTATION]: function(state, payload) {
            //我的菜园-个人信息-签到-弹窗信息
            state.checkindialoginfo = payload;
        },
        [GETCHECKINDATA_MUTATION]: function(state, payload) {
            //我的菜园-个人信息-签到-节点信息
            state.getcheckindatalist = payload;
            if (payload.this_month_count <= 25) {
                if (state.getcheckinwidth >= "758px") {
                    state.getcheckinwidth = "758px";
                }
                state.getcheckinwidth = payload.this_month_count * 30.32 + "px";
            } else {
                state.getcheckinwidth = "758px";
            }
            state.woquya = payload.isCheckIn;
            if (state.getcheckinday >= 5 && payload.reward_state[1] == false) {
                state.currentsign[0] = true;
            } else {
                state.currentsign[0] = false;
            }
            if (state.getcheckinday >= 10 && payload.reward_state[2] == false) {
                state.currentsign[1] = true;
            } else {
                state.currentsign[1] = false;
            }
            if (state.getcheckinday >= 15 && payload.reward_state[3] == false) {
                state.currentsign[2] = true;
            } else {
                state.currentsign[2] = false;
            }
            if (state.getcheckinday >= 20 && payload.reward_state[4] == false) {
                state.currentsign[3] = true;
            } else {
                state.currentsign[3] = false;
            }
            if (state.getcheckinday >= 25 && payload.reward_state[5] == false) {
                state.currentsign[4] = true;
            } else {
                state.currentsign[4] = false;
            }
            state.getcheckinday = payload.this_month_count;
        },
        [GETCBCOMPETE_MUTATION]: function(state, payload) {
            //我的菜园-个人信息-预测-菜币
            state.getcbcompetelist = payload;
        },
        [QUIZZESLOG_MUTATION]: function(state, payload) {
            //我的菜园-个人信息-预测-预测日志
            state.quizzesloglist = payload.items;
            state.totalpages.qlpages = payload.meta.total_page;
        },
        [GETGUESSDATA_MUTATION]: function(state, payload) {
            //我的菜园-个人信息-预测-收益估值
            state.getguessdatalist = payload;
        },
        [CBPAGETOTAL_MUTATION]: function(state, payload) {
            //菜币总页数
            state.totalpages.cballpages = payload;
        },
        [LOSEPAGETOTAL_MUTATION]: function(state, payload) {
            //输总页数
            state.totalpages.cblosepages = payload;
        },
        [WINPAGETOTAL_MUTATION]: function(state, payload) {
            //赢总页数
            state.totalpages.cbwinpages = payload;
        },
        [GETCARDLOGS_MUTATION]: function(state, payload) {
            ////我的菜园-个人信息-道具预测
            state.getcardlogslist = payload.items;
            state.totalpages.popspages = payload.meta.total_page;
        },
        [GETANOUNCEDATA_MUTATION]: function(state, payload) {
            //公告
            state.getannouncedatalist = payload;
        },
        [GETSYSTEMDATA_MUTATION]: function(state, payload) {
            //系统消息
            state.getsystemdata = payload.messages;
            // console.log(state.getsystemdata.length,'state.getsystemdata.length')
        },
        [GETWORLDTALK_MUTATION]: function(state, payload) {
            //世界喊话
            state.getworldtalkdata = payload;
            console.log(state.getworldtalkdata, "东西哪去了");
        },
        [RUNNINGLIST_MUTATION]: function(state, payload) {
            //跑马灯
            var speed = 1147;
            var hahahnum = state.hehehenum;
            //获取数据
            if (state.runninglist) {
                state.runninglist.push(payload);
            } else {
                state.runninglist = payload;
            }
            var entertain = JSON.stringify(state.runninglist);
            localStorage.setItem("entertain", entertain);
            var getentertain = localStorage.getItem("entertain");
            var getentertains = JSON.parse(getentertain);
            for (var i = 0; i < payload.length; i++) {
                for (var j = 0; j < getentertains.length; j++) {
                    if (payload[i].id == getentertains[j].id) {
                        if (state.runninglist.length == 1) {
                            // if (state.getsystemdata.length >= 1) {
                            //     state.runninglist.splice(
                            //         state.runninglist.length - 1,
                            //         1,
                            //         state.getsystemdata[state.getsystemdata.length - 1]
                            //     );
                            // } else {}
                        } else {
                            state.runninglist.splice(i, 1);
                        }
                    }
                }
            }
            // if (state.runninglist.length == 1) {
            //     if (state.getsystemdata.length > 0) {
            //         state.runninglist.splice(
            //             state.runninglist.length - 1,
            //             1,
            //             state.getsystemdata[state.getsystemdata.length - 1]
            //         );
            //     } else {}
            // }
            // if (state.runninglist.length == 2) {
            //     if (state.getsystemdata.length > 0) {
            //         state.runninglist.push(
            //             state.getsystemdata[state.getsystemdata.length - 1]
            //         );
            //     } else {}
            // }
            // 每10s从当前列表中删除一条数据
            if (state.tiemr) {} else {
                state.tiemr = setInterval(() => {
                    if (state.runninglist.length > 1) {
                        state.runninglist.splice(0, 1);
                        state.hehehenum++;
                    } else {}
                }, 11470);
            }
            // 跑马灯滚动
            if (state.timers) {} else {
                state.timers = setInterval(function() {
                    if (speed <= 30) {
                        if (hahahnum < state.hehehenum) {
                            speed = 1147;
                            hahahnum = state.hehehenum;
                        }
                    } else {
                        speed = speed - 1;
                        state.positionright = speed + "px";
                    }
                }, 10);
            }
        },
        [MYGRANDTOP_MUTATION]: function(state, payload) {
            //我的菜园头部
            state.mygrandtopdata = payload;
        },
        [GETALLEAMIL_MUTATION]: function(state, payload) {
            //我的菜园-邮箱-全部
            state.getallemaildata = payload.items;
            state.totalpages.emailpages = payload.meta.total_page;
        },
        [GETUNREADEMAIL_MUTATION]: function(state, payload) {
            //我的菜园-邮箱-未读
            state.getunreademaildata = payload.items;
            state.totalpages.unreadpages = payload.meta.total_page;
        },
        [GETREADEMAIL_MUTATION]: function(state, payload) {
            //我的菜园-邮箱-已读
            state.getreademaildata = payload.items;
            state.totalpages.readpages = payload.meta.total_page;
        },
        [GETLOGONLOG_MUTATION]: function(state, payload) {
            //我的菜园-登录日志
            state.getlogonlog = payload.items;
            state.totalpages.logpages = payload.meta.total_page;
        },
        [EMAILDIALOG_CONTENT]: function(state, payload) {
            //我的菜园-邮箱-弹窗
            state.emaildialog = payload;
            if (payload.status == 0) {
                state.echostatus = 0;
            } else {
                state.echostatus = 1;
            }
        },
        [BUYRECORDS_MUTATION]: function(state, payload) {
            //我的菜园-道具购买记录
            state.buyrecordsdata = payload;
            state.myAccountPage = payload.total_page;
        },
        [USERECORDS_MUTATION]: function(state, payload) {
            //我的菜园-道具使用记录
            state.userecorddata = payload.items;
            state.totalpages.usepages = payload.total_page;
        },
        [GIVERECORDS_MUTATION]: function(state, payload) {
            //我的菜园-赠送记录
            state.giverecorddata = payload.items;
            state.totalpages.givepages = payload.total_page;
        },
        [PAYRECORDS_MUTATION]: function(state, payload) {
            //我的菜园-充值记录
            state.payrecorddata = payload.items;
            state.totalpages.paypages = payload.total_page;
        },
        [CURRENTSIGNCOM]: function(state, payload) {
            if (payload == 0) {
                state.currentsign[0] = false;
                state.userinfocai = state.userinfocai + 20;
            } else if (payload == 1) {
                state.userinfocai = state.userinfocai + 50;
                state.currentsign[1] = false;
            } else if (payload == 2) {
                state.userinfocai = state.userinfocai + 100;
                state.currentsign[2] = false;
            } else if (payload == 3) {
                state.userinfocai = state.userinfocai + 200;
                state.currentsign[3] = false;
            } else if (payload == 4) {
                state.userinfocai = state.userinfocai + 300;
                state.currentsign[4] = false;
            }
        },
        [HAVETORECEIVE]: function(state, payload) {
            if (payload == 0) {
                state.htreceivedata[0] = true;
                state.signclass.thefirst = "bom0";
            } else if (payload == 1) {
                state.htreceivedata[0] = true;
                state.signclass.thesecond = "bom1";
            } else if (payload == 2) {
                state.htreceivedata[2] = true;
                state.signclass.thethird = "bom2";
            } else if (payload == 3) {
                state.htreceivedata[3] = true;
                state.signclass.thefourth = "bom3";
            } else if (payload == 4) {
                state.htreceivedata[4] = true;
                state.signclass.thefifth = "bom4";
            }
        },
        [WOQUYAMUTATION]: function(state, payload) {
            state.woquya = payload;
        },
        [SUCCESSSTATUS]: function(state, payload) {
            state.whats = payload;
        },
        [WORLDTALKSTATUS]: function(state, payload) {
            state.worldtalkinfo = payload;
        },
        [BACKENDCLOSE]: function(state, payload) {
            state.backendstatus = payload;
        },
        [ECHOSTATUSMU]: function(state, payload) {
            state.echostatus = payload;
        },
        [USERINFOWIDTHMU]: function(state, payload) {
            state.userinfowidth = parseFloat(state.userinfowidth) + 15 + "px";
        },
        [USERINFOEXPMU]: function(state) {
            if (state.userinfoexp + 20 >= state.userinfoshowlist.expect_exp) {
                state.userinfoexp =
                    state.userinfoexp + 20 - state.userinfoshowlist.expect_exp;
                state.userinfowidth = 15 + "px";
            } else {
                state.userinfoexp = state.userinfoexp + 20;
            }
        },
        [USERINFOCAIMU]: function(state) {
            state.userinfocai = state.userinfocai + 10;
        },
        [EMPTYVALUE]: function(state, payload) {
            state.isemptyvalue = payload;
        },
        [WAIT_MUTATION]: function(state, payload) {
            state.iswait30s = payload;
        },
        iSswiperIndex: function(state, payload) {
            if (state.swiperIndex + 1 == 4) {
                state.swiperIndex = 0;
            } else {
                state.swiperIndex = payload + 1;
            }
        },
        [LETITAUTOPLAY]: function(state, payload) {
            state.bswiperautoplay = payload;
        },
        getMyInforation: function(state, payload) {
            state.myInforationer = payload;
            if (!payload) {
                state.myEmailPage = 0;
            } else {
                state.myEmailPage = payload.meta.total_page;
            }
        },
        sendMyEmailParams: function(state, payload) {
            state.myInforation = payload;
        },
        sendMyAccountParams: function(state, payload) {
            state.accoutRecord = payload;
        },
        [LETTERSUCCESS]: function(state, payload) {
            state.lettersuccessed = payload;
        },
        [LEFTADMUTATION]: function(state, payload) {
            state.leftaddata = payload;
        },
        hasnoregister: function(state, payload) {
            state.isnoregister = payload;
        },
        isGuessHasMoreMutation(state, payload) {
            state.isGuessHasMore = payload;
        },
        checkinRewardShow(state, payload) {
            state.isCheckinRewardShow = payload;
        }
    }
};

export default home;