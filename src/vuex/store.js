/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:29:11
 * @version $Id$
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Vue_Resource from 'vue-resource'

// 告诉 vue “使用” vuex
Vue.use(Vuex)
Vue.use(Vue_Resource)

// 创建一个 object 存储应用启动时的状态
const state = {
    username: '',
    types: [],
    rules: [],
    ruleId: null,
    ruleList: [],
    appTypes: []
}   

// 创建一个 object 存储 mutation 函数
const mutations = {

    // 获取用户名
    GETUSER (state, data) {
        state.username = data
    },

    // 运行环境类型
    GETRUNTYPES (state, data) {
        state.types = data
    },

    // 规则
    GETRULES (state, data) {
        state.rules = data
    },

    // 规则id
    GETRULEID (state, data) {
        state.ruleId = data
    },

    // 规则列表
    GETRULELIST (state, data) {
        state.ruleList = data
    },

    // 应用配置类型
    GETAPPTYPES (state, data) {
        state.appTypes = data
    }   
}

// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
    state,
    mutations
})