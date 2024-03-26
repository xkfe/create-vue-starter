import type { PluginOption } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

/**
 * @description: Vite plugin list
 * @param {*} PluginOption
 * @return {*}
 */
export function vitePlugins(): (PluginOption | PluginOption[])[] {
  return [
    // 带ts类型的manifest.json，编译后会同步到manifest.json https://github.com/uni-helper/vite-plugin-uni-manifest
    UniHelperManifest(),

    // 带ts类型的pages.json,编译后会同步到pages.json
    UniPages({
      dts: './typings/uni-pages.d.ts',
    }),

    UniHelperComponents({
      dts: './typings/components.d.ts',
      // 允许子目录作为组件的命名空间前缀。例如：/components/uni/uni-badge.vue -> <uni-badge />
      directoryAsNamespace: true,
      resolvers: [WotResolver()],
    }),

    Uni(),

    Unocss(),

    // https://github.com/unplugin/unplugin-auto-import 配置自动导入 vue相关函数, uni-app相关函数。ref, reactive，onLoad等
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dirs: [
        'src/stores/*',
      ],
      dts: './typings/auto-imports.d.ts',
    }),

    // TODO: 集成 pwa 插件
  ]
};
