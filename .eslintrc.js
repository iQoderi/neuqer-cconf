module.exports = {
    root: true,
    parserOptions: {
        ecmascript: 6,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
    },
    extends: 'airbnb',
    rules: {
        'indent': ['error', 4, { "SwitchCase": 1 }],
        'no-param-reassign': 1,
        'arrow-body-style': 1
    },
};