import Http from "./../common/http";
let promoter = {
  state: {
    showdialog: false,
    promoterStatus: '',
    showCode: false,
    showErrdialog:false

  },
  actions: {

  },
  mutations: {
    changeshow(state, payload) {
      state.showdialog = payload

    },
    changecode(state, payload) {
      state.showCode = payload

    },
    changeShowErrdialog(state, payload){
      // console.log("qqqq",payload)
      state.showErrdialog = payload

    }

  }

}
export default promoter;
