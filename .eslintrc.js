module.exports = {
    extends: [require.resolve("@vertigis/workflow-sdk/config/.eslintrc")],
    rules: {
        "@typescript-eslint/no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        name: "@vertigis/workflow",
                        message:
                            "This project should only reference types from @vertigis/workflow.",
                        allowTypeImports: true,
                    },
                ],
            },
        ],
        "no-restricted-imports": "off",
    },
};
