<template>
    <div>
        <form class="form-inline">
            <div class="form-group">
                <label>部署包名称：</label>
                <input type="text" class="form-control" v-model="param.name">
            </div>
            <div class="form-group">
                <label>项目名称：</label>
                <input type="text" class="form-control" v-model="param.project">
            </div>
            <div class="form-group">
                <label>项目类型：</label>
                <v-select :value.sync="param.type" :options="appTypes" placeholder="请选择">
                </v-select>
            </div>
            <div class="mt30 table-btn">
                <button type="button" class="btn btn-default btn-pd" @click="$broadcast('showAdd')">
                    <span class="glyphicon glyphicon-plus"></span>
                    添加
                </button>
                <button type="button" class="btn btn-default btn-pd" @click="$broadcast('showCopy')">
                    <span class="glyphicon glyphicon-duplicate"></span>
                    配置复制
                </button>
            </div>
            <table class="table table-hover table-bordered table-bg">
                <thead>
                    <tr>
                        <th>部署包名称</th>
                        <th>项目名称</th>
                        <th>项目类型</th>
                        <th>版本</th>
                        <th>运行环境</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList">
                        <td v-text="list.name" :title="list.name"></td>
                        <td v-text="list.project"></td>
                        <td v-text="list.type"></td>
                        <td v-text="list.version"></td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showEditEnv', list.id)">
                                <span class="table-icon glyphicon glyphicon-pencil"></span>
                                编辑
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="showViewEnv(list.id)">
                                <span class="table-icon glyphicon glyphicon-eye-open"></span>
                                查看
                            </button>
                        </td>
                        <td v-text="list.remark" :title="list.remark"></td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showModify', list.id)">
                                <span class="table-icon glyphicon glyphicon-edit"></span>
                                修改
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showConfirm', list.id)">
                                <span class="table-icon glyphicon glyphicon-trash"></span>
                                删除
                            </button>
                        </td>
                    </tr>
                    <tr v-if="tableList.length === 0">
                        <td class="text-center" colspan="7">
                            暂无数据
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="7">
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
        <edit-env-modal></edit-env-modal>
        <view-env-modal></view-env-modal>
        <copy-modal></copy-modal>
        <delete-modal></delete-modal>
    </div>
</template>

<script>
import vSelect from '../../global/Select.vue'
import addModal from './Add.vue'
import ModifyModal from './Modify.vue'
import copyModal from './Copy.vue'
import editEnvModal from './EditEnv.vue'
import viewEnvModal from './ViewEnv.vue'
import deleteModal from '../../global/Confirm.vue'
import bootPage from '../../global/BootPage.vue'
import { getAppTypes } from '../../../vuex/action.js'
import { appTypes } from '../../../vuex/getters.js'

let origin = {
        pageLen: 5,
        lenArr: [10, 50, 100],
        url: '/package_config/',
        param: {
            project: '',
            name: '',
            type: ''
        },
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

        // 查看环境
        showViewEnv (idNum) {
            let param = {
                id: idNum,
                url: '/package_env_view/'
            }

            this.$broadcast('showViewEnv', param)
        }
    },
    components: {
        vSelect,
        addModal,
        copyModal,
        deleteModal,
        bootPage,
        ModifyModal,
        editEnvModal,
        viewEnvModal
    },
    vuex: {
        getters: {
            appTypes
        },
        actions: {
            getAppTypes
        }
    },
    ready () {
        this.getAppTypes()
    },
    events: {
        'data' (param) {
            this.tableList = param.data
        },
        'refresh' () {
            this.refresh()
        },
        'confirm' (param) {
            this.$http({
                url: '/package_delete/',
                method: 'POST',
                data: {
                    id: param
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.refresh()

                    this.$dispatch('show-success', '删除成功') 
                } else {
                    this.$dispatch('show-error', '删除失败')
                }
            })
        }
    },
    watch: {
        'param.project' (newVal) {
            this.refresh()
        },
        'param.name' (newVal) {
            this.refresh()
        },
        'param.type' (newVal) {
            this.refresh()
        }
    }
}
</script>

<style scoped>

</style>