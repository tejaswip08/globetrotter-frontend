<template>
  <div class="mainDiv">
    <div style="width: 80%">
      <v-card elevation="0" class="customCard">
        <div class="text-center subHeadingFont mb-8">
          {{ quizResultMessage }}
        </div>
        <div class="mx-auto">
          <v-row>
            <v-col class="d-flex justify-left">
              <span class="menuFont"> Correct Answers </span>
            </v-col>
            <v-col class="d-flex justify-end">
              <span class="menuFont">
                {{ resultObj.correct_answers || 0 }}/10</span
              >
            </v-col>
            <v-divider />
            <v-col class="d-flex justify-left">
              <span class="menuFont"> Wrong Answers </span>
            </v-col>
            <v-col class="d-flex justify-end">
              <span class="menuFont">
                {{ resultObj.wrong_answers || 0 }}/10</span
              >
            </v-col>
            <v-divider />
            <v-col class="d-flex justify-left">
              <span class="menuFont"> Skipped Answers </span>
            </v-col>
            <v-col class="d-flex justify-end">
              <span class="menuFont">
                {{ resultObj.skipped_questions || 0 }}/10</span
              >
            </v-col>
          </v-row>
          <div class="d-flex justify-center mt-5">
            <v-btn
              density="default"
              class="nextBtn text-capitalize"
              flat
              @click="playAgainMethod()"
            >
              Play Again
              <v-icon color="white" size="17" class="pl-2"
                >mdi-refresh</v-icon
              ></v-btn
            >
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    resultObj: {},
  }),

  computed: {
    quizResultMessage() {
      this.resultObj = this.$store.getters.get_score_card;
      const correctAnswers = this.resultObj.correct_answer;
      if (correctAnswers >= 8) {
        return "Congratulations! 🎉 You nailed it!";
      } else if (correctAnswers >= 5 && correctAnswers <= 7) {
        return "Good job! A little more practice and you'll ace it! 📚";
      } else {
        return "Don't worry, keep learning and try again! 💡";
      }
    },
  },

  methods: {
    playAgainMethod() {
      this.$store.commit("SET_QUESTION_API_COUNT", 1);
      this.$store.commit("CURRENT_QUESTION_INDEX", 0);
      this.$store.commit("SCORE_CARD", {});
      this.$router.push("/play-quiz");
    },
  },
};
</script>

<style scoped>
.mainDiv {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f5d3c7, white);
}

.customCard {
  background-color: transparent;
  padding: 30px;
  border: 6px solid white;
  border-radius: 20px;
}
</style>
