module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#6366f1',
        light: '#f9fafb',
        surface: '#ffffff',
        text: '#111827',
      },
      boxShadow: {
        card: '0 4px 10px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
