<template>
  <div class="kv-content__body">

    <!--<div class="kv-content__text" v-html="data.servicePackagesInfo"></div>-->
    <TextClamp class="kv-content__text" :text="data.servicePackagesInfo" lines="2" style="--bg: rgba(242 251 253)"></TextClamp>

    <div
      class="kv-service-pack__wrapper"
      :class="{
          'kv-service-pack_empty': data.suppServices === null || !data.suppServices.length,
          'kv-service-pack_is-no-package': data.servicePackages === null || !data.servicePackages.length,
          'kv-service-pack_package-and-service': (data.suppServices !== null && data.suppServices.length) && (data.servicePackages !== null && data.servicePackages.length)
      }">

      <!-- Tabs -->
      <div class="kv-class-tabs">
        <div class="kv-class-tabs_right">

          <!-- List -->
          <!-- kv-class-tabs__list_show-price -->
          <div class="kv-class-tabs__list" :class="{
            'kv-class-tabs__list_show-price': data.suppServices !== null && data.suppServices.length
          }">

            <!-- Class tab-->
            <div
              class="kv-class-tabs__item"
              :class="{
                        'kv-class-tab_active': packageSelected.id === pcg.id,
                        'kv-services-price_showed': packageShowed === pcg.id
                   }"
              v-for="(pcg, index) in data.servicePackages"
              @click="showPackage(pcg)"

              :key="`tab-top-${index}`">

              <div
                class="kv-class-tab"
                style="position: relative;"
                data-cq-max-w="94"
              >
                <div class="kv-class-tab__body">
                  <svg class="kv-class-tab__info"
                       @click.stop="$emit('showModal', pcg.description, pcg.name)"
                       v-if="pcg.description"
                  >
                    <use href="#kv-icons_info"></use>
                  </svg>
                  <div class="kv-class-tab__rate">
                    <svg class="kv-class-tab__star" v-for="star in (index + 1)" :key="star">
                      <use href="#kv-icons_star"></use>
                    </svg>
                  </div>
                  <div class="kv-class-tab__title">{{pcg.name}}</div>
                </div>


              </div>

              <!-- select button/price -->
              <div
                class="kv-services-price  kv-services-price_top"
                :class="{
                  'kv-services-price_active':  packageSelected.id === pcg.id,
                  'kv-services-price_active_top': packageSelected.id === pcg.id
                }"

              >
                <div class="kv-price kv-price_second kv-services-price__price">
                  <template v-if="packageSelected.id !== pcg.id"></template>
                  {{getPackagePrice(index)}}
                  <span class="kv-price__currency">€</span>
                </div>
                <div class="kv-services-price__person">{{ $lng('step4.perPerson') }}</div>
                <div
                  class="kv-services-price__btn"
                  @click="selectPackage(pcg)"
                  :id="`kv-btn-package__${pcg.id}`"
                  v-if="packageSelected.id !== pcg.id">
                  Выбрать
                </div>
              </div>
              <!-- /select button/price -->

            </div>



          </div>
          <!-- /List -->

          <!-- Tail -->
          <div class="kv-tabs-tail kv-class-tabs__tail kv-service-pack__tail"
               :class="tabClasses"
          >
            <!-- Tabs tail-->
            <div class="kv-tabs-tail__inner"
                 :style="`--kv-tabs-tail-width: calc(${tabTailLength}% + 7px); --kv-tabs-tail-offset: 50%`">
              <div class="kv-tabs-tail__line"></div>
            </div>
          </div>
          <!-- /Tail -->

        </div>
      </div>
      <!-- /Tabs -->


      <!-- Class header-->
      <div class="kv-service-pack__prices kv-service-pack__header"
           :class="{
            'kv-service-pack__header-showed': isTopButtonsShow_
            }">
        <!-- Итог для варианта с пакетами -->
        <div
          class="kv-services-price"
          :class="{
                  'kv-services-price_active':  packageSelected.id === pcg.id,
                  //'kv-services-price_showed': (packageIndex +1) === selectedTabIndex
                   'kv-services-price_showed': packageShowed === pcg.id
                }"
          v-for="(pcg, packageIndex) in data.servicePackages" :key="packageIndex"
        >
          <div class="kv-price kv-price_second kv-services-price__price">
            <template v-if="packageSelected.id !== pcg.id"></template>
            {{getPackagePrice(packageIndex)}}
            <span class="kv-price__currency">€</span>
          </div>
          <div class="kv-services-price__person">{{ $lng('step4.perPerson') }}</div>
          <div
            class="kv-services-price__btn"
            @click="selectPackage(pcg)"
            v-if="packageSelected.id !== pcg.id">
            {{ $lng('step4.select') }}
          </div>
        </div>
        <!-- /Итог для варианта с пакетами -->

        <!-- Итог для варианта без пакетов -->
        <div
          class="kv-services-price"
          :class="{
                    'kv-services-price_active':  true,
                     'kv-services-price_showed': false
                  }"
          v-if="(data.servicePackages === null || !data.servicePackages.length) && (data.suppServices !== null && data.suppServices.length)"
        >
          <div class="kv-price kv-price_second kv-services-price__price">
            {{getNoPackageServicesPrice(null)}}
            <span class="kv-price__currency">€</span>
          </div>
          <div class="kv-services-price__person">{{ $lng('step4.perPerson') }}</div>
        </div>
        <!-- /Итог для варианта без пакетов -->
      </div>

      <!-- Services -->
      <div class="kv-services kv-services-showed">
        <!-- Services item-->
        <div class="kv-services__item"  v-for="(item, i) in data.suppServices" :key="item.id">
          <div class="kv-service kv-services__item-inner">
            <div class="kv-service__main">
              <div class="kv-service__title">{{item.name}}</div>
              <!--<div class="kv-service__text" v-html="item.description"></div>-->
              <TextClamp class="kv-service__text" :text="item.description" lines="2"></TextClamp>
            </div>
            <div class="kv-service__aside">
              <div class="kv-price kv-service__price">
                {{item.price}}
                <span class="kv-price__currency">€</span>
              </div>

              <div class="kv-service__caption">{{ $lng('step4.perPerson') }}</div>
            </div>
          </div>
          <!-- Class item-->
          <div
            class="kv-class__item"
            :class="{
                'kv-class__item_active': packageSelected.id === pcg.id,
                'kv-class__item_showed': packageShowed === pcg.id,
                'kv-class__item_checked': serviceSelected.indexOf(item.id) !== -1,
                'kv-class__item_add': isIncluded(item.id, packageIndex)
              }"
            v-for="(pcg, packageIndex) in data.servicePackages" :key="packageIndex">

            <template v-if="isIncluded(item.id, packageIndex)">
              <svg class="kv-class__check">
                <use href="#kv-icons_check"></use>
              </svg>
              <div class="kv-class__caption">{{ $lng('step4.included') }}</div>
            </template>

            <template v-else>


              <label class="kv-switcher kv-class__switcher test1" :id="`kv-btn-suppService__${item.id}`">
                <input class="kv-switcher__input"
                       type="checkbox"
                       name="suppService"
                       :value="item.id"
                       v-model="serviceSelected"
                       @change="suppServiceChange($event.target.value)"
                >
                <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" :data-kv_on="$lng('step4.added')" :data-kv_off="$lng('step4.add')"></div>
                      <div class="kv-switcher__box">
                          <svg class="kv-switcher__icon">
                            <use href="#kv-icons_check"></use>
                          </svg>
                          <div class="kv-switcher__mark"></div>
                      </div>
                    </span>
              </label>


            </template>

          </div>

          <!-- no service package -->
          <div
            class="kv-class__item"
            :class="{
                'kv-class__item_active': true,
                'kv-class__item_checked': serviceSelected.indexOf(item.id) !== -1
              }"
            v-if="(data.servicePackages === null || !data.servicePackages.length) && (data.suppServices !== null && data.suppServices.length)"
          >



              <label class="kv-switcher kv-class__switcher test2" :id="`kv-btn-suppService__${item.id}`">
                <input class="kv-switcher__input"
                       type="checkbox"
                       name="suppService"
                       :value="item.id"
                       v-model="serviceSelected"
                       @change="suppServiceChange($event.target.value)"
                >
                <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" :data-kv_on="$lng('step4.added')" :data-kv_off="$lng('step4.add')"></div>
                      <div class="kv-switcher__box">
                          <svg class="kv-switcher__icon">
                            <use href="#kv-icons_check"></use>
                          </svg>
                          <div class="kv-switcher__mark"></div>
                      </div>
                </span>
              </label>


          </div>
          <!--/ -->
        </div>
        <!-- /Services item-->
      </div>
      <!-- /Services -->

      <!-- footer -->
      <div class="kv-service-pack__prices kv-service-pack__footer">
        <!-- Итог для варианта с пакетами -->
        <div
          class="kv-services-price"
          :class="{
                  'kv-services-price_active':  packageSelected.id === pcg.id,
                  //'kv-services-price_showed': (packageIndex +1) === selectedTabIndex
                   'kv-services-price_showed': packageShowed === pcg.id
                }"
          v-for="(pcg, packageIndex) in data.servicePackages" :key="packageIndex"
        >
          <div class="kv-price kv-price_second kv-services-price__price">
            <template v-if="packageSelected.id !== pcg.id"></template>
            {{getPackagePrice(packageIndex)}}
            <span class="kv-price__currency">€</span>
          </div>
          <div class="kv-services-price__person">{{ $lng('step4.perPerson') }}</div>
          <div
            class="kv-services-price__btn"
            @click="selectPackage(pcg)"
            v-if="packageSelected.id !== pcg.id">
            {{ $lng('step4.select') }}
          </div>
        </div>
        <!-- /Итог для варианта с пакетами -->

        <!-- Итог для варианта без пакетов -->
        <div
          class="kv-services-price"
          :class="{
                    'kv-services-price_active':  true,
                     'kv-services-price_showed': false
                  }"
          v-if="(data.servicePackages === null || !data.servicePackages.length) && (data.suppServices !== null && data.suppServices.length)"
        >
          <div class="kv-price kv-price_second kv-services-price__price">
            {{getNoPackageServicesPrice(null)}}
            <span class="kv-price__currency">€</span>
          </div>
          <div class="kv-services-price__person">{{ $lng('step4.perPerson') }}</div>
        </div>
        <!-- /Итог для варианта без пакетов -->

      </div>
      <!-- /footer -->

    </div>

  </div>
</template>

<script>
import * as constants from "@/helpers/constants";
import TextClamp from "@/components/UI/TextClamp.vue";
export default {
  name: "controlPackages",
  components: {
    TextClamp
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    selectedServicePackage: {
      type: Object,
      required: true
    },
    selectedSuppServices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // packageSelected: {id: null }, //this.selectedServicePackage, //Object.assign({}, this.selectedServicePackage), //new constants.ServicePackage(),
      // packageShowed: null,
      // serviceSelected: [],

      packageSelected: Object.assign({}, this.selectedServicePackage), //this.selectedServicePackage, //Object.assign({}, this.selectedServicePackage), //new constants.ServicePackage(),
      packageShowed: this.selectedServicePackage.id,
      //serviceSelected: this.selectedSuppServices.map(_ => _.id),
      isTopButtonsShow_: false
    }
  },
  methods: {
    /**
     * Включена ли услуга по умолчанию в сервисный пакет
     *
     */
    isIncluded(serviceId, packageIndex) {
      return this.data.servicePackages[packageIndex].includedServices.indexOf(serviceId) >= 0
    },
    /**
     * Возвращает цену сервис-пакета
     * @param {Number} packageIndex - порядковый номер пакета
     * @return {string}
     */
    getPackagePrice(packageIndex) {
      //console.log(`pi=${packageIndex} sel=${this.selectedTabIndex} abs=${this.getSelectedServicesPrice(packageIndex)}`)

      let price = 0;
      let priceCurrent = 0;
      if (packageIndex >= 0) {
        price = this.data.servicePackages[packageIndex].price + this.getSelectedServicesPrice(packageIndex);
        if (this.selectedTabIndex >= 1 && (packageIndex !== (this.selectedTabIndex - 1))) {
          priceCurrent = this.data.servicePackages[this.selectedTabIndex - 1].price + this.getSelectedServicesPrice(this.selectedTabIndex - 1);
        }
      }
      const diffPrice = price - priceCurrent;
      return diffPrice > 0 && (packageIndex !== this.selectedTabIndex - 1) ? `+ ${diffPrice}` : diffPrice;
    },
    /**
     * Сумма стоимостей добавленных услуг в пакет
     * @param {Number} packageIndex - порядковый номер пакета
     */
    getSelectedServicesPrice(packageIndex) {
      let sum = 0;
      // Услуги, которые НЕ включены, т.е. платные

      const paidServices = this.serviceSelected.filter(item => {
        return  !this.data.servicePackages[packageIndex].includedServices.includes(item)
      })


      //Сумма платных
      if (this.data.suppServices !== null && this.data.suppServices.length) {
        this.data.suppServices.forEach(item => {
          if (paidServices.includes(item.id)) {
            sum = sum + item.price;
          }
        })
      }
      return sum;
    },
    /**
     * Сумма стоимостей услуг вне пакета
     */
    getNoPackageServicesPrice() {
      let sum = 0;
      const selectedSuppServicesIds = this.selectedSuppServices.map(_ => _.id);
      //Сумма платных
      if (this.data.suppServices !== null) {
        this.data.suppServices.forEach(item => {
          if (selectedSuppServicesIds.includes(item.id)) {
            sum = sum + item.price;
          }
        })
      }
      return sum;
    },
    /**
     * Выбрать сервисный пакет
     * @param {Object} pcg - выбранный пакет
     */
    selectPackage(pcg) {
      this.packageSelected = pcg;
      if (this.packageShowed === null) {
        this.packageShowed = pcg.id
      }
      this.$emit('changePackage',pcg);
      this.$emit('stepDataChange', 4);

      this.$emit('calculate');
    },
    /**
     * Показать пакет
     */
    showPackage(pcg) {
      this.packageShowed = pcg.id;
    },
    /**
     * Выбрать услугу в  пакете
     * @param value
     */
    suppServiceChange(value) {
      const suppServices = this.data.suppServices.filter(_ => {
         return _.id === value
      });

      this.$emit('changeSuppService',suppServices[0]);
      this.$emit('stepDataChange', 4);
      this.$emit('calculate');
    },
    /**
     * Показываем ли кнопки под табами
     */
    isTopButtonsShow() {
      // высота экрана
      const windowHeight = document.documentElement.clientHeight;

      // высота шапки
      const headerHeight = document.querySelector('#kv-app .kv-header').getBoundingClientRect().height;

      // Паддинги сверху, снизу
      const addHeight = 15 + 15;

      // Высота таблицы
      const infoHeight = document.querySelector('.kv-service-pack__wrapper') ? document.querySelector('.kv-service-pack__wrapper').getBoundingClientRect().height : 0;

      const freeHeight = windowHeight - headerHeight - addHeight;

      const visibleTopButtons = !(freeHeight >= infoHeight);
      // console.log(`wH=${windowHeight}`);
      // console.log(`hH=${headerHeight}`);
      // console.log(`iH=${infoHeight}`);
      // console.log(``);
      // console.log(`fH=${freeHeight}`);
      // console.log(visibleTopButtons)
      //return visibleTopButtons
      this.isTopButtonsShow_ = visibleTopButtons
    }

  },
  computed: {
    serviceSelected: {
      get () {
        return this.selectedSuppServices.map(_ => _.id)
      },
      set (value) {
        //this.suppServiceChange(value[0])
      },
    },
    selectedTabIndex() {
      let selectedTab = 1;
      if (this.packageSelected.id === null) {
        return 1
      }
      if (this.data.servicePackages !== null && this.data.servicePackages.length) {
        selectedTab = this.data.servicePackages.findIndex(item => item.id === this.packageSelected.id) + 1
      }
      return selectedTab
    },

    showedTabIndex() {
      let showedTab = 1;
      // if (this.packageShowed === null) {
      //   return null
      // }
      if (this.data.servicePackages !== null && this.data.servicePackages.length) {
        showedTab = this.data.servicePackages.findIndex(item => item.id === this.packageShowed) + 1;
        if (showedTab) {
          return showedTab
        }
      }
      return showedTab
    },

    tabClasses() {
      if (this.data.servicePackages === null || !this.data.servicePackages.length) {
        return {
        }
      }

      let isLeft = false;
      let isRight = false;
      let isCenter = false;
      //let tabsHalfIndex;

      const tabCount = this.data.servicePackages.length;
      const selectedTabIndex = this.showedTabIndex ? this.showedTabIndex : this.selectedTabIndex;
      const isTabsEven = tabCount % 2 === 0;


      // Четное кол-во табов
      if (isTabsEven) {
        let tabsHalfIndex = tabCount / 2 + 0.5;

        if (selectedTabIndex < tabsHalfIndex) {
          isLeft = true
        } else {
          isRight = true;
        }
      } else {
        // Нечетное кол-во табов
        let tabsHalfIndex = (tabCount / 2) + 0.5;
        if (selectedTabIndex < tabsHalfIndex) {
          isLeft = true
        }
        if (selectedTabIndex > tabsHalfIndex) {
          isRight = true;
        }
        if (selectedTabIndex === tabsHalfIndex) {
          isCenter = true;
        }
      }

      return {
        'kv-tabs-tail_left': isLeft,
        'kv-tabs-tail_right': isRight,
        'kv-tabs-tail_center': isCenter
      }
    },
    //Длинна стрелки под табами
    tabTailLength() {
      if (this.data.servicePackages === null || !this.data.servicePackages.length) {
        return 0
      }

      const tabCount = this.data.servicePackages.length;
      //const selectedTabIndex = this.selectedTabIndex;
      const selectedTabIndex = this.showedTabIndex ? this.showedTabIndex : this.selectedTabIndex;

      const isTabsEven = tabCount % 2 === 0;
      let tabsHalfIndex;
      let offset;
      const tabWidth = 100 / tabCount;
      //console.log(this.selectedTabIndex);
      if (isTabsEven) {
        tabsHalfIndex = (tabCount / 2) + 0.5;
        offset =  Math.abs(selectedTabIndex - tabsHalfIndex);
        return tabWidth * offset
      } else {
        tabsHalfIndex = (tabCount / 2) + 0.5;
        offset =  Math.abs(selectedTabIndex - tabsHalfIndex);
        return tabWidth * offset
      }
    },

  },
  mounted(){
    //this.$emit('active');
    this.packageSelected = Object.assign({}, this.selectedServicePackage);
    this.packageShowed = this.packageSelected.id
    //this.serviceSelected = this.selectedSuppServices.map(_ => _.id);
    // Выбор первого возможного сервис-пакета, если он еще не выбран
    if (this.data.servicePackages !== null && this.data.servicePackages.length && this.packageSelected.id === null) {
      //this.selectPackage(this.data.servicePackages[0])
    }
    // обрезка услуг для теста FIXME:
    //this.data.suppServices = this.data.suppServices.slice(0,3)
    setTimeout(() => {this.isTopButtonsShow()}, 100);

    window.addEventListener('resize', () => {
      //console.log('res')
      this.isTopButtonsShow()
    })


  }
}
</script>

<style scoped>
.kv-app[cq-max-w-991] .kv-class-tabs__item .kv-services-price__btn {
  /*display: none;  FIXME: нужно ли? */
}

/* ЕСЛИ НЕТ ПАКЕТОВ */
/* скрыть табы */
.kv-service-pack_is-no-package .kv-class-tabs {
  display: none;
}
/* Скрыть показать чекбоксы (почему то они скрыты были) */
.kv-app.kv-app[cq-max-w-991] .kv-service-pack_is-no-package  .kv-class .kv-class__item {
  /* display: flex;  FIXME: нужно ли? */
}
/* /ЕСЛИ НЕТ ПАКЕТОВ */

/* fix высоты блоков с одной кратностью и блоком с недоступным процессом */
.kv-app .kv-processing-day .kv-processing-day__text {
  padding: 16px 10px;
}




</style>
