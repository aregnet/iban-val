import { assert } from 'chai';
import * as IbanVal from '../src/index';
import { IbanValidationErrorCode } from '../src/error';

const validIbans = [
    'AD1200012030200359100100',
    'AE070331234567890123456',
    'AL47212110090000000235698741',
    'AT611904300234573201',
    'AZ21NABZ00000000137010001944',
    'BA391290079401028494',
    'BE68539007547034',
    'BG80BNBG96611020345678',
    'BH67BMAG00001299123456',
    'BR9700360305000010009795493P1',
    'CH9300762011623852957',
    'CR05015202001026284066',
    'CY17002001280000001200527600',
    'CZ6508000000192000145399',
    'DE89370400440532013000',
    'DK5000400440116243',
    'DO28BAGR00000001212453611324',
    'EE382200221020145685',
    'ES9121000418450200051332',
    'FI2112345600000785',
    'FO6264600001631634',
    'FR1420041010050500013M02606',
    'GB29NWBK60161331926819',
    'GE29NB0000000101904917',
    'GI75NWBK000000007099453',
    'GL8964710001000206',
    'GR1601101250000000012300695',
    'GT82TRAJ01020000001210029690',
    'HR1210010051863000160',
    'HU42117730161111101800000000',
    'IE29AIBK93115212345678',
    'IL620108000000099999999',
    'IS140159260076545510730339',
    'IT60X0542811101000000123456',
    'JO94CBJO0010000000000131000302',
    'KW81CBKU0000000000001234560101',
    'KZ86125KZT5004100100',
    'LB62099900000001001901229114',
    'LC55HEMM000100010012001200023015',
    'LI21088100002324013AA',
    'LT121000011101001000',
    'LU280019400644750000',
    'LV80BANK0000435195001',
    'MC5811222000010123456789030',
    'MD24AG000225100013104168',
    'ME25505000012345678951',
    'MK07250120000058984',
    'MR1300020001010000123456753',
    'MT84MALT011000012345MTLCAST001S',
    'MU17BOMM0101101030300200000MUR',
    'NL91ABNA0417164300',
    'NO9386011117947',
    'PK36SCBL0000001123456702',
    'PL61109010140000071219812874',
    'PS92PALS000000000400123456702',
    'PT50000201231234567890154',
    'QA58DOHB00001234567890ABCDEFG',
    'RO49AAAA1B31007593840000',
    'RS35260005601001611379',
    'SA0380000000608010167519',
    'SC18SSCB11010000000000001497USD',
    'SE4550000000058398257466',
    'SI56263300012039086',
    'SK3112000000198742637541',
    'SM86U0322509800000000270100',
    'ST68000100010051845310112',
    'TL380080012345678910157',
    'TN5910006035183598478831',
    'TR330006100519786457841326',
    'UA213996220000026007233566001',
    'VG96VPVG0000012345678901',
    'XK051212012345678906'
];

describe('Iban Val', function () {
    describe('isValid', function () {
        it('should return true when the iban is valid', function () {
            validIbans.forEach((el) => {
                assert.equal(IbanVal.isValid(el), true);
            });
        });
        it('should return false when the iban is invalid', function () {
            validIbans.forEach((el) => {
                assert.equal(IbanVal.isValid(el.substring(0, el.length - 3)), false);
            });
        });
        it('should return false when the country code not found', function () {
            assert.equal(IbanVal.isValid('WW123454124'), false);
        });
        it('should return false when the structure is not valid', function () {
            assert.equal(IbanVal.isValid('DE8937040A440532013000'), false);
        });
        it('should return false when the checksum is not valid', function () {
            assert.equal(IbanVal.isValid('DE89370410440532013000'), false);
        });
    });

    describe('checkIban', function () {
        it('should return valid object when the iban is valid', function () {
            validIbans.forEach((el) => {
                const res = IbanVal.checkIban(el);
                assert.equal(res.valid, true);
            });
        });
        it('should return bad country when the country code not found', function () {
            const res = IbanVal.checkIban('WW123454124');
            assert.equal(res.error?.code, IbanValidationErrorCode.countryNotFound);
            assert.equal(res.valid, false);
        });
        it('should return bad structure when the structure is not valid', function () {
            const res = IbanVal.checkIban('DE8937040A440532013000');
            assert.equal(res.error?.code, IbanValidationErrorCode.badStructure);
            assert.equal(res.valid, false);
        });
        it('should return bad checksum when the checksum is not valid', function () {
            const res = IbanVal.checkIban('DE89370410440532013000');
            assert.equal(res.error?.code, IbanValidationErrorCode.badChecksum);
            assert.equal(res.valid, false);
        });
    });

    describe('formatIban', function () {
        it('should return formatted Iban without whitespaces', function () {
            assert.equal(IbanVal.formatIban('DE 45 5543 23123'), 'DE45554323123');
            assert.equal(IbanVal.formatIban('DE45554323123'), 'DE45554323123');
        });
    });
});
