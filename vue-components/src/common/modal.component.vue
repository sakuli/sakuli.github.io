<template>
  <MountingPortal mountTo="#modal" append>
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
            <slot name="footer">
              <button class="btn" @click="close()">Close</button>
            </slot>
          </footer>
        </section>
      </transition>
    </div>
  </MountingPortal>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["isOpen"],
  data() {
    return {
      show: this.isOpen || false,
      defaultOverflow: document.body.style.overflow
    };
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27 && this.isOpen) {
        this.close();
      }
    });
  },
  methods: {
    open() {
      this.show = true;
      document.body.style.overflow = "hidden";
      this.$emit("open");
    },
    close() {
      this.show = false;
      document.body.style.overflow = this.defaultOverflow;
      this.$emit("close");
    }
  },
  watch: {
    isOpen(open: boolean) {
      (open && open != this.open) ? this.open() : this.close();
    }
  }
});
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: 1021 !important;
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
    height: initial;
    @media screen and (max-width: 820px) {
      font-size: 0.7rem;
    }
  }

  article {
    flex: 1;
    overflow: auto;
    padding: 2rem;
  }

  footer {
    background: inherit;
    padding: 1rem;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;    
  }

  @media screen and (max-width: 820px) {
    margin: 0.5rem;
    article {
      padding: 0.5rem;
    }
  }
}
</style>

