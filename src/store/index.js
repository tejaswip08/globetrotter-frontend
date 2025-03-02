import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userInfo: {},
    questionApiCount: 1,
    apiQuestions: [],
    currentQuestionIndex: null,
    scoreCardObj: {},
  },
  getters: {
    get_user_info: (state) => {
      return state.userInfo;
    },

    get_question_api_count: (state) => {
      return state.questionApiCount;
    },

    get_api_questions: (state) => {
      return state.apiQuestions;
    },

    get_current_question_index: (state) => {
      return state.currentQuestionIndex;
    },

    get_score_card: (state) => {
      return state.scoreCardObj;
    },
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data;
    },

    SET_QUESTION_API_COUNT(state, data) {
      state.questionApiCount = data;
    },

    STORE_API_QUESTIONS(state, data) {
      state.apiQuestions = data;
    },

    CURRENT_QUESTION_INDEX(state, data) {
      state.currentQuestionIndex = data;
    },

    SCORE_CARD(state, data) {
      state.scoreCardObj = data;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
