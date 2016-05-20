/**
 * 
 * @authors luozh@snail.com
 * @date    2016-03-21 17:04:26
 * @description 路由配置
 */

'use strict'

export default function (router) {
    router.map({
        '/': {
            component: function (resolve) {
                require(['./components/deploy_manage/run_board/RunBoard.vue'], resolve)
            }
        },
        '/runBoard': {
            component: function (resolve) {
                require(['./components/deploy_manage/run_board/RunBoard.vue'], resolve)
            }
        },
        '/appBoard': {
            component: function (resolve) {
                require(['./components/deploy_manage/app_board/AppBoard.vue'], resolve)
            }
        },
        '/exampleBoard': {
            component: function (resolve) {
                require(['./components/deploy_manage/example_board/ExampleBoard.vue'], resolve)
            }
        },
    })
}
