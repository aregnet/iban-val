export type IbanValidationDefinition = {
    code: string;
    length: number;
    structure: RegExp;
};
export declare const ibanValidationDefinitions: Array<IbanValidationDefinition>;
