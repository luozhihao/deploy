<template>
    <div>
        <form class="form-inline">
            <div class="form-group">
                <label>名称：</label>
                <input type="text" class="form-control" v-model="param.name">
            </div>
            <div class="form-group">
                <label>类型：</label>
                <v-select :value.sync="param.type" :options="types" placeholder="请选择">
                </v-select>
            </div>
            <div class="mt30 table-btn">
                <button type="button" class="btn btn-default btn-pd" @click="$broadcast('showAdd')">
                    <span class="glyphicon glyphicon-plus"></span>
                    添加
                </button>
            </div>
            <table class="table table-hover table-bordered table-bg">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>类型</th>
                        <th>版本/型号</th>
                        <th>检查规则</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in tableList">
                        <td v-text="list.name"></td>
                        <td v-text="list.type"></td>
                        <td v-text="list.version" :title="list.version"></td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="getRuleFn(list)">
                                <span class="table-icon glyphicon glyphicon-list-alt"></span>
                                规则
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="getRuleListFn(list)">
                                <span class="table-icon glyphicon glyphicon-duplicate"></span>
                                脚本
                            </button>
                        </td>
                        <td v-text="list.remark"></td>
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
                        <td class="text-center" colspan="6">
                            暂无数据
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="6">
                            <div class="pull-right">
                                <boot-page :async="true" :lens="lenArr" :page-len="pageLen" :url="url" :param="param"></boot-page>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
        <add-modal></add-modal>
        <rule-modal></rule-modal>
        <modify-modal></modify-modal>
        <delete-modal></delete-modal>
        <editscript-modal></editscript-modal>
    </div>
</template>

<script>
import vSelect from '../../global/Select.vue'
import addModal from './Add.vue'
import ruleModal from './rule/EditRule.vue'
import modifyModal from './Modify.vue'
import bootPage from '../../global/BootPage.vue'
import deleteModal from '../../global/Confirm.vue'
import editscriptModal from './Script.vue'
import { getRunTypes, getRules } from '../../../vuex/action.js'
import { types } from '../../../vuex/getters.js'

let origin = {
        lenArr: [10, 50, 100],
        pageLen: 5,
        url: '/env_config/',
        param: {
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

        // 刷新表格
        refresh () {
            this.$broadcast('refresh')
        },

        // 获取编辑规则名
        getRuleFn (list) {
            this.getRules(list.id)
            this.$broadcast('showRule')
        },

        // 获取已建规则列表
        getRuleListFn (list) {
            this.$broadcast('showScript', list.id)
        }
    },
    vuex: {
        getters: {
            types
        },
        actions: {
            getRunTypes, // 获取类型数据
            getRules // 获取规则
        }
    },
    components: {
        vSelect,
        addModal,
        ruleModal,
        modifyModal,
        deleteModal,
        bootPage,
        editscriptModal
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
                url: '/env_delete/',
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
    ready () {
        this.getRunTypes()
    },
    watch: {
        'param.name' (newVal) {
            this.refresh()
        },
        'param.type' () {
            this.refresh()
        }
    }
}
</script>

<style scoped>

</style>