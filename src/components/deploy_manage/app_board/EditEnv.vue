<template>
    <modal :show.sync="editEnvModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">运行环境配置</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal env-from">
                <div class="form-group text-center">
                    <v-select :value.sync="env" :options="envArr" placeholder="请选择" :search="true">
                    </v-select>
                </div>
                <div class="form-group text-center env-rule" v-if="env !== ''">
                    <checkbox-group :value.sync="envValue">
                        <checkbox :value="rule.value" v-for="rule in rules">{{ rule.label }}</checkbox>
                    </checkbox-group>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" :disabled="env ? false : true" @click="saveFn">保存</button>
            <button type="button" class="btn btn-default" @click='editEnvModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import vSelect from '../../global/Select.vue'
import { modal, checkboxGroup, checkboxBtn } from 'vue-strap'

let origin = {
        editEnvModal: false,
        env: '',
        envArr: [],
        envValue: [],
        rules: [],
        envId: null
    };

export default {
    data () {
        return origin
    },
    methods: {

        // 保存环境
        saveFn () {
            if (this.env) {
                this.$http({
                    url: '/package_rules/',
                    method: 'POST',
                    data: {
                        package_id: this.envId,
                        rules: this.envValue,
                        env_id: this.env
                    }   
                })
                .then(response => {
                    if (response.data.result) {
                        this.$dispatch('show-success')
                    }
                })
            }
        }
    },
    components: {
        modal,
        vSelect,
        checkboxGroup,
        checkbox: checkboxBtn
    },
    events: {
        'showEditEnv' (param) {
            this.editEnvModal = true
            this.envId = param

            this.env = ''
            this.rules = []
            this.envValue = []

            this.$http({
                url: '/package_envs/',
                method: 'GET'
            })
            .then(response => {
                this.envArr = response.data.envs
            })
        }
    },
    watch: {
        'env' (newVal) {
            this.$http({
                url: '/package_rules/?env_id=' + newVal + '&package_id=' + this.envId,
                method: 'GET'
            })
            .then(response => {
                this.envValue = response.data.rules
                this.rules = response.data.rule_list
            })
        }
    }
}
</script>

<style scoped>
.env-from {
    min-height: 400px;
}
</style>