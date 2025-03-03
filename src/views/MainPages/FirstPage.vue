<template>
  <div class="mainDiv">
    <MySnackbar :SnackbarObj="snackbarObj" />
    <v-img src="@/assets/pic-2.jpg" cover class="centerImgContent">
      <div class="centerImgContent mainDiv">
        <v-card elevation="0" class="cardProperty pa-10 mt-5 mb-5">
          <div class="headingFont text-center text-black">
            Welcome to The
            <span
              style="
                color: #dc93b4;
                text-decoration: underline 2px black;
                text-underline-offset: 5px;
              "
            >
              GlobeTrotter
            </span>
          </div>
          <div class="subHeadingFont text-center text-black">
            The Ultimate Travel Guessing Game!
          </div>
          <v-form ref="userForm">
            <div class="d-flex justify-center">
              <div class="mt-6">
                <div class="textFieldHeading text-center text-black mb-1">
                  Enter your name
                </div>

                <v-text-field
                  v-model="userName"
                  size="small"
                  density="compact"
                  variant="outlined"
                  class="subHeadingFont"
                  :rules="[(v) => !!v || 'Name is required']"
                  rounded
                >
                  <template v-slot:append-inner>
                    <v-icon color="black">mdi-account-circle</v-icon>
                  </template>
                </v-text-field>
                <div class="textFieldHeading text-center text-black mt-3">
                  Enter your email
                </div>

                <v-text-field
                  v-model="userEmail"
                  size="small"
                  density="compact"
                  variant="outlined"
                  class="subHeadingFont"
                  rounded
                  :rules="emailRules"
                >
                  <template v-slot:append-inner>
                    <v-icon color="black">mdi-email</v-icon>
                  </template>
                </v-text-field>

                <div class="d-flex justify-center mt-3">
                  <v-btn
                    :loading="btnLoader"
                    density="default"
                    class="text-capitalize subHeadingFont buttonColor"
                    rounded
                    @click="startQuizMethod()"
                    >Start Quiz
                    <v-icon color="black" size="19" class="ml-2"
                      >mdi-seal</v-icon
                    ></v-btn
                  >
                </div>
              </div>
            </div>
          </v-form>
        </v-card>
      </div>
    </v-img>
  </div>
</template>

<script>
import MySnackbar from "@/components/Extras/MySnackbar.vue";
export default {
  components: { MySnackbar },
  data: () => ({
    btnLoader: false,
    userName: "",
    userEmail: "",
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Enter a valid email address",
    ],
    snackbarObj: {},
  }),

  watch: {
    userName(val) {
      if (val) {
        this.userName = val.toUpperCase();
      }
    },
  },

  mounted() {
    this.$store.commit("SET_USER_INFO", {});
    this.$store.commit("SCORE_CARD", {});
    this.$store.commit("SET_QUESTION_API_COUNT", 0);
    this.$store.commit("SCORE_CARD_ENTRY", false);
  },

  methods: {
    async startQuizMethod() {
      const isValid = await this.$refs.userForm.validate();
      if (isValid.valid) {
        this.btnLoader = true;
        setTimeout(() => {
          this.$store.commit("SET_USER_INFO", { user_name: this.userName });
          this.$store.commit("SET_QUESTION_API_COUNT", 1);
          this.$store.commit("CURRENT_QUESTION_INDEX", 0);
          this.$router.push("/play-quiz");
          // const userInfoList = localStorage.getItem("user_info");
          // if (userInfoList) {
          //   const parsedData = JSON.parse(userInfoList);
          //   if (parsedData.length > 0) {
          //     const findArray = parsedData.find(
          //       (item) =>
          //         item.user_name === this.userName &&
          //         item.user_email === this.userEmail
          //     );
          //     if (findArray?.user_name) {
          //       parsedData.push({
          //         user_name: this.userName,
          //         usr_email: this.userEmail,
          //         high_score: 0,
          //       });
          //       localStorage.setItem("user_info", JSON.stringify(parsedData));
          //     } else {
          //       localStorage.setItem(
          //         "current_user_info",
          //         JSON.stringify(findArray)
          //       );
          //     }
          //   }
          // } else {
          //   const newUserEntryArray = [
          //     {
          //       user_name: this.userName,
          //       usr_email: this.userEmail,
          //       high_score: 0,
          //     },
          //   ];
          //   localStorage.setItem(
          //     "user_info",
          //     JSON.stringify(newUserEntryArray)
          //   );
          //   localStorage.setItem(
          //     "current_user_info",
          //     JSON.stringify(newUserEntryArray[0])
          //   );
          //   //
          // }
        }, 2000);
        // const fetchQuestions = fetch("http://localhost:5000/api/questions");
        // console.log("FETCHED_QUESTIONS", fetchQuestions.json);
      } else {
        this.snackbarObj = {
          snackbar_action: true,
          snackbar_color: "text-red",
          snackbar_message: "Kindly enter valid username!",
        };
        //
      }
    },
  },
};
</script>

<style scoped>
.mainDiv {
  height: 100vh;
  overflow: auto;
  width: 100vw;
}

.centerImgContent {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.cardProperty {
  /* background-color: white;
  border-radius: 20px;
  width: 70%; */

  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  max-width: 70%;
}
</style>
