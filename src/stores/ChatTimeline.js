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
            this.pushMessage("user", "/iniciar");
        },

        pushMessage(entity, message) {
            this.messages.push({ entity, message })
        }

    },
});