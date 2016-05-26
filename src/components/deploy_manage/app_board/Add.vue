<template>
    <modal :show.sync="addModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-3">部署包名：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="packName">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">类型：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="type" :options="appTypes" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">项目名：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="projectName">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">版本号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="version">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">备注：</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" rows="5" v-model="remark"></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="packName && type ? false : true">保存</button>
            <button type="button" class="btn btn-default" @click='addModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { appTypes } from '../../../vuex/getters.js'

let origin = {
        addModal: false,
        packName: '',
        projectName: '',
        type: '',
        version: '',
        remark: ''
    }

export default {
    data () {
        return origin
    },
    methods: {

        // 保存事件
        saveFn () {
            this.$http({
                url: '/package_add/',
                method: 'POST',
                data: {
                    name: this.packName,
                    type: this.type,
                    project: this.projectName,
                    version: this.version,
                    remark: this.remark
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.addModal = false
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
    vuex: {
        getters: {
            appTypes
        }
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
</style>