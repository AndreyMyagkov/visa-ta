<template>
  <!-- desktop -->
  <div class="kv-form kv-step6-postal_desktop">
    <div class="kv-row" v-for="(row, r) in postalServicesPrepared" :key="r">
      <div class="kv-col-12 kv-col-md-6 kv-py-10"
           :class="{
                      'kv-form__item_border': item.id === selected.id,
                      'kv-form__item_selected': item.id === selected.id,
                      'kv-form__item_error': error
                }"
           v-for="(item, i) in row" :key="i">

        <div class="kv-form__item kv-form__item_chb kv_height-100 kv-form__item-branch">
          <label class="kv-form-radio"

                 :id="`kv-postal__${item.id}`">

            <input type="radio" name="postal" :checked="item.id === selected.id"  :value="item.id"  @change="postalChange(item)" :id="`kv-branch__${item.id}`">
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
  </div>

  <!-- mobile -->
  <div class="kv-form kv-step6-postal_mobile">
    <div class="kv-row">
      <div class="kv-col-12 kv-col-md-6 kv-py-10"
           :class="{
                      'kv-form__item_border': item.id === selected.id,
                      'kv-form__item_selected': item.id === selected.id,
                      'kv-form__item_error': error
                }"
           v-for="(item, i) in postalServices" :key="`mobile-${i}`">

        <div class="kv-form__item kv-form__item_chb kv_height-100 kv-form__item-branch">
          <label class="kv-form-radio"

                 :id="`kv-postal__${item.id}`">

            <input type="radio" name="postal" :checked="item.id === selected.id"  :value="item.id"  @change="postalChange(item)" :id="`kv-branch__${item.id}`">
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
    selected: {
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

  }

</style>

