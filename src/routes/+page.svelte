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

<h2>me:</h2>
<ul>
	<li><a rel="me" href="https://github.com/youknowedo">github</a></li>
	<li><a rel="me" href="https://www.instagram.com/sigfridwade/">instagram</a></li>
	<li><a rel="me" href="mailto:sigfrid@fiecas.com">email</a></li>
</ul>
