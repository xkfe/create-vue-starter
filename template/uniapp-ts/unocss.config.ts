/*
 * @Author: xkfe zkai98516@gmail.com
 * @Date: 2024-01-12 13:33:52
 * @LastEditors: xkfe zkai98516@gmail.com
 * @LastEditTime: 2024-03-19 16:56:31
 * @FilePath: /uni-starter/unocss.config.ts
 * @Description: 社区预设1 https://github.com/MellowCo/unocss-preset-weapp
 * @Description: 当前社区预设2 https://github.com/unocss-applet/unocss-applet
 */

import process from 'node:process'
import { defineConfig, presetAttributify, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import type { Preset, SourceCodeTransformer } from 'unocss'

// 把默认rem单位改为px单位，在通过postcss-pxtorem进行rem转换
import presetRemToPx from '@unocss/preset-rem-to-px'

import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from 'unocss-applet'

// uni-app
const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false
const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (isApplet) {
  presets.push(presetApplet())
  presets.push(presetRemRpx({ baseFontSize: 4 }))
  transformers.push(transformerApplet())
  transformers.push(transformerAttributify({ ignoreAttributes: ['block'] }))
}
else {
  presets.push(presetUno())
  presets.push(presetAttributify())
  presets.push(presetRemToPx({ baseFontSize: 4 }))
}

export default defineConfig({
  // 快捷方式
  shortcuts: [
    { center: 'flex items-center justify-center' },

  ],
  // 预设
  presets: [
    ...presets,
  ],
  transformers: [
    // https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers,
  ],
  rules: [],
})
