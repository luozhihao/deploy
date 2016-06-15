<template>
    <modal :show.sync="uploadModal" effect="fade" width="550px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">上传</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form id="file_form" class="form-inline text-center">
                <label>选择文件：</label>
                <input type="text" class="form-control upload-input" onfocus="this.blur()" v-model="road">
                <input id="file" type="file" name="file" v-show="false" @change="changeFn">
                <button type="button" class="btn btn-default" @click="findFile">浏览</button>
                <button type="button" class="btn btn-default" @click="uploadFile">上传</button>
            </form>
            <table class="table table-bordered file-table">
                <thead>
                    <tr>
                        <th>上传人</th>
                        <th>文件名</th>
                        <th>上传时间</th>
                        <th>hash值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="hash !== ''">
                        <td v-text="user" :title="user"></td>
                        <td v-text="filename" :title="filename"></td>
                        <td v-text="time" :title="time"></td>
                        <td v-text="hash" :title="hash"></td>
                    </tr>
                    <tr class="text-center" v-show="hash === ''">
                        <td colspan="4">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='uploadModal = false'>取消</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
    data () {
        return {
            uploadModal: false,
            idNum: null,
            road: '',
            user: '',
            filename: '',
            time: '',
            hash: ''
        }
    },
    methods: {

        // 浏览文件
        findFile () {
            $('#file').trigger('click')
        },

        // 路径捕获
        changeFn () {
            this.road = $('#file').val()
        },

        // 上传文件
        uploadFile () {

            if (this.road !== '') {
                let _this = this,
                    formData = new FormData($('#file_form')[0])

                formData.append('id', _this.idNum)

                $.ajax({
                        url: '/package_file_upload/',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        dataType: 'JSON',
                        data: formData
                    })
                    .then(function (data) {
                        if (data.result === 1) {
                            _this.road = ''

                            _this.getList()

                            _this.$dispatch('show-success')
                        } else {
                            _this.$dispatch('show-error')
                        }
                    })
            }    
        },

        // 获取上传记录
        getList () {
            this.$http({
                url: '/package_file_view/',
                method: 'POST',
                data: {
                    id: this.idNum
                }
            })
            .then((response) => {
                if (response.data.result === 1) {
                    this.user = response.data.user
                    this.filename = response.data.file_name
                    this.time = response.data.upload_time
                    this.hash = response.data.hash
                } else if (response.data.result === -1) {
                    this.user = ''
                    this.filename = ''
                    this.time = ''
                    this.hash = ''
                } else {
                    this.$dispatch('show-error')
                }
            })
        }
    },
    components: {
        modal
    },
    events: {
        'showUpload' (param) {
            this.idNum = param

            this.uploadModal = true

            this.getList()
        }
    }
}
</script>

<style scoped>
.upload-input {
    width: 285px;
}

.file-table {
    margin-top: 35px;
}
</style>