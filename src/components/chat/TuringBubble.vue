<script setup>
import ClockIcon from '../icons/ClockIcon.vue';

defineProps({
    message: {
        type: Object,
    }
})
</script>

<template>
    <div class="flex items-center my-4">
        <div
            class="bg-gradient-to-tr rounded-md from-indigo-900 via-transparent to-transparent backdrop-blur-lg bg-white/10 text-white p-2 pb-4 mb-2 relative z-10 animate-fade-down  animate-duration-[400ms]">
            <div v-html="message.message"></div>
            <div class="absolute left-0 bottom-2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-900 ">
            </div>
            <div class="absolute right-2 bottom-1 text-xxs text-gray-400 flex items-center">
                <ClockIcon class="w-[10px] text-white " /> {{ message.current_hour }}
            </div>
        </div>
    </div>
</template>