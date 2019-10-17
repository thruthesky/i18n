# i18n

Language Translation Library

## How to use

```` ts
import { i18n } from '@libs/i18n/i18n.service'; // it's in `libs` folder.
import { texts } from '@src/i18n/texts'; // it's in `src/texts` folder.
export class AppService() {
    constructor() {
        this.i18n.texts = texts; // set texts dynamically.
        setTimeout(() => this.i18n.languageCode = 'ko', 3000); // change language dynamically.
    }

    t(code: any, info: any): string {
        return this.i18n.t(code, info);
    }
````

* How to use it in template

```` ts
    {{ a.t('email') }}
    {{ t({ko: '어서오세요 #name님', en: 'Welcome, #name.'}, {name: 'ABC'}) }}
````
