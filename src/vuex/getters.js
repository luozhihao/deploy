/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:42:13
 * @version $Id$
 */

// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

// 获取用户名
export function username (state) {
    return state.username
}

// 获取运行环境类型
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

// 获取应用配置类型
export function appTypes (state) {
   return state.appTypes
}

// 获取部署包
export function packages (state) {
   return state.packages
}

// 获取机房位置
export function idcs (state) {
   return state.idcs
}
