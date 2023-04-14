module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'tailwindcss-react-native/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
