import { defineConfig, presetUno, transformerVariantGroup } from 'unocss'
import { presetMaterial } from 'unocss-preset-material'
import { fromHex } from 'unocss-preset-material/utils'

export default defineConfig({
  presets: [
    presetUno(),
    presetMaterial({
      colors: {
        themes: [
          {
            isDark: true,
            colors: {
              primary: fromHex('#00aaff'),
              tertiary: fromHex('#00ffaa'),
            },
          },
        ],
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
  cli: {
    entry: {
      patterns: ['src/index.html', 'src/**/*.component.ts', 'src/**/*.component.html'],
      outFile: 'src/styles/uno.css',
    },
  },
})
