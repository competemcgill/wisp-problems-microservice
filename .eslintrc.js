module.exports = {
	parser: "@typescript-eslint/parser", // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: "module" // Allows for the use of imports
	},
	extends: [
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended"
	],
	rules: {
		// "indent": ["error", 4],
		// "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
		// "no-var": "warn",
		// "quotes": ["error", "single", { "avoidEscape": true }],
		// "semi": ["error", "always"],
		// "curly": "error",
		//
		// "no-trailing-spaces": ["error", { "skipBlankLines": true , "ignoreComments": true }],
		// "prefer-const": "error"
	}
};