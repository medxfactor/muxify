import { nodeResolve } from '@rollup/plugin-node-resolve';
import executable from 'rollup-plugin-executable-output';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';


function shebang() {
	return {
		name: 'prepend-shebang',
		renderChunk(code, chunk, { sourcemap }) {
			return {
				code: '#!/usr/bin/env node\n' + code,
				map: sourcemap ? sourcemap : null
			};
		}
	};
}

export default {
  input: 'src/main.js',
  output: {
    file: './bin/dev-mux',
    format: 'cjs',
  },
  plugins: [
    del({
      targets: './bin/',
    }),
    json(),
    nodeResolve(),
    commonjs(),
    strip({
      functions: ['assert.*']
    }),
    replace({
      'process.env.VERSION': process.env.npm_package_version,
    }),
    terser({
      format: {
        comments: false,
      }
    }),
    executable(),
    shebang(),
  ]
};
