<template>
  <div class="kv-popular">
    <div class="kv-popular__item"
         :id="`kv-popular-nat__${item.codeA2}`"
         v-for="item in list"
         :key="item"
         @click="onSelect(item)">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "PopularList",
  props: {
    list: {},
  },
  methods: {
    onSelect(data) {
      this.$emit("change", data);
    },
  },
};
</script>
<style scoped>
.kv-popular {
  margin-top: 8px;
  margin-bottom: 8px;
}

.kv-popular__item {
  margin-right: 1em;
  margin-bottom: 1em;
  line-height: 1.5;
  display: inline;
}

.kv-popular__item:not(:last-child)::after {
  /*content: ', ';*/
}

.kv-popular__item span {
  border-bottom: dashed 1px currentColor;
  cursor: pointer;
  font-size: 15px;
  line-height: 20px;
}
</style>
