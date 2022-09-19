<template>
  <div class="kv-buch__list" :class="{
    'kv-buch__list_scroll': data.length > 4
  }">
    <div class="kv-buch__list-item"  v-for="item in data" :key="item.id">
      <div
          class="kv-buch-chb"
          :class="{
            'kv-buch-chb_marked': item.type === 'item',
            'kv-buch-chb_active': selected.indexOf(item.id) !== -1
          }"
      >
        <span class="kv-buch-chb__title"  :id="`kv-btn__${item.id}`" @click="change(item)">
          {{item.name}}
          <svg class="kv-buch-chb__icon"><use href="#kv-icons_next"></use></svg>
        </span>
        <span class="kv-buch-chb__badge" @click="$emit('showModal', item.description, item.name)">
          <svg class="kv-buch-chb__info" v-if="item.description"><use href="#kv-icons_info"></use></svg>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "VisaTypes",
  props: {
    data: {
      type: Array,
    },
    selected: {
      type: Array
    }
  },
  methods: {
    /**
     * Выбор элемента
     */
    change(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style scoped>

</style>
