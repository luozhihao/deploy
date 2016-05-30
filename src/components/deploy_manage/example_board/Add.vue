<template>
    <modal :show.sync="addModal" effect="fade" width="460px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal form-small">
                <div class="form-group">
                    <label class="control-label col-sm-3">实例名：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="exampleName">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">部署包名：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="pack" :options="packages" :search="true" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">机房位置：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="idc" :options="idcs" :search="true" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">内网IP端口：<span class="text-danger" v-show="!outip">*</span></label>
                    <div class="col-sm-5">
                        <v-select :value.sync="inip" :options="inips" :search="true" placeholder="请选择">
                        </v-select>
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" v-model="inport">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">外网IP端口：<span class="text-danger" v-show="!inip">*</span></label>
                    <div class="col-sm-5">
                        <v-select :value.sync="outip" :options="outips" :search="true" placeholder="请选择">
                        </v-select>
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
            <button type="button" class="btn btn-default" :disabled="exampleName && pack && idc && (inip || outip) ? false : true" @click="saveFn">保存</button>
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
        packages: [],
        pack: '',
        idcs: [],
        idc: '',
        inips: [],
        inip: '',
        inport: '',
        outips: [],
        outip: '',
        outport: '',
        domain: '',
        deployPath: '',
        logPath: '',
        docPath: '',
        remark: ''
    },
    init = Object.assign({}, origin)

export default {
    data () {
        return origin
    },
    methods: {

        // 添加方法
        saveFn () {
            if (this.inip.trim()) {
                if (!this.inport.trim()) {
                    this.$dispatch('show-notify', '请填写内网端口')

                    return false
                }
            }

            if (this.outip.trim()) {
                if (!this.outport.trim()) {
                    this.$dispatch('show-notify', '请填写外网端口')

                    return false
                }
            }

            this.$http({
                url: '/instance_add/',
                method: 'POST',
                data: {
                    exampleName: this.exampleName,
                    pack: this.pack,
                    idc: this.idc,
                    inip: this.inip,
                    outip: this.outip,
                    inport: this.inport,
                    outport: this.outport,
                    domain: this.domain,
                    deployPath: this.deployPath,
                    logPath: this.logPath,
                    docPath: this.docPath,
                    remark: this.remark
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.$data = Object.assign({}, origin, init)

                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            })

        }
    },
    components: {
        modal,
        vSelect
    },
    events: {
        'showAdd' () {
            this.addModal = true

            this.$http({
                url: '/instance_add/',
                method: 'GET'
            })
            .then(response => {
                this.packages = response.data.packages
                this.idcs = response.data.idcs
            })
        }
    },
    watch: {
        'idc' (newVal) {
            this.$http({
                url: '/instance_ips/?idc_id=' + newVal,
                method: 'GET'
            })
            .then(response => {
                this.inips= response.data.inner_ips
                this.outips= response.data.outer_ips

                this.inip = ''
                this.outip = ''
            })
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