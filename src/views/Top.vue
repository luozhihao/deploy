<template>
    <div class="main-header">
        <div class="hide-menu">  
        </div>
        <dropdown class="pull-right"> 
            <div data-toggle="dropdown" class="username">
                <span class="glyphicon glyphicon-user"></span>
                luozh
                <span class="caret"></span>
            </div>
            <ul slot="dropdown-menu" class="dropdown-menu">
                <li><a href="#">退出</a></li>
            </ul>
        </dropdown>
    </div>
</template>

<script>
import { dropdown } from 'vue-strap'

export default {
    components: {
        dropdown
    }
}
</script>

<style scoped>
.main-header {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: white;
    color: #A3A3A3;
    box-shadow: 0 0 2px #ccc;
    z-index: 1023;
}

.username {
    height: 50px;
    padding: 0 75px 0 20px;
    cursor: pointer;
    border-radius: 0 !important;
}

.username:hover {
    background: #F5F5F5;
    color: #919292;
}

.glyphicon-user {
    color: #56c0e0;
}

.hide-menu {
    float: left;
    width: 50px;
    height: 50px;
    color: #676A6F;
    font-size: 16px;
    margin-left: 10px;
    background: url('../assets/images/nav-min.png') center center no-repeat;
    cursor: pointer;
}
</style>