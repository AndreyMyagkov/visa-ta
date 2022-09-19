/**
 * @param {Object} element
 * @return {string}
 */
export function toFormUrlEncoded(element,key, list = []){
    if(typeof(element)=='object'){
        for (var idx in element)
            toFormUrlEncoded(element[idx],key?key+'['+idx+']':idx,list);
    } else {
        list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
}
