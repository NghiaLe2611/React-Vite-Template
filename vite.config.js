// @ts-nocheck
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		define: {
			'process.env': {},
			global: {},
		},
		envPrefix: 'REACT_APP_',
		plugins: [react(), jsconfigPaths(), envCompatible()],
		optimizeDeps: {
			esbuildOptions: {
				define: {
					global: 'globalThis',
				},
				plugins: [
					NodeGlobalsPolyfillPlugin({
						process: true,
						buffer: true,
					}),
					NodeModulesPolyfillPlugin(),
				],
			},
		},
		build: {
			rollupOptions: {
				plugins: [rollupNodePolyFill()],
			},
		},
	};
});
