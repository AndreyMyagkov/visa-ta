<template>
  <div class="kv-block"
       :class="{'kv-is-hover': isHover}"
       @mouseover="isHover = true"
       @mouseleave="isHover = false"
  >
    <div class="kv-block__header">
      <div class="kv-content__header">
        <div class="kv-content__icon">
          <svg><use :href="`#kv-icons_${icon}`"></use></svg>
        </div>

        <div class="kv-content__title">{{header}}</div>

        <slot name="header-aside"></slot>
      </div>
    </div>
    <div class="kv-block__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheBlock",
  props: {
    "icon": {
      "type": String,
      "default": 'default',
      "required": false
    },
    "header": {
      "type": String
    },
  },
  data() {
    return {
      isHover: true
    }
  }

}
</script>

<style scoped>
  .kv-block {
    background: rgba(0, 179, 212, 0.05);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 40px;
  }
  .kv-block__header {
    padding-bottom: 20px;

  }
  .kv-block__content {

  }
</style>
