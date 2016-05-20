<template>
    <form class="form-inline">
        <div class="form-group">
            <label>项目名称：</label>
            <input type="text" class="form-control" v-model="projectName">
        </div>
        <div class="form-group">
            <label>部署包名称：</label>
            <input type="text" class="form-control" v-model="packName">
        </div>
        <div class="form-group">
            <label>项目类型：</label>
            <v-select :value.sync="type" :options="types" placeholder="请选择">
            </v-select>
        </div>
        <div class="mt30 table-btn">
            <button type="button" class="btn btn-default btn-pd">
                <span class="glyphicon glyphicon-plus"></span>
                添加
            </button>
            <button type="button" class="btn btn-default btn-pd">
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
                <tr>
                    <td>sncp-imprest</td>
                    <td>充值服务</td>
                    <td>计费</td>
                    <td>1.01</td>
                    <td>
                        <button type="button" class="btn btn-default btn-small">
                            <span class="table-icon glyphicon glyphicon-pencil"></span>
                            编辑
                        </button>
                        <button type="button" class="btn btn-default btn-small">
                            <span class="table-icon glyphicon glyphicon-eye-open"></span>
                            查看
                        </button>
                    </td>
                    <td></td>
                    <td>
                        <button type="button" class="btn btn-default btn-small">
                            <span class="table-icon glyphicon glyphicon-edit"></span>
                            修改
                        </button>
                        <button type="button" class="btn btn-default btn-small">
                            <span class="table-icon glyphicon glyphicon-trash"></span>
                            删除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<script>
export default {
    data () {
        return {
            types: [],
            type: '',
            projectName: '',
            packName: ''
        }
    },
    components: {
        vSelect: require('../../global/Select.vue')
    }
}
</script>

<style scoped>

</style>