<script setup>
import { ref } from 'vue';

import ChatHeader from './ChatHeader.vue';
import ChatFooter from './ChatFooter.vue';
import UserBubble from './UserBubble.vue';
import TuringBubble from './TuringBubble.vue';
// Lottie
import { Vue3Lottie } from 'vue3-lottie';
import ChatAnimation from '../animations/chat.json';

// Pinia
import { useChatTimelineStore } from '../../stores/chatTimeline';
const chatStore = useChatTimelineStore();

//refs
const isTuringTyping = chatStore.isTuringTyping;

fetch('/messagePayload.json')
    .then(response => response.json())
    .then(data => {
        // Armazene os dados na store
        chatStore.setPayload(data);
    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
    });


</script>
<template>
    <div class="_chat_wrapper">
        <div class="_chat_container flex flex-col justify-between">
            <ChatHeader class="_chat_header" :isTuringTyping="chatStore.isTuringTyping" />
            <div class="_chat_content">
                <!-- Welcome message -->
                <div v-if="chatStore.messages.length === 0" class="w-full h-full flex justify-center items-center ">
                    <div
                        class="w-2/3 py-3 backdrop-blur-sm bg-white/10 rounded-md text-center flex flex-col justify-center items-center">
                        <Vue3Lottie :animationData="ChatAnimation" :width="110" :loop="true" />
                        <h1 class="font-bold">Tudo certo! 😎</h1>
                        <small class="text-gray-300">Vamos iniciar o seu teste de inglês. <br> É só clicar em iniciar aqui
                            embaixo. 👇</small>
                    </div>
                </div>

                <!-- renderização das mensagens -->
                <div v-for="(message, index) in chatStore.messages" :key="index">
                    <!-- Mensagem do usuário -->
                    <UserBubble v-if="message.entity === 'user'" :message="message" />

                    <!-- Mensagem turing -->
                    <TuringBubble v-else-if="message.entity === 'bot'" :message="message" />
                </div>

            </div>
            <!-- <p v-html="chatStore.messagePayload.guest_presentation.message[0]"></p> -->
            <ChatFooter class="_chat_footer" :chatStore="chatStore" />
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
    overflow-y: auto;
    /* border: 1px solid red */
}


._chat_footer {
    height: 10%;
    min-height: 60px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}


/* Scrollbar */
._chat_content::-webkit-scrollbar {
    width: 5px;
}

._chat_content::-webkit-scrollbar-track {
    background: transparent !important;
}

._chat_content::-webkit-scrollbar-thumb {
    background: #656565;
    border-radius: 5px;
}

._chat_content::-webkit-scrollbar-thumb:hover {
    background: #555454;
    cursor: pointer;
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