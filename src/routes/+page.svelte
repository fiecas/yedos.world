<script lang="ts">
	import { resolve } from '$app/paths';

	const props = $props();
</script>

<svelte:head>
	<title>yedo's world.</title>
</svelte:head>

<h1>welcome to yedo's world!</h1>

<h2>blog:</h2>

{#if props.posts}
	{#each props.posts as post (post.slug)}
		<a href={resolve('/blog/[slug]', post.slug)}>{post.title}</a>
	{/each}
{:else}
	no blog posts yet.
{/if}
