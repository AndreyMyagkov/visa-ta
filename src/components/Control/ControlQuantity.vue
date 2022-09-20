<template>
  <div class="kv-quantity">
    <button
      class="kv-quantity__btn kv-quantity__btn-minus"
      :disabled="quantity <= minQuantity"
      @click="minus"
    >
      -
    </button>
    <div class="kv-quantity__value">{{ quantity }}</div>
    <button
      class="kv-quantity__btn kv-quantity__btn-plus"
      :disabled="quantity >= maxQuantity"
      @click="plus"
    >
      +
    </button>
  </div>
</template>
<script>
export default {
  name: "ControlQuantity",
  props: {
    quantity: {
      type: Number,
      default: 1,
    },
    maxQuantity: {
      type: Number,
      default: 10,
    },
    minQuantity: {
      type: Number,
      default: 1,
    },
  },
  emits: ["change"],
  methods: {
    minus() {
      if (this.quantity <= this.minQuantity) {
        return false;
      }
      const q = this.quantity - 1;
      this.change(q);
    },
    plus() {
      if (this.quantityValue >= this.maxQuantity) {
        return false;
      }
      const q = this.quantity + 1;
      this.change(q);
    },
    change(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style scoped>
.kv-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 130px;
}
.kv-quantity__value {
  text-align: center;
  min-width: 50px;
  font-size: 20px;
}
.kv-quantity__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--c-second);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: var(--c-second);
}
.kv-quantity__btn:disabled {
  background-color: var(--c-disabled);
  border-color: #ddd;
}
.kv-quantity__btn:not(:disabled):hover {
  border-color: var(--c-prim);
}
</style>
