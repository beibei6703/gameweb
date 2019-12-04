import axios from "axios";
import _ from "lodash";
import Qs from "qs";
import config from "./http-config";

import store from "./../Store";

import {
    setStore,
    getStore,
    removeStore,
    getCookie,
    removeCookie,
    setCookie
} from "./../utils/storage.js";

const client = axios.create(config);

function requestConfig(ver, headers = {}) {
    var clientConfig = {
        transformResponse: [
            function(data) {
                process.env.NODE_ENV === "dev" &&
                    console.log("返回数据： ", JSON.parse(data));

                return JSON.parse(data);
            }
        ],
        headers: {
            Accept: `application/vnd.api.v${ver}+json`
                // 'Authorization':'Bearer ' + getCookie('cid')
        },
        withCredentials: true
    };

    if (!_.isEmpty(headers)) {
        clientConfig.headers = Object.assign(clientConfig.headers, headers);
    }

    return clientConfig;
}

export default class Http {
    static get(uri, params = {}, version = "1.0") {
        // console.log(uri, params, "get添加源", typeof uri, uri.indexOf("?"));
        let newParams = _.isEmpty(params) ? "" : {...params, source_type: "pc" };
        // uri += _.isEmpty(params) ? "" : "?" + Qs.stringify(newParams);
        uri += _.isEmpty(params) ?
            uri.indexOf("?") != -1 ?
            "&source_type=pc" :
            "?source_type=pc" :
            "?" + Qs.stringify(newParams);
        let _self = this;
        return client.get(uri, requestConfig(version)).then(function(response) {
            return _self.checkCode(response, uri);
        });
    }

    static post(uri, params = {}, version = "1.0") {
        let sourceParams = {...params, source_type: "pc" };
        // console.log(sourceParams, "添加源");
        return client
            .post(
                uri,
                Qs.stringify(sourceParams),
                requestConfig(version, {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            )
            .then(this.checkCode);
    }

    static checkCode(response, uri) {
        // 错误提示，弹出登录框等
        let whiteList = /|cardLogs|dailyTask|marqueeLogs|cardDetail|caiDetail/i;
        let checkLogin = true;
        if (typeof uri !== "undefined" && uri.search(whiteList) !== -1) {
            checkLogin = false;
        }
        var code = response.data.code;
        let datas = response,
            phonenum,
            phoneText;
        let updateList = /login|recharge|exchangeProduct|giveProduct|updateAvatar|updateNickname|checkIn|getCheckInReward/i;
        if (
            typeof uri !== "undefined" &&
            uri.search(updateList) !== -1 &&
            code === 0
        ) {
            store.dispatch("userInfo");
            store.dispatch("userinfoshowdispatch");
            // store.dispatch("userInfo");
            // store.dispatch("self");
            console.log("需要更新用户信息", uri, uri.search(updateList));
        }
        let _this = this;
        if (code != 0) {
            switch (code) {
                case 41000: //参数验证错误
                    break;
                case 41001: //业务逻辑错误
                    break;
                case 41002: //登录超时
                    break;
                case -1: //
                    //checkLogin == true && console.log('登录弹窗', uri)
                    store.commit("login", false);
                    // removeCookie('cid')
                    checkLogin == true &&
                        // store.commit("showLoginDialog", true) &&
                        removeCookie("cid");
                    // store.dispatch("logout")
                    break;
                case 404: //路由错误
                    break;
                case 403: //无权操作
                    break;
                case -200:
                    break;
                case 41005:
                    break;
            }
            //console.log("code:" + code, response.data.message);
        }

        return response;
    }

    static onError(error) {
        console.log(error);
    }
}