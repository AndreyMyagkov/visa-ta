<template>

  <!-- Groups -->
  <div class="kv-buch__col">
    <div class="kv-buch__col-inner" v-if="serviceGroups.length">
      <div class="kv-buch__title">{{$lng('step1.serviceGrpLabel')}}</div>
      <VisaTypes
          :data="serviceGroups"
          :selected="init.serviceGroups"
          @change="selectVisaType"
          @showModal="showModal"
          id="kv-service-groups"
      >
      </VisaTypes>
    </div>
  </div>
  <!-- /Groups -->

  <!-- Services -->
  <div class="kv-buch__col" id="kv-services">
    <div class="kv-buch__col-inner"  v-if="serviceGroupsSelected.length">
      <div class="kv-buch__title">{{$lng('step1.serviceLabel')}}</div>
      <VisaTypes
          :data="serviceGroupsSelected"
          :selected="init.service"
          @change="selectVisaType"
          @showModal="showModal"
          id="kv-service"
      >
      </VisaTypes>

    </div>
  </div>
  <!-- /Services -->

</template>

<script>
import VisaTypes from "@/components/Control/VisaTypes.vue";
import vSelect from "vue-select";

export default {
  name: "ControlServices",
  components: {
    VisaTypes,
  },
  props: {
    serviceGroups: {
      type: Array,
      required: true
    },
    serviceGroupsSelected: {
      type: Array,
      required: true
    },
    init: {
      type: Object,
      required: true
    }
  },
  emits: ["change:service", "showModal"],
  data() {
    return {

    }
  },
  methods: {
    selectVisaType(data) {
      this.$emit('change:service', data);
    },
    showModal(content, title){
      this.$emit('showModal', content, title);
    },
  },
  computed: {

  },

}
</script>

