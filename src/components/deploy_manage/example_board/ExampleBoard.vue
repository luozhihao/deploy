<template>
    <form class="form-inline">
        <div class="form-group">
            <label>搜索：</label>
            <input type="text" class="form-control search-txt" v-model="search" placeholder="项目名/域名/机器名/部署包名/状态">
        </div>
        <div class="mt30 table-btn">
            <button type="button" class="btn btn-default btn-pd">
                <span class="glyphicon glyphicon-plus"></span>
                添加
            </button>
        </div>
        <table class="table table-hover table-bordered table-bg">
            <thead>
                <tr>
                    <th>实例名称</th>
                    <th>项目名称</th>
                    <th>部署包名称</th>
                    <th>域名</th>
                    <th>端口</th>
                    <th>版本</th>
                    <th>配置环境要求</th>
                    <th>机房位置</th>
                    <th>机器IP</th>
                    <th>服务部署目录</th>
                    <th>日志文件目录</th>
                    <th>配置文件目录</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>imprest.woniu.com1</td>
                    <td>账户服务</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button type="button" class="btn btn-default btn-small">
                            <span class="table-icon glyphicon glyphicon-edit"></span>
                        </button>
                        <button type="button" class="btn btn-default btn-small">
                            <span class="table-icon glyphicon glyphicon-trash"></span>
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
            search: ''
        }
    }
}
</script>

<style scoped>
.search-txt {
    width: 250px;
}
</style>