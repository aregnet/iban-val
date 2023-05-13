/*!
 * Copyright 2023 Alexander Regnet
 */

var IbanVal = (function (exports) {
    'use strict';

    const ibanValidationDefinitions = [
        { code: 'AD', length: 24, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{4})([0-9A-Z]{12})/ },
        { code: 'AE', length: 23, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{16})/ },
        { code: 'AL', length: 28, structure: /([0-9A-Z]{4})([0-9]{8})([0-9A-Z]{16})/ },
        { code: 'AT', length: 20, structure: /([0-9A-Z]{4})([0-9]{5})([0-9]{11})/ },
        { code: 'AZ', length: 28, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{20})/ },
        { code: 'BA', length: 20, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{3})([0-9]{8})([0-9]{2})/ },
        { code: 'BE', length: 16, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{7})([0-9]{2})/ },
        { code: 'BG', length: 22, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{14})/ },
        { code: 'BH', length: 22, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{14})/ },
        { code: 'BR', length: 29, structure: /([0-9A-Z]{4})([0-9]{8})([0-9]{5})([0-9]{10})([A-Z]{1})([0-9A-Z]{1})/ },
        { code: 'CH', length: 21, structure: /([0-9A-Z]{4})([0-9]{5})([0-9A-Z]{12})/ },
        { code: 'CR', length: 22, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{14})/ },
        { code: 'CY', length: 28, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{5})([0-9A-Z]{16})/ },
        { code: 'CZ', length: 24, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{6})([0-9]{10})/ },
        { code: 'DE', length: 22, structure: /([0-9A-Z]{4})([0-9]{8})([0-9]{10})/ },
        { code: 'DK', length: 18, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{9})([0-9]{1})/ },
        { code: 'DO', length: 28, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{20})/ },
        { code: 'EE', length: 20, structure: /([0-9A-Z]{4})([0-9]{2})([0-9]{2})([0-9]{11})([0-9]{1})/ },
        { code: 'ES', length: 24, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{4})([0-9]{1})([0-9]{1})([0-9]{10})/ },
        { code: 'FI', length: 18, structure: /([0-9A-Z]{4})([0-9]{6})([0-9]{7})([0-9]{1})/ },
        { code: 'FO', length: 18, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{9})([0-9]{1})/ },
        { code: 'FR', length: 27, structure: /([0-9A-Z]{4})([0-9]{5})([0-9]{5})([0-9A-Z]{11})([0-9]{2})/ },
        { code: 'GB', length: 22, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{6})([0-9]{8})/ },
        { code: 'GE', length: 22, structure: /([0-9A-Z]{4})([A-Z]{2})([0-9]{16})/ },
        { code: 'GI', length: 23, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{15})/ },
        { code: 'GL', length: 18, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{9})([0-9]{1})/ },
        { code: 'GR', length: 27, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{4})([0-9A-Z]{16})/ },
        { code: 'GT', length: 28, structure: /([0-9A-Z]{4})([0-9A-Z]{4})([0-9A-Z]{20})/ },
        { code: 'HR', length: 21, structure: /([0-9A-Z]{4})([0-9]{7})([0-9]{10})/ },
        { code: 'HU', length: 28, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{4})([0-9]{1})([0-9]{15})([0-9]{1})/ },
        { code: 'IE', length: 22, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{6})([0-9]{8})/ },
        { code: 'IL', length: 23, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{3})([0-9]{13})/ },
        { code: 'IS', length: 26, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{2})([0-9]{6})([0-9]{10})/ },
        { code: 'IT', length: 27, structure: /([0-9A-Z]{4})([A-Z]{1})([0-9]{5})([0-9]{5})([0-9A-Z]{12})/ },
        { code: 'JO', length: 30, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{4})([0-9A-Z]{18})/ },
        { code: 'KW', length: 30, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{22})/ },
        { code: 'KZ', length: 20, structure: /([0-9A-Z]{4})([0-9]{3})([0-9A-Z]{13})/ },
        { code: 'LB', length: 28, structure: /([0-9A-Z]{4})([0-9]{4})([0-9A-Z]{20})/ },
        { code: 'LC', length: 32, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{24})/ },
        { code: 'LI', length: 21, structure: /([0-9A-Z]{4})([0-9]{5})([0-9A-Z]{12})/ },
        { code: 'LT', length: 20, structure: /([0-9A-Z]{4})([0-9]{5})([0-9]{11})/ },
        { code: 'LU', length: 20, structure: /([0-9A-Z]{4})([0-9]{3})([0-9A-Z]{13})/ },
        { code: 'LV', length: 21, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{13})/ },
        { code: 'MC', length: 27, structure: /([0-9A-Z]{4})([0-9]{5})([0-9]{5})([0-9A-Z]{11})([0-9]{2})/ },
        { code: 'MD', length: 24, structure: /([0-9A-Z]{4})([0-9A-Z]{2})([0-9A-Z]{18})/ },
        { code: 'ME', length: 22, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{13})([0-9]{2})/ },
        { code: 'MK', length: 19, structure: /([0-9A-Z]{4})([0-9]{3})([0-9A-Z]{10})([0-9]{2})/ },
        { code: 'MR', length: 27, structure: /([0-9A-Z]{4})([0-9]{5})([0-9]{5})([0-9]{11})([0-9]{2})/ },
        { code: 'MT', length: 31, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{5})([0-9A-Z]{18})/ },
        { code: 'MU', length: 30, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{2})([0-9]{2})([0-9]{12})([0-9]{3})([A-Z]{3})/ },
        { code: 'NL', length: 18, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{10})/ },
        { code: 'NO', length: 15, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{6})([0-9]{1})/ },
        { code: 'PK', length: 24, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{16})/ },
        { code: 'PL', length: 28, structure: /([0-9A-Z]{4})([0-9]{8})([0-9]{16})/ },
        { code: 'PS', length: 29, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{21})/ },
        { code: 'PT', length: 25, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{4})([0-9]{11})([0-9]{2})/ },
        { code: 'QA', length: 29, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{21})/ },
        { code: 'RO', length: 24, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9A-Z]{16})/ },
        { code: 'RS', length: 22, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{13})([0-9]{2})/ },
        { code: 'SA', length: 24, structure: /([0-9A-Z]{4})([0-9]{2})([0-9A-Z]{18})/ },
        { code: 'SC', length: 31, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{2})([0-9]{2})([0-9]{16})([A-Z]{3})/ },
        { code: 'SE', length: 24, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{16})([0-9]{1})/ },
        { code: 'SI', length: 19, structure: /([0-9A-Z]{4})([0-9]{5})([0-9]{8})([0-9]{2})/ },
        { code: 'SK', length: 24, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{6})([0-9]{10})/ },
        { code: 'SM', length: 27, structure: /([0-9A-Z]{4})([A-Z]{1})([0-9]{5})([0-9]{5})([0-9A-Z]{12})/ },
        { code: 'ST', length: 25, structure: /([0-9A-Z]{4})([0-9]{8})([0-9]{11})([0-9]{2})/ },
        { code: 'TL', length: 23, structure: /([0-9A-Z]{4})([0-9]{3})([0-9]{14})([0-9]{2})/ },
        { code: 'TN', length: 24, structure: /([0-9A-Z]{4})([0-9]{2})([0-9]{3})([0-9]{13})([0-9]{2})/ },
        { code: 'TR', length: 26, structure: /([0-9A-Z]{4})([0-9]{5})([0-9A-Z]{1})([0-9A-Z]{16})/ },
        { code: 'UA', length: 29, structure: /([0-9A-Z]{4})([0-9]{6})([0-9A-Z]{19})/ },
        { code: 'VG', length: 24, structure: /([0-9A-Z]{4})([A-Z]{4})([0-9]{16})/ },
        { code: 'XK', length: 20, structure: /([0-9A-Z]{4})([0-9]{4})([0-9]{10})([0-9]{2})/ }
    ];

    var IbanValidationErrorCode;
    (function (IbanValidationErrorCode) {
        IbanValidationErrorCode[IbanValidationErrorCode["countryNotFound"] = 10] = "countryNotFound";
        IbanValidationErrorCode[IbanValidationErrorCode["badLength"] = 20] = "badLength";
        IbanValidationErrorCode[IbanValidationErrorCode["badStructure"] = 30] = "badStructure";
        IbanValidationErrorCode[IbanValidationErrorCode["badChecksum"] = 40] = "badChecksum";
        IbanValidationErrorCode[IbanValidationErrorCode["unknown"] = 99] = "unknown";
    })(IbanValidationErrorCode || (IbanValidationErrorCode = {}));
    function getError(code) {
        switch (code) {
            case IbanValidationErrorCode.countryNotFound:
                return { code: code, message: 'Country not found' };
            case IbanValidationErrorCode.badLength:
                return { code: code, message: 'Bad length' };
            case IbanValidationErrorCode.badStructure:
                return { code: code, message: 'Bad structure' };
            case IbanValidationErrorCode.badChecksum:
                return { code: code, message: 'Bad checksum' };
            default:
                return { code: IbanValidationErrorCode.unknown, message: 'Unknown' };
        }
    }

    function formatIban(iban) {
        return iban.replace(/\s/g, '').toUpperCase();
    }
    function checkIban(iban) {
        const ibanFormatted = formatIban(iban);
        const country = ibanFormatted.substring(0, 2);
        const res = {
            input: iban,
            iban: ibanFormatted,
            valid: false
        };
        const ibanValDef = ibanValidationDefinitions.find((el) => el.code === country);
        if (ibanValDef === undefined) {
            res.error = getError(IbanValidationErrorCode.countryNotFound);
            return res;
        }
        if (ibanValDef.length !== ibanFormatted.length) {
            res.error = getError(IbanValidationErrorCode.badLength);
            return res;
        }
        if (!ibanValDef.structure.test(ibanFormatted)) {
            res.error = getError(IbanValidationErrorCode.badStructure);
            return res;
        }
        let ibanRestructured = ibanFormatted.substring(4);
        ibanRestructured += ibanFormatted.substring(0, 4);
        let ibanAsNumbers = '';
        [...ibanRestructured].forEach((c) => {
            if (/[A-Z]/.test(c)) {
                ibanAsNumbers += String(c.charCodeAt(0) - 55);
            }
            else {
                ibanAsNumbers += String(c);
            }
        });
        const modRes = modulo(ibanAsNumbers, 97);
        if (modRes !== 1) {
            res.error = getError(IbanValidationErrorCode.badChecksum);
            return res;
        }
        res.valid = true;
        return res;
    }
    function isValid(iban) {
        const checkRes = checkIban(iban);
        return checkRes.valid;
    }
    function modulo(dividend, divisor) {
        const partLength = 7;
        while (dividend.length > partLength) {
            const part = parseInt(dividend.substring(0, partLength));
            dividend = (part % divisor) + dividend.substring(partLength);
        }
        return parseInt(dividend) % divisor;
    }

    exports.checkIban = checkIban;
    exports.formatIban = formatIban;
    exports.isValid = isValid;

    return exports;

})({});
//# sourceMappingURL=iban-val.js.map
