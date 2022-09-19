<template>
  <!-- selects -->
  <div class="kv-processing__row">
    <div class="kv-processing__item">
      <div class="kv-processing__item-wr">
        <div class="kv-processing__label">
          {{ $lng("step2.nationalitiesLabel") }}
        </div>

        <div class="kv-processing__select kv-select">
          <div class="kv-select__badge">
            <svg class="kv-select__icon"><use href="#kv-icons_home"></use></svg>
          </div>
          <div class="kv-select__input kv-select_hide-arrow">
            <v-select
              :options="nationalities"
              label="name"
              :placeholder="$lng('step2.nationalitiesPlaceholder')"
              v-model="nationalitiesModel"
              :clearable="false"
              id="kv-select-general-nationality"
            />
            <svg class="kv-form__sel-arrow">
              <use href="#kv-icons_select"></use>
            </svg>
          </div>
        </div>

        <PopularList :list="popular" @change="change" />
      </div>

      <div></div>
    </div>

    <!-- Количество -->
    <div class="kv-processing__item">
      <ControlQuantity :quantity="quantity" @change="changeQuantity" />
    </div>

    <div class="kv-processing__item">
      <button class="kv-btn" @click="delete">Удалить</button>
    </div>
  </div>
  <!-- /selects -->
</template>

<script>
import vSelect from "vue-select";
import PopularList from "@/components/Control/PopularList.vue";
import ControlQuantity from "@/components/Control/ControlQuantity.vue";

export default {
  name: "ControlTouristsItem",
  components: {
    vSelect,
    PopularList,
    ControlQuantity,
  },
  props: {
    nationalities: {
      type: Array,
      default: [],
    },
    setup: {
      type: Object,
      default: null,
    },
  },
  emits: ["change"],
  data() {
    return {
      popular: [
        { codeA2: "DE", codeA3: "DEU", name: "Deutschland" },
        { codeA2: "RU", codeA3: "RUS", name: "Russland" },
        { codeA2: "TR", codeA3: "TUR", name: "Türkei" },
      ],
      quantity: 1,
    };
  },
  methods: {
    delete(data) {
      this.$emit("delete", data);
    },
    change(data) {
      this.$emit("change", data);
    },
    changeQuantity(data) {
      this.quantity = data;
    },
  },
  computed: {
    // v-model для селекта национальности
    nationalitiesModel: {
      get() {
        return this.nationalities.find(
          (item) => item.codeA2 === this.setup.nationality
        );
      },
      set(value) {
        this.change(value);
      },
    },
  },
  mounted() {},
};
</script>

<style scoped>
.kv-processing__item {
  margin-bottom: 12px;
}
</style>
