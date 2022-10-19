<template>
  <div class="kv-status-bar-bottom">
    <div class="kv-status-bar-bottom__list">
      <div class="kv-status-bar-bottom__item" v-if="selectedCountry.name">{{ selectedCountry.name }}</div>
      <div class="kv-status-bar-bottom__item" v-if="selectedService.name">{{ selectedService.name }}</div>
      <div class="kv-status-bar-bottom__item" v-if="selectedDuration.name">{{ selectedDuration.name }}</div>
      <div class="kv-status-bar-bottom__item" v-if="selectedPrice.price.m">
        <template v-if="selectedPrice.price.m !== 'm'">{{selectedPrice.price.m}}-{{ $lng('step2.multiplicity') }}</template>
        <template v-else>{{ $lng('step2.multiplicities') }}</template>
      </div>
      <div class="kv-status-bar-bottom__item" v-if="selectedPrice.info.quantity">
        {{selectedPrice.info.quantity}} {{ $lng(`step2.dimension.${selectedPrice.info.dimension}`) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusBarInfoBottom",
  props: ["selectedCountry", "selectedService", "selectedDuration", "selectedPrice"]
}
</script>

<style scoped>
  .kv-status-bar-bottom {
    background-color: rgba(0, 179, 212, 0.05);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 40px;
  }
  .kv-status-bar-bottom__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
  .kv-status-bar-bottom__item {
    position: relative;
  }
  .kv-status-bar-bottom__item:not(:last-child):after {
    /*content: '»';*/
    content: '•';
    margin-left: 15px;
  }
</style>
