<script>
  import { onMount } from 'svelte'
  import { list, status, query, start, stop, restart, update } from './stores/mscs'

  let servers
  let mapVisible = false
  let activeMap = null

  onMount(() => {
    status.get()
  })

  status.subscribe(msgs => {
    servers = Object.entries(msgs).reduce((servers, [name, server]) => {
      servers.push({ name, ...server, stoppable: server.running, startable: !server.running })
      return servers
    }, [])
    console.log('servers:', servers)
    setTimeout(status.get, 30000)
  })

  const stopServer = (serverName) => {
    const serverIndex = servers.findIndex(server => server.name === serverName)
    servers[serverIndex].stoppable = false
    console.log('stopping server...')
    stop.get(serverName)
  }

  const updateServer = (serverName) => {
    const serverIndex = servers.findIndex(server => server.name === serverName)
    servers[serverIndex].updateRunning = true
    console.log('updating server...')
    update.get(serverName)
  }

  stop.subscribe(msgs => {
    if (Array.isArray(msgs) && msgs.length) {
      status.get()
    }
  })

  update.subscribe(msgs => {
    if (Array.isArray(msgs) && msgs.length) {
      servers[serverIndex].updateRunning = false
      status.get()
    }
  })

  const startServer = (serverName) => {
    const serverIndex = servers.findIndex(server => server.name === serverName)
    servers[serverIndex].startable = false
    console.log('starting server...')
    start.get(serverName)
  }

  start.subscribe(msgs => {
    if (Array.isArray(msgs) && msgs.length) {
      status.get()
    }
  })

  const showMap = (serverName) => {
    console.log('showing map:',serverName)
    activeMap = serverName
    mapVisible = true
  }

  const hideMap = () => {
    console.log('hiding map...')
    mapVisible = false
  }
</script>

<main>
	<h1>Minecraft Server Status</h1>
  {#if mapVisible}
  <div>
    <div style="display: flex; margin: 0 auto;">
      <div style="flex: 10 0 200px; padding-bottom: 0.09em;"> Map of World: {activeMap}</div>
      <div style="flex: 0 0 auto; margin-left: 0.2em;">
        <button class="offline" on:click={e => hideMap()}>X</button>
      </div>
    </div>
    <iframe style="width: 100%; min-height: 500px;" src={`https://www.debugstube.de/minecraftMaps/${activeMap}`} />
    </div>
  {:else}
    {#each servers as server}
      <div class="flexContainer" style="margin: 0 auto;">
        <div
          style="flex: 0 0 12px;"
          class={`statusIcon ${server.running ? 'online' : 'offline'}`}
        />
        <div style="flex: 10 0 200px; padding-bottom: 0.09em;">{server.name}</div>
        <div style="flex: 0 0 auto; margin-left: 0.2em;">
          <button class="online" on:click={e => startServer(server.name)} disabled={!server.startable}>Start</button>
        </div>
        <div style="flex: 0 0 auto; margin-left: 0.2em;">
          <button class="offline" on:click={e => stopServer(server.name)} disabled={!server.stoppable}>Stop</button>
        </div>
        <div style="flex: 0 0 auto; margin-left: 0.2em;">
          <button class="update" on:click={e => updateServer(server.name)} disabled={server.updateRunning}>Update</button>
        </div>
      </div>
      {#if server.running}
        <div class="flexContainer" style="margin: 0 auto; margin-top:0.3em;">
          <div style="flex: 0 0 14px;" class="statusPlaceholder" />
          <div style="flex: 10 0 200px; padding-bottom: 0.09em;">Number players online: {server.query.numplayers}</div>
          <div style="flex: 0 0 auto; margin-left: 0.2em;">
            <button on:click={e => showMap(server.name)}>Map</button></div>
        </div>
      {/if}
    {:else}
      <p>Waiting for status...</p>
    {/each}
  {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 480px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
    font-weight: 100;
    line-height: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
	}

  .statusIcon {
    width: 12px;
    height: 12px;
    border: 1px solid;
    border-radius: 50%;
    margin-right: 0.5em;
    opacity: 0.7;
  }

  .statusPlaceholder {
    width: 14px;
    height: 14px;
    margin-right: 0.5em;
  }

  .online {
    border-color: #59b300;
    color: #59b300;
    font-weight: bold;
  }

  .offline {
    border-color: #b32d00;
    color: #b32d00;
  }

  .update {
    border-color: #000088;
    color: #000088;
  }

  button.online:disabled, button.offline:disabled, button.update:disabled {
    opacity: 0.6;
    font-weight: normal;
  }

  .statusIcon.online {
    background-color: #80ff00;
  }

  .statusIcon.offline {
    background-color: #ff3e00;
  }

  .flexContainer {
    display: flex;
    align-items: center;
    text-align: left;
	  max-width: 360px;
  }
  .flexContainer > div {
    overflow: hidden;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
    }
    .flexContainer {
			max-width: 480px;
    }
	}
</style>
