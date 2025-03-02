<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialogOperations"
      width="700px"
      persistent
      class="poppinsFont"
    >
      <v-card elevation="0" class="customDialogCard" v-if="startLoader">
        <div class="d-flex justify-center">
          <v-progress-circular
            color="#ce7656"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card>
      <v-card elevation="0" class="customDialogCard" v-else>
        <div class="subHeadingFont text-center">
          {{
            resultStatus.correct === true
              ? "Correct! You Guessed It Right 🥳🎉"
              : `Oops The Correct Answer Was "${resultStatus.answer}" 😔`
          }}
        </div>
        <!-- <div class="menuFont text-center mt-3">
          {{ resultStatus.correct === true ? "Fun Fact: " : "Trivia: " }}
          <span style="color: #ce7656">
            {{ funFactTrivia }}
          </span>
        </div> -->
        <div v-if="resultStatus.correct">
          <div class="menuFont text-center mt-3">
            Trivia:
            <span style="color: #ce7656">
              {{ resultStatus.trivia }}
            </span>
          </div>
          <div class="menuFont text-center mt-3">
            Fun Fact:
            <span style="color: #ce7656">
              {{ resultStatus.fun_fact }}
            </span>
          </div>
        </div>
        <div class="d-flex justify-center menuFont mt-5">
          {{
            StoreObj.enable_scorecard === true
              ? "Please wait while we will load scorecard for you..!"
              : `Next Question In: ${countDownFrom}`
          }}
        </div>
        <div class="d-flex justify-center">
          <v-progress-circular
            v-if="StoreObj.enable_scorecard === true"
            color="#ce7656"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    DisplayResult: Boolean,
    StoreObj: Object,
  },

  data: () => ({
    funFactTrivia: "",
    resultStatus: "",
    startLoader: true,
    countDownFrom: 5,
    correctAnswers: 0,
    wrongAnswers: 0,
    scoreCardObj: {},
  }),

  computed: {
    dialogOperations: {
      get() {
        return this.DisplayResult;
      },
    },
  },

  watch: {
    async DisplayResult(val) {
      if (val) {
        try {
          const response = await fetch(
            "https://globetrotter-backend-production-3c4a.up.railway.app/api/check-answer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.StoreObj),
            }
          );
          this.scoreCardObj = this.$store.getters.get_score_card || {};
          this.correctAnswers = this.scoreCardObj.correct_answers || 0;
          this.wrongAnswers = this.scoreCardObj.wrong_answers || 0;
          const data = await response.json();
          this.resultStatus = data;
          if (data.correct) {
            // this.funFactTrivia = data.fun_fact;
            this.correctAnswers += 1;
          } else {
            // this.funFactTrivia = data.trivia;
            this.wrongAnswers += 1;
          }
          this.scoreCardObj = {
            correct_answers: this.correctAnswers,
            wrong_answers: this.wrongAnswers,
          };
          this.startLoader = false;
          this.startCountDownMethod(this.scoreCardObj);
          // this.$store.commit("SCORE_CARD", this.scoreCardObj);
        } catch (error) {
          //
        }
      }
    },
  },

  methods: {
    startCountDownMethod(score_card) {
      const intervalId = setInterval(() => {
        if (this.countDownFrom > 0) {
          this.countDownFrom -= 1;
        } else {
          clearInterval(intervalId);
          this.funFactTrivia = "";
          this.resultStatus = "";
          this.countDownFrom = 5;
          this.startLoader = true;
          this.$emit("closed", score_card);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.customDialogCard {
  /* backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  background-color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
}
</style>
