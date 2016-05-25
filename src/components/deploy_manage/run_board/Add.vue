<template>
    <modal :show.sync="addModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-3">名称：<span class="text-danger">*</span></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="name">
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
                    <div class="col-sm-1 add-menu" v-if="$index === 0" @click="addMenu">
                        <span class="glyphicon glyphicon-plus"></span>
                    </div>
                    <div class="col-sm-1 add-menu" v-else @click="removeMenu($index)">
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
            <button type="button" class="btn btn-default" @click="saveFn" :disabled="name.trim() && type ? false: true">保存</button>
            <button type="button" class="btn btn-default" @click='addModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import { types } from '../../../vuex/getters.js'

let origin = {
        addModal: false,
        name: '',
        type: '',
        versions: [''],
        remark: ''
    },
    init = Object.assign({}, origin);

export default {
    data () {
        return origin
    },
    methods: {

        // 添加版本
        addMenu () {
            this.versions.push('')
        },

        // 删除版本
        removeMenu (index) {
            this.versions.splice(index, 1)
        },

        // 保存
        saveFn () {
            this.$http({
                url: '/env_add/',
                method: 'POST',
                data: {
                    name: this.name,
                    type: this.type,
                    versions: this.versions,
                    remark: this.remark
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.addModal = false

                    this.$data = Object.assign(origin, init)
                    this.versions = ['']

                    this.$dispatch('refresh')
                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            }, () => this.$dispatch('show-error'))
        }
    },
    vuex: {
        getters: {
            types
        }
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
</style>