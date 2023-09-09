<script setup>
</script>
<template>
    <div class="_chat_wrapper">
        <div class="_chat_container ">

        </div>
    </div>
</template>

<style scoped>
._chat_wrapper {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to bottom right, rgb(0, 7, 75), rgb(0, 15, 43));
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;

}

._chat_container {
    width: 100%;
    max-width: 500px;
    height: 100vh;
    max-height: 600px;
    border-radius: 8px;
    background-color: white;
}

/* Design responsivo */
@media screen and (max-width: 600px) {
    ._chat_container {
        max-width: none;
        max-height: none;
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
}
</style>