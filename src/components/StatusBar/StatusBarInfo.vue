<template>
    <div class="kv-step-values__item" v-if="selectedCountry.name">
      <span id="kv-header__country-name">{{selectedCountry.name}}</span>
    </div>


    <div class="kv-step-values__item" v-if="selectedService.name">
      <span id="kv-header__service-name">{{selectedService.name}}</span>
      <span v-if="selectedDuration.name">
                  <span id="kv-header__duration-name">{{selectedDuration.name}}</span>
                  <span v-if="selectedPrice.price.m">|&nbsp;
                      <span  id="kv-header__multiplicity-name">
                        <template v-if="selectedPrice.price.m !== 'm'">{{selectedPrice.price.m}}-{{ $lng('step2.multiplicity') }}</template>
                        <template v-else>{{ $lng('step2.multiplicities') }}</template>
                        </span>
                  </span>
                  <span v-if="selectedPrice.info.quantity">|
                    <span id="kv-header__processing-name">
                      {{selectedPrice.info.quantity}} {{ $lng(`step2.dimension.${selectedPrice.info.dimension}`) }}
                    </span>
                  </span>
                </span>
    </div>
</template>

<script>
export default {
  name: "StatusBarInfo",
  props: ["selectedCountry", "selectedService", "selectedDuration", "selectedPrice"]
}
</script>

<style scoped>

</style>
