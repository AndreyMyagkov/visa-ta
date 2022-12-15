<template>
  <carousel
    :settings="sliderDurations"
    :breakpoints="breakpoints"
    ref="sliderDurationsRef"
    :class="{
      'is-empty':  !navigation
    }"
    style="margin: 15px 15px 0 15px"
    @init="sliderDurationsInit"
  >
    <slide
      class="story-carousel__slide"
      v-for="(item, index) in list"
      :key="item.name"
      :index="index"
    >
      <div class="kv-staying__item" :id="`kv-btn-duration__${index}`">
        <div
          class="kv-staying-chb"
          :class="{
            'kv-staying-chb__active': item.name === selected.name,
            'kv-form__item_error': error,
          }"
          @click="selectDurations(item)"
        >
          <div class="kv-staying-chb__text" v-html="item.nameHTML"></div>
          <div
            class="kv-staying-chb__info"
            @click.stop="$emit('showModal', item.description, item.name)"
            v-if="item.description"
          >
            <svg class="kv-staying-chb__info-icon">
              <use href="#kv-icons_info"></use>
            </svg>
          </div>
        </div>
      </div>
    </slide>

    <template #addons="{ currentSlide }">
      <div class="kv-slider-navigation" v-show="currentSlide !== -1">
        <navigation/>
      </div>
      <div class="kv-slider-pagination">
      </div>
    </template>
  </carousel>
</template>

<script>
import "vue3-carousel/dist/carousel.css";

import { Carousel, Slide, /*Pagination,*/ Navigation } from "vue3-carousel";
import {debounce} from "@/helpers/utils";
export default {
  name: "ControlDuration",
  components: {
    Carousel,
    Slide,
    /*Pagination,*/
    Navigation,
  },
  props: {
    list: {
      type: Array,
    },
    selected: {
      type: Object,
    },
  },
  emits: ["change", "showModal"],
  data() {
    return {
      navigation: true,
      error: false,
      sliderDurations: {
        modelValue:
          this.selected.index === null ? 0 : this.selected.index,
        itemsToShow: 1.20,
        snapAlign: "center",
      },
      breakpoints: {
        630: { itemsToShow: 2, snapAlign: "start"},
        650: { itemsToShow: 3, snapAlign: "start"},
        800: { itemsToShow: 4, snapAlign: "start" },
        1000: { itemsToShow: 5, snapAlign: "start" },
      }
    };
  },
  methods: {
    selectDurations(item) {
      //this.resetPrice();
      this.error = false;
      this.$emit("change", item);
    },
    sliderDurationsInit() {
      console.log('инит')
      console.log(this.$refs.sliderDurationsRef.data.maxSlide);
      console.log(this.list);
      if (this.$refs.sliderDurationsRef.data.maxSlide === -1) {
        this.navigation = false;
      }
    },
    onResize() {
      if (!this.$refs.sliderDurationsRef) {
        return
      }
      this.$refs.sliderDurationsRef && this.$refs.sliderDurationsRef.slideTo(this.selected.index);
      if (this.$refs.sliderDurationsRef.data.minSlide.value === 0 && this.$refs.sliderDurationsRef.data.maxSlide.value <= 0) {
        this.navigation = false;
      } else {
        this.navigation = true;
      }
    }
  },
  mounted() {
    window.addEventListener('resize', debounce(this.onResize, 200), {
      passive: true,
    })
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.kv-slider-pagination {
  margin-top: -12px;
}
.kv-app .kv-staying-chb {
  width: 100%;
  justify-content: space-between;
  border: solid 1px rgba(0, 179, 212, 0.5);
}
.kv-app .kv-staying .kv-staying__item {
  flex: 0 0 auto;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>
