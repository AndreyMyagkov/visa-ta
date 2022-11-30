<template>
  <div class="kv-cart" v-if="calculation.participants.length">
    <div class="kv-participants">
    <svg class="kv-participants__icon"><use href="#kv-icons_user"></use></svg>
    <div class="kv-participants__multiply">
      <svg><use href="#kv-icons_multiply"></use></svg>
    </div>
    <div class="kv-participants__counter" id="kv-header__participants-count">{{calculation.participants.length}}</div>
  </div>

    <div class="kv-cart drop">

    <div class="kv-cart__head">
      <svg class="kv-cart__icon"><use href="#kv-icons_cart"></use></svg>

      <div class="kv-price kv-cart__price"> <span class="kv-cart__value" id="kv-header__amount">{{totalAmount}}</span> <span class="kv-price__currency">€</span></div>
      <svg class="kv-cart__arrow drop__angle"><use href="#kv-icons_arrow_down"></use></svg>
    </div>

    <div class="kv-cart__body drop__body">

      <div class="kv-cart-table">

        <div class="kv-cart-table__row" v-for="(item, i) in calculation.participants" :key="i">
          <div class="kv-cart-table__item"><svg width="16" height="16"><use href="#kv-icons_user"></use></svg></div>
          <div class="kv-cart-table__item kv-cart-table__item_col">{{ item.gender }} {{item.name}} {{item.sname}}</div>
          <div class="kv-price kv-cart-table__item">
            <span  v-if="calculation.participants[i] && (calculation.participants[i].price !== null)" class="kv-price__value">{{priceFormat(calculation.participants[i].price)}}</span>
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
            <span class="kv-price__value">
              {{ priceFormat(calculation.servicePackage.price *  calculation.servicePackage.participants.length) }}
            </span>
            <span class="kv-price__currency">€</span>
          </div>
        </div>

        <!-- Услуги -->
        <template v-if="calculation.suppServices !== null">
          <!-- ..filter(_ => !_.isIncluded) -->
          <div class="kv-cart-table__row" v-for="suppServices in calculation.suppServices" :key="suppServices.id">
            <div class="kv-cart-table__item kv-cart-table__item_col">
              {{ suppServices.name }}
              <!-- <svg><use href="#kv-icons_multiply"></use></svg> -->
              x
              {{ suppServices.participants.length }}
            </div>
            <div class="kv-price kv-cart-table__item">
              <span class="kv-price__value">
                {{ priceFormat((suppServices.isIncluded ? 0 : suppServices.price) * suppServices.participants.length) }}
              </span>
              <span class="kv-price__currency">€</span>
            </div>
          </div>
        </template>

        <!-- Почта -->
        <div class="kv-cart-table__row" v-if="calculation.postalService !== null">
          <div class="kv-cart-table__item kv-cart-table__item_col">{{ calculation.postalService.name }}</div>
          <div class="kv-price kv-cart-table__item">
            <span class="kv-price__value">
              {{ priceFormat(calculation.postalService.price) }}
            </span>
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
  name: "StatusBarCart",
  props: ["calculation", "totalAmount"],
  data: () => {
    return {
      priceFormat: priceFormat,
      dashSymbol: dashSymbol
    }
  }
}
</script>

<style scoped>

</style>
