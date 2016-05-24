<template>
    <modal :show.sync="ruleModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">规则配置</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group" v-for="rule in rules" track-by="$index">
                    <label class="control-label col-sm-3">规则{{ $index + 1 }}：</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" v-model="rule">
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
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default" @click='ruleModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

let origin = {
        ruleModal: false,
        rules: ['']
    }

export default {
    data () {
        return origin
    },
    methods: {

        // 添加规则
        addRules () {
            this.rules.push('')
        },

        // 删除规则
        removeRules (index) {
            this.rules.splice(index, 1)
        }
    },
    components: {
        modal
    },
    events: {
        'showRule' () {
            this.ruleModal = true
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