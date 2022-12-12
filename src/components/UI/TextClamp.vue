<template>
  <div
    class="clamp"
    :class="{
      clamp_clampable: clampable,
      clamp_opened: clampable && opened,
    }"
    :style="`--line: ${!throttle ? lines : 100}`"

  >
    <div class="clamp__text kv-user-text" ref="clamp" v-html="text"></div>
    <div class="clamp__buttons">
      <button class="clamp__btn" @click="opened = !opened">
        <svg width="12" height="7"><use href="#kv-icons_select"></use></svg>
      </button>
    </div>
  </div>
</template>

<script>
import {debounce} from "@/helpers/utils";

export default {
  name: "TextClamp",
  props: {
    text: String,
    lines: {
      type: String,
      default: "3"
    },
    maxWidth: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      clampable: false,
      opened: false,
      throttle: false,
    };
  },
  methods: {

    async setClampable() {
      const element = this.$refs["clamp"];
      if (element) {

        this.throttle = this.maxWidth < element.offsetWidth;
        await this.$nextTick();

        if (this.opened) {
          this.opened = false;
          await this.$nextTick();

          this.clampable = element.offsetHeight < element.scrollHeight && !this.throttle;
          this.opened = true;
        } else {
          this.clampable = element.offsetHeight < element.scrollHeight && !this.throttle;
        }

      }

    },
  },
  mounted() {
    this.setClampable();
    window.addEventListener("resize", debounce(this.setClampable, 100), {
      passive: true,
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setClampable);
  },
};
</script>

<style scoped>
.clamp {

}
.clamp__text {
  position: relative;
  font-weight: inherit;
  font-size: inherit;
  font-style: inherit;
  text-decoration: inherit;
  color: inherit;
  display: -webkit-box;
  -webkit-line-clamp: var(--line);
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}



.clamp_clampable:not(.clamp_opened) .clamp__text:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1em;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    var(--bg, #fff) 100%
  );
}
.clamp_opened .clamp__text {
  -webkit-line-clamp: unset;
}
.clamp__buttons {
  border-top: solid 1px rgba(0,179,212,.5);
  margin-top: 12px;
  display: none;
}
.clamp_clampable .clamp__buttons {
  display: block;
}
/*.clamp:not(.clamp_opened) .clamp__buttons {*/
/*  display: block;*/
/*}*/
.clamp__btn {
  color: var(--dark-grey_bdv);
  fill: var(--dark-grey_bdv);
  line-height: 1;
  display: flex !important;
  gap:5px;
  align-items: center;
  padding: 6px 12px;
  border: solid 1px rgba(0,179,212,.5);
  background-color: #fff;
  border-top: none;
  border-radius: 0 0 8px 8px;
  margin: 0 auto 12px;
  position: relative;
  top: -1px;
}
.clamp_opened .clamp__btn svg{
  transform: rotate(180deg);
}
</style>
