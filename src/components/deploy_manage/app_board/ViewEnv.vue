<template>
    <modal :show.sync="viewEnvModal" effect="fade" width="450px">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">运行前置条件</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal env-from">
                <div class="form-group text-center">
                    <span class="tagexp active"></span>添加
                    <span class="tagexp"></span>未添加
                </div>
                <div class="form-group" v-for="list in envList">
                    <label class="control-label" v-text="$key"></label>
                    <div>
                        <span class="selected-tag" v-for="env in list" :class="env.check ? 'selected-tag active' : 'selected-tag'">
                            <span v-text="env.rule"></span>
                        </span>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
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
    components: {
        modal
    },
    events: {
        'showViewEnv' (param) {
            this.viewEnvModal = true

            this.$http({
                url: '/package_env_view/',
                method: 'POST',
                data: {
                    id: param
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