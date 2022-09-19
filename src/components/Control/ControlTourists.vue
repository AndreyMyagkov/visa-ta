<template>
  <!-- Tourists -->
  <div >
    <slot :updateNationality="updateNationality"></slot>
    <div>Добавить</div>
  </div>
  <!-- Tourists -->
</template>

<script>
//import ControlTouristsItem from "@/components/Control/ControlTouristsItem.vue";
export default {
  name: "ControlTourists",
  components: {
    //ControlTouristsItem
  },
  props: {


  },
  emits: ['change'],
  methods: {
    updateNationality(data) {
      console.log('ct')
      console.log(data)
    }
  }

}
</script>

<style scoped>

</style>
