module.exports = {
  purge: [],
  theme: {
    boxShadow:{
      'bottom': '5px 5px 8px  rgba(0,0,0,0.6)'
    },
    extend: {
      width:{
        '50px' : '50px',
        '250px':'250px',
        '300px':'300px',
        '400px':'400px',
        '500px': '500px',
        '550px': '550px',
      },
      height:{
        '64px':'64px'
      },
      minWidth:{
        '550px': '550px'
      },
    },
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max': '1535px'},
      '2xl': {'min': '1536px'},
    }
  },
  variants: {
    flex: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
