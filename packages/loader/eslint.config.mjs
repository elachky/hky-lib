import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: [ 'src/**/*' ],
        // ignore: [ '' ],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType:'module',
            globals: {
                ...globals.browser,
            }
        },
    }
]
    