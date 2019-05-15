<template>
      <div v-if="error"></div>
      <div v-html="content" v-else></div>
</template>
<script lang="ts">
import Vue from "vue";
import modal from "../common/modal.component.vue";
export default Vue.extend({
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
        const remoteHtml = domParser.parseFromString(
          responseText,
          "text/html"
        );
        const htmlContent = remoteHtml.querySelector(this.selector);
        const parse = this.parseContent && typeof this.parseContent === 'function'
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
</style>

