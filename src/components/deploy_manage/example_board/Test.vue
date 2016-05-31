<template>
    <modal :show.sync="viewEnvModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">环境配置检查</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal env-from">
                <div class="form-group" v-for="list in envList">
                    <label class="control-label" v-text="$key"></label>
                    <div v-for="env in list">
                        <span class="selected-tag col-sm-3" :class="env.check ? 'selected-tag active' : 'selected-tag'">
                            <span v-text="env.rule"></span>
                        </span>
                        <span class="col-sm-6 text-center" v-text="env.msg"></span>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="testFn">检查</button>
            <button type="button" class="btn btn-default" @click='viewEnvModal = false'>关闭</button>
        </div>
    </modal>
</template>

<script>
import { modal } from 'vue-strap'

let origin = {
        viewEnvModal: false,
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
                    currentIndex = 0

                function newRequest(currentIndex, len) {
                    if (currentIndex >= len) {
                        return
                    }

                    this.envList[key][currentIndex].msg = '检查中...'

                    this.$http({
                        url: '',
                        method: 'POST',
                        data: {
                            id: this.envList[key][currentIndex].id
                        }
                    })
                    .then(response => {
                        currentIndex ++

                        this.envList[key][currentIndex].msg = response.data.msg

                        // 递归调用自身
                        newRequest(currentIndex, len)
                    })
                }
            }
        }
    },
    components: {
        modal
    },
    events: {
        'showViewEnv' (param) {
            this.viewEnvModal = true

            this.$http({
                url: param.url,
                method: 'POST',
                data: {
                    id: param.id
                }
            })
            .then(response => {
                this.envList = response.data.ret
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

.selected-tag,
.tagexp {
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
}

.selected-tag.active,
.tagexp.active {
    background-color: #d7f3f9;
}

.tagexp {
    float: none;
}
</style>