<template>
    <modal :show.sync="scriptModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">脚本编写</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group text-center">
                    <v-select :value.sync="rule" :options="rules" placeholder="请选择">
                    </v-select>
                </div>
                <div class="form-group">
                    <textarea id="editScript" class="form-group" name="editScript"></textarea>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default">保存</button>
            <button type="button" class="btn btn-default">取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import CodeMirror from 'codemirror/lib/codemirror.js'
import CodeStyle from 'codemirror/lib/codemirror.css'
import Codebg from 'codemirror/theme/erlang-dark.css'
import CodeMode from 'codemirror/mode/shell/shell.js'

export default {
    data () {
        return {
            scriptModal: false,
            rules: [
                {value: '1', label: '规则1'},
                {value: '2', label: '规则2'}
            ],
            rule: ''
        }
    },
    components: {
        modal,
        CodeMirror,
        vSelect
    },
    attached () {
        let editor = CodeMirror.fromTextArea(document.getElementById("editScript"), {    
            lineNumbers: false,
            mode:"shell",
            lineWrapping:true,
            value: document.documentElement.innerHTML,
            theme: 'erlang-dark'
        }); 
    },
    events: {
        'showScript' () {
            this.scriptModal = true
        }
    }
}
</script>

<style scoped>

</style>