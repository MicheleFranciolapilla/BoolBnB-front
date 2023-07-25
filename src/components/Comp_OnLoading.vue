<script>
    export default
    {
        name        :   "Comp_OnLoading",
        props       :   ['hg_color', 'message', 'big'],
    }
</script>

<template>
    <div 
        id="on_loading" 
        class="text-center" 
        :style="{color: hg_color}"
    >
        <div v-if="big" :class="{ 'empty_message' : message === '' }">
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
        .empty_message
        {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
            opacity: 0.75;
            width: 6rem;
            aspect-ratio: 1;
            border: 3px solid black;
            border-radius: 5px;
        }
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