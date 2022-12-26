// Символ отсутствующей цены
export const dashSymbol = '—';

/**
 * Продолжительность обработки словами
 * @param {char} code - код продолжительности
 */
/*
export function processDurationsToWords(code) {
    return {
        h: "Stunden",
        d: "Werktage",
        m: "Monat"
    }[code]
}*/

export class CountryDefault {
    constructor() {
        this.codeA2 = null;
        this.codeA3 = null;
        this.name = "";
    }
}

// Срок визы
export class DurationDefault {
    constructor() {
        this.description = "";
        this.multiplicities = [];
        this.name = "";
        this.nameHTML = "";
        this.index = null;
    }
}
// Национальность
export class NationalityDefault {
    constructor() {
        this.codeA2 = null;
        this.codeA3 = null;
        this.name = " "
    }
}

// Цена, кратность, срок обработки
export class PriceDefault {
    constructor() {
        this.price = {
            id: null,
            m: "",
            price: null
        };
        this.info = {
            dimension: "",
            duration: "",
            hours: 0,
            quantity: 0,
        };
        this.index = null
    }
}
// Турист
export class Toursit {
    constructor() {
        this.gender = '';
        this.name = '';
        this.sname = '';
        this.nationality = {name: " ", codeA3: null, codeA2: null};
        this.residenceRegion = {name: " ", code: null};
        this.discount = null;
        this.birthDate = '';
        this.residenceRegionsRequired = false;
        this.nationalityIsFocused = true;
        this.residenceRegionsFocused = true;
        this.state = 0;
        this.stateDescription = '';
    }
}
// Калькуляция
export class calculateDefault {
    constructor() {
        this.amount = 0;
        this.calculation = {
            participants: []
        };
        this.state = 0;
        this.stateDescription = '';
        this.deliveryMedia = null
    }
}

// Сервис, группа сервисов
export class ServicesDefault {
    constructor() {
        this.id = null;
        this.srvGrpId = "";
        this.type = "";
        this.name = "";
        this.description = "";
        this.selected = false;
    }
}

// Сервисный пакет
export class ServicePackage {
    constructor() {
        this.id = null;
        this.name = '';
        this.price = 0;
        this.description = "";
        this.includedServices = [];
    }
}

// Заказчик
export class CustomerDefault {
    constructor() {
        this.isCompany = false;
        this.addressingCountry = {name: " ", codeA3: null};
        this.gender = "";
        this.sname = "";
        this.name = "";
        this.address = "";
        this.zip = "";
        this.city = "";
        this.tel = "";
        this.mobile = "";
        this.email = "";
        this.companyName = "";
    }
}

export const branchDefault = {
  id: null,
  name: "",
  countryA3: "",
  address: "",
  workingTime: "",
}
// Доставка
export class DeliveryDefault {
    constructor() {
        this.type = 0;
        this.isCompany = false;
        this.addressingCountry = {name: " ", codeA3: null};
        this.gender = "";
        this.sname = "";
        this.name = "";
        this.address = "";
        this.zip = "";
        this.city = "";
        this.tel = "";
        this.mobile = "";
        this.email = "";
        this.companyName = "";
        this.branch = {
            id: null,
            name: "",
            countryA3: "",
            address: "",
            workingTime: "",

        }
    }
}

export class PostalServiceDefault {
    constructor() {
        this.id = null;
        this.address = "";
        this.countryA3 = "";
        this.name = "";
        this.workingTime = "";
    }
}


export const deliveryTypes = ["electronic", "post-customer", "pick-up"];
