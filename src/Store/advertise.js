import Http from "./../common/http";
import {
    stringify
} from "qs";
import {
    setStore,
    getStore,
    removeStore,
    getCookie,
    setCookie,
    removeCookie
} from "./../utils/storage.js";
let advertise = {
    state: {
        infoList: [],
        infoArr: [],
        dates: [],
        imgurl: "",
        isShow: false,
        vip_level: "",
        isdispath: false,
        link_url:"",
        begin_time:"",
        expire_time:""

    },
    actions: {
        getedInfo(store) {
            return Http.get('banner/list?location=login_First_news')
                .then(res => {
                    // console.log(res,"广告位神神道道所多所所")
                    const data = res.data
                    if (data.code == 0 && data.data.length) {
                        store.commit("getInfo", data.data)
                        // store.commit("mutationsisShow", true)
                        // console.log(data.data, "广告位神神道道所多所所")
                        return res
                    }
                })
        }
    },
    mutations: {
        getInfo(state, payload) {
            state.isdispath = true;
            state.infoArr = []
            state.dates = []
            state.infoList = payload
            let vipLevel = this.state.user.userInfo.vip_level;
            let nowtime = new Date()
           let nowsDate = nowtime.getTime()
           
            // console.log(nowsDate,"nowtime")
            Object.keys(state.infoList).forEach(key => {
                if (state.infoList[key].vip_limit <= vipLevel) {
                    state.begin_time=new Date(state.infoList[key].begin_time).getTime()
                    state.expire_time= new Date(state.infoList[key].expire_time).getTime()
                    // console.log( state.expire_time-nowtime>0)
                    // console.log( new Date(state.infoList[key].begin_time))
                    // console.log( state.begin_time-nowtime>0)
                    // console.log( new Date(state.infoList[key].expire_time)-new Date()>0)
                    if(state.expire_time>=nowsDate && state.begin_time<= nowsDate ){
                        this.commit("mutationsisShow", true)
                        state.infoArr.push(state.infoList[key]);
                        state.dates.push(state.infoList[key].expire_time);

                    }else{
                        this.commit("mutationsisShow", false)
                    }
                }else{
                    this.commit("mutationsisShow", false)
                }
            })
            // console.log('state.dates',state.dates)
            // console.log('state.infoArr',state.infoArr)
            if (state.infoArr.length > 1) {
                var times = state.dates.sort();
                console.log('timea', state.infoArr)
                Object.keys(state.infoArr).forEach(key => {
                    if (state.infoArr[key].expire_time == times[0]) {
                        // state.infoArr.push(state.infoList[key]);
                        state.imgurl = state.infoArr[key].img_uri;
                        //   setCookie('imgUrl', state.imgurl, 1)
                        state.link_url = state.infoArr[key].url
                        // console.log(state.infoArr[0].img_uri, "数组");
                    }
                })
            } else {

                if (state.infoArr.length > 0) {
                    state.imgurl = state.infoArr[0].img_uri;
                    // setCookie('imgUrl', state.imgurl,1)
                    state.link_url = state.infoArr[0].url
                    // console.log(state.infoArr[0].url, "数组");
                }
            }
        },
        mutationsisShow(state, payload) {
            state.isShow = payload;
        },
    }

}
export default advertise;