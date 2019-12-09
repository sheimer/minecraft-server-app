<script>
  import { onMount } from 'svelte'
  import { list, status, query } from './stores/mscs'

  onMount(() => {
    list.get()
    status.get()
    // query.get()
  })
</script>

<main>
	<h1>Minecraft Server Status</h1>
  <div class="flexContainer">
    <div>
      {#each $list as line}
        <p>{line}</p>
      {:else}
        <p>List loading...</p>
      {/each}
    </div>
    <div>
      {#each $status as line}
        <p>{line}</p>
      {:else}
        <p>Status lädt...</p>
      {/each}
    </div>
    <!--
    <div>
      {#each $query as line}
        <p>{line}</p>
      {:else}
        <p>Query loading...</p>
      {/each}
    </div>
    -->
  </div>
</main>

<style>
	main {
		/* text-align: center; */
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

  .flexContainer {
    display: flex;
  }
  .flexContainer > div {
    flex: 1 0 200px;
    overflow: hidden;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
