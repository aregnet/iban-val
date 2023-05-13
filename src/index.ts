import { IbanValidationDefinition, ibanValidationDefinitions } from './definition';
import { getError, IbanValidationError, IbanValidationErrorCode } from './error';

type IbanValidationResponse = {
    input: string;
    iban: string;
    error?: IbanValidationError;
    valid: boolean;
};

export function formatIban(iban: string): string {
    return iban.replace(/\s/g, '').toUpperCase();
}

export function checkIban(iban: string): IbanValidationResponse {
    const ibanFormatted = formatIban(iban);
    const country = ibanFormatted.substring(0, 2);

    const res: IbanValidationResponse = {
        input: iban,
        iban: ibanFormatted,
        valid: false
    };

    const ibanValDef: IbanValidationDefinition | undefined = ibanValidationDefinitions.find(
        (el: IbanValidationDefinition): boolean => el.code === country
    );

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

    let ibanRestructured: string = ibanFormatted.substring(4);
    ibanRestructured += ibanFormatted.substring(0, 4);

    let ibanAsNumbers = '';

    [...ibanRestructured].forEach((c) => {
        if (/[A-Z]/.test(c)) {
            ibanAsNumbers += String(c.charCodeAt(0) - 55);
        } else {
            ibanAsNumbers += String(c);
        }
    });

    const modRes: number = modulo(ibanAsNumbers, 97);

    if (modRes !== 1) {
        res.error = getError(IbanValidationErrorCode.badChecksum);
        return res;
    }

    res.valid = true;
    return res;
}

export function isValid(iban: string): boolean {
    const checkRes = checkIban(iban);
    return checkRes.valid;
}

function modulo(dividend: string, divisor: number): number {
    const partLength = 7;

    while (dividend.length > partLength) {
        const part: number = parseInt(dividend.substring(0, partLength));
        dividend = (part % divisor) + dividend.substring(partLength);
    }

    return parseInt(dividend) % divisor;
}
