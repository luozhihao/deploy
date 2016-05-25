/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:35:58
 * @version v1.0
 */

 // action 会收到 store 作为它的第一个参数
 // 在 store 里我们只需要 dispatch （在有些情况下需要 state）
 // 我们可以利用 ES6 的解构（destructuring）语法来简化参数的使用
 

 // 获取运行环境类型
 export function getRunTypes({ dispatch, state }) {
    this.$http({
        url: '/env_add/',
        method: 'GET'
    })
    .then(response => {
        dispatch('GETRUNTYPES', response.data.types)
    })
 }

