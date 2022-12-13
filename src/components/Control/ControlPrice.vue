<template>
  <div  class="kv-content__body">

    <div class="kv-calc-block" v-if="serviceDetails.id" style="margin-top: 17px;">


      <!-- Processing days-->
      <div
          class="kv-processing-days kv-processing-days_slide-"
          v-if=" prices.state === 0">
        <carousel
            :settings="sliderPrice"
            :breakpoints="sliderPrice.breakpoints"
            ref="hooperPrice"
            :class="{
              'kv-processing-days__inner-showed-action-label': setup.redirectUrl && setup.mode === 'price' && setup.price.price.id
          }">

          <!-- day -->
          <slide
               v-for="(item, i) in prepareProductsPricesArr"
               :key="i"
               :index="i"
          >
            <div class="kv-processing-days__item">
              <div class="kv-processing-day" :class="{
                'kv-processing-day_active': isActiveCurrentPriceBlock(i),
                'kv-processing-day_disabled': !isDisabledCurrentPrice(i),
                'kv-processing-day_blocked': isBlockedCurrentPrice(i),
                'kv-processing-day_error': error.price,
                'kv-processing-day_long-price': isHasLongPrice
              }">

                <div class="kv-processing-day__header">
                  <div class="kv-processing-day__title">{{ $lng('step2.processingDuration') }}</div>
                  <div class="kv-processing-day__nuber">{{item.info.quantity}}</div>
                  <div class="kv-processing-day__subtitle">{{ $lng('step2.dimension')[item.info.dimension] }}</div>
                </div>

                <div class="kv-processing-day__body">

                  <!-- item -->
                  <div class="kv-processing-day__item" v-for="(price, j) in item.prices" :key="`price-${j}`">

                    <div class="kv-processing-day-chb" @click="setPrice({price: price, info: item.info, index: i})" :id="`kv-btn-product__${price.id}`">
                      <span class="kv-processing-day-chb__inner  kv-custom-control">
                        <input type="radio"
                               name="kv-processing-day-chb"
                               aria-label="checkbox"
                               :checked="price.id === setup.price.price.id"
                               :disabled="price.price === null"
                        >
                        <span class="kv-processing-day-chb__box kv-custom-control__icon-radio"></span>
                        <span class="kv-processing-day-chb__caption">
                          <span class="kv-processing-day-chb__text">
                            <template v-if="price.m !== 'm'">{{price.m}}-{{ $lng('step2.multiplicity') }}</template>
                            <template v-else>{{ $lng('step2.multiplicities') }}</template>
                          </span>
                          <span class="kv-processing-day-chb__title">
                            <template  v-if="price.price !== null">{{formatter.priceFormat(price.price)}}</template>
                            <!-- &minus -->
                            <template v-else><span v-html="constants.dashSymbol"></span> </template>
                            <span> €</span>
                          </span>
                        </span>
                      </span>
                    </div>

                  </div>
                  <!-- /item -->

                  <a
                      class="kv-processing-day__action-label"
                      :href="`${setup.redirectUrl}?product=${setup.price.price.id}`"
                      v-if="isActiveCurrentPriceBlock(i)"
                  >
                    {{ $lng('step2.order') }}
                  </a>

                  <div
                      class="kv-processing-day__text kv-user-text"
                      v-html="prices.stateDescription"
                      v-if="!isDisabledCurrentPrice(i)">
                  </div>


                </div>

              </div>
            </div>
          </slide>
          <!-- day -->
          <template  #addons="{ currentSlide }">
            <div class="kv-slider-navigation" v-show="currentSlide !== -1">
              <navigation/>
            </div>
            <div class="kv-slider-pagination">

            </div>
          </template>
        </carousel>
      </div>
      <!-- /Processing days-->


    </div>


  </div>
</template>

<script>

import * as constants from "@/helpers/constants";
import * as formatter from "@/helpers/format";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "ControlPrice",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
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
  emits: ["update:price", "showModal"],
  data() {
    return {
      constants,
      formatter,
      sliderPrice: {
        modelValue: this.setup.price.index === null ? 0 : this.setup.price.index,
        itemsToShow: 1.20,
        snapAlign: "center",
        breakpoints: {
          600: {itemsToShow: 2, snapAlign: "start"},
          900: {itemsToShow: 3, snapAlign: "start"},
          1100: {itemsToShow: 4, snapAlign: "start"}
        }
      },
      // Флаги ошибок
      error: {
        price: false
      }
    }
  },
  methods: {
    /**
     * Сбрасывает цену
     */
    /*
    resetPrice() {
      this.selectedPriceId = null;
      this.$emit('update:price', new constants.PriceDefault())
    },
*/
    /**
     * Устанавливает цену
     * @param data
     */
    setPrice(data) {
      // Если цены нет
      if (data.price.price === null) {
        return
      }
      //this.selectedPriceId = data.price.id;
      this.error.price = false;
      this.$emit('update:price', data);
    },

    /**
     * Выбрать длительность пребывания
     * @param item - объект выбранной продолжительности
     */
    selectDurations(item) {
      //this.resetPrice();
      this.error.duration = false;
      this.$emit('update:duration', item);
    },


    /**
     * Текущий блок процесса активный?
     * @param {Number} index - индекс блока процесса
     */
    isActiveCurrentPriceBlock(index) {
      if (!this.setup.price.price.id) {
        return false
      }
      const prices = this.prepareProductsPricesArr[index].prices;
      return prices.findIndex(_ => {
        return _.id === this.setup.price.price.id
      }) >= 0;
    },

    /**
     * Текущий блок цен доступен для выбора по сроку обработки
     */
    isDisabledCurrentPrice(index) {
      const pricesBlock = this.prepareProductsPricesArr[index];
      return !(this.prices.minProcessDuration > 0 &&
              pricesBlock.info.hours < this.prices.minProcessDuration
              )
    },

    /**
     * Текущий блок цен заблокирован для выбора по текущей цене = null
     */
    isBlockedCurrentPrice(index) {
      if (this.setup.price.price.id === null) {
        return false
      }

      const pricesBlock = this.prepareProductsPricesArr[index];
      const blockedIndex =  pricesBlock.prices.findIndex(item => {
        if (item.id === this.setup.price.price.id && item.price == null) {
          return true
        }
      })
      return blockedIndex >= 0

    },

    /**
     *  Возвращает Цену по id продукта
     *  TODO: подгрузить цену
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

    /**
     * Проверка шага на заполненность срока пребывания и цены
     */
    checkForm() {
      this.error.duration = this.setup.duration.index === null;
      this.error.price = this.setup.price.index === null && this.setup.duration.index !== null;
    },

    /**
     * Возвращает id единственно возможной цены для выбора, либо false, если доступно несколько вариантов цен
     */
    isSinglePrice() {
      let priceCount = 0;
      let id = null;
      let priceObject = {
        info: {},
        price: {},
        index: null
      };

      for(let i = 0; i < this.prepareProductsPricesArr.length; i++) {
        // Не проверяем блоки цен недоступные по сроку обработки
        if (this.prepareProductsPricesArr[i].info.hours < this.prices.minProcessDuration) {
          continue
        }
        // Считаем кол-во доступных цен и id первой
        this.prepareProductsPricesArr[i].prices.forEach((prices, idx) => {
          if (prices.price) {
            priceCount++;
            if (!id) {
              id = prices.id
              priceObject = {
                price: this.prepareProductsPricesArr[i].prices[idx],
                info: this.prepareProductsPricesArr[i].info,
                index: i
              }
            }
          }
        });

        // Если нашли больше одной - это не наш случай
        if (priceCount > 1) {
          break
        }
      }
      if (priceCount === 1) {
        console.log(priceObject)
        this.setPrice(priceObject);
      }
      return (priceCount === 1) ? id : false
    }


  },
  computed: {
    priceModel: {
      get() {
        return this.setup.price.price.id
      },
      set (value) {

        //this.setPrice({"info":{"dimension":"d","duration":"Werktage","hours":120,"quantity":5},"price":{"id":"bb39fd21-0180-0002-005d-660d98f98164","m":"2","price":285}});

      },
    },


    /**
     * Возвращает кол-во кратностей выбранной продолжительности
     */
    selectedDurationsMultipliciesLength() {
      if (this.setup.duration.index === null) {
        return 0
      }
      return this.setup.duration.multiplicities.length
    },

    /**
     * Возвращает массив id цен для выбранных параметров
     */
    processesArr() {
      return this.serviceDetails.products[this.setup.duration.index] || []
    },

    /**
     * Возвращает готовый массив процессов с ценами
     */
    prepareProductsPricesArr() {
      const tmpArr = [];
      // Цикл по длительности обработки
      for (let d = 0; d < this.serviceDetails.processDurations.length; d++) {

        const tmpArr2 = [];
        // Цикл по  кратности
        for (let m = 0; m < this.selectedDurationsMultipliciesLength; m++) {

          const product = this.processesArr[m][d];
          tmpArr2.push(
              {
                id: product,
                price: this.getPriceByProductId(product),
                m: this.setup.duration.multiplicities[m]
              }
          )
        }
        //FIXME:
        tmpArr.push({
              info: {
                ...this.serviceDetails.processDurations[d],
                //duration: this.constants.processDurationsToWords(this.serviceDetails.processDurations[d].dimension)
                //duration: this.$lng("step2.dimension." + this.serviceDetails.processDurations[d].dimension)
                //duration: this.$lng("step2.dimension." + this.serviceDetails.processDurations[d].dimension)
              },
              prices: tmpArr2
            }
        )
      }

      return tmpArr.reverse();
    },
    /**
     * Возвращает наличие прайса с большим кол-м символов
     */
    isHasLongPrice() {
      const MAX_LENGTH = 4;
      let result = false;
      for (let d = 0; d < this.serviceDetails.processDurations.length; d++) {
        // Цикл по длительности обработки
        for (let m = 0; m < this.selectedDurationsMultipliciesLength; m++) {
          const product = this.processesArr[m][d];
          const price = this.getPriceByProductId(product);
          if (price && price.toString().replace(',', '').replace('.', '').length > MAX_LENGTH) {
            result = true;
            break;
          }
        }
        if (result) {
          break
        }
      }
      return result
    }

  },

}
</script>

<style>

.kv-app .kv-processing-days__item {
  height: 100%;
}



/* поправить в исходнике на */
.kv-app .kv-processing-days__item {
  flex: 1 0 auto;
  padding: 0 10px;
}

.kv-app .kv-processing-days__item:first-child:last-child {
  max-width: 100%;
  width: 100%;
}

/* /поправить в исходнике на */



.kv-app .kv-staying-chb {
  width: 100%;
  justify-content: space-between;
}

.kv-app .kv-processing-day_long-price .kv-processing-day-chb__caption {
  flex-wrap: wrap;
}
.kv-app  .kv-processing-day_long-price .kv-processing-day-chb__caption > span {
  width: 100%;
  flex: 1 0 100%;
}

</style>
