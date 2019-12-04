import Http from "../common/http";
let rebate = {
    state: {
        showDrawView: false,
        re_status: 0,
        rechargedata: null,
        code: null
    },
    mutations: {
        showDrawDialog(state, payload) {
            state.showDrawView = payload
        },
        closeDrawDialog(state, payload) {
            state.showDrawView = payload
        },
        rechargeStatus(state, payload) {
            state.re_status = payload
        },
        getdata(state, payload) {
            state.rechargedata = payload
        },
        getcode(state, payload) {
            state.code = payload
        }
    },
    actions: {
        getStatus(store) {
            return Http.get("activity/rebate/recharge")
                .then(response => {
                    if (response.data.code == 0) {
                        store.commit("rechargeStatus", response.data.data.status);
                        store.commit("getdata", response.data.data);
                        // console.log( response.data.data)
                        return response;
                    }

                })
                .catch(Http.onError);
        },
        getrebate(store) {
            return Http.get("activity/rebate/receive")
                .then(response => {
                    console.log(response.data.code)
                    if (response.data.code == 0) {
                        store.commit("getcode", response.data.code);

                        return response;
                    } else {
                        let dataOption = {
                            'masseges': data.data.message,
                            'type': '2',
                        }
                        store.commit('isSigninPupopDis', true);
                        store.commit('isSigninPupopDis', dataOption);
                    }

                })
                .catch(Http.onError);
        }

    }


}
export default rebate;