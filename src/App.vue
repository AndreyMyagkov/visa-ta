<script setup></script>

<script>
import * as network from "@/helpers/network";
import * as constants from "@/helpers/constants";
import * as formatter from "@/helpers/format";

import StatusBar from "@/components/StatusBar/StatusBar.vue";
import StatusBarInfo from "@/components/StatusBar/StatusBarInfo.vue";
import StatusBarCart from "@/components/StatusBar/StatusBarCart.vue";

import iconSprite from "./components/icons/IconSprite.vue";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";

//import 'vue-select/dist/vue-select.css';
import TheBlock from "@/components/TheBlock.vue";

import vSelect from "vue-select";

import ControlCountries from "@/components/Control/ControlCountries.vue";
import ControlServices from "@/components/Control/ControlServices.vue";
import ControlDeliveryType from "@/components/Control/ControlDeliveryType.vue";

// FIXME:
import ControlTourists from "@/components/Control/ControlTourists.vue";
import ControlTouristsItem from "@/components/Control/ControlTouristsItem.vue";

import ControlNationality from "@/components/Control/ControlNationality.vue";
import ControlTouristsGroup from "@/components/Control/ControlTouristsGroup.vue";

import ControlDuration from "@/components/Control/ControlDuration.vue";

import ControlPrice from "@/components/Control/ControlPrice.vue";

import ControlPostal from "@/components/Control/ControlPostal.vue";

import ControlPackages from "@/components/Control/ControlPackages.vue";


//import mockPrices from "@/mock/prices";
//import mockServiceDetails from "@/mock/serviceDetails";
//import productDetails from "@/mock/productDetails";
//import mockPostalServices from "@/mock/postalServices";
//import pickupPoints from "@/mock/pickupPoints";

import ControlDeliveryAddress from "@/components/Control/ControlDeliveryAddress.vue";
import ReviewTotal from "@/components/ReviewTotal.vue";
import ControlPickupPoints from "@/components/Control/ControlPickupPoints.vue";
import ControlPriceTable from "@/components/Control/ControlPriceTable.vue";

import KvAlert from "@/components/KvAlert.vue";
import StatusBarInfoBottom from "@/components/StatusBar/StatusBarInfoBottom.vue"


export default {
  name: "App",
  components: {
    ControlPriceTable,
    ControlPickupPoints,
    ReviewTotal,
    ControlDeliveryAddress,
    StatusBarInfo,
    StatusBar,
    StatusBarCart,
    TheBlock,
    iconSprite,
    Loading,
    VueFinalModal,
    ModalsContainer,
    vSelect,
    ControlCountries,
    ControlServices,
    ControlTourists,
    ControlTouristsItem,
    ControlNationality,
    ControlTouristsGroup,
    ControlDuration,
    ControlPrice,
    ControlPackages,
    ControlDeliveryType,
    ControlPostal,
    KvAlert,
    StatusBarInfoBottom,

  },
  data: () => {
    return {
      uniqueKey: Date.now(),
      isMobile: false,
      isModalShow: false,
      resetStepData: true, // можно ли сбрасывать данные шагов
      modal: {
        title: "",
        content: "",
      },
      confirm: {
        isShow: false,
        title: "",
        content: "",
        confirmYES: undefined,
        confirmNO: undefined,
      },
      isLoading: false,

      steps: [
        {
          crumb: "Buchungsauftrag",
          //header: this.$lng('step1.header'),//'Buchungsauftrag',
          icon: "step_1",
          showModalWhenChangeVisa: true, // Флаг показа модалки, при возврате на первый шаг и смене визы
          isOpen: true // Флаг раскрытия блока кнопкой
        },
        {
          crumb: "Aufenthaltsdauer",
          // header: 'Расчет примерной стоимости для одного человека',
          icon: "step_2",
          allowOrder: false,
          showModalCorrectParticipant: true,
          priceMode: "cards"
        },
        {
          crumb: "Заполнение данных о туристах",
          //header: 'Заполнение данных',
          icon: "step_3",
          isValid: false, // флаг валидности шага, флаг показа попапа при изменении данных
          allowOrder: false, // флаг возможности заказа виз
          isActive: false, // загружены все данные
          defaultNationality: new constants.NationalityDefault(), // Дефолтная национальность
        },
        {
          crumb: "Дополнительные услуги",
          //header: 'Дополнительные услуги',
          icon: "step_4",
        },
        {
          crumb: "Информация о заказчике",
          // header: 'Информация о заказчике',
          icon: "step_5",
          isValid: false,
        },
        {
          crumb: "Способ отправки",
          // header: 'Способ отправки',
          icon: "step_6",
        },
        {
          crumb: "Проверка данных",
          // header: 'Проверка данных',
          icon: "step_7",
        },
        {
          crumb: "Способ оплаты",
          //header: 'Способ оплаты',
          icon: "step_8",
          isValid: false,
        },
      ],

      currentStep: 1,
      // Справочники
      listCountries: [], // Страны
      listNationalities: [], // Гражданства
      listPopularNationalities: [], // Популярные гражданства

      services: [],
      serviceGroups: [],
      serviceDetails: {}, //mockServiceDetails, //{},
      prices: {}, //mockPrices, //{},
      addressingCountries: [],
      pickupPoints: [], //pickupPoints.points, //[],
      postalServices: [],
      paymentMethods: [],

      productDetails: {
        id: null,
        servedResidenceRegions: null,
        discounts: null,
        servicePackages: null,
        suppServices: null
      },
      //productDetails: productDetails.product,

      serviceGroupsPrepared: [],

      // Выбранное
      selectedCountry: new constants.CountryDefault(),
      selectedService: new constants.ServicesDefault(),
      selectedServiceGroup: new constants.ServicesDefault(),

      calculate: new constants.calculateDefault(),

      selectedDuration: new constants.DurationDefault(),
      selectedPrice: new constants.PriceDefault(),

      tourists: [], //new constants.Toursit()
      touristGroups: [], // Группы национальностей/количества

      selectedServicePackage: new constants.ServicePackage(),
      selectedSuppServices: [],

      customer: new constants.CustomerDefault(),
      delivery: new constants.DeliveryDefault(),

      selectedPostalService: new constants.PostalServiceDefault(),

      paymentType: null,
      paymentData: {
        iban: "",
        bic: "",
      },

      CONFIG: {
        clientId: null,
        nationality: null,
        residenceRegions: null,
        country: null,
        serviceGroup: null,
        service: null,
        product: null,
        API_URL:
          "https://apisrv.ideo-software.com/Ideo/KoenigVN/Web/api/OrderPortal/",
        lng: "de",
        order: "",
        agnr: null,
      },
    };
  },

  methods: {
    /**
     * Добавляет группу туристов
     * @param data
     */
    addTouristsGroup(data) {
      // Проверка на то, что такой группы уже нет
      if (this.touristGroups.find(item => item.nationality.codeA2 === data.nationality.codeA2)) {
        return
      }
      this.touristGroups.push({
        nationality: data.nationality,
        quantity: data.quantity,
      });
      // FIXME: Загружаем цены, для версии 1 по первой национальности
      //if (this.touristGroups.length === 1) {
      this.onChangeTouristsGroup();
      //}
    },
    /**
     * Изменение кол-ва в группе туристов
     * @param data
     */
    changeTouristsGroupCount(data) {
      // this.touristGroups
      //     .find(_ => _.nationality.codeA2 === data.nationality.codeA2)
      //     .quantity = data.quantity
      this.touristGroups[data.index].quantity = data.quantity;
      this.onChangeTouristsGroup();
    },
    /**
     * Удаление группы туристов
     * @param codeA2
     */
    removeTouristsGroup(codeA2) {
      const index = this.touristGroups
        .findIndex(_ => _.nationality.codeA2 === codeA2);
      this.touristGroups.splice(index, 1);
      this.onChangeTouristsGroup();
    },
    /**
     * Загружает прайсы при обновлении групп туристов
     * Для версии 1 делаем для 1-й группы
     * @returns {Promise<void>}
     */
    async onChangeTouristsGroup() {
      await this.loadPrices();
      await this.preselectSingleDuration();
      await this.sendCalculateAndValidate();
    },
    /**
     * Инициирует виджет, проверяет входные данные
     */
    async initiateWidget() {
      const __KV_CONFIG = this.$__KV_CONFIG;
      // eslint-disable-next-line no-undef
      if (__KV_CONFIG && __KV_CONFIG.clientId) {
        // eslint-disable-next-line no-undef
        this.CONFIG = Object.assign(this.CONFIG, __KV_CONFIG);
      } else {
        return false;
      }

      // eslint-disable-next-line no-undef
      if (__KV_CONFIG && __KV_CONFIG.css) {
        // eslint-disable-next-line no-undef
        const head = document.head;
        const link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = path;
        head.appendChild(link);
      }

      return true;
    },

    updatePaymentType(data) {
      this.paymentType = data;
    },
    updatePaymentData(data) {
      this.paymentData = data;
    },

    /**
     * Установить страну из конфига модуля
     */
    setDefaultCountry() {
      if (this.CONFIG.country && !this.selectedCountry.codeA3) {
        const country = this.listCountries.find(
          (_) => _.codeA3 === this.CONFIG.country
        );
        if (country) {
          this.countryChange(country);
        }
      }
    },

    /**
     * Установить группу сервисов из конфига модуля
     */
    setDefaultServiceGroup() {
      if (this.CONFIG.serviceGroup && !this.selectedServiceGroup.id) {
        const serviceGroup = this.serviceGroups.find(
          (_) => _.id === this.CONFIG.serviceGroup
        );
        if (serviceGroup) {
          this.selectVisaType(serviceGroup);
          return true;
        }
      }
      return false;
    },

    /**
     * Установить сервис из конфига модуля
     */
    setDefaultService() {
      if (this.CONFIG.service && !this.selectedService.id) {
        const service = this.services.find((_) => _.id === this.CONFIG.service);
        if (service) {
          this.selectVisaType(service);
          return true;
        }
      }
      return false;
    },

    /**
     * Установить продукт из конфига модуля
     */
    async setDefaultProduct() {
      await this.loadCountries();

      this.selectedPrice.price.id = this.CONFIG.product;
      await this.loadProductDetails();

      // установить страну
      const country = this.countries.find(
        (_) => _.codeA3 === this.productDetails.countryA3
      );
      if (country) {
        await this.countryChange(country);
      }

      // установить типы виз
      const service = this.services.find(
        (_) => _.id === this.productDetails.serviceId
      );
      if (service) {
        // установить группу виз
        if (service.srvGrpId) {
          const serviceGroup = this.serviceGroups.find(
            (_) => _.id === service.srvGrpId
          );
          if (serviceGroup) {
            this.selectVisaType(serviceGroup);
          }
        }

        await this.selectVisaType(service);
      }

      // Повторно ставим продукт, т.к. он сбрасывается при смене типа виз
      this.selectedPrice.price.id = this.CONFIG.product;

      await this.loadStep2Data();
      // Список гражданств
      //await this.loadNationalities();
      // Детали продукта
      //await this.loadServiceDetails();

      // Установить длительность
      let duration = this.serviceDetails.durations.find(
        (_) => _.name === this.productDetails.duration
      );

      if (duration === undefined) {
        duration = new constants.DurationDefault();
      }
      this.updateDuration(duration);

      /*
      const selectedDurationIndex = this.serviceDetails.durations.findIndex(_ => _.name === this.productDetails.duration);
      if (selectedDurationIndex !== -1) {
        const duration = this.serviceDetails.durations[selectedDurationIndex];
        this.updateDuration({
          ...duration,
          index: selectedDurationIndex
        });
      }
      */

      // Повторно ставим продукт, т.к. он сбрасывается при смене длительности
      this.selectedPrice.price.id = this.CONFIG.product;

      let priceValue = null;
      const price = this.prices.prices.find(
        (_) => _.productId === this.selectedPrice.price.id
      );
      if (price && "price" in price) {
        priceValue = price.price;
      }

      const priceData = {
        info: {
          dimension: this.productDetails.processDuration.dimension,
          //duration: constants.processDurationsToWords(this.productDetails.processDuration.dimension),
          hours: this.productDetails.processDuration.hours,
          quantity: this.productDetails.processDuration.quantity,
        },
        price: {
          id: this.productDetails.id,
          m: this.productDetails.multiplicity,
          price: priceValue,
        },
      };
      // Установить кратность, цену
      this.updatePrice(priceData);

      // await this.sendCalculateAndValidate();
      this.currentStep = 3;
      return false;
    },

    /**
     * Пропуск шага
     */
    skipStep(step) {
      // Пропуск шага 4, если нет пакетов и услуг
      if (step === 4) {
        /*
        if (this.calculate.calculation.servicePackage === null && this.calculate.calculation.suppServices === null) {
          return true
        }
        if (this.calculate.calculation.servicePackage === null && !this.calculate.calculation.suppServices.length) {
          return true
        }
        */

        if (
          (this.productDetails.servicePackages === null ||
            !this.productDetails.servicePackages.length) &&
          (this.productDetails.suppServices === null ||
            !this.productDetails.suppServices.length)
        ) {
          return true;
        }
        if (
          (this.productDetails.servicePackages === null ||
            !this.productDetails.servicePackages.length) &&
          !this.productDetails.suppServices.length
        ) {
          return true;
        }
      }

      // Пропуск шага 6, если самовывоз
      if (step === 6 && this.delivery.type === "3") {
        return true;
      }
      //Пропуск шага 6, если электронная доставка
      if (step === 6 && this.calculate.deliveryMedia === "digital") {
        return true;
      }

      return false;
    },
    /**
     * Переход к следующему шагу
     */
    nextStep() {
      if (this.CONFIG.mode === "price") {
        return;
      }
      let step = this.currentStep + 1;
      if (this.skipStep(step)) {
        step++;
      }
      if (step === 8) {
        this.CONFIG.mode = "payment";

        // TODO: step 1?
      }
      //this.moduleMove(this.CONFIG.mode, step);
      this.setStep({ step: step, block: null });
    },
    /**
     * Переход к предыдущему шагу
     */
    prevStep() {
      let step = this.currentStep - 1;

      if (this.skipStep(step)) {
        step--;
      }
      //this.moduleMove('order', step);
      this.setStep({ step: step, block: null });
    },
    /**
     * Проверка формы текущего шага.
     * Проверяем формы 3, 5 шага на предмет незаполненных полей
     * Остальные шаги на предмет не выбранных опций
     */
    checkForm() {
      if (this.currentStep === 1) {
        if (this.selectedService.id === null) {
          this.showModal(
            this.$lng("common.checkFormPopup"),
            this.$lng("common.error")
          );
        }
      }
      if (this.currentStep === 2) {
        if (!this.allowNext) {
          this.$refs.step2.checkForm();
          this.showModal(
            this.$lng("common.checkFormPopup"),
            this.$lng("common.error")
          );
        }
      }
      if (this.currentStep === 3) {
        this.$refs.step3.checkForm();
      }
      if (this.currentStep === 5) {
        this.$refs.step5.checkForm();
      }
      if (this.currentStep === 6) {
        this.$refs.step6.checkForm();
      }
    },

    /**
     * Устанавливает номер текущего шага и прокручивает до нужного блока
     */
    setStep(data) {
      if (this.currentStep >= 1 || this.currentStep < this.steps.length) {
        this.currentStep = data.step;
      }
      this.stepBlock = data.block || null;

      /**
       if (this.CONFIG.allowBrowserHistory) {
        this.browserHistorySet();
      }*/

      setTimeout(() => {
        this.scrollTo(data.block);
      }, 500);
    },

    /**
     * Прокрутка экрана до элемента
     */
    scrollTo(element, mobileOnly = false) {
      //console.log('прокрутка ', element);
      let elementTarget;

      if (mobileOnly && !this.isMobile) {
        return;
      }
      if (element === null) {
        //return
        elementTarget = document.querySelector(".kv-content__header");
      } else {
        elementTarget = document.querySelector(element);
      }

      //console.log(elementTarget);
      if (elementTarget === null) {
        return false;
      }

      // Дополнительное смещение для красоты или высота внешней шапки
      const parentOffset = 10;

      const elementPosition = elementTarget.getBoundingClientRect().top;

      const header = document.querySelector("#kv-app .kv-header");
      let headerHeight = 0;
      if (header) {
        headerHeight = header.getBoundingClientRect().height;
      }
      const topOffset = headerHeight + parentOffset;

      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      //console.log('прокрутка до ' + offsetPosition);

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    },

    /**
     * Показывает модальное окно с текстом
     * @param content
     * @param title
     */
    showModal(content = "", title = "") {
      this.modal.title = title;
      this.modal.content = content;
      if (content.length) {
        this.isModalShow = true;
      }
    },

    /**
     * Конфирм - предупреждение о сбросе выбранных параметров
     */
    showResetConfirm(content, title) {
      this.confirm.title = title || "";
      this.confirm.content = content || this.$lng("common.confirmResetText");
      this.confirm.isShow = true;

      return new Promise((resolve, reject) => {
        this.confirm.confirmYES = resolve;
        this.confirm.confirmNO = reject;
      });
    },

    setResetStepDate(data) {
      //this.resetStepData = data;
      this.confirm.isShow = false;
      if (data) {
        this.confirm.confirmYES(true);
      } else {
        this.confirm.confirmYES(false);
      }
    },

    /**
     * Устанавливает список популярных гражданств на основе конфига и
     * справочника всех гражданств
     */
    setListPopularNationalities() {
      const popular = [];
      this.CONFIG.popularNationalities.forEach(codeA2 => {
        const item = this.listNationalities.find(item => item.codeA2 === codeA2);
        if (item) {
          popular.push(item)
        }
      });
      this.listPopularNationalities = popular;
    },

    /**
     * Загружает справочник стран
     */
    async loadCountries() {
      if (this.listCountries.length) {
        return;
      }
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getCSCountries?clientId=${this.CONFIG.clientId}`
        );
        let countries = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }


        this.listCountries = countries.countries;
        this.setDefaultCountry();
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     * Загружает справочник гражданств
     */
    async loadNationalities() {
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getCSNationalities?clientId=${this.CONFIG.clientId}`
        );
        let nationalities = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(nationalities.Message);
        }

        this.listNationalities = nationalities.nationalities;
        this.setListPopularNationalities();
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     * Загружает детальное инфо по сервису
     */
    async loadServiceDetails() {
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getCSServiceDetails?clientId=${this.CONFIG.clientId}&serviceId=${this.selectedService.id}`
        );
        let serviceDetails = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(serviceDetails.Message);
        }
        // Случай, если недоступны цены
        if (serviceDetails.processDurations === null) {
          serviceDetails.processDurations = [];
        }

        // Добавить index к Duration
        if (serviceDetails.service.durations !== null) {
          serviceDetails.service.durations =
            serviceDetails.service.durations.map((_, index) => {
              return { ..._, index: index };
            });
        }

        this.serviceDetails = serviceDetails.service;


      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     * Загружает прайсы
     */
    async loadPrices() {
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getCSPrices?clientId=${this.CONFIG.clientId}&serviceId=${this.selectedService.id}&nationalityA2=${this.touristGroups[0].nationality.codeA2}&residenceCode=${this.CONFIG.residenceRegions}&withDetails=false`
        );
        let prices = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(prices.Message);
        }
        // Случай, если недоступны цены TODO: ???
        if (prices.prices === null) {
          prices.prices = [];
        }
        this.prices = prices;

        // console.warn('***');
        // console.log(`prices.state = ${prices.state}`);
        // console.log(`id = ${this.selectedPrice.price.id}`)
        // console.log(this.getPriceByProductId(this.selectedPrice.price.id))
        // Если заказ невозможен
        if (
          prices.state !==
          0 /*|| (prices.state === 0 && this.selectedPrice.price.id && this.getPriceByProductId(this.selectedPrice.price.id) === null )*/
        ) {
          //this.steps[1].allowOrder = false;
          //this.calculate.amount = null
        } else {
          this.steps[1].allowOrder = true;
          setTimeout(() => {
            //this.$refs.step2.isSinglePrice();
          }, 500);
        }


      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     *  Возвращает Цену по id продукта
     */
    getPriceByProductId(id) {
      if (!this.prices.prices.length) {
        return null;
      }
      const price = this.prices.prices.find((_) => _.productId === id);
      if (price && "price" in price) {
        return price.price;
      } else {
        return null;
      }
    },

    /**
     * Устанавливает флаг необходимости заполнения места жительства туристам
     */
    setResidenceRegionsRequired() {
      this.tourists.forEach((item) => {
        item.residenceRegionsRequired =
          this.productDetails.servedResidenceRegions !== null;
      });
    },

    /**
     * Активация шага 4

     Step4Active() {
      //this.setFirstPackage();
    },
     */
    /**
     * Выбор первого возможного сервис-пакета, если он еще не выбран
     */
    setFirstPackage() {
      //console.log('setFirstPackage')
      if (
        this.productDetails.servicePackages !== null &&
        this.productDetails.servicePackages.length &&
        this.selectedServicePackage.id === null
      ) {
        //this.selectPackage(this.data.servicePackages[0])
        //this.changePackage(this.productDetails.servicePackages[0]);
      }
    },

    /**
     * Загружает детальную инфо по продукту
     */
    async loadProductDetails() {
      if (!this.selectedPrice.price.id) {
        return false;
      }
      if (
        this.productDetails.id &&
        this.productDetails.id === this.selectedPrice.price.id
      ) {
        //this.setFirstPackage();
        return false;
      }
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getCSProductDetails?clientId=${this.CONFIG.clientId}&productId=${this.selectedPrice.price.id}`
        );
        let productDetails = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(productDetails.Message);
        }
        /*
                if (productDetails.product.servedResidenceRegions !==null) {
                  productDetails.product.servedResidenceRegions.map(item => {
                    //item.code = item.code.replace(/\\/g, "\\\\");
                    //item.code = item.code.replace(/\\/g, "*");
                    return item
                  })
                }
        */
        this.productDetails = productDetails.product;



        this.setResidenceRegionsRequired();
        //this.setFirstPackage();
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     * Возвращает данные по адресу отправки виз в зависимости от варианта доставки
     * Адрес клиента или другой выбранный адрес. Если доставка цифровая или самовывоз - null
     * @return {Object}
     */
    getPostalData(delivery) {
      if (!delivery) {
        return null;
      }
      let postalData = null;
      if (this.calculate.deliveryMedia === "digital") {
        return null;
      }
      // Проверка на не 100% заполненность адреса
      const isEmptyPostalData = (data) => {
        if (data.zip === null || data.zip.length < 3) {
          //return true;
        }
        if (data.city === null || !data.city.length) {
          //return true;
        }
        if (
          data.addressingCountry.codeA3 === null ||
          !data.addressingCountry.codeA3.length
        ) {
          return true;
        }
        return false;
      };

      if (delivery.type === 2 && !isEmptyPostalData(delivery)) {
        postalData = {
          zip: delivery.zip,
          city: delivery.city,
          countryA3: delivery.addressingCountry.codeA3,
        };
      }
      return postalData;
    },

    async sendCalculateAndValidate(index = null) {
      this.currentEditTourist = index;

      if (!this.selectedPrice.price.id) {
        this.calculate = new constants.calculateDefault();
        return;
      }
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      let participants;
      // Для 3-го шага, когда уже завели участников
      if (this.touristGroups.length) {
        participants = [];
        this.touristGroups.forEach((item, i) => {
          for(let q = 0; q < item.quantity; q++) {
            participants.push(
              {
                nr: participants.length + 1,
                nationalityA2: item.nationality.codeA2,
                residenceCode: this.CONFIG.residenceRegions,
                /*discountCode: null,*/
              }
            )
          }
        })

      } else {
        // Для шага 2, когда еще не создали туристов используем фейкового туриста
        // с национальностью и местом жительства из шага 2
        participants = [
          {
            nr: 1,
            nationalityA2: this.CONFIG.nationality,
            residenceCode: this.CONFIG.residenceRegions,
          },
        ];
      }

      const postalData = this.getPostalData(this.delivery);

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: network.toFormUrlEncoded({
          productId: this.selectedPrice.price.id,
          participants: participants,
          servicePackageId: this.selectedServicePackage.id,
          suppServices: this.selectedSuppServices.map((_) => _.id),
          postalServiceId:
            this.selectedPostalService === null
              ? ""
              : this.selectedPostalService.id,
          postalData: postalData,
        }),
        redirect: "follow",
      };
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}calculateAndValidate?clientId=${this.CONFIG.clientId}`,
          requestOptions
        );
        let calculate = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(calculate.Message);
        }

        this.calculate = calculate;
        this.setResidenceRegionsRequired();

        // Проверка туристов на возможность оформления виз, для или после шага 3
        if (
          calculate.calculation.participants !== null &&
          this.tourists.length
        ) {
          calculate.calculation.participants.forEach((item, index) => {
            this.tourists[index].state = item.state;
            this.tourists[index].stateDescription = item.stateDescription;
          });
        }
        // Если заказ невозможен на шаге 2 по причине проблем с туристами шага 3 (возврат) - показываем попап
        if (
          calculate.state !== 0 &&
          this.currentStep === 2 &&
          this.steps[1].showModalCorrectParticipant
        ) {
          this.showModal(
            this.$lng("step2.errorByTourists"),
            this.$lng("common.error")
          );
          this.steps[1].showModalCorrectParticipant = false;
        }
        // Если заказ невозможен показываем попап
        if (calculate.state !== 0 && this.currentStep === 3) {
          /*if (this.tourists[0].nationality.codeA3) {
            this.showModal(calculate.stateDescription, this.$lng('common.error'));
          }*/
          /* && item.state === 0 */
          /* && item.gender !== '' */
          /*
          if (this.tourists.every(item => item.nationality.codeA3) && this.currentEditTourist == (item.nr - 1) ) {
            this.showModal(calculate.stateDescription, this.$lng('common.error'));
          }
          */
          if (
            this.currentEditTourist !== null &&
            this.tourists[this.currentEditTourist].nationality.codeA3 &&
            this.tourists[this.currentEditTourist].state !== 0
          ) {
            //this.showModal(calculate.stateDescription, this.$lng('common.error'));
            //Fix 04 от 2021-11-08
            this.showModal(
              this.tourists[index].stateDescription,
              this.$lng("common.error")
            );
          }
          this.steps[2].allowOrder = false;
        } else {
          this.steps[2].allowOrder = true;
        }


      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     * Загружает справочник стран адресов для шага 5
     */
    async loadAddressingCountries() {
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getAddressingCountries?clientId=${this.CONFIG.clientId}`
        );
        let countries = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        this.addressingCountries = countries.countries;

      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     * Загружает справочник мест получения заказа шага 5
     */
    async loadPickupPoints() {
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getCSPickupPoints?clientId=${this.CONFIG.clientId}`
        );
        let pickupPoints = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(pickupPoints.Message);
        }
        this.pickupPoints = pickupPoints.points;


        // Выбор единственного филиала
        if (this.pickupPoints.length === 1 ) {
          this.delivery.branch = this.pickupPoints[0];
        }

      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    /**
     * Загрузка служб доставки виз */
    async loadPostalServices() {
      //console.log('Загрузка почтовых сервисов');
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const postalData = {
        zip: this.delivery.zip,
        city: this.delivery.city,
        countryA3: this.delivery.addressingCountry.codeA3,
      };
      console.log(postalData);
      console.log(network.toFormUrlEncoded(postalData))

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: network.toFormUrlEncoded(postalData),
        redirect: "follow",
      };
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getPostalServices?clientId=${this.CONFIG.clientId}`,
          requestOptions
        );
        let responseJSON = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(responseJSON.Message);
        }

        this.postalServices = responseJSON.services;


        // Сброс выбранного почтового сервиса, если его нет в доступных сервисах
        const selectedPostalServiceIndex = this.postalServices.findIndex(
          (_) => _.id === this.selectedPostalService.id
        );
        if (selectedPostalServiceIndex === -1) {
          this.selectedPostalService = new constants.PostalServiceDefault();

        }

        this.preselectPostalService();
        await this.sendCalculateAndValidate();
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    preselectPostalService() {
      if (
        this.postalServices.length === 1 &&
        this.selectedPostalService.id === null
      ) {
        this.postalChange(this.postalServices[0]);
      }
    },

    // loadStep1Data() {
    //   this.loadCountries();
    // },

    async loadStep2Data() {
      this.steps[1].showModalCorrectParticipant = true;
      await this.loadServiceDetails();
      //await this.loadNationalities();
      await this.loadPrices();
      await this.preselectSingleDuration();
    },

    /**
     * Предвыбор длительности визы, если они в единственном варианте и еще не выбраны
     */
    async preselectSingleDuration() {
      // 1. Предвыбор срока визы
      if (
        this.serviceDetails.durations &&
        this.serviceDetails.durations.length === 1 &&
        this.selectedDuration.index === null
      ) {
        await this.updateDuration(this.serviceDetails.durations[0]);
      }
      // Для режима прайс выбрать первое значение
      if (
        this.serviceDetails.durations &&
        this.selectedDuration.index === null &&
        this.CONFIG.mode === "price"
      ) {
        await this.updateDuration(this.serviceDetails.durations[0]);
      }
    },

    /**
     * Предвыбор офиса где будут забраны визы, если офис только один
     */
    preselectSinglePickupPoints() {
      if (
        this.delivery.type == 3 &&
        this.delivery.branch.id === null &&
        this.pickupPoints.length === 1
      ) {
        this.$refs.step5.changeBranch(this.pickupPoints[0]);
      }
    },

    async loadStep5Data() {
      await this.loadAddressingCountries();
      await this.loadPickupPoints();
    },

    /**
     *  Смена страны
     */
    async countryChange(data) {
      // Конфирм сброса
      if (
        this.confirmReset &&
        (this.selectedService.id ||
          this.selectedPrice.price.id !== null ||
          this.selectedServicePackage.id !== null ||
          this.selectedSuppServices.length ||
          this.selectedPostalService.id !== null)
      ) {
        if (await this.showResetConfirm()) {
          await this._countryChange(data);
        }
      } else {
        await this._countryChange(data);
      }
    },

    async _countryChange(data) {
      this.selectedCountry = data;
      this.selectedDuration = new constants.DurationDefault();
      this.selectedPrice = new constants.PriceDefault();
      this.calculate = new constants.calculateDefault();
      this.resetStep4();
      this.resetStep6();
      await this.loadServices();
    },

    /**
     *  Загрузка справочника доступных типов виз
     */
    async loadServices() {
      const selectedCountryId = this.selectedCountry.codeA3;

      if (!selectedCountryId) {
        //console.log('Страна не выбрана'); // TODO: что делаем?
        return;
      }

      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getCSServices?clientId=${this.CONFIG.clientId}&countryA3=${selectedCountryId}`
        );
        let services = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(services.Message);
        }

        const srv = this.servicesPrepare(services.services);

        const grp = this.servicesPrepare(services.serviceGroups);

        const grpServ = this.servicesGroupsPrepare(grp, srv);

        this.services = srv;
        this.serviceGroups = grpServ;

        this.selectedServiceGroup = new constants.ServicesDefault();
        this.selectedService = new constants.ServicesDefault();

        if (this.setDefaultServiceGroup() && this.setDefaultService()) {
          this.nextStep();
        }


      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    async updateNationality(data) {
      console.log("upn");
      this.CONFIG.nationality = data.codeA2;
      await this.loadPrices();

      // Установка национальности по умолчанию для шага 3
      // Устанавливаем, если сменили национальность и
      // для нее нужна виза и есть продукт, но продукт не выбран в данный момент, а выбран ранее

      if (
        this.selectedPrice.price.price &&
        this.prices.state === 0 &&
        this.getPriceByProductId(this.selectedPrice.price.id)
      ) {
        //console.log('Дефолтный при смене нац')
        this.steps[2].defaultNationality = this.listNationalities.find(
          (item) => item.codeA2 === this.CONFIG.nationality
        );
      }
      this.resetStep4();
      this.resetStep6();

      //this.scrollTo("#kv-residence-regions", true);
    },

    updateResidenceRegions(data) {
      this.CONFIG.residenceRegions = data;
      this.loadPrices();
    },

    async updateDuration(data) {
      // Конфирм сброса
      if (
        this.steps[0].showModalWhenChangeVisa &&
        this.confirmReset &&
        (this.selectedServicePackage.id !== null ||
          this.selectedSuppServices.length ||
          this.selectedPostalService.id !== null)
        //this.selectedPrice.price.id !== null ||
      ) {
        if (await this.showResetConfirm(this.getResetConfirmMessage())) {
          this._updateDuration(data);
        }
      } else {
        this._updateDuration(data);
      }
    },

    _updateDuration(data) {
      this.selectedDuration = data;
      this._updatePrice(new constants.PriceDefault());
      if (data.name) {
        this.steps[1].allowOrder = true;
      } else {
        this.steps[1].allowOrder = false;
      }
    },

    async updatePrice(data) {
      // Конфирм сброса
      //if (this.confirmReset && this.selectedPrice.price.id !== null) {
      if (
        this.steps[0].showModalWhenChangeVisa &&
        this.confirmReset &&
        (this.selectedServicePackage.id !== null ||
          this.selectedSuppServices.length ||
          this.selectedPostalService.id !== null)
      ) {
        if (await this.showResetConfirm(this.getResetConfirmMessage())) {
          this._updatePrice(data);
        }
      } else {
        this._updatePrice(data);
      }
    },

    _updatePrice(data) {
      //console.log('Обновление цены')
      this.selectedPrice = data;
      this.resetStep4();
      this.resetStep6();
      this.loadProductDetails();
      this.sendCalculateAndValidate();

      // Установка национальности по умолчанию для шага 3
      // Устанавливаем, если для текущей национальности
      // Пришла цена и она успешно выбрана сейчас
      // if (
      //   this.selectedPrice.price.price &&
      //   this.calculate.state === 0 &&
      //   this.getPriceByProductId(this.selectedPrice.price.id)
      // ) {
      //   //console.log('Дефолтный при смене цены')
      //   this.steps[2].defaultNationality = listNationalities.find(
      //     (item) => item.codeA2 === this.CONFIG.nationality
      //   );
      // }


    },
    //  ПО выбору смотреть тип. Выбирать группу или сервис и открывать шаг
    /**
     * Возвращает сервисы и группы, приведенные к единому типу: {id, srvGrpId, type,  name, description}
     */
    servicesPrepare(data) {
      return data.map((item) => {
        return {
          id: item.serviceId || item.id,
          srvGrpId: item.srvGrpId ? item.srvGrpId : null,
          type: item.srvGrpId === undefined ? "group" : "item",
          name: item.name,
          description: item.description,
          selected: false,
        };
      });
    },

    /**
     * Возвращает группы сервисов, плюс сервисы без группы
     */
    // servicesGroupsPrepare(groups, services) {
    //   services = services.filter(item => item.srvGrpId === null)
    //   return [...services, ...groups]
    // },

    /**
     * Возвращает сервисы без групп и группы в порядке следования сервисов
     * Группы возвращаются без дублирования
     * @param {*} grp
     * @param {*} srv
     */
    servicesGroupsPrepare(grp = [], srv = []) {
      const group = [];
      srv.forEach((item) => {
        // Сервис без группы
        if (item.srvGrpId === null) {
          group.push(item);
        } else {
          // Группа
          const grpId = item.srvGrpId;
          const serviceGroup = grp.find((_) => _.id === grpId);
          if (group.findIndex((_) => _.id === grpId) === -1) {
            group.push(serviceGroup);
          }
        }
      });
      return group;
    },

    async selectVisaType(item) {
      // Идем на шаг 2, если выбрали то же самое
      if (item.type === "group" && this.selectedServiceGroup.id === item.id) {
        return;
      }

      if (item.type === "item") {
        this.steps[0].isOpen = false;
      }
      if (item.type === "item" && this.selectedService.id === item.id) {
        this.nextStep();
        return;
      }

      // Конфирм сброса
      if (
        this.steps[0].showModalWhenChangeVisa &&
        this.confirmReset &&
        (this.selectedServicePackage.id !== null ||
          this.selectedSuppServices.length ||
          this.selectedPostalService.id !== null)
      ) {
        //this.selectedPrice.price.id !== null ||

        if (await this.showResetConfirm(this.getResetConfirmMessage())) {
          this._selectVisaType(item);
          this.steps[0].showModalWhenChangeVisa = false;
        }
      } else {
        this._selectVisaType(item);
      }
    },

    /**
     * Выбор типа виз (группы или типа)
     */
    _selectVisaType(item) {
      if (item.type === "group") {
        this.selectedServiceGroup = item;
        this.selectedService = new constants.ServicesDefault();

        setTimeout(() => {
          this.scrollTo("#kv-services", true);
        }, 200);
      } else {
        this.selectedService = item;
        //this.selectedServiceGroup = new constants.ServicesDefault();
        //this.selectedServiceGroup.id = item.srvGrpId ? item.srvGrpId : '-';

        if (item.srvGrpId) {
          this.selectedServiceGroup.id = item.srvGrpId;
        } else {
          this.selectedServiceGroup = new constants.ServicesDefault();
        }
        // Переход к шагу 2, если выбрали тип визы

        // Загружаем детали сервиса при выборе типа визы
        this.steps[1].showModalCorrectParticipant = true;
        this.loadServiceDetails();
        //this.loadStep2Data();

        this.nextStep();
      }

      this.serviceGroups.forEach((_) => {
        _.selected = item.id === _.id;
      });

      this.services.forEach((_) => {
        _.selected = item.id === _.id;
      });

      // Сброс Duration, Price ???
      this.selectedDuration = new constants.DurationDefault();
      this.selectedPrice = new constants.PriceDefault();
      this.calculate = new constants.calculateDefault();
      this.resetStep4();
      this.resetStep6();
    },

    /**
     * Формирует конфирм о сбросе данных при возврате с шага 7 на шаг 1, 2
     * Возвращает предупреждение о конкретных сбрасываемых данных (сервисный пакет | допуслуги | доставка)
     */
    getResetConfirmMessage() {
      let content = this.$lng("step1.confirmReset.begin");
      const contentParts = [];

      if (this.selectedServicePackage.id !== null) {
        contentParts.push(this.$lng("step1.confirmReset.servicePacket"));
      }

      if (this.selectedSuppServices.length) {
        contentParts.push(this.$lng("step1.confirmReset.suppServices"));
      }

      if (this.selectedPostalService.id !== null) {
        contentParts.push(this.$lng("step1.confirmReset.delivery"));
      }

      if (contentParts.length === 1) {
        content = `${content} ${contentParts[0]} `;
      }

      if (contentParts.length === 2) {
        content = `${content} ${contentParts[0]} ${this.$lng(
          "step1.confirmReset.and"
        )} ${contentParts[1]} `;
      }

      if (contentParts.length === 3) {
        content = `${content} ${contentParts[0]}, ${
          contentParts[1]
        } ${this.$lng("step1.confirmReset.and")} ${contentParts[2]} `;
      }

      content = content + this.$lng("step1.confirmReset.end");
      return content;
    },

    updateTouristField(data) {
      this.currentEditTourist = data.index;
      this.tourists[data.index][data.field] = data.value;
    },

    /**
     * Возвращает информацию по туристу для корзины
     */
    touristInfo(i) {
      if (this.tourists.length) {
        const tourist = this.tourists[i];
        return `${tourist.gender} ${tourist.sname} ${tourist.name}`;
      }
    },

    /**
     * Смена способа доставки
     */
    postalChange(data) {
      this.selectedPostalService = data;
      this.sendCalculateAndValidate();
      this.steps[0].showModalWhenChangeVisa = true;
    },

    /**
     * Сброс способа доставки
     */
    postalReset() {
      this.selectedPostalService = new constants.PostalServiceDefault();
      this.sendCalculateAndValidate();
    },

    /*STEP 3*/
    async Step3Active() {
      this.steps[2].isActive = false;
      await this.loadProductDetails();

      // Добавляем туриста, если их еще нет
      if (!this.tourists.length) {
        await this.addTourist();
      }
      // Убрал калькуляцию, т.к. она выполнится после добавления туриста
      //await this.sendCalculateAndValidate();
      // Задержка активности шага на тот случай, если
      // не выбрана цена, что бы сразу не запускать проверку формы
      // setTimeout(()=> {
      this.steps[2].isActive = true;
      // }, 1000)
    },

    /**
     * Добавляет туриста
     */
    async addTourist() {
      const tourist = new constants.Toursit();

      this.tourists.push(tourist);
      await this.sendCalculateAndValidate();
      this.scrollTo(`#kv-tourist-${this.tourists.length - 1}`);
    },
    /**
     * Удаляет участника под номером Index
     * @param {Number} index
     */
    deleteTourist(index) {
      this.tourists.splice(index, 1);
      this.sendCalculateAndValidate();
    },

    /* STEP 4 */
    /**
     * Смена сервисного пакета
     */
    changePackage(pcg) {
      this.selectedServicePackage = pcg;
      this.steps[0].showModalWhenChangeVisa = true;
    },

    /**
     * Выбрать услугу в пакете
     */
    changeSuppService(services) {
      this.selectedSuppServices = services;
      this.steps[0].showModalWhenChangeVisa = true;
    },
    /**
     * Сброс шага 4
     */
    resetStep4() {
      this.selectedServicePackage = new constants.ServicePackage();
      this.selectedSuppServices = [];
    },

    /* Step 6 */
    setBranch(data) {
      this.delivery.branch = data;
      this.postalReset();
    },
    setCustomerDelivery(data) {

      //data = Object.assign({}, data);
      //let changePostalData = false;
      // Сброс почтовых сервисов и калькуляция:
      // если выбрали самовывоз
      // если поменялся фактический адрес доставки и он заполнен полностью
      // if (data.delivery.type == 3) {
      //   changePostalData = true;
      // }
      //
      // const postalDataNew = this.getPostalData(data.customer, data.delivery);
      // const postalDataOld = this.getPostalData(this.customer, this.delivery);
      // if (JSON.stringify(postalDataNew) !== JSON.stringify(postalDataOld)) {
      //   changePostalData = true;
      // }

      //this.customer = Object.assign({}, data.customer);
      this.delivery = Object.assign({}, data.delivery);

      if (data.delivery.addressingCountry.codeA3 !== null) {
        this.loadPostalServices();
      }

      // if (changePostalData) {
      //   if (
      //     postalDataNew !== null  ||
      //     data.delivery.type == 3
      //   ) {
      //     this.preselectSinglePickupPoints();
      //     this.resetStep6(true);
      //   } else {
      //     this.resetStep6();
      //   }
      // }
    },

    /**
     * Сброс шага 6
     */
    resetStep6(calculate = false) {
      this.postalServices = [];
      this.selectedPostalService = new constants.PostalServiceDefault();
      if (calculate) {
        this.sendCalculateAndValidate();
      }
    },

    /* Step 7*/
    /**
     * Сохранение заявки
     * @return {Promise<void>}
     */
    async sendOrder() {
      //console.log('Сохранение заявки');

      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const requestOptions = {
        method: "POST",
        headers: headers,
        redirect: "follow",
        body: network.toFormUrlEncoded({
          productId: this.selectedPrice.price.id,
          servicePackageId: this.selectedServicePackage.id,
          suppServices: this.selectedSuppServices.map((_) => _.id),
          participants: this.tourists.map((item, i) => {
            return {
              nr: i + 1,
              lastName: item.sname,
              firstName: item.name,
              sex: item.gender === "Herr" ? "m" : "f",
              nationalityA2: item.nationality.codeA2 || "",
              residenceCode: item.residenceRegion.code || "",
              discountCode: item.discount,
              birthdate: item.birthDate,
            };
          }),
          customer: {
            title: this.customer.gender,
            lastName: this.customer.sname,
            firstName: this.customer.name,
            organization: this.customer.companyName,
            phone: this.customer.tel,
            mobilePhone: this.customer.mobile,
            email: this.customer.email,
            address: {
              address: this.customer.address,
              zip: this.customer.zip,
              city: this.customer.city,
              countryA3: this.customer.addressingCountry.codeA3,
            },
          },
          delivery: {
            method:
              this.calculate.deliveryMedia === "digital"
                ? "electronic"
                : this.delivery.type == 3
                  ? "pick-up"
                  : "post",
            pickupPointId:
              this.delivery.type == 3 ? this.delivery.branch.id : null,
            postalServiceId:
              this.delivery.type == 1 || this.delivery.type == 2
                ? this.selectedPostalService.id
                : null,
            deliveryAddress:
              this.delivery.type == 2
                ? {
                  title: this.delivery.gender,
                  lastName: this.delivery.sname,
                  firstName: this.delivery.name,
                  organization: this.delivery.companyName,
                  phone: this.delivery.tel,
                  mobilePhone: this.delivery.mobile,
                  email: this.delivery.email,
                  address: {
                    address: this.delivery.address,
                    zip: this.delivery.zip,
                    city: this.delivery.city,
                    countryA3: this.delivery.addressingCountry.codeA3,
                  },
                }
                : null,
          },
          uniqueKey: this.uniqueKey,
          agencyCode: this.CONFIG.agnr,
        }),
      };
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}order?clientId=${this.CONFIG.clientId}`,
          requestOptions
        );
        let responseData = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          throw new Error(responseData.Message);
        }



        this.CONFIG.order = responseData.orderNr;
        if (responseData.state >= 0 && responseData.orderNr) {
          this.nextStep();
        } else {
          this.showModal(
            responseData.stateDescription,
            this.$lng("common.error")
          );
        }
      } catch (err) {
        this.isLoading = false;
        this.showModal(
          this.$lng("step7.orderError"),
          this.$lng("common.error")
        );
        console.log(err);
      }
    },

    /* Step 8 */

    async loadStep8Data() {
      await this.loadPaymentMethods();
    },

    async loadPaymentMethods() {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: network.toFormUrlEncoded({
          orderNr: this.CONFIG.order,
        }),
        redirect: "follow",
      };
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}getPaymentMethods?clientId=${this.CONFIG.clientId}`,
          requestOptions
        );
        let responseJSON = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          if (responseJSON.Message) {
            this.showModal(responseJSON.Message, this.$lng("common.error"));
          }
          throw new Error(responseJSON.Message);
        }


        this.paymentMethods = responseJSON.paymentMethods;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },

    async makePayment() {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: network.toFormUrlEncoded({
          orderNr: this.CONFIG.order,
          payment: {
            method: this.paymentType,
            bankCode: this.paymentData.bic,
            bankAccount: this.paymentData.iban,
          },
        }),
        redirect: "follow",
      };
      try {
        this.isLoading = true;
        let response = await fetch(
          `${this.CONFIG.API_URL}makePayment?clientId=${this.CONFIG.clientId}`,
          requestOptions
        );
        let responseJSON = await response.json();
        this.isLoading = false;
        if (response.status >= 400 && response.status < 600) {
          if (responseJSON.Message) {
            this.showModal(responseJSON.Message, this.$lng("common.error"));
          }
          throw new Error(responseJSON.Message);
        }


        if (responseJSON.state >= 0) {
          // Ставим новый статус истории, затем меняем заголовок и режим

          this.CONFIG.mode = "success";
          document.title = this.$lng("success.header");
          setTimeout(() => {
            this.scrollTo(null);
          }, 500);
        } else {
          this.showModal(
            responseJSON.stateDescription,
            this.$lng("common.error")
          );
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },

  computed: {
    /**
     * Список Популярных национальностей, с отфильтрованными выбранными национальностями
     * @returns {*[]}
     */
    filteredListPopularNationalities() {
      const popular = [];
      this.listPopularNationalities.forEach(nationality => {
        const item = this.touristGroups.find(item => nationality.codeA2 === item.nationality.codeA2)
        if (!item) {
          popular.push(nationality)
        }
      })
      return popular
    },
    /**
     * Список всех национальностей, с отфильтрованными выбранными национальностями
     * @returns {*[]}
     */
    filteredListNationalities() {
      return this.listNationalities.filter(nationality => {
        return this.touristGroups.findIndex(item => nationality.codeA2 === item.nationality.codeA2) === -1
      })
    },

    /**
     * Выводить модалку о сбросе параметров
     */
    confirmReset() {
      return this.steps[2].isValid;
    },

    /**
     * Возвращает информацию по текущему шагу
     * @return {{crumb: string, icon: string, header: string}}
     */
    stepInfo() {
      return this.currentStep
        ? this.steps[this.currentStep - 1]
        : {
          crumb: "",
          header: "",
          icon: "",
        };
    },

    /**
     *  Функцию возвращает цепочку по текущему шагу
     *
     */
    crumbs() {
      return this.steps.slice(0, this.currentStep).map((el) => el.crumb);
    },

    /**
     * Можно ли перейти на следующий шаг из текущего
     */
    allowNext() {
      if (this.currentStep === 1) {
        if (this.selectedCountry.codeA3 && this.selectedService.id) {
          return true;
        }
      }

      // TODO: проверка
      if (this.currentStep === 2) {
        if (
          this.selectedPrice.price.price !== null &&
          this.steps[1].allowOrder
        ) {
          return true;
        }
        //if (this.steps[1].allowOrder) {
        //    return true
        //}
        return false;
      }

      if (this.currentStep === 3) {
        return this.steps[2].isValid && this.steps[2].allowOrder;
      }

      // TODO: проверка
      if (this.currentStep === 4) {
        return true;
      }

      // TODO: проверка
      if (this.currentStep === 5) {
        return this.steps[4].isValid;
      }

      if (this.currentStep === 6) {
        if (this.selectedPostalService.id !== null) {
          return true;
        }
      }
      // TODO: проверка
      if (this.currentStep === 7) {
        return true;
      }
      if (this.currentStep === 8) {
        return this.steps[7].isValid;
      }
      return false;
    },

    /**
     * Возвращает информация по выбранной стране
     * @return {}
     */
    /*
    countrySelected() {
      //console.log(this.countries.filter(item => item.codeA3 == this.selectedCountryId))
      const country = this.countries.find(item => item.codeA3 == this.selectedCountryId)
      return country || {name: ''}
    },
  */
    /**
     * Возвращает название выбранного типа визы TODO: DEL
     * @return {String}
     */
    serviceNameSelected() {
      const service = this.services.find(
        (item) => item.id === this.selectedService.id
      );
      return service ? service.name : "";
    },

    /**
     * Возвращает подтипы виз по выбранному типу виз
     * @return {[]}
     */
    serviceGroupsSelected() {
      return this.services.filter(
        (item) =>
          item.srvGrpId && item.srvGrpId === this.selectedServiceGroup.id
      );
    },

    /* STEP 3 */

    totalAmount() {
      let amount = this.calculate.amount;
      if (amount !== null) {
        return formatter.priceFormat(amount);
      } else {
        return constants.dashSymbol;
      }
    },

    /* Price mode */
    priceVisaTypeModel: {
      get() {
        if (this.CONFIG.service) {
          return this.serviceGroupsSelected.find(
            (item) => item.id === this.CONFIG.service
          ).id;
        }
        return null;
      },
      set(value) {
        if (value) {
          this.selectVisaType(
            this.serviceGroupsSelected.find((item) => item.id === value)
          );
        }
      },
    },
  },

  mounted() {
    if (!this.initiateWidget()) {
      return false;
    }

    this.isMobile =
      document.querySelector("#kv-app").getBoundingClientRect().width < 640;

    const isIOS =
      /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
      ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1);
    const isMobile =
      /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || isIOS;
    if (isMobile) {
      document.querySelector("#kv-app").classList.add("kv_is-mobile");
    }

    /**
     * Подавить замену цифр на телефоны https://gist.github.com/yuezk/15c5bb1370e30d0a2a60
     */
    const head = document.head;
    const meta = document.createElement("meta");
    meta.name = "format-detection";
    meta.content = "telephone=no";
    head.appendChild(meta);

    // Грузим справочник стран
    this.loadCountries();

    // Грузим справочник гражданств
    this.loadNationalities();
    // Справочник стран доставки
    this.loadAddressingCountries();

    // Справочник филиалов офиса
    this.loadPickupPoints();

    /**
     * Observer for StatusBar
     */
    const observerStatusBarHandler = (entries) => {
      entries.forEach((entry) => {

        if(entry.isIntersecting /*&& entry.intersectionRatio >= 0.9*/) {
          document.querySelector('.kv-header')?.classList.add('kv-hidden');
        } else {
          document.querySelector('.kv-header')?.classList.remove('kv-hidden');
        }
      });
    }

    const observerStatusBar = new IntersectionObserver(observerStatusBarHandler, {
      threshold: 0,
    });
    observerStatusBar.observe(document.querySelector('.kv-observer__statusbar'));

    /**
     * Observer for block Nationalities
     */
    // const observerNationalitiesHandler = (entries) => {
    //   entries.forEach((entry) => {
    //     console.log(entry)
    //     if(entry.isIntersecting && entry.intersectionRatio && entry.intersectionRatio !==1) {
    //       document.querySelector('#kv-block-2')?.classList.remove('kv-is-hover');
    //       document.querySelector('#kv-block-2')?.classList.remove('kv-outline');
    //     } else {
    //       //document.querySelector('#kv-block-2')?.classList.remove('kv-outline');
    //     }
    //   });
    // }
    //
    // const observerNationalities = new IntersectionObserver(observerNationalitiesHandler, {
    //   threshold: 0,
    // });
    // observerNationalities.observe(document.querySelector('#kv-block-2'));


  },
};
</script>
<template>
  <div
    id="kv-app"
    class="kv-app"
    notranslate
    data-cq-max-w="991, 640, 480"
    data-cq-min-w="991, 640, 480"
  >
    <iconSprite />

    <StatusBar>
      <template #info>
        <StatusBarInfo
          :selectedCountry="selectedCountry"
          :selectedService="selectedService"
          :selectedDuration="selectedDuration"
          :selectedPrice="selectedPrice"
        >
        </StatusBarInfo>
      </template>
      <template #aside>
        <StatusBarCart
          :calculation="calculate.calculation"
          :tourists="tourists"
          :totalAmount="totalAmount"
        >
        </StatusBarCart>
      </template>
    </StatusBar>

    <div class="kv-content">
      <div class="kv-content__body">


        <!-- step 1 -->
        <TheBlock
          icon="step_1"
          header="VISA-AUSWAHL"
          id="kv-block-1"
          v-if="listCountries.length && services.length"
        >
          <template #header-aside v-if="selectedService.id">
            <!--<div class="kv-block-info__action" @click="steps[0].isOpen = !steps[0].isOpen">
              <span>Edit</span>
              <svg class="kv-kv-block-info__icon kv-kv-block-info__down" width="10" height="9"><use href="#kv-arrow-down"></use></svg>
            </div>-->
          </template>

          <template v-if="!steps[0].isOpen && selectedService.id">
            <div class="kv-block1-info"  @click="steps[0].isOpen = !steps[0].isOpen">
              <div class="kv-block1-info__info">
                <span v-if="selectedServiceGroup.id">{{ selectedServiceGroup.name }} | </span>
                {{ selectedService.name }}
              </div>
              <div class="kv-block-info__action">
                <span>Edit</span>
                <svg class="kv-kv-block-info__icon kv-kv-block-info__down" width="10" height="9"><use href="#kv-arrow-down"></use></svg>
              </div>
            </div>

            <kv-alert type="default" v-if="selectedService.description" style="margin-top: 6px">
              <div v-html="selectedService.description"></div>
            </kv-alert>
          </template>

          <div v-if="steps[0].isOpen">
            <ControlCountries
              :countries="listCountries"
              :default="{
                country: selectedCountry,
              }"
              @change:country="countryChange"
            ></ControlCountries>

            <div class="kv-country-text kv-user-text">
              is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </div>

            <div class="kv-buch">
              <div class="kv-buch__row kv-row">
                <ControlServices
                  :serviceGroups="serviceGroups"
                  :serviceGroupsSelected="serviceGroupsSelected"
                  :init="{
                  serviceGroups: selectedServiceGroup.id
                    ? [selectedServiceGroup.id, selectedService.id]
                    : [selectedService.id],
                  service: [selectedService.id],
                }"
                  @change:service="selectVisaType"
                  @showModal="showModal"
                ></ControlServices>
              </div>
            </div>
          </div>

        </TheBlock>
        <!-- /step 1 -->

        <!-- step 2 -->
        <TheBlock
          icon="step_1"
          header="STAATSBÜRGERSCHAFT"
          id="kv-block-2"
          class="kv-is-hover"
          v-if="listNationalities.length && selectedService.id"
        >
          <ControlTouristsGroup
            :data="{...item, index: index}"
            :alert="{
                state: prices?.state || 0,
                text: prices?.stateDescription || ''
              }"
            v-for="(item, index) in touristGroups"
            :key="item"
            @change="changeTouristsGroupCount"
            @remove="removeTouristsGroup"
          ></ControlTouristsGroup>


          <ControlNationality
            :nationalities="filteredListNationalities"
            :popular="filteredListPopularNationalities"
            :setup="{
              nationality: CONFIG.nationality,
            }"
            @add="addTouristsGroup"
            @change="updateNationality"
          >
          </ControlNationality>


        </TheBlock>
        <!-- /Step 2 -->


        <!-- Step 3 -->
        <TheBlock
          icon="step_1"
          header="KOSTEN"
          class="kv-observer__product"
          v-if="serviceDetails.id && touristGroups.length"
        >

          <template #header-aside>
            <div class="kv-block-info__action">
              <span>Изменить отображение</span>
              <svg
                class="kv-kv-block-info__icon kv-kv-block-info__icon_card"
                :class="{'active': steps[1].priceMode === 'cards'}"
                width="20" height="20"
                @click="steps[1].priceMode = 'cards'"
              >
                <use href="#kv-price-cards"></use>
              </svg>


              <svg class="kv-kv-block-info__icon kv-kv-block-info__icon_table"
                   :class="{'active': steps[1].priceMode === 'table'}"
                   width="20" height="20"
                   @click="steps[1].priceMode = 'table'"
              >
                <use href="#kv-price-table"></use>
              </svg>
            </div>
          </template>

          <div class="kv-staying">
            <!-- text -->
            <div class="kv-staying__text">
              <div class="kv-staying__text-label">{{$lng('step2.modalDefaultInfo')}}:</div>
              <div class="kv-staying__text-text kv-user-text" v-html="serviceDetails.durationsInfo"></div>
            </div>
            <!-- /text -->

            <ControlDuration
              :list="serviceDetails.durations"
              :selected="selectedDuration"
              @change="updateDuration"
              @showModal="showModal"
              v-if="steps[1].priceMode === 'cards'"
            ></ControlDuration>

            <div class="kv-staying__info" v-if="selectedDuration.description && steps[1].priceMode === 'cards'">
              <svg class="kv-staying__info-icon"><use href="#kv-icons_info"></use></svg>
              <div class="kv-staying__text-text kv-user-text" v-html="selectedDuration.description"></div>
            </div>

          </div>

          <!-- Processing-->
          <div class="kv-processing">
            <div class="kv-processing__caption">
              <div class="kv-processing__text kv-user-text" v-html="$lng('step2.processingText')"></div>
            </div>
          </div>
          <!-- /Processing-->

          <control-price
            :serviceDetails="serviceDetails"
            :prices="prices"
            :setup="{
              duration: selectedDuration,
              price: selectedPrice,
              redirectUrl: CONFIG.redirectUrl,
              mode: CONFIG.mode
              }"

            @update:price="updatePrice"
            @showModal="showModal"
            v-if="steps[1].priceMode === 'cards' && selectedDuration.index"
          >
          </control-price>

          <control-price-table
            :serviceDetails="serviceDetails"
            :prices="prices"
            :setup="{
              duration: selectedDuration,
              price: selectedPrice
              }"

            @update:price="updatePrice"
            @update:duration="updateDuration"
            @showModal="showModal"
            v-if="steps[1].priceMode === 'table'"
          ></control-price-table>

          <div class="kv-staying" v-if="selectedDuration.description && steps[1].priceMode === 'table'">
            <div class="kv-staying__info" style="margin: 0">
              <svg class="kv-staying__info-icon"><use href="#kv-icons_info"></use></svg>
              <div class="kv-staying__text-text kv-user-text" v-html="selectedDuration.description"></div>
            </div>
          </div>

          <div class="kv-alert kv-alert_center"
               v-if="prices.state !== 0 && selectedDuration.index !== null"
               v-html="prices.stateDescription"
          ></div>

          <!-- Calc block info-->
          <div class="kv-calc-block__info"  v-if="selectedDuration.name && prices.state === 0">

            <div class="kv-calc-info">

              <div class="kv-calc-info__icon">
                <svg><use href="#kv-icons_surface"></use></svg>
              </div>

              <div class="kv-calc-info__text kv-user-text" v-html="$lng('step2.included')"></div>

            </div>
          </div>
          <!-- /Calc bloc info-->

        </TheBlock>
        <!-- /Step3 -->


        <!-- Step 4 -->
        <TheBlock
          icon="step_1"
          header="TARIFAUSWAHL"
          v-if="selectedPrice.price.id && productDetails.id && (productDetails.servicePackages || productDetails.suppServices)"
        >

          <div class="kv-packages-text kv-user-text"> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </div>

          <control-packages
            :data="productDetails"
            :selectedServicePackage="selectedServicePackage"
            :selectedSuppServices="selectedSuppServices"

            @showModal="showModal"
            @changePackage="changePackage"
            @changeSuppService="changeSuppService"
            @calculate="sendCalculateAndValidate"
            v-if="productDetails.id"
          >
          </control-packages>

        </TheBlock>
        <!-- /Step 4 -->


        <!-- Step 5 -->
        <TheBlock
          icon="step_1"
          header="LIEFERUNG"
          v-if="selectedPrice.price.id && productDetails.id && pickupPoints.length && addressingCountries.length"
        >

          <ControlDeliveryType
            :selected = "delivery.type"
            @change="delivery.type = $event"
          ></ControlDeliveryType>

          <div class="kv-alert kv-alert_center" v-if="calculate.deliveryMedia === 'digital'">
            {{ $lng('step5.deliveryByEmail') }}
          </div>


          <ControlDeliveryAddress
            :addressingCountries="addressingCountries"
            :deliveryDefault="delivery"
            :isDeliveryByEmail="calculate.deliveryMedia === 'digital'"

            @isValid="steps[4].isValid = $event"
            @update="setCustomerDelivery"
            @postalReset="postalReset"
            @showModal="showModal"
            @scroll-to="scrollTo"
            ref="step5"
            v-if="delivery.type === 2"

          ></ControlDeliveryAddress>

          <ControlPostal
            :postalServices="postalServices"
            :selected="selectedPostalService"
            @change="postalChange"
            @showModal="showModal"
            ref="step6"
            v-if="delivery.type === 2 && steps[4].isValid"
          ></ControlPostal>

          <ControlPickupPoints
            :pickupPoints="pickupPoints"
            :selected="delivery.branch"
            @change="setBranch"
            v-if="delivery.type === 3"
          ></ControlPickupPoints>

        </TheBlock>


        <StatusBarInfoBottom
          :selectedCountry="selectedCountry"
          :selectedService="selectedService"
          :selectedDuration="selectedDuration"
          :selectedPrice="selectedPrice"
          class="kv-observer__statusbar"
          v-show="selectedPrice.price.id"
        >
        </StatusBarInfoBottom>


        <ReviewTotal
          :calculation="calculate.calculation"
          :totalAmount="totalAmount"
          v-if="calculate.calculation.participants.length"
        >
        </ReviewTotal>


        <div class="kv-footer-buttons">
          <button class="kv-button kv-footer-buttons__button kv-footer-buttons__buchen">Buchen</button>
          <button class="kv-button kv-footer-buttons__button kv-footer-buttons__angebot">Angebot</button>
        </div>



        <div>

        </div>




      </div>
    </div>

    <div style="margin-bottom: 200px"></div>
    <loading :active="isLoading" :can-cancel="false" :is-full-page="true" :lock-scroll="true">
    </loading>

    <vue-final-modal
      v-model="isModalShow"
      classes="modal-container"
      content-class="modal-content"
      :esc-to-close="true"
    >
      <button class="modal__close" id="kv-popup__close" @click="isModalShow = false">
        <svg class="kv-select__icon"><use href="#kv-icons_close"></use></svg>
      </button>
      <span class="modal__title" id="kv-popup__title">{{ modal.title }}</span>
      <div class="modal__content">
        <div v-html="modal.content" class="kv-user-text" id="kv-popup__content"></div>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="confirm.isShow"
      classes="modal-container"
      content-class="modal-content"
      :esc-to-close="true"
    >
      <button class="modal__close" id="kv-popup__close" @click="confirm.isShow = false">
        <svg class="kv-select__icon"><use href="#kv-icons_close"></use></svg>
      </button>
      <span class="modal__title" id="kv-popup__title">{{ confirm.title }}</span>
      <div class="modal__content">
        <div v-html="confirm.content" class="kv-user-text" id="kv-popup__content"></div>
      </div>
      <div v-if="confirmReset">
        <div class="kv-step-buttons-centered kv-modal-buttons">
          <button
            class="kv-step-button kv-step-button_second"
            @click="setResetStepDate(true)"
          >
            {{ $lng("common.btnYes") }}
          </button>
          <button class="kv-step-button" @click="setResetStepDate(false)">
            {{ $lng("common.btnNo") }}
          </button>
        </div>
      </div>
    </vue-final-modal>

  </div>
</template>
