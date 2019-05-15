<template>
  <span>
    <a :href="privacyUrl" @click.prevent="modalOpen = true">Data Privacy</a>
    <modal :isOpen="modalOpen" @close="modalOpen = false">
      <template v-slot:header>
        <h1>{{title}}</h1>
      </template>
      <remote-content :href="privacyUrl" selector="main" :parseContent="parseContent"/>
    </modal>
  </span>
</template>
<script lang="ts">
import Vue from "vue";
import modal from "../common/modal.component.vue";
import remoteContent from "../common/remote-content.component.vue";
export default Vue.extend({
  components: {
    modal,
    remoteContent
  },
  data() {
    return {
      modalOpen: false,
      title: "",
      privacyUrl: "https://www.consol.com/data-privacy/"
    };
  },
  methods: {
    parseContent(e: HTMLElement) {

        const sourceLens = (e: HTMLImageElement | HTMLSourceElement) => ({
            get() {
                return e instanceof HTMLImageElement ? e.src : e.srcset;
            },
            set(value: string) {
                if(e instanceof HTMLImageElement ) {
                    e.src = value;
                } else {
                    e.srcset = value;
                }
            },
            origin: e
        })

      const title = e.querySelector("h1");
      this.title = title.innerText;
      title.parentNode.removeChild(title);
      const hrefParser = document.createElement("a");
      hrefParser.href = this.privacyUrl;
      const externDomain = hrefParser.host;
      const externPort = hrefParser.port || '80';
      Array.from(e.querySelectorAll("img, source"))
        .map(sourceLens)
        .filter(src => src.get().startsWith("/"))
        .forEach(src => {
          hrefParser.href = src.get();
          hrefParser.host = externDomain;
          hrefParser.port = externPort;
          src.set(hrefParser.href);
          console.log(src.origin);
        });
      return e.innerHTML;
    }
  }
});
</script>
<style lang="scss" scoped>
</style>

