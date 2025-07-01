import catppuccin from "@catppuccin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    catppuccin({
      // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
      // default is `false`, which means no prefix
      prefix: "ctp",
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: "macchiato",
    }),
  ],
};
