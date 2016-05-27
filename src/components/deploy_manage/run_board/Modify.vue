<template>
    <modal :show.sync="modifyModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">修改</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-3">名称：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="name"></label>
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">类型：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <v-select :value.sync="type" :options="types" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group" v-for="version in versions" track-by="$index">
                    <label class="control-label col-sm-3" v-show="$index === 0">版本/型号：</label>
                    <div :class="$index === 0 ? 'col-sm-8' : 'col-sm-8 col-sm-offset-3'">
                        <input type="text" class="form-control" v-model="version">
                    </div>
                    <div class="col-sm-1 add-menu" v-if="$index === 0" @click="versions.push('')">
                        <span class="glyphicon glyphicon-plus"></span>
                    </div>
                    <div class="col-sm-1 add-menu" v-else @click="versions.splice($index, 1)">
                        <span class="glyphicon glyphicon-minus text-danger"></span>
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
            <button type="button" class="btn btn-default" :disabled="name.trim() && type ? false : true" @click="saveFn">保存</button>
            <button type="button" class="btn btn-default" @click='modifyModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { types } from '../../../vuex/getters.js'

let origin = {
        modifyModal: false,
        name: '',
        type: '',
        versions: [''],
        remark: '',
        id: null
    }

export default {
    data () {
        return origin
    },
    methods: {

        // 保存修改
        saveFn () {
            this.$http({
                url: '/env_edit/',
                method: 'POST',
                data: {
                    id: this.id,
                    name: this.name,
                    type: this.type,
                    versions: this.versions,
                    remark: this.remark
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.modifyModal = false

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
    vuex: {
        getters: {
            types
        }
    },
    events: {
        'showModify' (param) {
            this.modifyModal = true

            this.$http({
                url: '/env_edit/?id=' + param,
                method: 'GET'
            })
            .then(response => {
                this.name = response.data.name
                this.type = response.data.type
                this.versions = response.data.versions
                this.remark = response.data.remark
                this.id = param
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
</style>