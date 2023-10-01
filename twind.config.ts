import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        'soft-white': '#FAFAFA',
        'light-grey': '#E5E5E5',
        'dark-charcoal': '#333333',
        grey: '#7D7D7D',
        teal: '#007F9C',
        'warm-beige': '#D6BC8A',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],  // You can adjust this to your preferred font
    },
  },
  plugins: {
    // Any custom plugins you might need
  }
} as Options;
