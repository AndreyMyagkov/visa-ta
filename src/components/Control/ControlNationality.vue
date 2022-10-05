<template>

  <div class="kv-row">
    <div class="kv-col-12 kv-col-md-6">
      <div id="kv-participants-add" class="kv-add">
        <svg><use href="#kv-icons_plus"></use></svg>
        HINZUFÜGEN
      </div>

      <div class="kv-nationality-control">
        <div class="kv-select">
          <div class="kv-select__input kv-select_hide-arrow">
            <v-select
              :options="nationalities"
              label="name"
              :placeholder="$lng('step2.nationalitiesPlaceholder')"
              v-model="nationalitiesModel"
              :clearable="false"
              id="kv-select-general-nationality"
              @option:selected="selected"
            />
            <svg class="kv-form__sel-arrow">
              <use href="#kv-icons_select"></use>
            </svg>
          </div>
        </div>
        <PopularList :list="popular" @change="change" />
      </div>


    </div>

  </div>

</template>

<script>
import vSelect from "vue-select";
import PopularList from "@/components/Control/PopularList.vue";

export default {
  name: "ControlNationalities",
  components: {
    vSelect,
    PopularList,
  },
  props: {
    nationalities: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    popular: {
      type: Array,
      default: []
    },
    setup: {
      type: Object,
      default: null,
    },
  },
  emits: ["change", "add"],
  data() {
    return {
      quantity: 1,
      nationalitiesModel: null,
    };
  },
  methods: {
    selected(data) {
      this.$emit("add", { nationality: data, quantity: 1 });
      this.nationalitiesModel = null;
    },
    add() {
      this.$emit("add", { nationality: this.nationalitiesModel, quantity: 1 });
    },
    //TODO: change - только здесь
    change(data) {
      //this.$emit("change", data);
      this.$emit("add", { nationality: data, quantity: 1 });
    },
  },
  computed: {
    // v-model для селекта национальности
    // nationalitiesModel: {
    //   get() {
    //     return this.nationalities.find(
    //       (item) => item.codeA2 === this.setup.nationality
    //     );
    //   },
    //   set(value) {
    //     this.change(value);
    //   },
    // },
  },
  mounted() {},
}
</script>

<style scoped>
.kv-processing__item {
  margin-bottom: 12px;
}
.kv-nationalities {
  display: flex;
  gap: 20px;
}
.kv-processing__select {
  flex: 1 1 auto;
  max-width: 500px;
}
.kv-button {
  background-color: var(--c-success);
  color: var(--c-main);
  cursor: pointer;
  padding: 4px 16px;
  border-radius: 6px;
  transition: 0.3s;
}

</style>
