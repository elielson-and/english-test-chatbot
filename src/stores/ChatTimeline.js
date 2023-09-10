import { defineStore } from "pinia";

export const useChatTimelineStore = defineStore("chatTimeline", {
    state: () => ({
        messages: [],
    }),
    getters: {
        // errors: (state) => state.authErrors,
    },
    actions: {
        start() {
            const current_hour = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            this.pushMessage("user", "/iniciar", current_hour);
        },

        pushMessage(entity, message, current_hour) {
            this.messages.push({ entity, message, current_hour })
        }

    },
});