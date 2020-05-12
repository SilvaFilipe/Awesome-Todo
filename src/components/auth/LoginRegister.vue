<template>
  <div>
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access your todos anywhere
      </q-banner>
    </div>

    <div class="q-mb-md">
      <q-input
        ref="email"
        type="email"
        class="col"
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        :rules="[val => isValidEmailAddress(val) || 'Please use valid email']"
      />
    </div>
    <div class="q-mb-md">
      <q-input
        ref="password"
        type="password"
        class="col"
        :rules="[val => val.length >= 6 || 'Please use minimum 6 characters']"
        lazy-rules
        outlined
        v-model="formData.password"
        label="Password"
        stack-label
        @keyup.enter="submitForm"
      />
    </div>
    <div class="row">
      <q-space></q-space>
      <q-btn color="primary" :label="tab" @click="submitForm"></q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style></style>
