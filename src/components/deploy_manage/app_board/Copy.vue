<template>
    <modal :show.sync="copyModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">复制</h4>
        </div>
        <div slot="modal-body" class="modal-body copy-body text-center">
            从
            <v-select :value.sync="setting" :options="settings" :search="true" placeholder="请选择">
            </v-select>
            上复制生成新的应用配置?
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" :disabled="setting ? false : true" @click="okFn">确定</button>
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
    methods: {

        // 确认复制
        okFn () {
            this.$http({
                url: '/package_copy/',
                method: 'POST',
                data: {
                    id: this.setting
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.setting = ''
                    this.copyModal = false

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
        'showCopy' () {
            this.copyModal = true

            this.$http({
                url: '/package_copy/',
                method: 'GET'
            })
            .then(response => {
                this.settings = response.data.packages
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

.copy-body {
    min-height: 200px;
}

.copy-body .dropdown-menu {
    max-height: 160px;
    overflow-y: auto;
}
</style>