export function priceFormat(price) {
    if (price === null) {
        return price
    }
    let minimumFractionDigits = 0;
    if (!Number.isInteger(price)) {
        minimumFractionDigits = 2;
    }
    price = new Intl.NumberFormat('de-DE', {
        'style': 'decimal',
        'useGrouping': true,
        'minimumFractionDigits': minimumFractionDigits
    }).format(price);
    //price = parseFloat(price);
    return price
}
