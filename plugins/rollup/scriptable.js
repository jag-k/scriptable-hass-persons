const js = /\.[tj]sx?$/

export default function scriptableBundle(config) {
  return {
    name: 'scriptable',
    renderChunk(code, chunk, options) {
      const chunkData = {
        "always-run-in-app": config.always_run_in_app || false,
        "share-sheet-inputs": config.share_sheet_inputs ? config.share_sheet_inputs.join(', ') : null,
      }

      if (config.icon) {
        if (config.icon.color) {
          chunkData["icon-color"] = config.icon.color;
        }
        if (config.icon.glyph) {
          chunkData["icon-glyph"] = config.icon.glyph;
        }
      }

      const banner = (
        "// Variables used by Scriptable.\n" +
        "// These must be at the very top of the file. Do not edit.\n" +
        `// ${Object.entries(chunkData).map(([key, value]) =>`${key}=${value}`).join('; ')}\n`
      )

      const result = {
        ...config,
        script: code
      };

      this.emitFile({
        type: 'asset',
        name: options.file.replace(js, '.scriptable'),
        fileName: chunk.fileName.replace(js, '.scriptable'),
        source: JSON.stringify(result)
      })
      return {
        code: banner + code,
      }
    }
  };
}
