import typescript from '@rollup/plugin-typescript';
import scriptableBundle from "./plugins/rollup/scriptable";
import * as config from "./config.json";
import copy from 'rollup-plugin-copy';

const DIST_DIR = 'dist';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: `${DIST_DIR}/${config.name}.js`,
      format: 'es',
      plugins: [scriptableBundle(config)]
    },
  ],
  plugins: [
    typescript(),
    ...(
      process.env.COPY_TO_ICLOUD === 'true' ? [
        copy({
          targets: [
            {
              src: `${DIST_DIR}/*.js`,
              dest: '~/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/'
            },
          ]
        })
      ] : []
    )
  ]
};
