<template>
    <modal :show.sync="scriptModal" effect="fade" width="800px">
        <div slot="modal-header" class="modal-header">
            <button type="button" class="close" @click="scriptModal = false">
                <span>×</span>
            </button>
            <h4 class="modal-title">脚本编写</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form id="file_form" class="form-horizontal">
                <div class="form-group">
                    <label class="col-sm-2 control-label">规则名：<span class="text-danger">*</span></label>
                    <div class="col-sm-6">
                        <v-select :value.sync="rule" :options="ruleList" placeholder="请选择">
                        </v-select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">脚本来源：</label>
                    <div class="col-sm-6">
                        <radio-group :value.sync="scriptOriginSelected" type="default">
                            <radio :value="'1'">本地脚本</radio>
                            <radio :value="'2'">手工录入</radio>
                        </radio-group>
                    </div>
                </div>
                <div class="form-group" v-if="scriptOriginSelected === '1'">
                    <div class="col-sm-5 col-sm-offset-2">
                        <input type="text" class="form-control" :readonly="true" v-model="road">
                        <input id="file" type="file" name="file" v-show="false" @change="fileChange">
                    </div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-default" @click="fileSearch">浏览</button>
                        <button type="button" class="btn btn-default" @click="fileUpload">上传</button>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">脚本类型：</label>
                    <div class="col-sm-6">
                        <radio-group :value.sync="scriptTypeSelected" type="default">
                            <radio  v-for="scriptType in scriptTypes" :value="scriptType.value">{{ scriptType.label }}</radio>
                        </radio-group>
                    </div>
                </div>
                <div v-show="rule">
                    <div class="form-group">
                        <textarea id="editScript" class="form-group"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">执行账户：<span class="text-danger">*</span></label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" v-model="account">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">超时时间(s)：</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" min="0" max="259200" v-model="timeout" placeholder="最长等待执行秒数，超时则系统返回失败">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">入口参数：</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" v-model="param" placeholder="该参数用于脚本的输入参数，以空格相隔，无则不填">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" :disabled="rule && account.trim() ? false : true" @click="saveScript">保存</button>
            <button type="button" class="btn btn-default" @click="scriptModal = false">取消</button>
        </div>
    </modal>
</template>

<script>
import { modal, radioBtn, radioGroup } from 'vue-strap'
import vSelect from '../../global/Select.vue'
import CodeMirror from 'codemirror/lib/codemirror.js'
import CodeStyle from 'codemirror/lib/codemirror.css'
import Codebg from 'codemirror/theme/erlang-dark.css'
import shell from 'codemirror/mode/shell/shell.js'
import python from 'codemirror/mode/python/python.js'
import perl from 'codemirror/mode/perl/perl.js'

var editor;

export default {
    data () {
        return {
            scriptModal: false,
            ruleList: [],
            rule: '',
            scriptTypes: [
                {value: '1', label: 'shell'},
                {value: '2', label: 'bat'},
                {value: '3', label: 'python'}
            ],
            scriptTypeSelected: '1',
            scriptOriginSelected: '1',
            road: '',
            timeout: '',
            param: '',
            account: 'root'
        }
    },
    methods: {

        // 保存脚本
        saveScript () {
            this.$http({
                url: '/script_edit/',
                method: 'POST',
                data: {
                    id: this.rule,
                    param: this.param,
                    timeout: this.timeout,
                    script: editor.getValue(),
                    script_type: this.scriptTypeSelected,
                    account: this.account
                }
            })
            .then(response => {
                if (response.data.result) {
                    this.rule = ''
                    this.scriptOriginSelected = '1'

                    this.scriptModal = false

                    this.$dispatch('show-success')
                } else {
                    this.$dispatch('show-error')
                }
            })
        },

        // 选择上传脚本
        fileChange () {
            this.road = $('#file').val();
        },

        // 浏览事件
        fileSearch () {
            $('#file').trigger('click')
        },

        // 上传事件
        fileUpload () {
            if (!this.rule) {
                this.$dispatch('show-notify', '请先选择规则名')

                return false
            } 

            if (this.road) {
                let _this = this,
                    formData = new FormData($('#file_form')[0])

                $.ajax({
                    url: '/script_upload/',
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    dataType: 'JSON',
                    data: formData
                })
                .then(function (data) {
                    if (data.result === 1) {
                        $('#file').val('')
                        _this.road = ''
                        editor.setValue(data.content)

                        _this.$dispatch('show-success')
                    } else {
                        _this.$dispatch('show-error')
                    }
                })
            } else {
                this.$dispatch('show-notify', '请先选择脚本文件')
            }
        }
    },
    components: {
        modal,
        CodeMirror,
        vSelect,
        radioGroup,
        radio: radioBtn
    },
    attached () {

        // 初始化codemirror
        editor = CodeMirror.fromTextArea(document.getElementById("editScript"), {    
            lineNumbers: false,
            mode:"shell",
            lineWrapping:true,
            value: document.documentElement.innerHTML,
            theme: 'erlang-dark'
        }); 
    }, 
    events: {

        // 判断是否存在rule
        'showScript' (param) {
            let hasRule = false

            this.scriptModal = true

            this.$http({
                url: '/rule_edit/?id=' + param,
                method: 'GET'
            })
            .then(response => {
                this.ruleList = response.data.rules

                this.ruleList.forEach(e => {
                    if (e.value === this.rule) {
                        hasRule = true

                        return false
                    }
                })

                if (!hasRule) {
                    this.rule = ''
                }
            })
        }
    },
    watch: {

        // 监测规则名
        'rule' (newVal) {
            if (newVal) {
                this.$http({
                    url: '/script_edit/?id=' + newVal,
                    method: 'GET'
                })
                .then(response => {
                    response.data.script ? editor.setValue(response.data.script) : editor.setValue('')

                    this.timeout = response.data.timeout
                    this.param = response.data.param
                    this.account = response.data.account

                    response.data.script_type ? this.scriptTypeSelected = response.data.script_type : this.scriptTypeSelected = '1'
                })
            }
        },

        // 监测脚本类型
        'scriptTypeSelected' (newVal) {
            switch (newVal) {
                case '1':
                    editor.setOption('mode', 'shell');
                    break;
                case '2':
                    editor.setOption('mode', 'perl');
                    break;
                case '3':
                    editor.setOption('mode', 'python');
                    break;
            }
        }
    }
}
</script>

<style scoped>

</style>