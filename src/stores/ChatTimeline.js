import { defineStore } from "pinia";

export const useChatTimelineStore = defineStore("chatTimeline", {
    state: () => ({
        messages: [],
        messagePayload: [],
        isTuringTyping: false
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
                this.isTuringTyping = true
                setTimeout(() => {
                    this.TuringResponse(message)
                    this.isTuringTyping = false
                }, 1000);

            }
        },


        // General methods
        TuringResponse(lastUserMessage) {
            var isFirstMessage = lastUserMessage == '/iniciar'
            if (isFirstMessage) {
                this.pushMessage('bot', this.getRandomMsg("guest_presentation"))
            }
        },


        //
        getRandomMsg(context) {
            const messages = this.messagePayload[context].message;
            const randomIndex = Math.floor(Math.random() * messages.length);
            return messages[randomIndex];
        }


    },
});