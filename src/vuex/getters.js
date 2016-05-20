/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-12 10:42:13
 * @version $Id$
 */

// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count
export function getCount (state) {
   return state.count
}

export function showRight (state) {
   return state.success
}

export function showModal (state) {
   return state.confirm
}