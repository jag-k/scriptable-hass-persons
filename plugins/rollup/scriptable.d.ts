import {Plugin} from 'rollup';

interface Config {
  always_run_in_app?: boolean,
  icon?: {
    color?: string,
    glyph?: string,
  },
  name: string,
  share_sheet_inputs?: Array<'file-url' | 'url' | 'image' | 'plain-text'>,
}

export default function scriptableBundle(config: Config): Plugin
