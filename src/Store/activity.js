import Http from "./../common/http";
import {
    stringify
} from "qs";
let activity = {
    state: {
        cqMajorRankList: null,
        userFlow: null
    },
    actions: {
        cqMajorRanking(store) {
            Http.get('activity/cqMajor/rank')
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("cqMajorRankingMutation", res.data.data);
                    }
                })
                .catch(Http.onError);
        },
        userFlow(store) {
            Http.get('activity/cqMajor/userFlow')
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("userFlowMutation", res.data.data);
                    }
                })
                .catch(Http.onError);
        },
    },
    mutations: {
        cqMajorRankingMutation(state, payload) {
            state.cqMajorRankList = payload;
        },
        userFlowMutation(state, payload) {
            state.userFlow = payload;
        }
    }
}
export default activity;