import { defineStore } from "pinia";

export const useChatTimelineStore = defineStore("chatTimeline", {
    state: () => ({
        messages: [],
        messagePayload: [],
        isTuringTyping: false,
        currentStartStep: 0,
        lastUserMessage: '',
        currentQuestion: [],
        usedQuestions: [],
        awaitingUserResponse: false
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
                this.lastUserMessage = message;
                this.isTuringTyping = true
                setTimeout(() => {
                    this.turingResponse()
                    this.isTuringTyping = false
                }, 1000);

            }
        },


        // General methods

        turingResponse() {
            var isFirstMessage = this.lastUserMessage == '/iniciar';

            if (isFirstMessage) {
                this.pushMessage('bot', this.getRandomMsg("guest_presentation"));
                this.currentStartStep = 1;
            }

            if (this.currentStartStep == 1 && this.isConfirmationMessage(this.lastUserMessage)) {
                this.pushMessage("bot", "Certo vamos lá!");
                setTimeout(() => {
                    this.currentStartStep = 2;
                    this.handleQuiz();
                }, 1000);
            }


            if (this.currentStartStep == 2) { //step 3 = quiz
                if (this.awaitingUserResponse) {
                    var isCorrect = this.verifyUserAnswer(this.lastUserMessage);
                    if (isCorrect) {
                        this.pushMessage("bot", "Você acertou!");
                    } else {
                        this.pushMessage("bot", "Ahh vc errou!");
                    }
                    this.awaitingUserResponse = false;
                } else {
                    this.handleQuiz();
                }
            }
        },


        handleQuiz() {
            const questions = this.messagePayload.questions;
            const randomIndex = Math.floor(Math.random() * questions.length);
            this.currentQuestion = questions[randomIndex];
            //
            const current_question = {
                id: this.currentQuestion.id,
                question: this.currentQuestion.question,
                answer: this.currentQuestion.answer
            }

            this.usedQuestions.push(current_question);
            this.pushMessage("bot", current_question.question);
            this.awaitingUserResponse = true;
        },

        verifyUserAnswer(message) {
            return message === this.currentQuestion.answer;
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