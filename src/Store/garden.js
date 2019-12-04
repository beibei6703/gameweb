import Http from "./../common/http";
import {
    stringify
} from "qs";
import pay from "./pay";
let garden = {
    state: {
        earingsValuationData: null, //garden~forecasting record~earnings valuation
        caiGuessData: null, //garden~cai guess records
        propsGuessData: null, //garden~props guess records
        guessLogsData: null, //garden~ prediction logs
        caiTotalPages: 1, //garden~ cai guess total pages
        propsTotalPages: 1, //garden~ props guess total pages
        guessLogsTotalPages: 1, //garden~ guess logs total pages
        userAccountData: null, //garden~ Account records all Payments
        caiPaymentsData: null, //garden~ Account records cai Payments
        propsPaymentsData: null, //garden~ Account records props Payments
        debrisPaymentsData: null, //garden~ Account records debris Payments
        userAccountTotalPages: 1, //garden~ userAccount total pages
        caiPaymentsTotalPages: 1, //garden~ caiPayments total pages
        propsPaymentsTotalPages: 1, //garden~ propsPayments total pages
        debrisPaymentsTotalPages: 1, //garden~ debrisPayments total pages
        wareHouseCurrent: null, //garden~warehouse current components
        emailType: null,
        oldEmail: null,
        oldPhone: null,
    },
    actions: {
        getguessdatadis: function(store) {
            //garden~forecasting record~earnings valuation
            Http.get("getGuessData")
                .then(response => {
                    store.commit("eainingsValuationMutation", response.data.data);
                })
                .catch(Http.onError);
        },
        caiGuessDispatch(store, payload) {
            // garden~cai guess records
            Http.get(`guess/caiLogs?${stringify(payload)}`)
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("caiGuessMutation", res.data.data.items);
                        store.commit(
                            "caiTotalPagesMutation",
                            res.data.data.meta.total_page
                        );
                    }
                })
                .catch(Http.onError);
        },
        propsGuessDispatch(store, payload) {
            //garden~props guess records
            Http.get(`guess/cardLogs?${stringify(payload)}`)
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("propsGuessMutation", res.data.data.items);
                        store.commit(
                            "propsTotalPagesMutation",
                            res.data.data.meta.total_page
                        );
                    }
                })
                .catch(Http.onError);
        },
        guessLogsDispatch(store, payload) {
            //garden~ prediction logs
            Http.get(`guess/logs?${stringify(payload)}`)
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("guessLogsMutation", res.data.data.items);
                        store.commit(
                            "guessLogsTotalPagesMutation",
                            res.data.data.meta.total_page
                        );
                    }
                })
                .catch(Http.onError);
        },
        allPaymentsDispatch(store, payload) {
            //garden~ Account records all Payments
            Http.get(`userAccountChangeList?${stringify(payload)}`)
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("userAccountMutation", res.data.data.items);
                        store.commit(
                            "userAccountTotalPagesMutation",
                            res.data.data.total_page
                        );
                    }
                })
                .catch(Http.onError);
        },
        caiPaymentsDispatch(store, payload) {
            //garden~ Account records cai Payments
            Http.get(`userCaiChangeList?${stringify(payload)}`)
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("caiPaymentsMutation", res.data.data.items);
                        store.commit(
                            "caiPaymentsTotalPagesMutation",
                            res.data.data.total_page
                        );
                    }
                })
                .catch(Http.onError);
        },
        propsPaymentsDispatch(store, payload) {
            //garden~ Account records props Payments
            Http.get(`userPropChangeList?${stringify(payload)}`)
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("propsPaymentsMutation", res.data.data.items);
                        store.commit(
                            "propsPaymentsTotalPagesMutation",
                            res.data.data.total_page
                        );
                    }
                })
                .catch(Http.onError);
        },
        debrisPaymentsDispatch(store, payload) {
            //garden~ Account records debris Payments
            Http.get(`userDebrisChangeList?${stringify(payload)}`)
                .then(res => {
                    if (res.data.code == 0) {
                        store.commit("debrisPaymentsMutation", res.data.data.items);
                        store.commit(
                            "debrisPaymentsTotalPagesMutation",
                            res.data.data.total_page
                        );
                    }
                })
                .catch(Http.onError);
        }
    },
    mutations: {
        eainingsValuationMutation(state, payload) {
            //garden~forecasting record~earnings valuation
            state.earingsValuationData = payload;
        },
        caiGuessMutation(state, payload) {
            // garden~cai guess records
            state.caiGuessData = payload;
        },
        propsGuessMutation(state, payload) {
            //garden~props guess records
            state.propsGuessData = payload;
        },
        guessLogsMutation(state, payload) {
            //garden~ prediction logs
            state.guessLogsData = payload;
        },
        caiTotalPagesMutation(state, payload) {
            //garden~ cai guess total pages
            state.caiTotalPages = payload;
        },
        propsTotalPagesMutation(state, payload) {
            //garden~ props guess total pages
            state.propsTotalPages = payload;
        },
        guessLogsTotalPagesMutation(state, payload) {
            //garden~ guess logs total pages
            state.guessLogsTotalPages = payload;
        },
        userAccountMutation(state, payload) {
            //garden~ Account records all Payments
            state.userAccountData = payload;
        },
        caiPaymentsMutation(state, payload) {
            //garden~ Account records cai Payments
            state.caiPaymentsData = payload;
        },
        propsPaymentsMutation(state, payload) {
            //garden~ Account records props Payments
            state.propsPaymentsData = payload;
        },
        debrisPaymentsMutation(state, payload) {
            //garden~ Account records debris Payments
            state.debrisPaymentsData = payload;
        },
        userAccountTotalPagesMutation(state, payload) {
            //garden~ userAccount total pages
            state.userAccountTotalPages = payload;
        },
        caiPaymentsTotalPagesMutation(state, payload) {
            //garden~ caiPayments total pages
            state.caiPaymentsTotalPages = payload;
        },
        propsPaymentsTotalPagesMutation(state, payload) {
            //garden~ propsPayments total pages
            state.propsPaymentsTotalPages = payload;
        },
        debrisPaymentsTotalPagesMutation(state, payload) {
            //garden~ debrisPayments total pages
            state.debrisPaymentsTotalPages = payload;
        },
        warehouseCurrentMutation(state, payload) {
            //garden~warehouse current components
            state.wareHouseCurrent = payload;
        },
        emailType(state, payload) {
            state.emailType = payload;
        },
        // 修改邮箱-原邮箱
        oldEmailMutation(state, payload) {
            state.oldEmail = payload;
        },
        // 修改邮箱-原手机
        oldPhoneMutation(state, payload) {
            state.oldPhone = payload;
        }
    }
};
export default garden;