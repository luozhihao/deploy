<template>
    <modal :show.sync="ruleModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">规则配置</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group" v-for="list in rules" track-by="$index">
                    <label class="control-label col-sm-3">规则{{ $index + 1 }}：</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" v-model="list.label">
                    </div>
                    <div class="col-sm-2 add-menu" v-if="$index === 0" @click="addRules">
                        <span class="glyphicon glyphicon-plus"></span>
                    </div>
                    <div class="col-sm-2 add-menu" @click="removeRules($index)" v-else>
                        <span class="glyphicon glyphicon-minus text-danger"></span>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="saveRules">保存</button>
            <button type="button" class="btn btn-default" @click='ruleModal = false'>取消</button>
        </div>
    </modal>
    <delete-modal></delete-modal>
</template>

<script>
import { modal } from 'vue-strap'
import { rules, ruleId } from '../../../../vuex/getters.js'
import deleteModal from './Confirm.vue'

let origin = {
        ruleModal: false
    }

export default {
    data () {
        return origin
    },
    methods: {

        // 添加规则
        addRules () {
            this.rules.push({value: '', label: ''})
        },

        // 删除规则
        removeRules (index) {
            if (this.rules[index].value) {
                this.$broadcast('showDelete', index)
                this.$broadcast('setMsg', '该规则下对应的脚本也会删除，是否确认？')
            } else {
                this.rules.splice(index, 1)
            }
        },

        // 保存规则
        saveRules () {
            let isPass = true

            this.rules.forEach(e => {
                if (!e.label.trim()) {
                    isPass = false
                    this.$dispatch('show-notify', '规则名不能为空')

                    return false
                }
            })

            if (isPass) {
                this.$http({
                    url: '/rule_edit/',
                    method: 'POST',
                    data: {
                        id: this.ruleId,
                        rules: JSON.stringify(this.rules)
                    }
                })
                .then(response => {
                    if (response.data.result) {
                        this.ruleModal = false

                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            }
        }
    },
    components: {
        modal,
        deleteModal
    },
    vuex: {
        getters: {
            rules,
            ruleId
        }
    },
    events: {
        'showRule' () {
            this.ruleModal = true
        },
        'deleteRule' (param) {

            // 删除规则
            this.$http({
                url: '/rule_delete/',
                method: 'POST',
                data: {
                    id: this.rules[param].value
                }
            })
            .then(response => {
                response.data.result ? this.rules.splice(param, 1) : ''
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