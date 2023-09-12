import { defineStore } from "pinia";

export const useChatTimelineStore = defineStore("chatTimeline", {
    state: () => ({
        messages: [],
        messagePayload: [],
        isTuringTyping: false,
        currentStartStep: 0,
        lastUserMessage: ''
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
            console.log('teste')
        },

        // Static methods
        pushMessage(entity, message) {
            const current_hour = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            this.messages.push({ entity, message, current_hour });

            if (entity == 'user') {
                this.lastUserMessage = message;
                console.log("Hora da resposta turing")
                this.isTuringTyping = true
                setTimeout(() => {
                    this.turingResponse(message)
                    this.isTuringTyping = false
                }, 1000);

            }
        },


        // General methods

        handleStartMessages() {

        },

        turingResponse() {
            var isFirstMessage = this.lastUserMessage == '/iniciar';

            if (isFirstMessage) {
                this.pushMessage('bot', this.getRandomMsg("guest_presentation"));
                this.currentStartStep = 1;
            }

            if (this.isConfirmationMessage(this.lastUserMessage)) {
                this.pushMessage("bot", "Certo vamos lá!");
                console.log("DEpois de responder")
            }
            //parei aqui tava fazendo a confirmacao
        },


        handleConversation() {

        },


        //
        getRandomMsg(context) {
            const messages = this.messagePayload[context].message;
            const randomIndex = Math.floor(Math.random() * messages.length);
            return messages[randomIndex];
        },

        isConfirmationMessage(message) {
            const objMessages = this.messagePayload.progress_expressions.affirmative;
            return objMessages.includes(message);
        }


    },
});