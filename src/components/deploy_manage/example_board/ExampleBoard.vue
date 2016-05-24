<template>
    <div>
        <form class="form-inline">
            <div class="form-group">
                <label>搜索：</label>
                <input type="text" class="form-control search-txt" v-model="search" placeholder="项目名/域名/机器名/部署包名/状态">
            </div>
            <div class="mt30 table-btn">
                <button type="button" class="btn btn-default btn-pd" @click="$broadcast('showAdd')">
                    <span class="glyphicon glyphicon-plus"></span>
                    添加
                </button>
                <dropdown class="pull-right"> 
                    <button type="button" class="btn btn-default set-btn" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-cog"></span>
                    </button>
                    <ul slot="dropdown-menu" class="dropdown-menu">
                        <li><input id="example_name" type="checkbox"> <label for="example_name">实例名称</label></li>
                        <li><input type="checkbox"> <label>项目名称</label></li>
                        <li><input type="checkbox"> <label>部署包名称</label></li>
                        <li><input type="checkbox"> <label>域名</label></li>
                        <li><input type="checkbox"> <label>端口</label></li>
                        <li><input type="checkbox"> <label>版本</label></li>
                        <li><input type="checkbox"> <label>配置环境要求</label></li>
                        <li><input type="checkbox"> <label>机房位置</label></li>
                        <li><input type="checkbox"> <label>机器IP</label></li>
                        <li><input type="checkbox"> <label>服务部署目录</label></li>
                        <li><input type="checkbox"> <label>日志文件目录</label></li>
                        <li><input type="checkbox"> <label>配置文件目录</label></li>
                        <li><input type="checkbox"> <label>备注</label></li>
                    </ul>
                </dropdown>
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
                            <button type="button" class="btn btn-default btn-small" @click="$broadcast('showConfirm')">
                                <span class="table-icon glyphicon glyphicon-trash"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <add-modal></add-modal>
        <delete-modal></delete-modal>
    </div>
</template>

<script>
import addModal from './Add.vue'
import deleteModal from '../../global/Confirm.vue'
import { dropdown } from 'vue-strap'

export default {
    data () {
        return {
            search: ''
        }
    },
    components: {
        addModal,
        deleteModal,
        dropdown
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