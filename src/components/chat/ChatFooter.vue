<script setup>
import { ref } from "vue"
import { useChatTimelineStore } from '../../stores/chatTimeline';
const chatStore = useChatTimelineStore();

const textInput = ref('');

const sendMessage = (message) => {
    if (textInput.value != '') {
        chatStore.pushMessage('user', message);
        textInput.value = '';
    }

}

// Emmits
defineEmits(['scroll-content']);
</script>

<template>
    <footer class="w-full bg-slate-600">

        <div v-if="chatStore.isFinished" class="w-full h-full flex items-center justify-center">
            <span>O teste foi encerrado. <a href="#" class="text-blue-300">Repetir</a></span>
        </div>
        <div v-else class="h-full">
            <div v-if="chatStore.messages.length === 0" class="w-full h-full p-4 ">
                <button @click="chatStore.start()"
                    class="bg-blue-500 rounded-md text-white w-full h-8 px-3">Iniciar</button>
            </div>

            <div v-else class="w-full h-full p-2 flex items-center ">
                <form class="w-full flex justify-around" @submit.prevent="() => sendMessage(textInput)">
                    <input type="text" v-model="textInput"
                        class="w-3/4 h-10 p-2 text-white rounded-md bg-slate-500 focus:outline-none"
                        placeholder="Digite aqui...">
                    <button type="submit" @click="this.$emit('scroll-content')"
                        class="w-1/5 h-10 bg-blue-700 rounded-md text-white">
                        Enviar
                    </button>
                </form>
            </div>
        </div>


    </footer>
</template>

<style scoped>
._input_message {
    width: 80%;
}
</style>
