# IBAN Validation

## Installing

### Package manager

Using npm:

```bash
$ npm install @aregnet/iban-val
```

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import * as IbanVal from '@aregnet/iban-val';

console.log(IbanVal.isValid('AE070331234567890123456'));
```

If you use `require` for importing:

```js
const IbanVal = require('@aregnet/iban-val');

console.log(IbanVal.isValid('AE070331234567890123456'));
```

### CDN

Using unpkg CDN:

```html
<script src="https://www.unpkg.com/@aregnet/iban-val"></script>
```

## Example

For samples see [iban-val-sample](https://github.com/aregnet/iban-val-samples) repo.

```js
import * as IbanVal from '@aregnet/iban-val';

console.log("Full IBAN check");
console.log(IbanVal.checkIban('DE12345'));
console.log("---");

console.log("Simple IBAN check");
console.log(IbanVal.isValid('BH67BMAG00001299123456'));
```