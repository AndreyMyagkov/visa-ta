<template>
  <div class="kv-row kv-mb-20">
    <template v-for="item in delivery" :key="item" >
      <div class="kv-col-12 kv-col-md-4 kv-mb-10" v-if="!(item.id === 1 && !isDigital)">
        <button
          class="kv-button kv-button__delivery-type"
          :class="{
            'kv-button__delivery-type_selected': item.id === selected
          }"
          :id="`kv-delivery-type-${item.id}`"
          @click="changeDeliveryType(item.id)"
        >{{ item.name}}</button>
      </div>
    </template>
  </div>

  <div class="kv-delivery-text kv-user-text"> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </div>

</template>

<script>
export default {
  name: "ControlDeliveryType",
  props: ["selected", "isDigital"],
  emits: ["change"],
  data() {
    return {
      delivery: [
        {
          id: 1,
          name: "Lieferung per E-Mail",
        },
        {
          id: 2,
          name: "Lieferung per Post",
        },
        {
          id: 3,
          name: "Abholen",
        }
      ]
    }
  },
  methods: {
    changeDeliveryType(data) {
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped>
.kv-button__delivery-type {
  font-weight: 700;
  font-size: 18px;
  line-height: 1.111;
  padding: 20px 40px;
  text-align: center;
  background-color: #fff;
  border: 1px solid rgba(0, 179, 212, 0.5);
  border-radius: 6px;
  display: block;
  width: 100%;
  height: 100%;
}

.kv-button__delivery-type_selected {
  background: #30C54B;
  color: #fff;
}
</style>
