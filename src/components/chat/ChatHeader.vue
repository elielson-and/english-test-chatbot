<script setup>
import { ref } from 'vue'
import MenuIcon from '../icons/MenuIcon.vue'

// refs
const isTyping = ref(false);
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}


</script>
<template>
    <header class="w-full bg-slate-600 flex justify-between p-4">
        <div class="flex items-center">
            <div class="flex items-center">
                <img class="w-11 h-11 rounded-full border-2 border-orange-600" src="../../images/turing.png"
                    alt="Turing profile image">
            </div>
            <div class="text-white ml-2">
                <p class="-mb-1">Turing - Assistente</p>
                <small>
                    <span v-if="isTyping">digitando...</span>
                    <span v-else class="m-0 p-0 text-center flex items-center">
                        <div class="w-2 h-2 rounded-full bg-green-300 mr-1"></div> online
                    </span>
                </small>
            </div>
        </div>
        <!-- botao menu -->
        <div class="relative flex items-center">
            <MenuIcon class="w-11 h-11 p-2 text-white hover:bg-slate-700 hover:cursor-pointer rounded-full"
                @click="toggleMenu" />

            <!-- Mini modal do menu -->
            <div v-if="isMenuOpen" class="absolute bg-slate-800 w-44 right-0 top-9 rounded-md mt-2 p-2">
                ajjkashd
            </div>
        </div>
    </header>
</template>
