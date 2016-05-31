/**
 * 
 * @authors luozh@snail.com
 * @date    2016-05-12 10:35:58
 * @version v1.0
 */

 // action 会收到 store 作为它的第一个参数
 // 在 store 里我们只需要 dispatch （在有些情况下需要 state）
 // 我们可以利用 ES6 的解构（destructuring）语法来简化参数的使用


// 获取用户信息
export function getUserInfo({ dispatch, state }) {
    this.$http({
        url: '/userinfo/',
        method: 'POST'
    })
    .then(response => {
        if (response.data.result === 1) {
            dispatch('GETUSER', response.data.username)  // 登陆用户名
        }
    })
}

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

// 获取规则
export function getRules({ dispatch, state }, param) {
    this.$http({
        url: '/rule_edit/?id=' + param,
        method: 'GET'
    })
    .then(response => {
        if (response.data.result) {
            if (response.data.rules.length) {
                dispatch('GETRULES', response.data.rules)
            } else {
                dispatch('GETRULES', [{value: '', label: ''}])
            }

            dispatch('GETRULEID', param)
        } else {
            dispatch('GETRULEID', null)
        }
    })
}

// 获取规则列表
export function getRuleList({ dispatch, state }, param) {
    this.$http({
        url: '/rule_edit/?id=' + param,
        method: 'GET'
    })
    .then(response => {
        dispatch('GETRULELIST', response.data.rules)
    })
}

// 获取应用配置类型
export function getAppTypes({ dispatch, state }) {
    this.$http({
        url: '/package_add/',
        method: 'GET'
    })
    .then(response => {
        dispatch('GETAPPTYPES', response.data.types)
    })
}

// 获取部署包机房位置
export function getInstance({ dispatch, state }) {
    this.$http({
        url: '/instance_add/',
        method: 'GET'
    })
    .then(response => {
        dispatch('GETPACKAGES', response.data.packages)
        dispatch('GETIDCS', response.data.idcs)
    })
}


