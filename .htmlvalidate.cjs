/* HTML validation for dist/ (08-qa-and-launch.md, "HTML validity"). */
module.exports = {
  extends: ['html-validate:recommended'],
  rules: {
    // Formatting-only rules that conflict with Astro's compressed output.
    'no-trailing-whitespace': 'off',
    'void-style': 'off',
    'attribute-boolean-style': 'off',
    'attribute-empty-style': 'off',
    'long-title': 'off',
    // Kept on purpose: Safari/VoiceOver drops list semantics from lists styled with
    // list-style: none, so those lists carry an explicit role="list".
    'no-redundant-role': 'off',
    // Focusable horizontal scroll containers use role="region" + aria-label (04, Breakpoints).
    'prefer-native-element': ['error', { exclude: ['region'] }],
    'no-inline-style': 'error',
  },
};
