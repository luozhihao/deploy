/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-12 10:29:11
 * @version $Id$
 */

import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个 object 存储应用启动时的状态
const state = {

    // 应用启动时，count 置为0
    count: 0,
    success: false,
    confirm: false,
    tag:''
}

// 创建一个 object 存储 mutation 函数
const mutations = {

    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    INCREMENT (state, amount) {
        state.count += amount
        state.tag = '222'
    },
    DECREMENT (state, amount) {
        state.count -= amount
    },
    SHOWRIGHT (state, status) {
        state.success = status
    },
    CONFIRM (state) {
        state.confirm = true
    }
}

// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
    state,
    mutations
})