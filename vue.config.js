import { defineConfig } from 'vite';
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/FIT5032/'
      : '/'
  }
  // should be right