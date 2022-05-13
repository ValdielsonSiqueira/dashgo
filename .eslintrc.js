{
"plugins": ["@typescript-eslint"],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    // I suggest you add those two rules:
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  }
}