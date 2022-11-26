<template>
  <div class="kv-form">
    <div class="kv-row">
      <div class="kv-col-12 kv-col-md-6 kv-py-10"
           :class="{
                      'kv-form__item_border': item.id === selected.id,
                      'kv-form__item_selected': item.id === selected.id,
                      'kv-form__item_error': error
                }"

           v-for="(item, i) in pickupPoints" :key="i">


          <div class="kv-form__item kv-form__item_chb kv_height-100 kv-form__item-branch">
            <label class="kv-form-radio kv-custom-control"
                   :id="`kv-branch__${item.id}`">

              <input type="radio" name="branch" :checked="item.id === selected.id"  :value="item.id"  @change="changeBranch(item)">
              <span class="kv-form-radio__mark kv-custom-control__icon-radio">

              </span>
              <span>
                    <div class="kv-form-radio__title">{{item.name}}</div>
                    <div class="kv-form-radio__text">{{item.address}}</div>
                    <div class="kv-form-radio__text">{{ $lng('step5.workingTime') }} <b>{{item.workingTime}}</b></div>
                  </span>
            </label>
          </div>


      </div>
    </div>
  </div>

</template>

<script>

import * as arrayHelper from '@/helpers/array';

export default {
  name: "ControlPickupPoints",
  emits: ["change"],
  props: {
    pickupPoints: {
      type: Array,
      required: true
    },
    selected: {
      type: Object
    }
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    /**
     * Смена офиса доставки
     */
    changeBranch(value){
     // this.error.branch = false;
     //  this.delivery.branch = value;
     //  this.$v.delivery.$touch();
     // this.$emit('postalReset');
      this.$emit('change', value);
    },

  },
  computed: {
    preparedPickupPoints() {
      return arrayHelper.arrayToSubArrays(this.pickupPoints, 2)
    },

  },
  mounted() {

  }
}
</script>

<style scoped>
.kv-form__item-branch .kv-form-radio {
  border-radius: 6px;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 179, 212, 0.5);
}
.kv-form__item-branch  .kv-form__item_border {
  box-shadow: 0 0 0 2px hsl(131, 61%, 48%);
}
</style>
