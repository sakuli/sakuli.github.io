<template>
    <div v-if="error"></div>
    <div v-else-if="loading" class="loading">
      <spinner></spinner>
      <div>Loading content</div>
    </div>
    <div v-html="content" v-else></div>
</template>
<script lang="ts">
import Vue from "vue";
import spinner from "../common/spinner.component.vue";

const wait = (ms: number = 2000) => new Promise(res => setTimeout(res, ms));

export default Vue.extend({
  components: {
    spinner
  },
  props: ["href", "selector", "parseContent"],
  data() {
    return {
      loading: true,
      content: "",
      error: false
    };
  },
  async mounted() {
    await this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      try {
        const req = await fetch(this.href);
        const responseText = await req.text();
        const domParser = new DOMParser();
        const remoteHtml = domParser.parseFromString(responseText, "text/html");
        const htmlContent = remoteHtml.querySelector(this.selector);
        const parse =
          this.parseContent && typeof this.parseContent === "function"
            ? this.parseContent
            : (e: HTMLElement) => e.innerHTML;
        this.content = parse(htmlContent);
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.loading {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-self: center;
  align-content: center;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

