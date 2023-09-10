<script setup>
import { ref } from 'vue';

import ChatHeader from './ChatHeader.vue';
import ChatFooter from './ChatFooter.vue';
// Lottie
import { Vue3Lottie } from 'vue3-lottie';
import ChatAnimation from '../animations/chat.json';

//Refs


</script>
<template>
    <div class="_chat_wrapper">
        <div class="_chat_container flex flex-col justify-between">
            <ChatHeader class="_chat_header" />
            <div class="_chat_content">
                <!-- Welcome message -->
                <div v-if="false" class="w-full h-full flex justify-center items-center">
                    <div
                        class="w-2/3 py-3 backdrop-blur-sm bg-white/10 rounded-md text-center flex flex-col justify-center items-center ">
                        <Vue3Lottie :animationData="ChatAnimation" :width="110" :loop="true" />
                        <h1 class="font-bold">Tudo certo! 😎</h1>
                        <small class="text-gray-300">Vamos iniciar o seu teste de inglês. <br> É só clicar em iniciar aqui
                            embaixo. 👇</small>
                    </div>
                </div>

                <!-- renderização das mensagens -->

                <!-- Mensagem do usuario -->
                <div class="flex items-center flex-row-reverse my-4 ">
                    <div class=" bg-indigo-600  p-2 rounded-lg mb-2 relative">
                        <div>/iniciar_conversa </div>
                        <div class="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-600">
                        </div>
                    </div>
                </div>

                <!-- Mensagem turing -->
                <div class="flex items-center my-4">
                    <div
                        class="bg-gradient-to-tr rounded-md from-indigo-900 via-transparent to-transparent backdrop-blur-lg bg-white/10 text-white p-2 pb-4 mb-2 relative z-10">
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. ✅</div>
                        <div class="absolute left-0 bottom-2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-900 ">
                        </div>
                        <div class="absolute right-2 bottom-1 text-xxs text-gray-400">
                            Hoje às 10:35
                        </div>
                    </div>
                </div>

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
    height: 90vh;
    max-height: 700px;
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
    padding: 0 10px;
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