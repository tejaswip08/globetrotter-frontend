<template>
  <div class="mainDiv">
    <DisplayResultDialog
      :DisplayResult="displayResultDialog"
      :StoreObj="storeObj"
      @closed="DisplayResultDialogEmit"
    />
    <MySnackbar :SnackbarObj="snackbarObj" />
    <div style="width: 80%">
      <v-card
        elevation="0"
        class="customCard"
        v-if="
          $store.getters.get_question_api_count === 1 && startLoader === true
        "
      >
        <div class="d-flex justify-center">
          <v-progress-circular
            color="#ce7656"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card>
      <v-card elevation="0" class="customCard" v-else>
        <div class="mb-15">
          <v-row align="center">
            <v-col cols="12" lg="4" md="4" class="pa-0 d-flex justify-left">
              <div class="headingFont">
                <span style="color: #ce7656">GlobeTrotter</span>
              </div>
            </v-col>
            <v-col cols="12" lg="4" md="4" class="pa-0 d-flex justify-center">
              <div class="menuFont">
                <div class="text-center">
                  <v-icon>mdi-account-circle</v-icon>
                  {{ $store.getters.get_user_info.user_name }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="4" md="4" class="pa-0 d-flex justify-end">
              <v-btn
                density="default"
                rounded
                flat
                class="text-capitalize customCloseBtn"
                @click="closeBtnMethod()"
                ><span class="menuFont">Close</span
                ><v-icon color="black" size="17" class="pl-2"
                  >mdi-close-circle</v-icon
                ></v-btn
              >
            </v-col>
          </v-row>
        </div>
        <div class="mx-auto" style="width: 50%">
          <div class="text-center">
            {{
              `${currentQuestionIndex + 1} / ${storeFetchedQuestions.length}`
            }}
          </div>
          <div
            class="subHeadingFont text-center"
            v-if="currentQuestion?.clues?.length"
          >
            {{ currentQuestion.clues[0] }}
          </div>

          <div
            v-for="(option, index) in currentQuestion?.options || []"
            :key="index"
            class="mt-7 mb-7 zoom-div"
          >
            <v-btn
              density="default"
              block
              flat
              ripple
              class="pa-8 optionBtn"
              @click="selectedOptionMethod(index)"
              :class="{ nextBtn: selectedAnswer === option }"
            >
              {{ option }}</v-btn
            >
          </div>
          <div class="d-flex justify-end pt-5">
            <div class="mr-2 ml-2">
              <v-btn
                variant="text"
                density="default"
                class="text-capitalize nextBtn"
                @click="submitOptionMethod()"
                >{{
                  currentQuestionIndex + 1 === storeFetchedQuestions.length
                    ? "Submit & Check Results"
                    : "Next"
                }}</v-btn
              >
            </div>
            <div class="ml-2">
              <v-btn
                :disabled="
                  currentQuestionIndex + 1 === storeFetchedQuestions.length
                "
                variant="text"
                density="default"
                class="text-capitalize"
                @click="skipQuestionMethod()"
                >Skip</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import DisplayResultDialog from "@/components/DisplayAnswerResult.vue";
import MySnackbar from "@/components/Extras/MySnackbar.vue";
export default {
  components: { DisplayResultDialog, MySnackbar },
  data: () => ({
    currentQuestionIndex: 0,
    selectedAnswer: "",
    questionKey: "",
    startLoader: true,
    skippedQuestions: 0,
    displayResultDialog: false,
    storeObj: {},
    snackbarObj: {},
    scoreCardObj: {},
  }),

  computed: {
    storeFetchedQuestions() {
      return this.$store.getters.get_api_questions || [];
    },
    currentQuestion() {
      return (
        this.storeFetchedQuestions?.[this.currentQuestionIndex] || {
          clues: [],
          options: [],
        }
      );
    },
  },

  async mounted() {
    if (this.$store.getters.get_user_info.user_name) {
      if (this.$store.getters.get_question_api_count === 1) {
        try {
          const fetchQuestions = await fetch(
            "https://globetrotter-backend-production-3c4a.up.railway.app/api/questions"
          );
          const data = await fetchQuestions.json();
          this.$store.commit("STORE_API_QUESTIONS", data);
          this.startLoader = false;
        } catch (error) {
          console.log("Error", error);
          this.snackbarObj = {
            snackbar_action: true,
            snackbar_color: "text-red",
            snackbar_message:
              "Failed to load questions. Please try again later!",
          };
        }
      }
      this.$store.commit("SET_QUESTION_API_COUNT", 2);
      if (this.$store.getters.get_current_question_index > 0) {
        this.currentQuestionIndex =
          this.$store.getters.get_current_question_index;
      }
      this.scoreCardObj = this.$store.getters.get_score_card || {};
      this.skippedQuestions = this.scoreCardObj.skipped_questions || 0;
    } else {
      this.$router.push("/");
    }
  },

  methods: {
    selectedOptionMethod(index) {
      this.selectedAnswer = this.currentQuestion.options[index];
      this.questionKey = this.currentQuestion.key;
    },

    async submitOptionMethod() {
      if (this.selectedAnswer !== "" && this.questionKey !== "") {
        this.storeObj = {
          key: this.questionKey,
          selectedAnswer: this.selectedAnswer,
        };
        this.storeObj.enable_scorecard = false;
        if (
          this.currentQuestionIndex + 1 ===
          this.storeFetchedQuestions.length
        ) {
          this.storeObj.enable_scorecard = true;
        }
        this.displayResultDialog = true;
      } else {
        this.snackbarObj = {
          snackbar_action: true,
          snackbar_color: "text-red",
          snackbar_message: "Kindly select the option!",
        };
      }
    },

    skipQuestionMethod() {
      this.currentQuestionIndex += 1;
      this.scoreCardObj.skipped_questions = this.skippedQuestions += 1;
      this.$store.commit("SCORE_CARD", this.scoreCardObj);
      console.log("SCOIRE_CARD", this.scoreCardObj);
    },

    closeBtnMethod() {
      this.$router.push("/");
      this.$store.commit("SET_USER_INFO", { user_name: "" });
    },

    DisplayResultDialogEmit(score_card) {
      this.displayResultDialog = false;
      this.skippedQuestions =
        this.$store.getters.get_score_card.skipped_questions || 0;
      this.scoreCardObj = {
        ...score_card,
        skipped_questions: this.skippedQuestions,
      };
      console.log("SCOIRE_CARD", score_card);
      this.$store.commit("SCORE_CARD", this.scoreCardObj);
      if (this.storeObj.enable_scorecard === false) {
        this.currentQuestionIndex += 1;
        this.questionKey = "";
        this.$store.commit("CURRENT_QUESTION_INDEX", this.currentQuestionIndex);
      } else {
        this.$router.push("/score-card");
      }
    },
  },
};
</script>

<style scoped>
.mainDiv {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #f5d3c7, white);
  display: flex;
  justify-content: center;
  align-items: center;
}

.centeredDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.customCard {
  background-color: transparent;
  padding: 30px;
  border: 6px solid white;
  border-radius: 20px;
}

.customCloseBtn {
  background-color: transparent !important;
  border: 1px solid rgb(195, 186, 186);
}

.optionBtn {
  background-color: transparent !important;
  border: 1px solid rgb(195, 186, 186);
}

.zoom-div {
  transition: transform 0.3s ease-in-out;
}

.zoom-div:hover {
  transform: scale(1.2);
}

.nextBtn {
  background-color: #ce7656 !important;
  color: white;
}
</style>
