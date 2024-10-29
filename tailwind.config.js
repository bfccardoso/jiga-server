/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Adicione o caminho para os arquivos EJS
    './views/*.ejs', // Adicione o caminho para os arquivos EJS
    './public/**/*.html', // Se você tiver HTML no público
    './src/**/*.js', // Se houver JS que use Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
