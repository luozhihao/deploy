/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-12 10:42:13
 * @version $Id$
 */

// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

// 获取类型
export function types (state) {
   return state.types
}

// 获取规则
export function rules (state) {
   return state.rules
}

// 获取规则id
export function ruleId (state) {
   return state.ruleId
}

// 获取规则列表
export function ruleList (state) {
   return state.ruleList
}

// 获取规则列表
export function appTypes (state) {
   return state.appTypes
}
