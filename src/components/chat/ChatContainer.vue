<script setup>
import ChatHeader from './ChatHeader.vue';
import ChatFooter from './ChatFooter.vue';

</script>
<template>
    <div class="_chat_wrapper">
        <div class="_chat_container flex flex-col justify-between">
            <ChatHeader class="_chat_header" />
            <div class="_chat_content">
                test content
            </div>

            <ChatFooter class="_chat_footer" />
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
    max-width: 420px;
    height: 100vh;
    max-height: 600px;
    border-radius: 10px;
    background-image: url('../../images/chat_background.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

._chat_header {
    height: 10%;
    min-height: 60px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

._chat_content {
    width: 100%;
    height: 80%;
    padding: 0 4px;
    /* border: 1px solid red */
}

._chat_footer {
    height: 10%;
    min-height: 60px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
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

    ._chat_footer,
    ._chat_header {
        border-radius: 0;
    }
}
</style>