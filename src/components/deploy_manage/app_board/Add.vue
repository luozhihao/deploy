<template>
    <modal :show.sync="addModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-3">部署包名：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="packName">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="type" :options="types" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">项目名：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="projectName">
                    </div>
                </div>
                <div class="form-group" v-for="version in versions">
                    <label class="control-label col-sm-3" v-show="$index === 0">版本号：</label>
                    <div :class="$index === 0 ? 'col-sm-8' : 'col-sm-8 col-sm-offset-3'">
                        <input type="text" class="form-control" v-model="version">
                    </div>
                    <div class="col-sm-1 add-menu">
                        <span class="glyphicon glyphicon-plus" v-if="$index === 0"></span>
                        <span class="glyphicon glyphicon-minus text-danger" v-else></span>
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
        packName: '',
        projectName: '',
        types: [],
        type: '',
        versions: [''],
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
</style>