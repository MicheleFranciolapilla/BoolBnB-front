<script>
    export default
    {
        name        :   "Comp_OnLoading",
        props       :   ['hg_color', 'message', 'big'],
    }
</script>

<template>
    <div id="on_loading" :style="{color: hg_color}">
        <div v-if="big">
            <h2>
                <i class="fa-solid fa-hourglass-start fa-spin-pulse" :style="{color: hg_color}"></i>
            </h2>
            <h3>{{ message }}</h3>
        </div>
        <h6 v-else>
            <i class="fa-solid fa-hourglass-start fa-spin-pulse" :style="{color: hg_color}"></i>
        </h6>
    </div>
</template>

<style scoped lang="scss">
    #on_loading
    {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        i
        {
            background-color: transparent;
        } 
    }
</style>