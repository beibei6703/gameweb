import Http from "./../common/http";
import {
    setStore,
    getStore,
    removeStore,
    getCookie,
    setCookie,
    removeCookie
} from "@/utils/storage.js";
let isDialogShow = {
    state: {
        isBuyTreasureShow: false, //treasure chest purchase details popover display status
        isTreasureBuyScsShow: false, //Treasure box purchase success popover display status
        isPrizeBoxShow: false, //the prize presentation box display status
        isAliShow: false, //ali pay dialog display status
        isOpenGuessShow: false, //is this the first time you open the guess pages
        isUserFirstGuessShow: false, //is this the user first guess in our web
        isFirstGetPropsShow: false, //is this the user first get the props in our web
        isFirstGetDebrisShow: false, //is this the user first get the props in our web
        isTipPropsCanGuessShow: false, //this to tip user the props can guess too
        isCanSystheticShow: false, // when your debris is enough,will prompt you where to synthesize
        isShowPropaganda: false, //propaganda display status
        isSHowCarryEnroll: false, //carry out enroll display status,
        isShowTask: false, //go to carry out my task display status,
        isShowExchangeNickname: false, //go to exchange my set display status
        isShowReciveNewsTask: false, //I get all task of news task display status
        isShowWinner: false, // winner and lose status
        isShowGuessBetGuide: false, //go to bet myself teams dispaly status,
        isEndAnimate: false, //
        isScrollTop: 0,
        isThisScrollTop: 0,
        isCompleteAll: false, // I am old status
        isReceiveTask: false, //I receive all task display status
        isRichScrollTop: 0,
        isGuessFirst: false,
        isPathRoute: true,
    },
    actions: {},
    mutations: {
        // change treasure chest purchase details popover display status
        changeIsBuyTreasureShow(state, payload) {
            state.isBuyTreasureShow = payload;
        },
        //change Treasure box purchase success popover display status
        changeisTreasureBuyScsShow(state, payload) {
            state.isTreasureBuyScsShow = payload;
        },
        //change the prize presentation box display status
        mutationPrizeBoxShow(state, payload) {
            state.isPrizeBoxShow = payload;
        },
        //ali pay dialog display status
        mutationAliPayShow(state, payload) {
            state.isAliShow = payload;
        },
        //is this the first time you open the guess pages
        mutationOpenGuessShow(state, payload) {
            state.isOpenGuessShow = payload;
        },
        //is this the user first guess in our web
        mutationUserFirstGuessShow(state, payload) {
            state.isUserFirstGuessShow = payload;
        },
        //is this the user first get the props in our web
        mutationUserFirstGetProps(state, payload) {
            state.isFirstGetPropsShow = payload;
        },
        //is this the user first get the debris in our web
        mutationUserFirstGetDebris(state, payload) {
            state.isFirstGetDebrisShow = payload;
        },
        //this to tip user the props can guess too
        mutationTipPropsCanGuessShow(state, payload) {
            state.isTipPropsCanGuessShow = payload;
        },
        // when your debris is enough,will prompt you where to synthesize
        mutationCanSystheticShow(state, payload) {
            state.isCanSystheticShow = payload;
        },
        mutationIsShowPropaganda(state, payload) {
            state.isShowPropaganda = payload;
        },
        mutationIsSHowCarryEnroll(state, payload) {
            state.isSHowCarryEnroll = payload;
        },
        mutationIsShowTask(state, payload) {
            state.isShowTask = payload;
        },
        mutationIsShowExchangeNickname(state, payload) {
            state.isShowExchangeNickname = payload;
        },
        mutationIsShowReciveNewsTask(state, payload) {
            state.isShowReciveNewsTask = payload;
        },
        mutationIsShowWinner(state, payload) {
            state.isShowWinner = payload;
        },
        mutationIsShowGuessBetGuide(state, payload) {
            state.isShowGuessBetGuide = payload;
        },
        mutationisEndAnimate(state, payload) {
            state.isEndAnimate = payload;
        },
        mutationisScrollTop(state, payload) {
            state.isScrollTop = payload;
        },
        mutationisThisScrollTop(state, payload) {
            state.isThisScrollTop = payload;
        },
        mutationisCompleteAll(state, payload) {
            state.isCompleteAll = payload;
        },
        mutationisReceiveTask(state, payload) {
            state.isReceiveTask = payload
        },
        mutationisRichScrollTop(state, payload) {
            state.isRichScrollTop = payload;
        },
        mutationisGuessFirst(state, payload) {
            state.isGuessFirst = payload;
        },
        mutationsisPathRoute(state, payload) {
            state.isPathRoute = payload;
        },
    }
};
export default isDialogShow;