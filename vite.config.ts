import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 5177,
		host: true
	},
	plugins: [sveltekit()]
});
