import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [
    {
      path: 'pages/index/index',
      style: {
        navigationBarTitleText: 'uni-app',
      },
    },
  ],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
    h5: {
      navigationStyle: 'custom',
    },
  },
})
