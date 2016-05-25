<!-- 确认操作组件 -->
<template>
    <modal :show.sync="confirmModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">
                确认操作
            </h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <h4 class="text-center">确认要删除此配置？</h4>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-warning" @click="okFn">
                确认
            </button>
            <button type="button" class="btn btn-default" @click="confirmModal = false">
                取消
            </button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data () {
        return {
            confirmModal: false,
            tag: ''
        }
    },
    methods: {
        okFn () {
            let _this = this

            this.$dispatch('confirm', _this.tag)
            this.confirmModal = false
        }
    },  
    components: {
        modal
    },
    events: {
        'showConfirm' (data) {
            this.confirmModal = true

            if (data) {
                this.tag = data
            }
        }
    }
}
</script>

<style>
    
</style>