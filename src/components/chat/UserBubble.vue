<script setup>
import ClockIcon from '../icons/ClockIcon.vue';

defineProps({
    message: {
        type: Object
    }
})
</script>
<template>
    <div class="flex items-center flex-row-reverse my-4 ">
        <div class=" bg-indigo-600  p-2 pb-4 px-4 rounded-lg mb-2 relative animate-fade-down  animate-duration-[400ms]">
            <div>{{ message.message }}</div>
            <div class="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-600">
            </div>
            <div class="absolute right-2 bottom-1 text-xxs text-gray-300 flex items-center ">
                <ClockIcon class="w-[10px] text-white " /> {{ message.current_hour }}
            </div>
        </div>
    </div>
</template>