<template>
    <modal :show.sync="copyModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">复制</h4>
        </div>
        <div slot="modal-body" class="modal-body text-center">
            从
            <v-select :value.sync="setting" :options="settings" placeholder="请选择">
            </v-select>
            上复制生成新的应用配置?
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">确定</button>
            <button type="button" class="btn btn-default" @click='copyModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'

let origin = {
        copyModal: false,
        settings: [],
        setting: ''
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
        'showCopy' () {
            this.copyModal = true
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