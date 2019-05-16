<template>
  <a class="button" @click="modalOpen = true">
    {{text}}
    <modal :isOpen="modalOpen" @close="modalOpen = false">
      <template v-slot:header>
        <h1>Your request for Sakuli package {{code}}</h1>
      </template>
      <div v-if="success">
        <h2>Thank your for the request. Our sales team will contact you shortly.</h2>
      </div>
      <div v-if="isLoading">
        <spinner></spinner>
        <div>Forwarding your request</div>
      </div>
      <div v-if="error" class="error">
        Oops something went wrong. Please contact
        <a href="mailto:sales@consol.de">sales@consol.de</a>, reload the page or visit our
        <a target="_blank" :href="formUrl">company page form</a>
      </div>
      <form
        v-if="!formDisabled"
        id="sakuli-enterpise-contact-form"
        ref="contactForm"
        @submit.prevent="sendFormData"
      >
        <remote-content :href="formUrl" selector="main form" :parseContent="parseForm"/>
      </form>
    </modal>
  </a>
</template>
<script lang="ts">
import Vue from "vue";
import modal from "../common/modal.component.vue";
import remoteContent from "../common/remote-content.component.vue";
import spinner from "../common/spinner.component.vue";

export default Vue.extend({
  components: {
    modal,
    remoteContent,
    spinner
  },
  props: ["text", "formUrl", "code", "open"],
  data() {
    return {
      modalOpen: this.open || false,
      action: "",
      isLoading: false,
      error: null,
      count: 0,
      success: false
    };
  },
  computed: {
    formDisabled() {
      return this.error || this.isLoading || this.success;
    },
    formElement() {
      return this.$refs["contactForm"];
    },
    formData() {
      return new FormData(this.formElement);
    },
    me() {
      return {
        isLoading: this.isLoading,
        error: this.error
      };
    }
  },
  methods: {
    parseForm(formElement: HTMLFormElement) {
      console.log("parsing", this.code);
      this.action = formElement.action;
      formElement
        .querySelector("#powermail_field_package")
        .setAttribute("value", this.code);

      formElement
        .querySelector("[data-fancybox]")
        .setAttribute("target", "_blank");
      formElement
        .querySelector("[data-fancybox]")
        .setAttribute("href", "https://www.consol.com/data-privacy");
      const submitButton = formElement.querySelector('input[type="submit"]');
      submitButton.classList.remove("btn", "btn-primary");
      submitButton.classList.add("button");
      return formElement.innerHTML;
    },
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
    fetch() {
      return fetch(this.action, {
        method: "POST",
        body: this.formData
      }).then(r => r.text());
    },
    async sendFormData() {
      this.isLoading = true;
      try {
        await this.fetch();
        this.success = true;
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
</script>
<style lang="scss">
a.button {
  cursor: pointer;
}

.error {
  text-align: center;
  margin-bottom: 1rem;
}
#sakuli-enterpise-contact-form {
  fieldset {
    border: 0;
    display: flex;
    & > div {
      display: flex;
      flex-direction: column;
      flex: 1;

      .form-group {
        margin-bottom: 1rem;
        display: flex;
        label {
          text-align: right;
          width: 20%;
          margin-right: 1rem;
          align-self: center;
        }
        input[type="text"],
        input[type="email"],
        textarea,
        select {
          font-size: 1rem;
          flex: 1;
          height: 30px;
          border-radius: 0.25rem;
          border: 1px solid #403f41;
          padding: 0.5rem;
          &:focus {
            border-color: #95c11f;
          }
        }
        textarea {
          height: 200px;
        }
      }
    }
    .powermail_fieldwrap_datenschutz {
      margin-left: calc(20% + 1rem);
    }

    .powermail_fieldwrap_type_submit {
      text-align: right;
      div {
        display: flex;
        flex: 1;
        justify-content: flex-end;
      }
    }
    .button {
      align-self: flex-end;
      border-radius: 0.25rem;
      border: 0;
    }
  }
}
</style>

