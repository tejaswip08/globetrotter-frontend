<template>
  <v-snackbar
    v-model="dialogOperation.snackbar_action"
    :height="50"
    class="poppinsFont"
    color="white"
    :timeout="2000"
    top
  >
    <!-- <v-card elevation="0" class="cardProperty"> -->
    <div class="menuFont" :class="SnackbarObj.snackbar_color">
      {{ SnackbarObj.snackbar_message }}
    </div>
    <!-- </v-card> -->
  </v-snackbar>
</template>

<script scoped>
export default {
  props: {
    SnackbarObj: Object,
  },

  computed: {
    dialogOperation: {
      get() {
        return this.SnackbarObj;
      },
    },
  },
};
</script>
