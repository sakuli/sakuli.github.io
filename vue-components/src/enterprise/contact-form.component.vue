<template>
  <a class="button" @click="modalOpen = true">
    {{text}}
    <modal :isOpen="modalOpen" @close="modalOpen = false">
      <template v-slot:header>
        <h1>
          <span class="hide-mobile">{{contactText}}</span>
            {{name}} {{code}}
        </h1>
      </template>
      <template v-slot:footer>
        <button class="button button-secondary" @click.prevent="modalOpen = false">Close</button>
        <button v-if="!formDisabled" class="button" @click.prevent="sendFormData">Send</button>
      </template>
      <div v-if="success">
        <h2>Thank your for the request. Our team will contact you shortly.</h2>
      </div>
      <div v-if="isLoading" style="text-align: center">
        <spinner></spinner>
        <div>Forwarding your request</div>
      </div>
      <div v-if="reponseError">
        <h3>Please fill all required fields:</h3>
        <ul v-html="reponseError"></ul>
      </div>
      <div v-if="error" class="error">
        Oops something went wrong. Please contact
        <a href="mailto:sales@consol.de">sales@consol.de</a>, reload the page or visit our
        <a
          target="_blank"
          rel="noopener"
          :href="formUrl"
        >company page form</a>
      </div>
      <form
        v-if="!formDisabled"
        id="sakuli-enterpise-contact-form"
        ref="contactForm"
        @submit.prevent="sendFormData"
      >
        <keep-alive>
          <remote-content :href="formUrl" selector="main form" :parseContent="parseForm" />
        </keep-alive>
      </form>
    </modal>
  </a>
</template>
<script lang="ts">
import Vue from "vue";
import modal from "../common/modal.component.vue";
import remoteContent from "../common/remote-content.component.vue";
import spinner from "../common/spinner.component.vue";

function ifPresent<T>(v: T | null | undefined, then: (o: T) => void) {
  if (v != null) {
    then(v);
  }
}

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
      success: false,
      reponseError: ""
    };
  },
  computed: {
    formDisabled() {
      return this.error || this.success;
    },
    formElement() {
      return this.$refs["contactForm"];
    },
    formData() {
      return new FormData(this.formElement);
    },
    isValid() {
      const form: HTMLFormElement = this.formElement;
      if (!form) return false;
      return Array.from(form.elements).reduce(
        (valid: boolean, e: HTMLInputElement) => e.checkValidity(),
        true
      );
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
      ifPresent(formElement.querySelector("#powermail_field_package"), e => {
        e.setAttribute("value", this.code);
      });

      ifPresent(formElement.querySelector("[data-fancybox]"), e => {
        e.setAttribute("target", "_blank");
      })

      ifPresent(formElement.querySelector("[data-fancybox]"), e => {
          e.setAttribute("href", "https://www.consol.com/data-privacy");
        })

      const submitButton = formElement.querySelector('input[type="submit"]');
      if (submitButton) {
        submitButton.classList.remove("btn", "btn-primary");
        submitButton.classList.add("button");
      }
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
        const responseText = await this.fetch();
        const parser = new DOMParser();
        const responseDom = parser.parseFromString(responseText, "text/html");
        const message = responseDom.querySelector(".powermail_message_error");
        if (message) {
          this.reponseError = message.innerHTML;
          this.success = false;
        } else {
          this.success = true;
        }
      } catch (e) {
        console.error(e);
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
</script>
<style lang="scss">
.button {
  cursor: pointer;
  border: 0;
  margin: 1rem;
  @media screen and (max-width: 820px) {
    margin: 0.5rem;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
  }
}
.a {
  border: 1px;
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
        select {
          text-indent: 0.01px;
          text-overflow: "";
          padding: 0;
        }
        textarea {
          height: 200px;
        }

        @media screen and (max-width: 820px) {
          flex-direction: column;
          label {
            width: initial;
            text-align: left;
            align-self: flex-start;
          }
        }
      }
    }
    .powermail_fieldwrap_datenschutz {
      margin-left: calc(20% + 1rem);

      @media screen and (max-width: 820px) {
        margin-left: 0;
      }
    }
    .powermail_fieldwrap_senden {
      display: none !important;
    }
    .powermail_fieldwrap_type_submit {
      text-align: right;
      div {
        display: flex;
        flex: 1;
        justify-content: flex-end;
      }
    }
  }
}
</style>

