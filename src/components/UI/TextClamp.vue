<template>
  <div
    class="clamp"
    :class="{
    clamp_clampable: clampable,
      clamp_opened: opened,
    }"
    :style="`--line: ${!throttle ? lines : 100}`"
    :id="`clamp-${rnd}`"
  >
    <div class="clamp__text kv-user-text" v-html="text"></div>
    <div class="clamp__buttons">
      <button class="clamp__btn" @click="opened = !opened">
        <svg width="12" height="7"><use href="#kv-icons_select"></use></svg>
        <!--{{ opened ? 'See less' : 'See more' }}-->
      </button>
    </div>
  </div>
</template>

<script>
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
      rnd: Math.floor(Math.random() * 10000),
      observer: null
    };
  },
  methods: {
    setClampable(element) {
      if (this.maxWidth < element.offsetWidth) {
        this.throttle = true
      }
      this.clampable = element.offsetHeight < element.scrollHeight && !this.throttle;
      //element.parentElement.classList[(element.scrollHeight > element.offsetHeight  && !this.throttle) ? 'add' : 'remove']('clamp_clampable');

    },
  },
  mounted() {

    const element = document.querySelector(`#clamp-${this.rnd} .clamp__text`);
    this.setClampable(element);

    // const observer = new ResizeObserver(entries => {
    //   for (let entry of entries) {
    //     //entry.target.parentElement.classList[(entry.target.scrollHeight > entry.contentRect.height) ? 'add' : 'remove']('clamp_clampable');
    //     //this.clampable = entry.contentRect.height < entry.target.scrollHeight;
    //   }
    // });
    // this.observer = observer;
    //
    // observer.observe(element);
  },
  beforeDestroy() {
    this.observer && this.observer.disconnect();
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
