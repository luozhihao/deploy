<template>
    <modal :show.sync="addModal" effect="fade" width="550px">
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
                    <label class="control-label col-sm-3">内网IP：<span class="text-danger" v-show="!outip">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="inip" :options="inips" :search="true" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">外网IP：<span class="text-danger" v-show="!inip">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="outip" :options="outips" :search="true" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">关闭监听端口号：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="number" min="0" max="99999" class="form-control" v-model="shutdownPort">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">tomcat端口号：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="number" min="0" max="99999" class="form-control" v-model="tomcatPort">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">转发请求端口号：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="number" min="0" max="99999" class="form-control" v-model="requestPort">
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
            <button type="button" class="btn btn-default" :disabled="exampleName.trim() && pack && idc && (inip || outip) && shutdownPort.trim() && tomcatPort.trim() && requestPort.trim() ? false : true" @click="saveFn">保存</button>
            <button type="button" class="btn btn-default" @click='addModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { packages, idcs } from '../../../vuex/getters.js'

let origin = {
        addModal: false,
        exampleName: '',
        pack: '',
        idc: '',
        inips: [],
        inip: '',
        outips: [],
        outip: '',
        shutdownPort: '',
        tomcatPort: '',
        requestPort: '',
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
            let reg = /^([1-9][0-9]{0,4})$/

            if (reg.test(this.shutdownPort) && reg.test(this.tomcatPort) && reg.test(this.requestPort)) {
                this.$http({
                    url: '/instance_add/',
                    method: 'POST',
                    data: {
                        exampleName: this.exampleName,
                        pack: this.pack,
                        idc: this.idc,
                        inip: this.inip,
                        outip: this.outip,
                        shutdownPort: this.shutdownPort,
                        tomcatPort: this.tomcatPort,
                        requestPort: this.requestPort,
                        domain: this.domain,
                        deployPath: this.deployPath,
                        logPath: this.logPath,
                        docPath: this.docPath,
                        remark: this.remark
                    }
                })
                .then(response => {
                    if (response.data.result) {
                        this.addModal = false

                        this.$dispatch('refresh')
                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            } else {
                this.$dispatch('show-notify', '端口号格式需为5位以内的正整数')
            }
        }
    },
    components: {
        modal,
        vSelect
    },
    vuex: {
        getters: {
            packages,
            idcs
        }
    },
    events: {
        'showAdd' () {
            this.$data = Object.assign({}, origin, init)
            
            this.addModal = true
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