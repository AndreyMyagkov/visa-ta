/**
 * Разбивает массив array на массив подмассивов длинной size
 * @param {Array} array - входной массив
 * @param {Number} size - длинна подмассива
 * @return {Array}
 */
export function arrayToSubArrays(array = [], size = 1){
    if (array === null) {
        return []
    }
    const subarray = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++){
        subarray[i] = array.slice((i * size), (i * size) + size);
    }
    return subarray
}

/**
 * Перобразует массив в двумерный массив для вывода данных колонками
 * @param {Array} array - исходный массив
 * @param {Number} columns - кол-во колонок
 * @return {Array}
 */
export function arrayToCols(array = [], columns = 2) {
    const columns_size = Math.ceil(array.length / columns);
    const sliced_array = [];

    for (let i = 0; i < columns_size; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            if (i + columns_size * j < array.length) {
                row.push(array[i + columns_size * j])
            }
        }
        sliced_array.push(row);
    }
    return sliced_array
}
