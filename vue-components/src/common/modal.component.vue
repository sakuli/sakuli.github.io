<template>
  <MountingPortal mountTo="#modal" name="source" to="source" append>
    <div class="overlay" v-if="show" @click.self="close">
      <transition name="modal">
        <section class="shrink-content">
          <header>
            <slot name="header"></slot>
          </header>
          <article>
            <slot></slot>
          </article>
          <footer>
            <slot name="footer"></slot>
            <button class="button" @click="close()">Close</button>
          </footer>
        </section>
      </transition>
    </div>
  </MountingPortal>
</template>
<script lang="ts">
import Vue from "vue";
import { Wormhole } from "portal-vue";

console.log(Wormhole.targets);
export default Vue.extend({
  props: ["isOpen"],
  data() {
    return {
      show: this.isOpen || false
    };
  },
  mounted() {
    document.addEventListener("keydown", e => {
      console.log(e);
      if (e.keyCode == 27 && this.isOpen) {
        this.close();
      }
    });
  },
  methods: {
    open() {
      this.show = true;
      this.$emit("open");
    },
    close() {
      this.show = false;
      this.$emit("close");
    },
    handleOverlayClick(e) {
      console.log(e);
    }
  },
  watch: {
    isOpen(open: boolean) {
      open ? this.open() : this.close;
    }
  }
});
</script>
<style lang="scss" scoped>
/*
.modal-enter-active,
.modal-leave-active {
  transition: opacity 5s;
}
.modal-enter, .modal-leave-to  {
  opacity: 0;
}
*/
.overlay {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
}

$border-radius: 1rem;

.overlay section {
  flex: 1;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-top: 2rem;
  color: black;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  header {
    box-shadow: none;
    width: auto;
    position: relative;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    justify-content: center;
  }

  article {
    flex: 1;
    overflow: auto;
    padding: 2rem;
  }

  footer {
    background: inherit;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }
}
</style>

