<!-- <script>
  import { onMount, onDestroy } from 'svelte'
  
  export let visible = false
  export let rotation = 0
  
  let rulerElement
  let isDragging = false
  let dragOffset = { x: 0, y: 0 }
  let position = { x: 100, y: 100 }
  
  function handleMouseDown(event) {
    if (event.target.classList.contains('ruler-handle')) {
      isDragging = true
      dragOffset.x = event.clientX - position.x
      dragOffset.y = event.clientY - position.y
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      event.preventDefault()
    }
  }
  
  function handleMouseMove(event) {
    if (isDragging) {
      position.x = event.clientX - dragOffset.x
      position.y = event.clientY - dragOffset.y
      

      const rect = rulerElement.getBoundingClientRect()
      position.x = Math.max(0, Math.min(window.innerWidth - rect.width, position.x))
      position.y = Math.max(0, Math.min(window.innerHeight - rect.height, position.y))
    }
  }
  

  function handleMouseUp() {
    isDragging = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  function generateMarkings() {
    const markings = []
    const rulerLength = 400 
    
    for (let i = 0; i <= rulerLength; i += 10) {
      const isCentimeter = i % 10 === 0
      const isHalfCentimeter = i % 50 === 0
      const isCentimeterMark = i % 100 === 0
      
      markings.push({
        position: i,
        height: isCentimeterMark ? 20 : isHalfCentimeter ? 15 : 8,
        showNumber: isCentimeterMark && i > 0,
        number: i / 10 
      })
    }
    
    return markings
  }
  
  $: markings = generateMarkings()
  $: rulerStyle = `
    left: ${position.x}px;
    top: ${position.y}px;
    transform: rotate(${rotation}deg);
    display: ${visible ? 'block' : 'none'};
  `
  
  onMount(() => {
    position.x = (window.innerWidth - 400) / 2
    position.y = (window.innerHeight - 60) / 2
  })
  
  onDestroy(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  })
</script> -->

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- <div 
  bind:this={rulerElement}
  class="ruler-container" 
  style={rulerStyle}
  on:mousedown={handleMouseDown}
>
  <div class="ruler-handle">
    <div class="handle-grip"></div>
  </div>
  
  <div class="ruler-body">
    <div class="ruler-markings ruler-top">
      {#each markings as mark}
        <div 
          class="mark" 
          style="left: {mark.position}px; height: {mark.height}px;"
        >
          {#if mark.showNumber}
            <span class="mark-number">{mark.number}</span>
          {/if}
        </div>
      {/each}
    </div>
    
    <div class="ruler-scale"></div>
    
    <div class="ruler-markings ruler-bottom">
      {#each markings as mark}
        <div 
          class="mark" 
          style="left: {mark.position}px; height: {mark.height}px;"
        ></div>
      {/each}
    </div>
  </div>
</div> -->

<!-- <style>

  .ruler-container {
    position: fixed;
    z-index: 999999;
    cursor: move;
    user-select: none;
    pointer-events: auto;
    transform-origin: center center;
  }
  
  .ruler-handle {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 15px;
    background: rgba(0, 123, 255, 0.8);
    border-radius: 4px 4px 0 0;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .ruler-handle:active {
    cursor: grabbing;
  }
  
  .handle-grip {
    width: 12px;
    height: 2px;
    background: white;
    border-radius: 1px;
    position: relative;
  }
  
  .handle-grip::before,
  .handle-grip::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 2px;
    background: white;
    border-radius: 1px;
  }
  
  .handle-grip::before {
    top: -3px;
  }
  
  .handle-grip::after {
    top: 3px;
  }
  
  .ruler-body {
    width: 400px;
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(0, 123, 255, 0.8);
    border-radius: 4px;
    position: relative;
    backdrop-filter: blur(2px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .ruler-scale {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 123, 255, 0.6);
    transform: translateY(-50%);
  }
  
  .ruler-markings {
    position: absolute;
    left: 0;
    right: 0;
  }
  
  .ruler-top {
    top: 0;
    height: 50%;
  }
  
  .ruler-bottom {
    bottom: 0;
    height: 50%;
  }
  
  .mark {
    position: absolute;
    width: 1px;
    background: rgba(0, 123, 255, 0.8);
    transform-origin: bottom;
  }
  
  .ruler-top .mark {
    bottom: 0;
  }
  
  .ruler-bottom .mark {
    top: 0;
  }
  
  .mark-number {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    font-family: monospace;
    color: rgba(0, 123, 255, 0.9);
    font-weight: 600;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  }
  
  .ruler-container * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
</style> -->


<script>
  export let visible = false;
  let rulerRef;
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let isDragging = false;

  function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    endX = e.clientX;
    endY = e.clientY;
  }

  function handleMouseMove(e) {
    if (isDragging) {
      endX = e.clientX;
      endY = e.clientY;
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  $: distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

{#if visible}
  <div class="ruler-overlay" bind:this={rulerRef}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
      class="ruler-line"
      style="
        left: {Math.min(startX, endX)}px;
        top: {Math.min(startY, endY)}px;
        width: {Math.abs(endX - startX)}px;
        height: {Math.abs(endY - startY)}px;
      "
      on:mousedown={handleMouseDown}
    >
      <div class="measurement">
        {Math.round(distance)}px
      </div>
    </div>
  </div>
{/if}

<style>
  .ruler-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 10000;
  }

  .ruler-line {
    position: absolute;
    border: 2px solid #ff4444;
    background: rgba(255, 68, 68, 0.1);
    pointer-events: all;
    cursor: crosshair;
  }

  .measurement {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
  }
</style>