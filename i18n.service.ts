import { Injectable } from '@angular/core';



/**
 * This returns translated text of the code.
 * @param code text code to get the translated text of
 * @example
 *      class ComponentClass {
 *          t = t;
 *      }
 *      {{ t('name') }}       // `name` is the key in `texts.ts`
 *      {{ t({en: '...', ko: '...' }) }}  // You can input the complete translation in page.
 *                                        // This is handy for faster coding only if it is used in one time.
 *      {{ t({ko: '어서오세요 #name님', en: 'Welcome, #name.'}, {name: 'ABC'}) }}    // text object with text translation
 */
export class i18n {
    languageCode: string;
    texts: any;


    t(code: any, info: any): string {
        // console.log('languageCode', this.languageCode);
        if (!code) {
            return 'No code';
        }


        if (typeof code === 'string') {

            // if texts of `code` does not exists, then compare with lower case
            if (this.texts[code] === void 0) {
                const temp = code;
                code = code.toLowerCase();
                // if texts of lower case `code` does not exists, then return origianl code.
                if (this.texts[code] === void 0) {
                    return temp;
                }
            }

            return this.translate(this.texts[code], info);
        } else {
            return this.translate(code, info);
        }
    }



    /**
     *
     * Returns a string after patching error information.
     * @param str Error string
     * @param info Error information to patch into the string
     *
     *
     *
     * @return patched string
     *
     * @code
     *      _.patchmarker( 'Unknown #no', {no: 123} ) // returns 'Unknown 123'
     *
     */
    patchMarker(str: string, info: object = null): string {

        if (info === null || typeof info !== 'object') {
            return str;
        }
        const keys = Object.keys(info);
        if (!keys.length) {
            return str;
        }

        for (const k of keys) {
            str = str.replace('#' + k, (<string>info[k]));
        }
        return str;
    }

    /**
     * Returns translated text string.
     * @param code code and text to translate
     * @param info information to add on the translated text
     * @note This is a complete function for text translation.
     *    - If you have json like below,
     *    text = {
     *      name: {
     *        en: 'Name',
     *        ko: '이름'
     *      }
     *    }
     *    - If you have a big json file, you may cache in localStorage.
     * @example this.t( text.name )
     * @example
     *    this.translate({en: 'Name: #name', ko: '이름: #name'}, {name: 'JaeHo'});
     */
    translate(code: object, info?: object): string {
        // console.log('lang: ', this.languageCode);
        if (!code) {
            return 'CODE_EMPTY';
        }

        // console.log('code: ', this.languageCode, code);
        let str = code[this.languageCode];
        if (!str) {
            str = code['en'];
        }
        return this.patchMarker(str, info);
    }

}
