import { assert } from 'chai';
import { getError, IbanValidationErrorCode } from '../src/error';

describe('Iban Val Error', function () {
    describe('getError', function () {
        it('should return countryNotFound error', function () {
            const res = getError(IbanValidationErrorCode.countryNotFound);
            assert.equal(res.message, 'Country not found');
        });
        it('should return badLength error', function () {
            const res = getError(IbanValidationErrorCode.badLength);
            assert.equal(res.message, 'Bad length');
        });
        it('should return badStructure error', function () {
            const res = getError(IbanValidationErrorCode.badStructure);
            assert.equal(res.message, 'Bad structure');
        });
        it('should return badChecksum error', function () {
            const res = getError(IbanValidationErrorCode.badChecksum);
            assert.equal(res.message, 'Bad checksum');
        });
        it('should return unknown error', function () {
            const res = getError(IbanValidationErrorCode.unknown);
            assert.equal(res.message, 'Unknown');
        });
    });
});
