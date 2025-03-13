module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        // 'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'project-my-plugin',
        'unused-imports',
    ],
    rules: {
        // Превым аргументом передает, 0-отключаем правильн,1-выдает предупреждение,2-ощибку
        // оступы для jsx
        'react/jsx-indent': [2, 4],
        // отсупы для пропсов для jsx
        'react/jsx-indent-props': [2, 4],
        // отсупы для обычного кода
        indent: [2, 4],
        // разметка jsx в каких файлах может применться
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        // чтобы не ругался на абсолют пути
        'import/no-unresolved': 'off',
        // чтобы не ругался на то что мы не используем дефолтный экспорт
        'import/prefer-default-export': 'off',
        // на неиспользование элемента
        'no-unused-vars': 'off',
        'implicit-arrow-linebreak': 'off',
        'object-curly-newline': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'arrow-body-style': 'off',
        // чтобы не ругался на отсутвсвие дефолтного значения у пропса
        'react/require-default-props': 'off',
        // для того чтобы не импортировали реакт в компоненты
        'react/react-in-jsx-scope': 'off',
        'react/destructuring-assignment': 'off',
        // Спред для пропрос
        'react/jsx-props-no-spreading': 'warn',
        // для того чтобы могли использовать стрелочную функцию для компонентов
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        // Чтобы не указывать расширение
        'import/extensions': 'off',
        // Чтобы могли испортировать дев зависимости
        'import/no-extraneous-dependencies': 'off',
        // Для нижних подчеркиваний в переменных
        'no-underscore-dangle': 'off',
        'linebreak-style': 0,
        semi: 0,
        'i18next/no-literal-string': [
            'off',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'target',
                    'justify',
                    'align',
                    'direction',
                    'gap',
                    'role',
                    'as',
                    'border',
                    'name',
                    'color',
                    'variant',
                    'wrap',
                    'size',
                ],
            },
        ],
        // Максимальная длинна комментариев
        'max-len': [
            'error',
            {
                ignoreComments: true,
                code: 135,
            },
        ],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'react/prop-types': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'react/jsx-no-useless-fragment': 'warn',
        'project-my-plugin/path-checker': ['error', { alias: '@' }],
        'project-my-plugin/layer-imports': [
            'error',
            { alias: '@', ignoreImportPatterns: ['**/StoreProvider'] },
        ],
        'project-my-plugin/public-api-impots': ['error', { alias: '@' }],
        'unused-imports/no-unused-imports': 'error',
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
}
