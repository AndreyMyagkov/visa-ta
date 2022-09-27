<template>
  <div class="kv-buch__col kv-buch__col-mobile-expand">
    <div class="kv-buch__col-inner kv-control-country">
<!--      <div class="kv-buch__title">{{ $lng("step1.countryLabel") }}</div>-->
      <div class="kv-buch__list kv-row">
        <!-- select -->
        <div class="kv-select kv-col-12 kv-col-md-4">

          <div class="kv-select__input kv-select_hide-arrow">
            <v-select
              :options="countries"
              label="name"
              :placeholder="$lng('step1.countryPlaceholder')"
              v-model="selectedCountry"
              :clearable="false"
              id="kv-select-country"
            >
            </v-select>

            <svg class="kv-form__sel-arrow">
              <use href="#kv-icons_select"></use>
            </svg>
          </div>
        </div>

        <!-- /select -->
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  name: "ControlCountries",
  components: {
    vSelect,
  },
  props: {
    countries: {
      type: Array,
      required: true,
    },
    default: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      //popular: this.countries.slice(0, 3)
    };
  },
  methods: {
    change(data) {
      this.$emit("change:country", data);
    },
  },
  computed: {
    selectedCountry: {
      get() {
        return this.countries.find(
          (item) => item.codeA3 === this.default.country.codeA3
        );
      },
      set(value) {
        this.change(value);
      },
    },
    popular() {
      return this.countries.slice(0, 3);
    },
  },
};
</script>

<style scoped>
.kv-buch__title {
  margin-bottom: 5px;
}
</style>
