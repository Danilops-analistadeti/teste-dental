const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  ['auth-lib'], ['energy-contracting']
]);

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      shared: {
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: '12.x',
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: '12.x',
        },
        '@angular/router': {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: '12.x',
        },
        '@angular/common/http': {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: '12.x',
        },
        '@angular/cdk': {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: '12.x',
        },
        '@angular/material': {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: '12.x',
        },

        '@ngxs/store': {
          singleton: true,
          eager: true,
          requiredVersion: '3.x.x',
        },

        'auth-lib': {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: '0.x',
        },

        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
