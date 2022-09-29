<template>
  <!-- Reveiw total-->
  <div class="kv-review-total kv-review__item">
    <div class="kv-review-total__plug"></div>
    <div class="kv-review-total__container">
      <div class="kv-review-total__user">
        <svg class="kv-review-total__icon">
          <use href="#kv-icons_user"></use>
        </svg>
        <div class="kv-review-total__counter">
          <span class="kv-review-total__cross">+</span> {{ data.calculate.calculation.participants.length }}
        </div>
      </div>
      <div class="kv-review-total__title">{{ $lng('step7.amount') }}</div>
      <div class="kv-review-total__price kv-price">
        <span class="kv-cart__value" id="kv-summary-t-amount">{{totalAmount()}}</span>
        <span class="kv-price__currency">€</span>
      </div>
    </div>
    <!-- Cart-->
    <div class="kv-review-total__more kv-cart kv-review-total__plug">
      {{ $lng('step7.more') }}
      <svg class="kv-review-total__arrow">
        <use href="#kv-icons_arrow_down"></use>
      </svg>
      <div class="kv-cart__body drop__body">
        <!-- Cart table-->
        <div class="kv-cart-table">

          <div class="kv-cart-table__row" v-for="(item, i) in data.calculate.calculation.participants" :key="i">
            <div class="kv-cart-table__item" id="kv-summary-t-index">{{item.nr}}</div>
            <div class="kv-cart-table__item kv-cart-table__item_col" :id="`kv-summary-t-name-${item.nr}`">{{ data.tourists[i].gender }} {{data.tourists[i].name}} {{data.tourists[i].sname}}</div>
            <div class="kv-price kv-cart-table__item">
              <span  v-if="item.price !== null" :id="`kv-summary-t-price-${item.nr}`">{{ formatter.priceFormat(item.price) }}</span>
              <template v-else><span v-html="constants.dashSymbol"></span> </template>
              <span class="kv-price__currency">€</span>
            </div>
          </div>

          <!-- Пакеты -->
          <div class="kv-cart-table__row" v-if="data.calculate.calculation.servicePackage !== null && data.calculate.calculation.servicePackage.participants.length">
            <div class="kv-cart-table__item kv-cart-table__item_col">
              {{ data.calculate.calculation.servicePackage.name }}
              <!--<svg><use href="#kv-icons_multiply"></use></svg> -->
              х
              {{ data.calculate.calculation.servicePackage.participants.length }}
            </div>
            <div class="kv-price kv-cart-table__item">
              <template>{{ formatter.priceFormat(data.calculate.calculation.servicePackage.price *  data.calculate.calculation.servicePackage.participants.length) }}</template>
              <span class="kv-price__currency">€</span>
            </div>
          </div>

          <!-- Услуги -->
          <template v-if="data.calculate.calculation.suppServices !== null && data.calculate.calculation.suppServices.length">
            <!-- .filter(_ => !_.isIncluded) -->
            <div class="kv-cart-table__row" v-for="suppServices in data.calculate.calculation.suppServices" :key="suppServices.id">
              <div class="kv-cart-table__item kv-cart-table__item_col">
                <span :id="`kv-summary-t-suppservice-${suppServices.id}`">{{ suppServices.name }}</span>
                <!-- <svg><use href="#kv-icons_multiply"></use></svg> -->
                x
                {{ suppServices.participants.length }}
              </div>
              <div class="kv-price kv-cart-table__item">
                <span :id="`kv-summary-t-suppservice-price-${suppServices.id}`">{{ formatter.priceFormat((suppServices.isIncluded ? 0 : suppServices.price) * suppServices.participants.length) }}</span>
                <span class="kv-price__currency">€</span>
              </div>
            </div>
          </template>

          <!-- Почта -->
          <div class="kv-cart-table__row" v-if="data.calculate.calculation.postalService !== null">
            <div class="kv-cart-table__item kv-cart-table__item_col" id="kv-summary-t-postal-name">{{ data.calculate.calculation.postalService.name }}</div>
            <div class="kv-price kv-cart-table__item">
              <span id="kv-summary-t-postal-price">{{ formatter.priceFormat(data.calculate.calculation.postalService.price) }}</span>
              <span class="kv-price__currency">€</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>



</template>

<script>
import * as constants from "@/helpers/constants";
import * as formatter from "@/helpers/format";

export default {
  name: "ReviewTotal",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    totalAmount() {
      let amount = this.data.calculate.amount;
      if (amount !== null) {
        return formatter.priceFormat(amount)
      } else {
        return constants.dashSymbol
      }
    },


  },


}
</script>

<style scoped>

</style>
