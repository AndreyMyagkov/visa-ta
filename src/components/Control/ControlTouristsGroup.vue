<template>
  <!-- selects -->
  <div class="kv-row kv-mb-20 kv-mt-10">
    <div class="kv-col-12 kv-col-md-6">
      <div class="kv-tg">
        <div class="kv-tg__row">
          <div class="kv-tg__action">
            <button class="kv-btn" :id="`kv-tg__remove_${data.index}`" @click="remove">✖</button>
          </div>

          <div class="kv-tg__title">
            {{ data.nationality.name }}
          </div>

          <div class="kv-tg__quality">
            <ControlQuantity :quantity="data.quantity" :index="data.index" @change="changeQuantity" />
          </div>

        </div>
      </div>
    </div>
    <div class="kv-col-12 kv-col-md-6">
      <kv-alert
        :type="alertType"
        v-if="data.index === 0 && alert.state !== 0"
      >
        {{ alert.text }}
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
    alert: {
      type: Object
    }
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
    changeQuantity(quantity) {
      //this.quantity = data;
      this.$emit("change", { nationality: this.data.nationality, quantity: quantity, index: this.data.index });
    },
  },
  computed: {
    alertType() {
      if (this.alert.state === -1) {
        return "danger";
      }

      if (this.alert.state === 1) {
        return "success";
      }

      return "info";
    }
  },
  mounted() {},
};
</script>

<style scoped>
.kv-tg {
  background-color: var(--background-green_bdv);
  border: 1px solid rgba(48, 197, 75, 0.5);
  border-radius: 6px;
  padding: 16px 20px 17px 20px;
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
.kv-alert {
  min-height: 100%;
}

@container kvoffer (max-width: 500px) {
  .kv-tg__row {
    flex-wrap: wrap;
  }
  .kv-tg__title {
    flex: 1 0 auto;
  }
  .kv-tg__quality {
    margin: 5px auto 0;
  }
}
</style>
