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
              <span class="menuFont"> Skipped Questions </span>
            </v-col>
            <v-col class="d-flex justify-end">
              <span class="menuFont">
                {{ resultObj.skipped_questions || 0 }}/10</span
              >
            </v-col>
          </v-row>
          <div class="flexDiv mt-5 playAgainDiv">
            <div class="mr-2">
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

            <div class="ml-2 challengeFriendDiv">
              <v-btn
                variant="text"
                density="default"
                class="text-capitalize optionBtn"
                @click="challengeFriend()"
              >
                Challenge A Friend
                <v-icon color="black" size="17" class="pl-2"
                  >mdi-share</v-icon
                ></v-btn
              >
            </div>
          </div>
          <!-- <div></div> -->
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    resultObj: {},
    hignScore: 0,
  }),

  computed: {
    quizResultMessage() {
      this.resultObj = this.$store.getters.get_score_card;
      const correctAnswers = this.resultObj.correct_answers;
      //
      // const userInfo = localStorage.getItem("user_info");
      // if (userInfo) {
      //   const parsedData = JSON.parse(userInfo);
      //   if (parsedData?.hign_score < correctAnswers) {
      //     this.hignScore = correctAnswers;
      //     localStorage.setItem(
      //       "user_info",
      //       JSON.stringify({ ...parsedData, hign_score: correctAnswers })
      //     );
      //   } else if (parsedData?.hign_score > correctAnswers) {
      //     this.hignScore = parsedData?.hign_score;
      //   }
      // }
      if (correctAnswers >= 8) {
        return "Congratulations! 🎉 You nailed it!";
      } else if (correctAnswers >= 5 && correctAnswers <= 7) {
        return "Good job! A little more practice and you'll ace it! 📚";
      } else {
        return "Don't worry, keep learning and try again! 💡";
      }
    },
  },

  mounted() {
    this.$store.commit("SCORE_CARD_ENTRY", true);
  },

  methods: {
    playAgainMethod() {
      this.$store.commit("SET_QUESTION_API_COUNT", 1);
      this.$store.commit("CURRENT_QUESTION_INDEX", 0);
      this.$store.commit("SCORE_CARD", {});
      this.$store.commit("SCORE_CARD_ENTRY", false);
      this.$router.push("/play-quiz");
    },

    challengeFriend() {
      const gameLink = "https://globetrotter-frontend-pi.vercel.app/";
      const message = encodeURIComponent(
        "Check out this amazing quiz game! 🧠🔥 It's super fun and challenging. Play now: " +
          gameLink
      );
      const whatsappUrl = `https://wa.me/?text=${message}`;
      window.open(whatsappUrl, "_blank");
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

.flexDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.customCard {
  background-color: transparent;
  padding: 30px;
  border: 6px solid white;
  border-radius: 20px;
}

.optionBtn {
  background-color: transparent !important;
  border: 1px solid rgb(195, 186, 186);
}

@media (max-width: 542px) {
  .flexDiv {
    padding-top: 20px !important;
  }
  .playAgainDiv {
    margin: 0 0 10px 0 !important;
  }

  .challengeFriendDiv {
    margin: 10px 0 0px 0 !important;
  }
}
</style>
