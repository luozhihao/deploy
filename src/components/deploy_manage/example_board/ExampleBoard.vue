<template>
    <div>
        <form class="form-inline">
            <div class="form-group">
                <label>搜索：</label>
                <input type="text" class="form-control search-txt" v-model="param.search" placeholder="项目名/域名/机器名/部署包名">
            </div>
            <div class="mt30 table-btn">
                <button type="button" class="btn btn-default btn-pd" @click="addFn">
                    <span class="glyphicon glyphicon-plus"></span>
                    添加
                </button>
                <dropdown class="pull-right"> 
                    <button type="button" class="btn btn-default set-btn" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-cog"></span>
                    </button>
                    <ul slot="dropdown-menu" class="dropdown-menu">
                        <li>
                            <input id="exampleName" type="checkbox" value="1" v-model="checkedNames"> 
                            <label for="exampleName">实例名称</label>
                        </li>
                        <li>
                            <input id="packName" type="checkbox" value="2" v-model="checkedNames"> 
                            <label for="packName">部署包名称</label>
                        </li>
                        <li>
                            <input id="projectName" type="checkbox" value="3" v-model="checkedNames"> 
                            <label for="projectName">项目名称</label>
                        </li>
                        <li>
                            <input id="projectType" type="checkbox" value="4" v-model="checkedNames"> 
                            <label for="projectType">项目类型</label>
                        </li>
                        <li>
                            <input id="version" type="checkbox" value="5" v-model="checkedNames"> 
                            <label for="version">版本</label>
                        </li>
                        <li>
                            <input id="hosts" type="checkbox" value="6" v-model="checkedNames"> 
                            <label for="hosts">机房位置</label>
                        </li>
                        <li>
                            <input id="ip" type="checkbox" value="7" v-model="checkedNames"> 
                            <label for="ip">机器IP</label>
                        </li>
                        <li>
                            <input id="port" type="checkbox" value="8" v-model="checkedNames"> 
                            <label for="port">端口</label>
                        </li>
                        <li>
                            <input id="domain" type="checkbox" value="9" v-model="checkedNames"> 
                            <label for="domain">域名</label>
                        </li>
                        <li>
                            <input id="deployPath" type="checkbox" value="10" v-model="checkedNames"> 
                            <label for="deployPath">部署目录</label>
                        </li>
                        <li>
                            <input id="logPath" type="checkbox" value="11" v-model="checkedNames">
                            <label for="logPath">日志文件目录</label>
                        </li>
                        <li>
                            <input id="docPath" type="checkbox" value="12" v-model="checkedNames"> 
                            <label for="docPath">配置文件目录</label>
                        </li>
                        <li>
                            <input id="remark" type="checkbox" value="13" v-model="checkedNames"> 
                            <label for="remark">备注</label>
                        </li>
                    </ul>
                </dropdown>
            </div>
            <table class="table table-hover table-bordered table-bg">
                <thead>
                    <tr>
                        <th v-for="name in checkedArr" v-text="name" track-by="$index"></th>
                        <th>配置环境要求</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList">
                        <td v-for="value in checkedArr" v-text="list[value]" track-by="$index" :title="list[value]"></td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="showViewEnv(list.id)">
                                <span class="table-icon glyphicon glyphicon-eye-open"></span>
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showTestEnv', list.id)">
                                <span class="table-icon glyphicon glyphicon-record"></span>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="modifyFn(list.id)">
                                <span class="table-icon glyphicon glyphicon-edit"></span>
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showConfirm', list.id)">
                                <span class="table-icon glyphicon glyphicon-trash"></span>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="tableList.length === 0">
                        <td class="text-center" :colspan="checkedArr.length + 2">
                            暂无数据
                        </td>
                    </tr>
                </tbody>
                <tfoot>    
                    <tr>
                        <td :colspan="checkedArr.length + 2">
                            <div class="pull-right">
                                <boot-page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
        <add-modal></add-modal>
        <modify-modal></modify-modal>
        <view-env-modal></view-env-modal>
        <test-modal></test-modal>
        <delete-modal></delete-modal>
    </div>
</template>

<script>
import addModal from './Add.vue'
import modifyModal from './Modify.vue'
import viewEnvModal from '../app_board/ViewEnv.vue'
import testModal from '../example_board/Test.vue'
import deleteModal from '../../global/Confirm.vue'
import bootPage from '../../global/BootPage.vue'
import { dropdown } from 'vue-strap'
import { getInstance } from '../../../vuex/action.js'

let origin = {
    lens: [10, 50, 100],
    pageLen: 5,
    url: '/instance_config/',
    param: {
        search: ''
    },
    checkedNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
    checkedArr: ['实例名称', '部署包名称', '项目名称', '项目类型', '版本', '机房位置', '机器IP', '端口', '域名', '部署目录', '日志文件目录', '配置文件目录', '备注'],
    tableList: []
}

export default {
    data () {
        return origin
    },
    methods: {

        // 刷新数据
        refresh () {
            this.$broadcast('refresh')
        },

        // 添加数据
        addFn () {
            this.$broadcast('showAdd')

            this.getInstance()
        },

        // 修改数据
        modifyFn (id) {
            this.$broadcast('showModify', id)

            this.getInstance()
        },

        // 查看环境
        showViewEnv (idNum) {
            let param = {
                id: idNum,
                url: '/instance_env_view/'
            }

            this.$broadcast('showViewEnv', param)
        },

        // 数组排序
        sortNumber (arr) {
            arr.sort((a, b) => {
                return a - b
            })

            return arr
        },

        // 数组转化
        switchName (e) {
            switch (e) {
                case '1': 
                    return '实例名称'
                    break
                case '2':
                    return '部署包名称'
                    break
                case '3':
                    return '项目名称'
                    break
                case '4':
                    return '项目类型'
                    break
                case '5':
                    return '版本'
                    break
                case '6':
                    return '机房位置'
                    break
                case '7':
                    return '机器IP'
                    break
                case '8':
                    return '端口'
                    break
                case '9':
                    return '域名'
                    break
                case '10':
                    return '部署目录'
                    break
                case '11': 
                    return '日志文件目录'
                    break
                case '12':
                    return '配置文件目录'
                    break
                case '13':
                    return '备注'
                    break
            }
        }
    },
    vuex: {
        actions: {
            getInstance
        }
    },
    components: {
        addModal,
        deleteModal,
        dropdown,
        bootPage,
        modifyModal,
        viewEnvModal,
        testModal
    },
    ready () {

        // 读取localStorage
        let checkedItem = window.localStorage.getItem('checkedArr'),
            nameItem = window.localStorage.getItem('checkedNames')

        if (nameItem === '') {
            this.checkedNames = []
        } else if (nameItem !== null) {
            this.checkedNames = nameItem.split(',')
        }

        if (checkedItem === '') {
            this.checkedArr = []
        } else if (checkedItem !== null) {
            this.checkedArr = checkedItem.split(',')
        }
    },
    events: {

        // 获取表格数据
        'data' (param) {
            this.tableList = param.data
        },

        // 刷新表格
        'refresh' () {
            this.refresh()
        },

        // 确认删除
        'confirm' (param) {
            this.$http({
                url: '/instance_delete/',
                method: 'POST',
                data: {
                    id: param
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.refresh()
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            })
        }
    },
    watch: {

        // 自定义列
        'checkedNames' (newVal) {
            let _this = this,
                checkedArr = []

            let val = this.sortNumber(newVal)

            val.forEach(e => {
                checkedArr.push(_this.switchName(e))
            })

            this.checkedArr = checkedArr

            window.localStorage.setItem('checkedNames', newVal)
            window.localStorage.setItem('checkedArr', checkedArr)
        },

        // 搜索
        'param.search' () {
            this.refresh()
        }
    }
}
</script>

<style scoped>
.search-txt {
    width: 250px;
}

.set-btn {
    padding: 2px 8px;
}

ul.dropdown-menu li {
    padding-left: 20px;
}
</style>