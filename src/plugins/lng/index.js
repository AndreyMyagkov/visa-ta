import {lng} from "./lng.js"
export default {
    install (Vue, config) {
        Vue.config.globalProperties.$lngCurrent = config;
        Vue.config.globalProperties.$lng = function (key) {
            return iterate(lng[Vue.config.globalProperties.$lngCurrent],key )
        }

    }
}

function iterate(obj, key) {
    if (!key.length) {return ""}

    if (!Array.isArray(key)) {
        key = key.split(".");
    }

    if (key.length > 1) {
        const firstKey= key[0];
        key.shift();
        return iterate(obj[firstKey], key)
    } else {
        // eslint-disable-next-line no-prototype-builtins
        if (obj && obj.hasOwnProperty(key)) {
            return obj[key]
        } else {
            return ""
        }
    }
}
