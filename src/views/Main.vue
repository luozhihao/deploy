<template>
    <div class="right-view">
        <Top></Top>
        <div class="right-main">
            <router-view transition="fade" transition-mode="out-in"></router-view>
        </div>
    </div>
</template>

<script>
import Top from './Top.vue'

export default {
    components: {
        Top
    }
}
</script>

<style scoped>
.right-view {
    width: auto;
    position: absolute;
    top: 0;
    left: 200px;
    bottom: 0;
    right: 0;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f5f5f5;
}

.right-main {
    width: auto;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f5f5f5;
}

.fade-transition {
    transition: opacity 0.1s ease;
}

.fade-enter, .fade-leave {
    opacity: 0;
}
</style>