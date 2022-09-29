<template>
  <carousel :settings="sliderDurations" :breakpoints="breakpoints">
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

    <template #addons>
      <div class="kv-slider-pagination">
        <pagination/>
      </div>
    </template>
  </carousel>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  name: "ControlDuration",
  components: {
    Carousel,
    Slide,
    Pagination,
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
  data() {
    return {
      error: false,
      sliderDurations: {
        modelValue:
          this.selected.index === null ? 0 : this.selected.index,
        itemsToShow: 1,
        snapAlign: "start",
        //trimWhiteSpace: true,
        //wheelControl: false,
      },
      breakpoints: {
        500: { itemsToShow: 2 },
        600: { itemsToShow: 3 },
        800: { itemsToShow: 4 },
        1000: { itemsToShow: 6 },
      }
    };
  },
  methods: {
    selectDurations(item) {
      //this.resetPrice();
      this.error = false;
      this.$emit("change", item);
    },
  }
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
  padding: 10px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>
