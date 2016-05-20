<template>
    <modal :show.sync="addModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">添加</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-3">名称：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group input-box">
                    <label class="control-label col-sm-3">类型：</label>
                    <div class="col-sm-8">
                        <v-select :value.sync="version" :options="versions" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">版本/型号：</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">备注：</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" rows="5"></textarea>
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

export default {
    data () {
        return {
            addModal: false,
            versions: [],
            version: ''
        }
    },
    components: {
        modal,
        vSelect
    },
    events: {
        'showModal' () {
            this.addModal = true
        }
    }
}
</script>

<style scoped>

</style>