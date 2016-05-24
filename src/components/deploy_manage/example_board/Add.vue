<template>
    <modal :show.sync="addModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal form-small">
                <div class="form-group">
                    <label class="control-label col-sm-3">实例名：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="exampleName">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">项目类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="type" :options="types" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">部署包：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="pack" :options="packs" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">机房位置：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="host" :options="hosts" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">内网IP端口：</label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" v-model="inip">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" v-model="inport">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">外网IP端口：</label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" v-model="outip">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" v-model="outport">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">域名：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="domain">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">部署目录：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="deployPath">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">日志目录：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="logPath">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">配置文件目录：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="docPath">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">备注：</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" rows="3" v-model="remark"></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='addModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        addModal: false,
        exampleName: '',
        types: [],
        type: '',
        packs: [],
        pack: '',
        hosts: [],
        host: '',
        inip: '',
        inport: '',
        outip: '',
        outport: '',
        domain: '',
        deployPath: '',
        logPath: '',
        docPath: '',
        remark: ''
    }

export default {
    data () {
        return origin
    },
    components: {
        modal,
        vSelect
    },
    events: {
        'showAdd' () {
            this.addModal = true
        }
    }
}
</script>

<style scoped>
.add-menu {
    height: 34px;
    line-height: 34px;
    padding: 0;
    color: #009688;
    cursor: pointer;
}

.form-small {
    font-size: 12px;
}

.form-small .form-group {
    margin-bottom: 8px;
}
</style>