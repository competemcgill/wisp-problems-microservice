module.exports = {
	parser: "@typescript-eslint/parser", // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: "module" // Allows for the use of imports
	},
	root: true,
	plugins: [
		"prettier",
		"@typescript-eslint"
 ],
	extends: [
		"prettier/@typescript-eslint",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-trailing-spaces": ["error", { "ignoreComments": true }],
		"prefer-const": "error"
	}
};