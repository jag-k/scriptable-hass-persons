import typescript from '@rollup/plugin-typescript';
import scriptableBundle from "@jag-k/rollup-plugin-scriptable";
import * as config from "./config.json";
import copy from 'rollup-plugin-copy';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {homedir} from "os";

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
    nodeResolve(),
    typescript(),
    ...(
      process.env.COPY_TO_ICLOUD === 'true' ? [
        copy({
          verbose: true,
          hook: 'writeBundle',
          targets: [
            {
              src: `${DIST_DIR}/*.js`,
              dest: `${homedir()}/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents`
            },
          ]
        })
      ] : []
    )
  ]
};
