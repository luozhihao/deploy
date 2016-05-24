<template>
    <div class="sidebar">
        <a class="logo" v-link="{ path: '/' }">
            <img src="../assets/images/logo2.png" height="35" width="134">
        </a>
        <aside class="menu">
            <div>
                <div class="aside-header">
                    <span class="icon glyphicon glyphicon-home"></span>
                    <span>总览</span>
                    <span class="icon-arrow glyphicon glyphicon-menu-down"></span>
                </div>
                <ul class="aside-lists">
                    <li v-link="{ path: '/runBoard' }">
                        <span class="icon glyphicon glyphicon-cd"></span>
                        <span>运行环境管理</span>
                    </li>
                    <li v-link="{ path: '/appBoard' }">
                        <span class="icon glyphicon glyphicon-wrench"></span>
                        <span>应用配置管理</span>
                    </li>
                    <li v-link="{ path: '/exampleBoard' }">
                        <span class="icon glyphicon glyphicon-tasks"></span>
                        <span>实例配置管理</span>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>

<script>
    
</script>

<style scoped>
.sidebar {
    width: 200px;
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: #303742;
    z-index: 102;
    overflow-x: hidden;
}

.logo {
    width: 200px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
}

.menu {
    margin-top: 20px;
}

.aside-header {
    position: relative;
    width: 100%;
    height: 48px;
    padding: 12px 5px 12px 23px;
    color: #b8c7ce;
    cursor: pointer;
}

.aside-header:hover {
    color: #fff;
}

.icon {
    width: 20px;
}

.icon-arrow {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 12px;
}

.aside-lists {
    padding: 0;
}

.aside-lists li {
    width: 100%;
    height: 36px;
    line-height: 36px;
    border-left: 3px solid transparent;
    padding: 0 5px 0 33px;
    background: #282E38;
    color: #b4b6bd;
    font-size: 12px;
    cursor: pointer;
}

.aside-lists li:hover {
    color: #fff;
}

.aside-lists li.active {
    color: #fff;
    border-left-color: #4298eb;
}
</style>