import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home"; //首页
import Quizzeszone from "@/components/hotcompete/Quizzeszone"; //预测专区
import Personinfo from "@/components/mygrand/Personinfo"; //个人信息
import ShopTools from "@/components/shop/ShopTools"; //商城热门

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/home",
            component: () =>
                import ("@/components/Home"),
            beforeEnter: (to, from, next) => {
                document.title = "丰";
                next();
            }
        },
        {
            path: "/popup",
            component: () =>
                import ("@/components/common/Popup")
        },
        {
            path: "/rebate",
            component: () =>
                import ("@/components/rebate/Rebate")
        },
        // {
        //     path: "/advertise",
        //     component: () =>
        //         import ("@/components/advertise/Advertise")
        // },
        {
            path: "/ForgetPassword",
            component: () =>
                import ("@/components/common/ForgetPassword")
        },
        {
            path: "/compete",
            component: () =>
                import ("@/components/Compete"),
            beforeEnter: (to, from, next) => {
                document.title = "预测-丰收网";
                next();
            },
            children: [{
                    path: "Quizzeszone",
                    component: () =>
                        import ("@/components/hotcompete/Quizzeszone")
                },
                {
                    path: "lol",
                    component: () =>
                        import ("@/components/hotcompete/Lol")
                },
                {
                    path: "Dota2",
                    component: () =>
                        import ("@/components/hotcompete/Dota2")
                },
                {
                    path: "Jedi",
                    component: () =>
                        import ("@/components/hotcompete/Jedi")
                },
                {
                    path: "Csgo",
                    component: () =>
                        import ("@/components/hotcompete/Csgo")
                },
                {
                    path: "Sport",
                    component: () =>
                        import ("@/components/hotcompete/Sport")
                },
                {
                    path: "ArenaOfValor",
                    component: () =>
                        import ("@/components/hotcompete/Wzry")
                },
                {
                    path: "/",
                    redirect: "/compete/Quizzeszone?all"
                }
            ]
        },
        {
            path: "/mall",
            component: () =>
                import ("@/components/ScMall"),
            beforeEnter: (to, from, next) => {
                document.title = "商城-丰收网";
                next();
            }
        },
        // ---------------------资讯-----------------
        {
            path: "/news",
            component: () =>
                import ("@/components/News"),
            beforeEnter: (to, from, next) => {
                document.title = "资讯-丰收网";
                next();
            }
        },
        {
            path: "/activecenter",
            component: () =>
                import ("@/components/activity/Activecenter"),
            beforeEnter: (to, from, next) => {
                document.title = "活动中心-丰收网";
                next();
            }
        },
        {
            name: "matchcenter",
            path: "/matchcenter",
            component: () =>
                import ("@/components/Matchcenter"),
            beforeEnter: (to, from, next) => {
                document.title = "赛事中心-丰收网";
                next();
            }
        },
        {
            name: "matchdetail",
            path: "/matchdetail/:id",
            component: () =>
                import ("@/components/Matchdetail"),
            beforeEnter: (to, from, next) => {
                document.title = "赛事中心-丰收网";
                next();
            }
        },
        {
            path: "/teamdetail",
            component: () =>
                import ("@/components/Teamdetail")
        },
        {
            path: "/teaminfo",
            component: () =>
                import ("@/components/Teaminfo"),
            beforeEnter: (to, from, next) => {
                document.title = "战队排行-丰收网";
                next();
            }
        },
        {
            name: "newsdetail",
            path: "/newsdetail",
            component: () =>
                import ("@/components/Newsdetail"),
            beforeEnter: (to, from, next) => {
                document.title = "资讯-丰收网";
                next();
            }
        },
        {
            name: "newslist",
            path: "/newslist",
            component: () =>
                import ("@/components/Newslist"),
            beforeEnter: (to, from, next) => {
                document.title = "资讯-丰收网";
                next();
            }
        },
        // ----------------用户协议-------------------
        {
            name: "userprotocol",
            path: "/userprotocol",
            component: () =>
                import ("@/components/Userprotocol"),
            beforeEnter: (to, from, next) => {
                document.title = "用户协议-丰收网";
                next();
            }
        },
        //-------------------各种问题------------------
        {
            name: "question",
            path: "/question",
            component: () =>
                import ("@/components/Question")
        },
        // -------------------------------------------
        {
            path: "/paymoney",
            component: () =>
                import ("@/components/Paymoney"),
            beforeEnter: (to, from, next) => {
                document.title = "充值-丰收网";
                next();
            }
        },
        {
            path: "/alipay/success",
            component: () =>
                import ("@/components/mygrand/Paysuccess")
        },
        {
            path: "/mygrand",
            component: () =>
                import ("@/components/Mygrand"),
            beforeEnter: (to, from, next) => {
                document.title = "我的菜园-丰收网";
                next();
            },
            children: [{
                    path: "accountrecords",
                    component: () =>
                        import ("@/components/mygrand/Accountrecords")
                },
                {
                    path: "warehouse/:current",
                    component: () =>
                        import ("@/components/mygrand/Warehouse")
                },
                {
                    path: "generalize",
                    component: () =>
                        import ("@/components/mygrand/generalize/Apply")
                },
                {
                    path: "applyagain",
                    component: () =>
                        import ("@/components/mygrand/generalize/Applyagain")
                },
                {
                    path: "check",
                    component: () =>
                        import ("@/components/mygrand/generalize/Check")
                },
                {
                    path: "mybag",
                    component: () =>
                        import ("@/components/mygrand/Mybag")
                },
                {
                    path: "forecastingRc",
                    component: () =>
                        import ("@/components/mygrand/ForecastingRc")
                },
                {
                    path: "accountSetting",
                    component: () =>
                        import ("@/components/mygrand/AccountSetting")
                },
                {
                    path: "compose",
                    component: () =>
                        import ("@/components/mygrand/Compose")
                },
                {
                    path: "treasureBox",
                    component: () =>
                        import ("@/components/mygrand/TreasureBox")
                },
                {
                    path: "myemail",
                    component: () =>
                        import ("@/components/mygrand/Myemail")
                },
                {
                    path: "letterinstation",
                    component: () =>
                        import ("@/components/mygrand/myemail/Letterinstation")
                },
                {
                    path: "personinfo",
                    component: () =>
                        import ("@/components/mygrand/Personinfo")
                },
                {
                    path: "taskachievment",
                    component: () =>
                        import ("@/components/mygrand/Taskachievment")
                },
                {
                    path: "achievment",
                    component: () =>
                        import ("@/components/mygrand/Achievment")
                },
                {
                    path: "unbindphone",
                    component: () =>
                        import ("@/components/mygrand/UnbindPhone")
                },
                {
                    path: "modifyphone",
                    component: () =>
                        import ("@/components/mygrand/ModifyPhone")
                },
                {
                    path: "unbindemail",
                    component: () =>
                        import ("@/components/mygrand/UnbindEmail")
                },
                {
                    path: "modifyemail",
                    component: () =>
                        import ("@/components/mygrand/ModifyEmail")
                },
              
                {
                    path: "/",
                    redirect: "/mygrand/personinfo"
                }
            ]
        },
        {
            path: "/downloadpage",
            component: () =>
                import ("@/components/Onlinetalk")
        },
        {
            path: "/giftbag",
            component: () =>
                import ("@/components/Giftbag"),
            beforeEnter: (to, from, next) => {
                document.title = "VIP礼包-丰收网";
                next();
            }
        },
        {
            path: "/change",
            component: () =>
                import ("@/components/more/Change")
        },
        {
            path: "/gotomoneylist",
            component: () =>
                import ("@/components/more/Gotomoneylist")
        },
        {
            path: "/guess/:echoid",
            component: () =>
                import ("@/components/Detail")
        },
        // 幸运大转盘
        {
            path: "/turntable",
            component: () =>
                import ("@/components/Turntable")
        },
        // 宝箱活动
        {
            path: "/treasure",
            component: () =>
                import ("@/components/Treasure")
        },
        // 免费ROLL
        {
            path: "/freeturn/:echoid",
            component: () =>
                import ("@/components/Freeturn")
        },
        {
            path: "/cqMajor",
            component: () =>
                import ("@/components/activity/Cqmajor")
        },
        {
            path: "",
            redirect: "home"
        },
        {
            path: "*",
            component: () =>
                import ("@/components/Notfound")
        }
    ]
});