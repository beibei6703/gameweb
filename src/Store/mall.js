import Http from "./../common/http";
import {
    stringify
} from "qs";
let mall = {
    state: {
        mallListData: [], //mall list data
        boxOptions: [], //the treasure chest detail data origin
        sucOptions: [], //the dialog the treasure chest buy success options
        recListData: [], //mall Recommend commodities data list
        prizeOfTreasureData: [], //the prize after opening treasure box
        isRedPointShow: false, //mybag - new The props
        newSkinCdData: [], //mybag - the collection of news skin card id
        treasureName: null, //open the treasure chest  success ,ths treasure chest's name
        mallListPages: 1, // mall - the pages about data list
        hasMallMore: false, //mall - is the mall data has more
        maxPages: 1,
        identitySecondEnsure: {
            ensure: false,
            type: 1
        },
        identityItemBuyOptions: null,
        optionMsg: null
    },
    actions: {
        //dispatch mall list data
        dispatchMallList(store, payload) {
            Http.get(`shop/product?${stringify(payload)}`)
                .then(res => {
                    let maxPages = Math.ceil(res.data.data.total / 8);
                    let pages = payload.page;
                    // console.log(pages, maxPages, "fan");
                    // if (pages >= maxPages) {
                    //     pages = maxPages;
                    // }
                    store.commit("mutationMaxPages", maxPages);
                    store.commit("mutationMallListPages", pages);
                    store.commit("mutationMallList", res.data.data);
                })
                .catch(Http.onError);
        },
        dispathchRecommendList(store, payload) {
            Http.get(`shop/product/topBox`)
                .then(res => {
                    store.commit("mutationRecList", res.data.data);
                })
                .catch(Http.onError);
        }
    },
    mutations: {
        // mall - the pages about data list
        mutationMallListPages(state, payload) {
            if (state.mallListPages >= state.maxPages) {
                state.mallListPages = state.maxPages;
            } else {
                state.mallListPages = payload;
            }
        },
        mutationMaxPages(state, payload) {
            state.maxPages = payload;
        },
        // mall list Response
        mutationMallList(state, payload) {
            if (!payload) {
                state.mallListData = [];
                return;
            }
            if (payload && payload.items.length > 0) {
                state.hasMallMore = payload.meta ? payload.meta.has_more : false;
            }
            if (payload && payload.items.length < payload.total) {
                state.hasMallMore = true;
            } else {
                state.hasMallMore = false;
            }
            if (!payload || payload.items.length < 0) {
                state.hasMallMore = false;
            }
            if (state.mallListPages == 1) {
                state.mallListData = payload.items;
            } else {
                state.mallListData = state.mallListData.concat(payload.items);
            }
            let hash = {};
            let testarr = state.mallListData.reduce((item, next) => {
                hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
                return item;
            }, []);
            state.mallListData = testarr;
        },
        // buy detail dialog info
        mutationBoxBuyOptions(state, payload) {
            state.boxOptions = payload;
        },
        // the treasure chest buy success options
        mutationBoxGetSucOptions(state, payload) {
            state.sucOptions = payload;
        },
        // mall - Recommend commodities
        mutationRecList(state, payload) {
            state.recListData = payload;
        },
        // the prize after opening treasure box
        mutationPrizeOfTreasure(state, payload) {
            state.prizeOfTreasureData = payload;
        },
        // get news skin card , mybag tag add redpoint
        mutationShowRedpoint(state, payload) {
            state.isRedPointShow = payload;
        },
        // news skin card id
        mutationNewSkinCd(state, payload) {
            state.newSkinCdData = payload;
        },
        // when you get prize ,the treasure chest's name
        mutationTreasureName(state, payload) {
            state.treasureName = payload;
        },
        // 道具购买-推广员下线二次确认
        isIdentitySecondEnsure(state, payload) {
            state.identitySecondEnsure = payload;
        },
        identityItemBuy(state, payload) {
            state.identityItemBuyOptions = payload;
        },
        virtualOption(state, payload) {
            state.optionMsg = payload;
        },
    }
};
export default mall;