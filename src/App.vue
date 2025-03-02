<template>
  <div class="poppinsFont">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<style>
.poppinsFont {
  font-family: "Poppins", sans-serif;
}

.headingFont {
  font-size: 30px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px;
}

.subHeadingFont {
  font-size: 20px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

.textFieldHeading {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.buttonColor {
  background-color: #dc93b4 !important;
  color: black !important;
}

.nextBtn {
  background-color: #ce7656 !important;
  color: white !important;
}

.menuFont {
  font-size: 15px !important;
  font-weight: 500 !important;
}
</style>
