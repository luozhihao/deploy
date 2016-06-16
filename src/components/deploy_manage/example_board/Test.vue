<template>
    <modal :show.sync="testModal" effect="fade" width="550px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">环境配置检查 / 部署</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal env-from">
                <div class="form-group" v-for="list in envList">
                    <label class="control-label" v-text="$key"></label>
                    <div class="clearfix" v-for="env in list">
                        <span class="selected-tag active col-sm-4">
                            <span v-text="env.rule" :title="env.rule"></span>
                        </span>
                        <span v-text="env.msg" :title="env.msg" :class="{'col-sm-7': true, 'text-center': true, 'tag-msg': true, 'text-success': env.msg === 'ok', 'text-warning': env.msg === '未检查', 'text-danger': env.msg !== 'ok' && env.msg !== '未检查' && env.msg !== '检查中...'}"></span>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="testFn">检查</button>
            <button type="button" class="btn btn-default" @click="setFn">部署</button>
            <button type="button" class="btn btn-default" @click='testModal = false'>关闭</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

let origin = {
        testModal: false,
        idNum: null,
        envList: {}
    };

export default {
    data () {
        return origin
    },
    methods: {

        // 校验方法
        testFn () {
            for (let key in this.envList) {

                let len = this.envList[key].length,
                    currentIndex = 0,
                    _this = this

                const newRequest = (currentIndex, len) => {
                    if (currentIndex >= len) {
                        return
                    }

                    _this.envList[key][currentIndex].msg = '检查中...'

                    _this.$http({
                        url: '/instance_check/',
                        method: 'POST',
                        data: {
                            id: _this.idNum,
                            rid: _this.envList[key][currentIndex].id
                        }
                    })
                    .then(response => {
                        if (response.data.result !== 0) {
                            _this.envList[key][currentIndex].msg = response.data.msg
                        } else {
                            _this.envList[key][currentIndex].msg = '服务器出错了'
                        }

                        currentIndex ++

                        // 递归调用自身
                        newRequest(currentIndex, len)
                    })
                }

                newRequest(currentIndex, len)
            }
        },

        // 部署方法
        setFn () {
            let isPass = true

            for (let key in this.envList) {
                let arr = this.envList[key]

                arr.forEach((e) => {
                    console.log(e.msg)

                    if (e.msg !== 'ok') {
                        isPass = false
                    }
                })
            }

            if (isPass) {
                console.log(111)
            } else {
                this.$dispatch('show-notify', '存在未通过检测的配置')
            }
        }
    },
    components: {
        modal
    },
    events: {
        'showTestEnv' (param) {
            this.testModal = true

            this.$http({
                url: '/instance_check/?id=' + param,
                method: 'GET'
            })
            .then(response => {
                this.envList = response.data.ret

                this.idNum = param
            })
        }
    }
}
</script>

<style scoped>
.env-from {
    max-height: 550px;
    overflow: auto;
    padding: 0 20px;
}

.selected-tag {
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 26px;
    margin: 4px 1px 0 3px;
    padding: 0 .25em;
    float: left;
    line-height: 1.7em;
    color: #147688;
    background-color: #fff;
    border-color: #91ddec;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.selected-tag.active {
    background-color: #d7f3f9;
}

.tag-msg {
    height: 26px;
    line-height: 26px;
    margin: 4px 1px 0 3px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>