export type IbanValidationError = {
    code: number;
    message: string;
};

export enum IbanValidationErrorCode {
    countryNotFound = 10,
    badLength = 20,
    badStructure = 30,
    badChecksum = 40,
    unknown = 99
}

export function getError(code: IbanValidationErrorCode): IbanValidationError {
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
