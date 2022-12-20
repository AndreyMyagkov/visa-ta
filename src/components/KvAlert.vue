<template>
  <div class="kv-alert" :class="`kv-alert_${type}`">
    <div class="kv-alert__badge">
      <svg class="kv-alert__icon" width="18" height="22"><use href="#kv-icons_info"></use></svg>
    </div>
    <div class="kv-alert__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "KvAlert",
  props: {
    type: {
      type: String,
      default: "default"
    }
  }
}
</script>

<style scoped>
 .kv-alert {
   --color: rgba(0, 179, 212, 1);
   display: flex;
   align-items: center;
   gap: 10px;
   padding: 9px;
   background-color: #fff;
   border: solid 1px var(--color);
   border-radius: 6px;
   color: var(--color);
 }
 .kv-alert_default {
   --color: rgba(0, 179, 212, 1);
   background-color: transparent;
   border: none;
   padding: 9px 0;
   align-items: flex-start;
 }
 .kv-alert_info {
   --color: rgba(0, 179, 212, 1);
 }
 .kv-alert_danger {
   --color: rgba(255, 0, 0, 1);
 }
 .kv-alert_success {
   --color: #30C54B;
 }
 .kv-alert__badge {
   flex: 0 0 18px;
 }
 .kv-alert__icon {
   fill: var(--color);
   display: block;
 }
 .kv-alert__content {
   flex: 1 1 calc(100% - 28px);
   max-width: calc(100% - 28px);
   font-size: 15px;
   line-height: 1.333;
   color: var(--color);
 }
</style>
