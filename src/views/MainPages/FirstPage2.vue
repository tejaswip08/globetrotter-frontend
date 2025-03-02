<template>
  <div class="mainDiv">
    <MySnackbar :SnackbarObj="snackbarObj" />
    <v-img src="@/assets/main-image.jpg" cover class="centerImgContent">
      <div class="centerImgContent">
        <v-card elevation="0" class="cardProperty">
          <div class="headingFont text-center text-white">
            Welcome to The
            <span style="color: #1b4d3e"> Globetrotter </span> Challenge
          </div>
          <div class="subHeadingFont text-center text-white">
            The Ultimate Travel Guessing Game!
          </div>
          <div class="d-flex justify-center">
            <div class="mt-6">
              <div class="textFieldHeading text-center text-white mb-1">
                Enter your name
              </div>
              <v-form ref="userForm">
                <v-text-field
                  v-model="userName"
                  size="small"
                  density="compact"
                  variant="outlined"
                  class="subHeadingFont"
                  rounded
                  :rules="[(v) => !!v || 'Required']"
                >
                  <template v-slot:append-inner>
                    <v-icon color="white">mdi-account-circle</v-icon>
                  </template>
                </v-text-field>
              </v-form>
              <div class="d-flex justify-center mt-3">
                <v-btn
                  :loading="btnLoader"
                  density="default"
                  class="text-capitalize subHeadingFont buttonColor"
                  rounded
                  @click="startQuizMethod()"
                  >Start Quiz
                  <v-icon color="white" size="17" class="ml-2"
                    >mdi-seal</v-icon
                  ></v-btn
                >
              </div>
            </div>
          </div>
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
    snackbarObj: {},
  }),

  watch: {
    userName(val) {
      if (val) {
        this.userName = val.toUpperCase();
      }
    },
  },

  methods: {
    async startQuizMethod() {
      const isValid = await this.$refs.userForm.validate();
      if (isValid.valid) {
        this.btnLoader = true;
        setTimeout(() => {
          this.$store.commit("SET_USER_INFO", { user_name: this.userName });
          this.$store.commit("SET_QUESTION_API_COUNT", 1);
          this.$router.push("/play-quiz");
        }, 2000);
        // const fetchQuestions = fetch("http://localhost:5000/api/questions");
        // console.log("FETCHED_QUESTIONS", fetchQuestions.json);
      } else {
        this.snackbarObj = {
          snackbar_action: true,
          snackbar_color: "text-green",
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
  width: 100vw;
}

.centerImgContent {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.cardProperty {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  max-width: 70%;
}
</style>
