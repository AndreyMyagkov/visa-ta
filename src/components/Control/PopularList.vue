<template>
  <div class="kv-popular">
    <div class="kv-popular__item" v-for="item in list" :key="item" @click="onSelect(item)">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PopularList',
  props: {
    list: {},
  },
  methods: {
   onSelect(data) {
      this.$emit('change', data)
    }
  }
}
</script>
<style scoped>
.kv-popular {
  margin-top: 8px;
  padding-left: 52px;
}

.kv-popular__item {
  margin-right: 1em;
  margin-bottom: 1em;
  line-height: 1.5;
  display: inline;
}

.kv-popular__item:not(:last-child)::after {
  content: ', ';
}

.kv-popular__item span {
  border-bottom: dashed 1px currentColor;
  cursor: pointer;
  font-size: 0.8em;
}
</style>
