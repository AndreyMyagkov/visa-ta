<template>
  <!-- selects -->
  <div class="kv-processing__row kv-tg">
    <div class="kv-tg__row">
      <div class="kv-tg__action">
        <button class="kv-btn" @click="remove">✖</button>
      </div>

      <div class="kv-tg__title">
        <!-- Количество -->
        {{ data.nationality.name }}
      </div>

      <div class="kv-tg__quality">
        <!-- Количество -->
        <ControlQuantity :quantity="data.quantity" @change="changeQuantity" />
      </div>

    </div>
  </div>
  <!-- /selects -->
</template>

<script>
import ControlQuantity from "@/components/Control/ControlQuantity.vue";

export default {
  name: "ControlTouristsGroup",
  components: {
    ControlQuantity,
  },
  props: {
    data: {
      type: Object,
    },
  },
  emits: ["change", "remove"],
  data() {
    return {
      //quantity: 1,
    };
  },
  methods: {
    remove() {
      this.$emit("remove", this.data.nationality.codeA2);
    },
    // change(data) {
    //   this.$emit("change", data);
    // },
    changeQuantity(data) {
      //this.quantity = data;
      this.$emit("change", { nationality: this.data.nationality, quantity: data });
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped>
.kv-tg {
  margin: 20px 0;
  background-color: var(--c-disabled);
  padding: 10px;
  max-width: 500px;
}
.kv-tg__row {
  display: flex;
  align-items: center;
}
.kv-tg__title {
  flex: 1 1 200px;
}
.kv-tg__quality {
  flex: 0 1 130px;
  margin-left: auto;
}
.kv-tg__action {
  flex: 0 0 30px;
}
</style>
