import Http from "./../common/http";

const modifymessage = {
    state: {
        isShowModifyEmail: false, //修改邮箱弹框
        isShowModifyPassword: false, //修改密码弹框
        isShowModifyPhone: false, //修改手机弹框
        isShowUnbindEmail: false, //绑定邮箱弹框
        isShowUnbindPhone: false, //绑定手机弹框
        isShowVerityEmail: false, //验证邮箱弹框
        isShowVerityPhone: false, //验证手机弹框

    },
    actions: {

    },
    mutations: {
        mutationsisShowModifyEmail(state, payload) {
            state.isShowModifyEmail = payload;
        },
        mutationsisShowModifyPassword(state, payload) {
            state.isShowModifyPassword = payload;
        },
        mutationsisShowModifyPhone(state, payload) {
            state.isShowModifyPhone = payload;
        },
        mutationsisShowUnbindEmail(state, payload) {
            state.isShowUnbindEmail = payload;
        },
        mutationsisShowUnbindPhone(state, payload) {
            state.isShowUnbindPhone = payload;
        },
        mutationsisShowVerityEmail(state, payload) {
            state.isShowVerityEmail = payload;
        },
        mutationsisShowVerityPhone(state, payload) {
            state.isShowVerityPhone = payload;
        },


    }
};

export default modifymessage;