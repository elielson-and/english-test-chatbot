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
        awaitingUserResponse: false,
        currentTry: 0,
        correctAnswers: 0,
        isFinished: false
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
                    if (this.currentTry <= 1) {
                        if (isCorrect) {
                            this.pushMessage("bot", this.getSuccessMessage());
                            this.correctAnswers++;
                            this.awaitingUserResponse = false;
                            this.handleQuiz()
                        } else {
                            this.pushMessage("bot", this.getErrorMessage());
                            this.currentTry++;
                            this.awaitingUserResponse = true;
                        }
                    } else {
                        this.awaitingUserResponse = false;
                        this.handleQuiz();
                    }

                } else {
                    this.handleQuiz();
                }
            }
        },


        handleQuiz() {
            if (this.usedQuestions.length >= 5) {
                this.getResults();
                this.isFinished = true;
            } else {
                var questions = this.messagePayload.questions;
                var randomIndex = Math.floor(Math.random() * questions.length);



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
            }


        },

        verifyUserAnswer(message) {
            var isCorrect = false;
            for (let index = 0; index < this.currentQuestion.answer.length; index++) {
                if (message.toLowerCase() == this.currentQuestion.answer[index].toLowerCase()) {
                    isCorrect = true
                }

            }

            return isCorrect;
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
        },

        getSuccessMessage() {
            const messages = this.messagePayload.feedback_messages.success;
            const randomIndex = Math.floor(Math.random() * messages.length);
            return messages[randomIndex];
        },
        getErrorMessage() {
            const messages = this.messagePayload.feedback_messages.error;
            const randomIndex = Math.floor(Math.random() * messages.length);
            return messages[randomIndex];
        },
        getResults() {
            var proeficiency = (this.correctAnswers / this.usedQuestions.length) * 100;
            this.pushMessage('bot', "Ok, agora vamos analisar seus resultados!! <br> Proeficiencia: <b>" + proeficiency + "%</b><br>Total de acertos: " + this.correctAnswers)
        }


    },
});