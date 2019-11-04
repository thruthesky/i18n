

/**
 * This returns translated text of the code.
 * @param code text code to get the translated text of
 * @example
 *      i18n.texts = {hello: {en: 'Helo, #name', ko: '안녕, #name'}};
 *      i18n.languageCode = 'ko';
 *      console.log('i18n.texts', i18n.texts);
 *      console.log('hello: ', i18n.t('hello', {name: '친구야'}));
 *
 * @example
 *      class ComponentClass {
 *          t(code, info) {
 *              i18n.t(code, info);
 *          }
 *      }
 *      {{ t('name') }}       // `name` is the key in `texts.ts`
 *      {{ t({en: '...', ko: '...' }) }}  // You can input the complete translation in page.
 *                                        // This is handy for faster coding only if it is used in one time.
 *      {{ t({ko: '어서오세요 #name님', en: 'Welcome, #name.'}, {name: 'ABC'}) }}    // text object with text translation
 */
export class i18n {
    static languageCode: string;
    static texts: any;


    /**
     *
     * @note If test of `languageCode` does not exists, it falls back to `en` text.
     * @param code code
     * @param info patch information
     */
    static t(code: any, info?: any): string {
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
    static patchMarker(str: string, info: object = null): string {

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
     * @note If test of `languageCode` does not exists, it falls back to `en` text.
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
    static translate(code: object, info?: object): string {
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
