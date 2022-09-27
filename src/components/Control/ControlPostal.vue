<template>
  <div class="kv-content__body">

    <!-- for desktop 2 columns-->
    <form class="kv-form kv-step6-postal_desktop">
      <div class="kv-row" v-for="(row, i) in postalServicesPrepared" :key="i">

        <div class="kv-form__item-wrap kv-form__col_half"  v-for="item in row" :key="item.id">
          <div class="kv-form__item kv-form__item_chb kv-form__item_light kv_height-100"
               :class="{
              'kv-form__item_error': error,
              'kv-form__item_selected': item.id === postalService
            }"
          >
            <label class="kv-form-radio" :id="`kv-postal__${item.id}`">
              <input type="radio" name="branch" :value="item.id" v-model="postalService" @change="postalChange(item)">
              <span class="kv-form-radio__mark">
                <svg><use href="#kv-icons_form_radio"></use></svg>
              </span>
              <span>
                <div class="kv-form-radio__title">{{item.name}}</div>
                <div class="kv-form-radio__text" v-html="item.description"></div>
            </span>
            </label>
            <div class="kv-form__badge">
              <div class="kv-price">
                {{item.price}}
                <span class="kv-price__currency">€</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>

    <!-- for mobile-->
    <form class="kv-form kv-step6-postal_mobile">
      <div class="kv-row kv-form__item-wrap" v-for="(item, i) in postalServices" :key="`mobile-${i}`">

        <div class="kv-form__item kv-form__item_chb kv-form__item_light kv_height-100">
          <label class="kv-form-radio">
            <input type="radio" name="branch" :value="item.id" v-model="postalServiceMobile" @change="postalChange(item)">
            <span class="kv-form-radio__mark">
                <svg><use href="#kv-icons_form_radio"></use></svg>
              </span>
            <span>
                <div class="kv-form-radio__title">{{item.name}}</div>
                <div class="kv-form-radio__text" v-html="item.description"></div>
            </span>
          </label>
          <div class="kv-form__badge">
            <div class="kv-price">
              {{item.price}}
              <span class="kv-price__currency">€</span>
            </div>
          </div>
        </div>

      </div>
    </form>

  </div>
</template>

<script>
import {arrayToCols} from "@/helpers/array";

export default {
  name: "ControlPostal",
  props: {
    postalServices: {
      type: Array,
      required: true
    },
    selectedPostalService: {
    },

  },
  data() {
    return {
      error: false
    }
  },
  emits: ["change"],
  methods: {
    postalChange(item) {
      this.error = false;
      this.$emit('change', item);
      this.$emit('stepDataChange', 6);
    },
    checkForm(){
      if (this.selectedPostalService === null) {
        this.error = true;
        this.$emit('showModal', this.$lng('common.checkFormPopup'), this.$lng('common.error'));
      }
    },
  },
  computed: {
    postalServicesPrepared() {
      return arrayToCols(this.postalServices, 2)
    },
    postalService: {
      get () {
        return this.selectedPostalService
      },
      set() {

      }

    },
    postalServiceMobile: {
      get () {
        return this.selectedPostalService
      },
      set() {

      }

    },
  },
  mounted() {

  }
}
</script>

<style scoped>
  .kv-form__item_selected .kv-form__item_light {
    background-color: #EBFAED;
  }
  .kv-form__item_selected .kv-form__badge {
    background-color: #30C54B;
  }
  .kv-form__item_selected  .kv-form-radio {
    border: solid 2px #30C54B;
  }

</style>

