import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import {defineConfig} from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import {NodeModulesPolyfillPlugin} from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		define: {
			'process.env': {},
			global: {},
		},
		envPrefix: 'REACT_APP_',
		// resolve: {
		// 	alias: {
		// 		stream: 'stream-browserify',
		// 		crypto: 'crypto-browserify',
		// 		util: 'util/',
		// 		buffer: 'buffer/',
		// 		process: 'process/browser',
		// 	},
		// },
		plugins: [
			react(),
			jsconfigPaths(),
			envCompatible(),
			// nodePolyfills()
		],
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis'
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true
                    }),
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
        build: {
            rollupOptions: {
                plugins: [
                    rollupNodePolyFill()
                ]
            }
        }
	};
});
