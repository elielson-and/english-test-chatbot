import { defineStore } from "pinia";

export const useChatTimelineStore = defineStore("chatTimeline", {
    state: () => ({
        messages: [],
        messagePayload: [],
    }),
    getters: {
        // errors: (state) => state.authErrors,
    },
    actions: {
        // Startup
        setPayload(data) {
            this.messagePayload = data;
        },

        start() {
            this.pushMessage("user", "/iniciar");
        },

        // Static methods
        pushMessage(entity, message) {
            const current_hour = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            this.messages.push({ entity, message, current_hour });
            if (entity == 'user') {
                this.TuringResponse(message)
            }
        },


        // General methods
        TuringResponse(lastUserMessage) {
            console.log("Hora da resposta")
        },


    },
});