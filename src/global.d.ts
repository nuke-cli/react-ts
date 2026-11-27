// Stylesheets are handled by webpack (style-loader/css-loader/sass-loader) and mapped
// to identity-obj-proxy in Jest. Declaring them lets `tsc` accept side-effect imports
// such as `import './index.scss'` under `noUncheckedSideEffectImports`.
declare module '*.scss';
declare module '*.css';
