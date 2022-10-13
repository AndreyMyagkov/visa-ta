<template>
  <!-- Reveiw total-->
  <div class="kv-review-total">
    <div class="kv-review-total__plug"></div>
    <div class="kv-review-total__container">
      <div class="kv-review-total__user">
        <svg class="kv-review-total__icon">
          <use href="#kv-icons_user"></use>
        </svg>
        <div class="kv-review-total__counter">
          <span class="kv-review-total__cross">+</span> {{ calculation.participants.length }}
        </div>
      </div>
      <div class="kv-review-total__title">{{ $lng('step7.amount') }}</div>
      <div class="kv-review-total__price kv-price">
        <span class="kv-cart__value" id="kv-summary-t-amount">{{ totalAmount }}</span>
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

          <div class="kv-cart-table__row" v-for="(item, i) in calculation.participants" :key="i">
            <div class="kv-cart-table__item" id="kv-summary-t-index">{{item.nr}}</div>
            <div class="kv-cart-table__item kv-cart-table__item_col" :id="`kv-summary-t-name-${item.nr}`"></div>
            <div class="kv-price kv-cart-table__item">
              <span  v-if="item.price !== null" :id="`kv-summary-t-price-${item.nr}`" class="kv-price__value">{{ priceFormat(item.price) }}</span>
              <template v-else><span v-html="dashSymbol"></span> </template>
              <span class="kv-price__currency">€</span>
            </div>
          </div>

          <!-- Пакеты -->
          <div class="kv-cart-table__row" v-if="calculation.servicePackage !== null && calculation.servicePackage.participants.length">
            <div class="kv-cart-table__item kv-cart-table__item_col">
              {{ calculation.servicePackage.name }}
              <!--<svg><use href="#kv-icons_multiply"></use></svg> -->
              х
              {{ calculation.servicePackage.participants.length }}
            </div>
            <div class="kv-price kv-cart-table__item">
              <span class="kv-price__value">{{ priceFormat(calculation.servicePackage.price *  calculation.servicePackage.participants.length) }}</span>
              <span class="kv-price__currency">€</span>
            </div>
          </div>

          <!-- Услуги -->
          <template v-if="calculation.suppServices !== null && calculation.suppServices.length">
            <!-- .filter(_ => !_.isIncluded) -->
            <div class="kv-cart-table__row" v-for="suppServices in calculation.suppServices" :key="suppServices.id">
              <div class="kv-cart-table__item kv-cart-table__item_col">
                <span :id="`kv-summary-t-suppservice-${suppServices.id}`">{{ suppServices.name }}</span>
                <!-- <svg><use href="#kv-icons_multiply"></use></svg> -->
                x
                {{ suppServices.participants.length }}
              </div>
              <div class="kv-price kv-cart-table__item">
                <span  class="kv-price__value" :id="`kv-summary-t-suppservice-price-${suppServices.id}`">{{ priceFormat((suppServices.isIncluded ? 0 : suppServices.price) * suppServices.participants.length) }}</span>
                <span class="kv-price__currency">€</span>
              </div>
            </div>
          </template>

          <!-- Почта -->
          <div class="kv-cart-table__row" v-if="calculation.postalService !== null">
            <div class="kv-cart-table__item kv-cart-table__item_col" id="kv-summary-t-postal-name">{{ calculation.postalService.name }}</div>
            <div class="kv-price kv-cart-table__item">
              <span  class="kv-price__value" id="kv-summary-t-postal-price">{{ priceFormat(calculation.postalService.price) }}</span>
              <span class="kv-price__currency">€</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>



</template>

<script>
import { dashSymbol } from "@/helpers/constants";
import { priceFormat } from "@/helpers/format";

export default {
  name: "ReviewTotal",
  props: ["calculation", "totalAmount"],
  data: () => {
    return {
      priceFormat: priceFormat,
      dashSymbol: dashSymbol
    }
  },
}
</script>
