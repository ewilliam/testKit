<script lang="ts">
	import Userfront from '@userfront/core';

	import { page } from '$app/stores';

	import { PUBLIC_USERFRONT_GLOBAL_TENANT } from '$env/static/public';

	let errorMessage = '';

	const uuid = $page.url.searchParams.get('uuid');
	const token = $page.url.searchParams.get('token');

	async function handleGoogleLogin() {
		await Userfront.init(PUBLIC_USERFRONT_GLOBAL_TENANT);
		try {
			await Userfront.login({
				method: 'google'
			});
		} catch (error) {
			errorMessage = error.message;
		}
	}
</script>

<svelte:head>
	<title>Login - VEE</title>
</svelte:head>

<button
	class="variant-ghost-secondary btn my-2 w-full font-semibold"
	on:click|preventDefault={handleGoogleLogin}
>
	Login with Google
</button>
