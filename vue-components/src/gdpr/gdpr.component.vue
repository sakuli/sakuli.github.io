<template lang="html">
    <transition name="fade">
        <div class="gdpr-info-box" v-if="show">
            <div>
            You like <abbr title="cookies">🍪🍪🍪</abbr>? We also like them and we are aware that a few can be sweet and delicous while too much will become unhealthy. So we keep the amount of cookies as low as possible while remaining a sweet snack for your user experience. <a target="_blank" href="https://www.consol.com/data-privacy/">Learn more</a> 
            </div>
        <button @click="onAgree" class="button">I agree</button>
        </div>
    </transition>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
      const agreed = Boolean(localStorage.getItem('gdpr-agreed'));
      this.show = !agreed
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    onAgree() {
      this.show = false;
      localStorage.setItem('gdpr-agreed', "1")
    }
  }
});
</script>
<style lang="scss">
.fade-enter {
    transform: translate(0, 100%);
}
.fade-enter-active,
.fade-leave-active {  
  transition: transform 0.5s ease-out;
}
.fade-leave-to {
  transform: translate(0, 100%);
}

.gdpr-info-box {
  abbr {
    text-decoration: none;
  }
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: rgba(#ffffff, $alpha: 0.9);

  div {
    padding: 1rem;
    flex: 1;
  }

  button {
    margin: 1rem;
  }
}
</style>