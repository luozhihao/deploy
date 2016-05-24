/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-12 10:35:58
 * @version $Id$
 */

 // action 会收到 store 作为它的第一个参数
 // 在 store 里我们只需要 dispatch （在有些情况下需要 state）
 // 我们可以利用 ES6 的解构（destructuring）语法来简化参数的使用
 

 // 获取类型
 export function getTypes({ dispatch, state }) {
    this.$http({
        url: '/env_add/',
        method: 'GET'
    })
    .then(response => {
        dispatch('GETTYPES', response.data.types)
    })
 }
