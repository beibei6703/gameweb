import Http from "./../common/http";

let pay = {
    state: {
        payModel: "",
        payMoney: 0,
        payStatus: false,
        showWxPay: false,
        wxPayInfo: null,
        webPath: null,
        aliContent: null
    },
    actions: {
        toAliPay: function(store, params) {
            //params.uid = 1;
            params.subject = "C币充值";
            console.log("store.state", store.state);
            // params.redirect_url = "https://www.api.com/alipay/success";
            params.redirect_url = params.type ?
                store.state.webPath + params.redirect_url :
                "https://www.api.com/alipay/success";
            return Http.post("pay/alipay", {
                subject: params.subject,
                amount: params.amount,
                redirect_url: params.redirect_url
            }).then(function(res) {
                if (res.data.code == 0) {
                    const div = document.createElement("div");
                    div.innerHTML = res.data.data;
                    document.body.appendChild(div);
                    document.forms.alipaysubmit.submit();

                    // store.commit("mutationAliContent", res.data.data);
                }
                return res;
            });
            //store.commit('');
        },
        toWxPay: function(store, params) {
            //params.uid = 1;
            params.subject = "C币充值";
            return Http.post("pay/weixin", params).then(function(res) {
                if (res.data.code == 0) {
                    var pay_sn = res.data.data.pay_sn;
                    var url = res.data.data.url;
                    console.log("微信支付", res.data);
                    var payurl = "https://api.api.com/pay/qrcode?payurl=" + url;
                    var payload = { pay_sn: pay_sn, url: payurl };
                    store.commit("showWxPay", true);
                    store.commit("wxPayInfo", payload);
                }
                return res;
            });
        },
        closeWxDialog: function(store, params) {
            store.commit("showWxPay", false);
        }
    },
    mutations: {
        ["toPay"]: function(state, payload) {
            //用户信息
            state.userInfo = payload;
        },
        ["showWxPay"]: function(state, payload) {
            state.showWxPay = payload;
        },
        ["wxPayInfo"]: function(state, payload) {
            state.wxPayInfo = payload;
        },
        mutationsWebPath: function(state, payload) {
            state.webPath = payload;
        },
        mutationAliContent(state, payload) {
            state.aliContent = payload;
        }
    }
};

export default pay;