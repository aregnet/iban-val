import { IbanValidationError } from './error';
type IbanValidationResponse = {
    input: string;
    iban: string;
    error?: IbanValidationError;
    valid: boolean;
};
export declare function formatIban(iban: string): string;
export declare function checkIban(iban: string): IbanValidationResponse;
export declare function isValid(iban: string): boolean;
export {};
