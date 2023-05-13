export type IbanValidationError = {
    code: number;
    message: string;
};
export declare enum IbanValidationErrorCode {
    countryNotFound = 10,
    badLength = 20,
    badStructure = 30,
    badChecksum = 40,
    unknown = 99
}
export declare function getError(code: IbanValidationErrorCode): IbanValidationError;
