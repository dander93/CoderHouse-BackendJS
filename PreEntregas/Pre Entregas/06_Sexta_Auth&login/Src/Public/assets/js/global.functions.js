
window.datalayer = window.datalayer || {};

window.datalayer.mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isValidMailFormat(mail) {
    return window.datalayer.mailRegex.test(mail);
}

function textToCurrency(text) {
    return text.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        currencyDisplay: 'symbol'
    });
}