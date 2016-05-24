<template>
    <div>
        <form class="form-inline">
            <div class="form-group">
                <label>名称：</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label>类型：</label>
                <v-select :value.sync="type" :options="types" placeholder="请选择">
                </v-select>
            </div>
            <div class="mt30 table-btn">
                <button type="button" class="btn btn-default btn-pd" @click="addFn">
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
                    <tr>
                        <td>linux</td>
                        <td>操作系统</td>
                        <td>2.6.32-431.el6.x86_64</td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showRule')">
                                <span class="table-icon glyphicon glyphicon-pencil"></span>
                                编辑
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showRule')">
                                <span class="table-icon glyphicon glyphicon-eye-open"></span>
                                查看
                            </button>
                        </td>
                        <td>centeros 5+</td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showModify')">
                                <span class="table-icon glyphicon glyphicon-edit"></span>
                                修改
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showConfirm')">
                                <span class="table-icon glyphicon glyphicon-trash"></span>
                                删除
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>linux</td>
                        <td>操作系统</td>
                        <td>2.6.32-431.el6.x86_64</td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showRule')">
                                <span class="table-icon glyphicon glyphicon-pencil"></span>
                                编辑
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showRule')">
                                <span class="table-icon glyphicon glyphicon-eye-open"></span>
                                查看
                            </button>
                        </td>
                        <td>centeros 5+</td>
                        <td>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showModify')">
                                <span class="table-icon glyphicon glyphicon-edit"></span>
                                修改
                            </button>
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showConfirm')">
                                <span class="table-icon glyphicon glyphicon-trash"></span>
                                删除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <add-modal></add-modal>
        <rule-modal></rule-modal>
        <modify-modal></modify-modal>
        <delete-modal></delete-modal>
    </div>
</template>

<script>
import vSelect from '../../global/Select.vue'
import addModal from './Add.vue'
import ruleModal from './EditRule.vue'
import modifyModal from './Modify.vue'
import deleteModal from '../../global/Confirm.vue'
import { getTypes } from '../../../vuex/action.js'

let origin = {
        types: [],
        type: ''
    }

export default {
    data () {
        return origin
    },
    methods: {

        // 添加方法
        addFn () {
            this.getTypesFn()

            this.$broadcast('showAdd')
        }
    },
    vuex: {
        actions: {
            getTypesFn: getTypes
        }
    },
    components: {
        vSelect,
        addModal,
        ruleModal,
        modifyModal,
        deleteModal
    }
}
</script>

<style scoped>

</style>