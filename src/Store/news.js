import Http from "./../common/http";

// 资讯news
const NEWSHOTNEWSLIST_MUTATION = "newshotnewslistmutation"; //热门资讯
const NEWSHOTCOMPETE_MUTATION = "newshotcompetemutation"; //热门预测
const NEWSTEAMRANK_MUTATION = "newsteamrankmutation"; //战队排行
const NEWSHEROSRANKPICK_MUTATION = "newsherosrankpickmutation"; //英雄列表
const NEWSNUMBER10_MUTATION = "newsnumber10mutation"; //最强战力
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const news = {
    state: {
        // 资讯news
        newshotnewslist: null, // 资讯页的热门信息
        newshotcompete: null, //资讯页的热门预测
        newsteamrank: null, //资讯页的战队排行
        newsherosrankpick: null, //资讯页的英雄排行
        newsnumber10: null, //资讯页的最强战力
        gameid: "2",
        bgimage: "",
        // ++++++++++++++++++++++++++++++++++++++++++++
        team_id: "9",
        flag: true //用户帮助
    },
    actions: {
        flag: function(store, flag) {
            store.commit("flag", flag);
        },
        team_id: function(store, id) {
            store.commit("team_id", id);
        },
        background: function(store, str) {
            // console.log ('背景图', str);
            store.commit("bgimage", str);
        },
        setid: function(store, id) {
            // console.log ('设置gameid', id);
            store.commit("gameid", id);
        },
        // 资讯news
        newshotnewslistdispatch: function(store, payload) {
            //资讯下的热门资讯
            if (!payload) {
                Http.get("news/list?page=1&size=6&game_id=2")
                    .then(response => {
                        store.commit("newshotnewslistmutation", response.data.data.items);
                    })
                    .catch(Http.onError);
            } else {
                Http.get(`news/list?page=1&size=6&game_id=${payload}`)
                    .then(response => {
                        store.commit("newshotnewslistmutation", response.data.data.items);
                    })
                    .catch(Http.onError);
            }
        },
        newshotcompetedispatch: function(store) {
            //资讯下的热门预测
            Http.get("guesses/list?game=all&status=open")
                .then(response => {
                    store.commit("newshotcompetemutation", response.data.data.items);
                })
                .catch(Http.onError);
        },
        newsteamrankdispatch: function(store, payload) {
            // console.log ('战队排行id', payload);
            //资讯下的战队排行
            if (!payload) {
                Http.get("team/rank?game_id=2")
                    .then(response => {
                        store.commit("newsteamrankmutation", response.data.data.items);
                    })
                    .catch(Http.onError);
            } else {
                Http.get(`team/rank?game_id=${payload}`)
                    .then(response => {
                        store.commit("newsteamrankmutation", response.data.data.items);
                    })
                    .catch(Http.onError);
            }
        },
        newsherosrankpickdispatch: function(store, status) {
            //资讯下的英雄排行
            Http.get("news/hero_result", status)
                .then(response => {
                    store.commit("newsherosrankpickmutation", response.data.data);
                })
                .catch(Http.onError);
        },
        newsnumber10dispatch: function(store, payload) {
            //资讯下的选手排行
            if (!payload) {
                Http.get("player/rank?game_id=2")
                    .then(response => {
                        store.commit("newsnumber10mutation", response.data.data.items);
                    })
                    .catch(Http.onError);
            } else
                Http.get(`player/rank?game_id=${payload}`)
                .then(response => {
                    store.commit("newsnumber10mutation", response.data.data.items);
                })
                .catch(Http.onError);
        }
    },
    mutations: {
        flag: function(state, flag) {
            state.flag = flag;
        },
        team_id: function(state, id) {
            state.team_id = id;
        },
        bgimage: function(state, str) {
            state.bgimage = str;
        },
        gameid: function(state, id) {
            state.gameid = id;
        },
        // 资讯news
        [NEWSHOTNEWSLIST_MUTATION]: function(state, payload) {
            //热门资讯
            state.newshotnewslist = payload;
        },
        [NEWSHOTCOMPETE_MUTATION]: function(state, payload) {
            //热门预测
            state.newshotcompete = payload;
            // console.log (payload, '参数');
            // console.log (state.newshotcompete, 'datazhi');
        },
        [NEWSTEAMRANK_MUTATION]: function(state, payload) {
            //战队排行
            state.newsteamrank = payload;
        },
        [NEWSHEROSRANKPICK_MUTATION]: function(state, payload) {
            //英雄排行
            state.newsherosrankpick = payload;
        },
        [NEWSNUMBER10_MUTATION]: function(state, payload) {
            //选手排行
            state.newsnumber10 = payload;
        }
    }
};

export default news;