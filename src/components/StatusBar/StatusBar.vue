<template>
  <!-- Info bar -->
  <div class="kv-header">
    <div class="kv-header__item kv-step-values">
      <div class="kv-step-values__inner">
        <div class="kv-step-values__row">
          <slot name="info"></slot>
        </div>

        <!-- cart -->
        <!--  && steps[2].isValid -->
        <div class="kv-step-values__aside">
          <slot name="aside"></slot>
        </div>

        <!-- /cart -->

      </div>
    </div>
  </div>
  <!-- /Info bar -->
</template>

<script>
export default {
  name: "StatusBar"
}
</script>

<style scoped>

</style>
