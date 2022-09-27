<template>
  <!-- selects -->
  <div class="kv-row kv-mb-20">
    <div class="kv-col-12 kv-col-md-6">
      <div class="kv-tg">
        <div class="kv-tg__row">
          <div class="kv-tg__action">
            <button class="kv-btn" @click="remove">✖</button>
          </div>

          <div class="kv-tg__title">
            {{ data.nationality.name }}
          </div>

          <div class="kv-tg__quality">
            <ControlQuantity :quantity="data.quantity" @change="changeQuantity" />
          </div>

        </div>
      </div>
    </div>
    <div class="kv-col-12 kv-col-md-6">
      <kv-alert>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
      </kv-alert>
    </div>
  </div>
  <!-- /selects -->
</template>

<script>
import ControlQuantity from "@/components/Control/ControlQuantity.vue";
import KvAlert from "@/components/KvAlert.vue";

export default {
  name: "ControlTouristsGroup",
  components: {
    KvAlert,
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
  background-color: var(--background-green_bdv);
  border: 1px solid rgba(48, 197, 75, 0.5);
  border-radius: 6px;
  padding: 16px 40px 17px 20px;
}
.kv-tg__row {
  display: flex;
  align-items: center;
}
.kv-tg__title {
  flex: 1 1 200px;
  font-size: 18px;
  line-height: 25px;
}
.kv-tg__quality {
  flex: 0 1 130px;
  margin-left: auto;
}
.kv-tg__action {
  flex: 0 0 34px;
}
</style>
