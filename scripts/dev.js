// 这个文件会帮我们打包 packages下的模块， 最终打包出js 文件

// node dev.js (要打包的名字 -f 打包的格式) === argv.slice(2)
import minimist from "minimist";
import { createRequire } from "module";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';
//node中的命令函参数通过process 来获取 process.argv
const args = minimist(process.argv.slice(2))
const __filename = fileURLToPath(import.meta.url); //获取文件的绝对路径 file: -> /usr
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const target = args._[0] || 'reactivity';  //打包哪个项目
const format = args.f || 'life';  //打包后的模块化规范


//入口文件 根据命令行提供的路径来解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);

//根据需要进行打包
esbuild.context({
  entryPoints: [entry], //入口
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), //出口
  bundle: true,  //reactivity -> shared  会打包在一起
  platform: "browser",  //打包后给浏览器使用
  sourcemap: true,  //可以调试源代码
  format,  //cjs  esm  life
  globalName: pkg.buildOptions?.name,
}).then((ctx) => {
  console.log("start dev")
  return ctx.watch();
})

