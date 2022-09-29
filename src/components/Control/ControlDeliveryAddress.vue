<template>
  <div class="kv-row">
    <div class="kv-col-12 kv-col-md-4">
      <div class="kv-form__item-wrap kv-form__col" id="kv-delivery-field-addressingCountry">
        <div class="kv-form__item"
             ref="addressingCountries2"
             :class="{
                      'kv-form__item_error': $v.delivery.addressingCountry.$error,
                      'kv_is-focused': $v.delivery.addressingCountry.$model.codeA3 !== null,
                   }">
          <div class="kv-form__sel-custom">
            <v-select
              :options="addressingCountries"
              label="name"
              placeholder=" "
              inputId="kv-delivery-country"
              v-model="$v.delivery.addressingCountry.$model"
              :clearable="false"
              @option:selected="$refs.addressingCountries2.classList.add('kv_is-focused');isFormCorrect()"
              @search:focus="$refs.addressingCountries2.classList.add('kv_is-focused');"
              @search:blur="$v.delivery.addressingCountry.$touch()"
            />
            <label class="kv-form__label" for="kv-delivery-country">{{ $lng('step5.country') }}</label>
            <svg class="kv-form__sel-arrow"><use href="#kv-icons_select"></use></svg>
          </div>
        </div>
      </div>

    </div>
    <div class="kv-col-12 kv-col-md-4">
      <div class="kv-form__item-wrap kv-form__col" id="kv-delivery-field-city">
        <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.city.$error }">
          <input type="text" placeholder=" " id="kv-delivery-city" name="city2" v-model.trim="$v.delivery.city.$model"  @blur="isFormCorrect">
          <label class="kv-form__label" for="kv-delivery-city">{{ $lng('step5.city') }}</label>
        </div>
      </div>


    </div>
    <div class="kv-col-12 kv-col-md-4">

      <div class="kv-form__item-wrap kv-form__col" id="kv-delivery-field-zip">
        <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.zip.$error }">
          <input type="text" placeholder=" " id="kv-delivery-zip" name="zip2" maxlength="10" v-model.trim="$v.delivery.zip.$model"  @blur="isFormCorrect">
          <label class="kv-form__label" for="kv-delivery-zip">{{ $lng('step5.zip') }}</label>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
//import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

import * as arrayHelper from '@/helpers/array';

const isCountrySelected = (value) => value.codeA3 !== null; //!Array.isArray(value);
const checkCompany = (value, vm) => !vm.isCompany || (vm.isCompany && value.length > 0);
const addressValidator = (value) => !value.length || /\d+/.test(value);

export default {
  name: "ControlDeliveryAddress",
  props: {
    addressingCountries: {
      type: Array,
      required: true
    },
    pickupPoints: {
      type: Array,
      required: true
    },

    deliveryDefault: {
      type: Object,
      required: true
    },
    isDeliveryByEmail: {
      type: Boolean,
      required: false
    },
    showBlock: {

    }
  },
  components: {
    vSelect,
    //TheMask
  },
  setup () { return { v$: useVuelidate() } },
  data() {
    return {
      delivery: Object.assign({}, this.deliveryDefault),
      error: {
        branch: false
      }
    }
  },
  validations()  {
    return {
      delivery: {

        zip: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(10)
        },
        city: {
          required,
          minLength: minLength(1)
        },
        addressingCountry: {
          isCountrySelected
        },

      }
    }

  },
  methods: {
    /**
     * Смена офиса доставки
     */
    changeBranch(value){
      this.error.branch = false;
      this.delivery.branch = value;
      //this.$v.delivery.branch.$model = value;
      this.$v.delivery.$touch();
      this.$emit('postalReset');
      this.isFormCorrect();
    },
    isFormCorrect() {
      this.$emit('update', {
        delivery: this.delivery
      });

      this.$emit('stepDataChange', 5);

      const deliveryIsValid =  !this.$v.delivery.$invalid;

      let isValid = false;

      // Адрес доставки совпадает с заказчиком или Электронная доставка
      if (this.delivery.type == 1) {
        isValid = customerIsValid;
      }
      // Адрес доставки отличается от заказчика
      if (this.delivery.type == 2) {
        isValid = customerIsValid && deliveryIsValid;
      }
      if (this.delivery.type == 3) {
        isValid = customerIsValid && this.delivery.branch.id !== null;
      }

      this.$emit('isValid', isValid)

      return isValid
    },
    checkForm() {
      const fields = [ 'zip', 'city', 'addressingCountry'];

      if (this.delivery.type == 2) {
        this.$v.delivery.$touch();
      }

      if (!this.isFormCorrect()) {
        this.$emit('showModal', this.$lng('common.checkFormPopup'), this.$lng('common.error'));
      } else {
        return
      }


      if (this.delivery.type == 2 && this.$v.delivery.$error) {
        for (let i = 0; i < fields.length; i++ ) {
          if (this.$v.delivery[fields[i]].$error) {
            this.$emit('scroll-to', `#kv-delivery-field-${fields[i]}`)
            break;
          }
        }
      }

      if (this.delivery.type == 3 && this.delivery.branch.id === null) {
        this.error.branch = true
        this.$emit('scroll-to', `#kv-delivery-field-branch`)
      }

    },
  },
  computed: {

    preparedPickupPoints() {
      return arrayHelper.arrayToSubArrays(this.pickupPoints, 2)
    },

  },
  mounted() {

  },

}
</script>

<style scoped>
.kv-error {
  padding: 10px;
  background: #ffeded;
  border-radius: 3px;
  color: red;
}
</style>
