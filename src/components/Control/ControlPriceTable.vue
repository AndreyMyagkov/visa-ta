<template>

  <div class="kv-ptable">
    <div class="kv-ptable-left">
      <div class="kv-ptable-left__header">
        <div class="kv-ptable-left__label-dur">Gültigkeits-dauer</div>
        <div class="kv-ptable-left__label-mul">Einreise</div>
      </div>

      <div class="kv-ptable-left__item" v-for="item in durations" :key="item.index">
        <div
          class="kv-ptable-duration"
          :class="{'kv-selected': item.index === setup.duration.index}">
          <div class="kv-ptable-duration__value">{{ item.value }}</div>
          <div class="kv-ptable-duration__label">{{ item.label }}</div>
          <div
              class="kv-ptable-duration__info"
              @click.stop="$emit('showModal', item.description, item.name)"
              v-if="item.description"
          >
            <svg class="kv-ptable-duration__icon" width="18" height="18"><use href="#kv-icons_info"></use></svg>
          </div>
        </div>
        <div class="kv-ptable-multiplicity">
          <div
            class="kv-ptable-multiplicity__item"
            :class="{'kv-selected': item.index === setup.duration.index && mult === setup.price.price.m}"
            v-for="mult in item.multiplicities"
            :key="mult">
            <template v-if="mult !== 'm'">{{ mult }}-{{ $lng('step2.multiplicity') }}</template>
            <template v-else>{{ $lng('step2.multiplicities') }}</template>
          </div>
        </div>
      </div>


    </div>


    <div class="kv-ptable-right" style="width: calc(100% - 200px)">

       <div class="kv-ptable-col" v-for="(item, pd) in [...serviceDetails.processDurations].reverse()" :key="pd">

         <!-- header -->
        <div class="kv-ptable-processing"
            :class="{'kv-ptable-processing_selected': item.hours === setup.price.info.hours}"
        >
          <div class="kv-ptable-processing__title">{{ $lng('step2.processingDuration') }}</div>
          <div class="kv-ptable-processing__value">{{ item.quantity }}</div>
          <div class="kv-ptable-processing__label">{{ $lng('step2.dimension')[item.dimension] }}</div>
        </div>
        <!-- /header -->

        <!-- data -->
        <div class="kv-ptable-data" v-for="(data, d) in priceTable[pd].prices" :key="d">


          <div class="kv-ptable-data__item"
               :class="{
                'kv-ptable-data_selected': td.id === setup.price.price.id
                 || item.hours === setup.price.info.hours
                 || (d === setup.duration.index && td.m === setup.price.price.m),
                'kv-ptable-data_bordered': td.id === setup.price.price.id
              }"
              v-for="(td, m) in data" :key="m"
          >
           <label
              class="kv-ptable-data__radio"
              :class="{
                'kv-ptable-data_bordered': td.id === setup.price.price.id
              }"
              :id="`kv-ptable-data__${td.id}`"
              @click="setPrice({
                price: {price: td, info: item, index: pd},
                duration: durations[d]
                })"
              v-if="td.price"
            >
              <span class="kv-ptable-data__mark kv-custom-control">
                <input
                  type="radio"
                  name="ptable"
                  :value="td.id"
                  class="kv-ptable-data__input"
                  :checked="td.id === setup.price.price.id"
                  :disabled="!td.price"
                >
                <span class="kv-custom-control__icon-radio"></span>
              </span>

              <span class="kv-ptable-price">
                <span class="kv-ptable-price__value">{{ td.price }}</span>
                <span class="kv-ptable-price__label">€</span>
            </span>
          </label>

          </div>


        </div>
        <!-- /data -->
      </div>
    </div>



  </div>


</template>

<script>
export default {
  name: "ControlPriceTable",
  props: {
    serviceDetails: {
      type: Object,
      required: true
    },
    prices: {
      type: Object,
      required: true
    },
    setup: {
      type: Object,
      required: true
    }
  },
  emits: ["update:price", "update:duration", "showModal"],
  data() {
    return {

    }
  },
  methods: {
    /**
     * Устанавливает цену
     * @param data
     */
    setPrice(data) {
      // Если цены нет
      if (data.price.price.price === null) {
        return
      }
      this.$emit('update:duration', data.duration);
      this.$emit('update:price', data.price);
    },

    /**
     *  Возвращает Цену по id продукта
     */
    getPriceByProductId(id) {
      if (!this.prices.prices.length) {
        return null;
      }
      const price = this.prices.prices.find(_ => _.productId === id);
      if (price && 'price' in price) {
        return price.price
      } else {
        return null
      }
    },
  },
  computed: {
    /**
     * Длительность визы. Разделяем название в разные поля
     * @returns {(*&{label: *, value: *})[]}
     */
    durations() {
      return this.serviceDetails.durations.map(_ => {
        const dur = _.name.split(' ');
        return {
          ..._,
          value: dur[0],
          label: dur[1]
        }
      })
    },

    /**
     * Массив цен для таблицы
     * @returns {*[]}
     */
    priceTable() {
      const tmpArr = [];
      // Цикл по длительности процесса
      for (let pd = 0; pd < this.serviceDetails.processDurations.length; pd++) {
        const tmpArrd = [];
        // Цикл по сроку визы

        for (let d = 0; d < this.serviceDetails.durations.length; d++) {
          const tmpArrm = [];
          // Цикл по кратностям
          for (let m = 0; m < this.serviceDetails.durations[d].multiplicities.length; m++) {
            const product = this.serviceDetails.products[d][m][pd] || [];
            tmpArrm.push(
              {
                id: product,
                price: this.getPriceByProductId(product),
                m: this.serviceDetails.durations[d].multiplicities[m]
              }
            )
          }

          tmpArrd.push(
            tmpArrm
          )
        }
        //FIXME:
        tmpArr.push({
            info: {
              ...this.serviceDetails.processDurations[pd],
            },
            prices: tmpArrd
          }
        )
      }

      return tmpArr.reverse();
    }

  }
}
</script>

<style scoped>
.kv-ptable {
  display: flex;
  gap: 10px;
  --blue_bdv: rgba(0, 179, 212, 1);
  --blue_bdv_50: rgba(0, 179, 212, 0.5);
  --green_bdv: rgba(48, 197, 75, 1);
  --green_bdv_50: rgba(235, 250, 237, 1);

}

.kv-ptable-left {
  flex: 0 0 200px;
}

.kv-ptable-left__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 100px;
}

.kv-ptable-left__label-dur,
.kv-ptable-left__label-mul {
  flex: 0 0 50%;
  padding: 0 5px;
  font-size: 15px;
  line-height: 1.4;
  text-align: center;
}

.kv-ptable-left__item {
  display: flex;
  margin-bottom: 10px;
}

.kv-ptable-duration {
  flex: 0 0 100px;
  background-color: var(--blue_bdv);
  border-radius: 6px 0 0 6px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.kv-ptable-duration__value {
  font-size: 22px;
  line-height: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
}

.kv-ptable-duration__label {
  font-size: 16px;
  text-align: center;
  color: #fff;
}

.kv-ptable-duration__info {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.kv-ptable-duration__icon, .kv-ptable-duration__icon * {
  fill: #fff;
  cursor: pointer;
}

.kv-staying-chb__info-icon {
}

.kv-ptable-multiplicity {
  flex: 0 0 100px;
  border: solid 1px var(--blue_bdv_50);
  border-left-width: 0;
  border-radius: 0 6px 6px 0;
  overflow: hidden;
  background-color: #fff;
}

.kv-ptable-multiplicity__item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px var(--blue_bdv_50);
  padding: 0 5px;
}
.kv-ptable-multiplicity__item:last-child {
  border-bottom: none;
}

.kv-ptable-duration.kv-selected {
  background-color: var(--green_bdv);
}
.kv-ptable-multiplicity__item.kv-selected {
  background-color: var(--green_bdv_50);
}

/**/

.kv-ptable-right {
  flex: 1 1 auto;
  display: flex;
  gap: 10px;
  overflow: auto;
}

.kv-ptable-col {
  /*min-width: 140px;*/
  max-width: 300px;
  flex: 1 1 auto;
}

.kv-ptable-processing {
  padding: 10px 10px;
  max-height: 100px;
  text-align: center;
  border-radius: 6px;
  background-color: var(--blue_bdv);
  margin-bottom: 10px;
}

.kv-ptable-processing__title {
  font-size: 15px;
  line-height: 1.4;
  color: #fff;
}

.kv-ptable-processing__value {
  font-size: 28px;
  line-height: 1.36;
  font-weight: 700;
  color: #fff;
}

.kv-ptable-processing__label {
  font-size: 15px;
  line-height: 1.4;
  color: #fff;
}

.kv-ptable-data {
  border-radius: 6px;
  border: solid 1px var(--blue_bdv_50);
  margin-bottom: 10px;
  overflow: hidden;
}

.kv-ptable-data__item {
  height: 50px;
  border-bottom: solid 1px var(--blue_bdv_50);
  background-color: #fff;
}

.kv-ptable-data__item:last-child {
  border-bottom: none;
}

.kv-ptable-data__radio {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
}
.kv-ptable-data__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  z-index: -1;
  display: block;
}
.kv-ptable-data__mark {
  flex: 0 0 50px;
  min-width: 50px;
  max-width: 50px;
  padding: 0 10px 0 20px;
  fill: none;
  stroke: var(--blue_bdv);
  width: 20px;
  height: 20px;
}

.kv-ptable-price {
  flex: 1 1 auto;
  text-align: right;
  padding-right: 5px;
}

.kv-ptable-price__value {
  font-size: 24px;
  line-height: 1.333;
  font-weight: 700;
  margin-right: 3px;
}

.kv-ptable-price__label {
  font-size: 16px;
  line-height: 1.375;
}

.kv-ptable-processing_selected {
  background-color: var(--green_bdv);
}

.kv-ptable-data_selected {
  background-color: var(--green_bdv_50);
}
/*.kv-ptable-data_selected .kv-ptable-data__mark,*/
.kv-ptable-data__input:checked+.kv-ptable-data__mark {
  fill: var(--green_bdv);
  stroke: var(--green_bdv);
}

.kv-ptable-data_bordered {
  box-shadow: inset 0 0 0 3px var(--green_bdv);
}
</style>
