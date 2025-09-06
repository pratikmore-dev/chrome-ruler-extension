<script>
  import { onMount, onDestroy } from 'svelte'
  
  export let visible = false
  export let rotation = 0
  
  let rulerElement
  let isDragging = false
  let dragOffset = { x: 0, y: 0 }
  let position = { x: 100, y: 100 }
  
  // Handle mouse down for dragging
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
  
  // Handle mouse move during drag
  function handleMouseMove(event) {
    if (isDragging) {
      position.x = event.clientX - dragOffset.x
      position.y = event.clientY - dragOffset.y
      
      // Keep ruler within viewport bounds
      const rect = rulerElement.getBoundingClientRect()
      position.x = Math.max(0, Math.min(window.innerWidth - rect.width, position.x))
      position.y = Math.max(0, Math.min(window.innerHeight - rect.height, position.y))
    }
  }
  
  // Handle mouse up to end drag
  function handleMouseUp() {
    isDragging = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  // Generate ruler markings
  function generateMarkings() {
    const markings = []
    const rulerLength = 400 // 400px ruler
    
    for (let i = 0; i <= rulerLength; i += 10) {
      const isCentimeter = i % 10 === 0
      const isHalfCentimeter = i % 50 === 0
      const isCentimeterMark = i % 100 === 0
      
      markings.push({
        position: i,
        height: isCentimeterMark ? 20 : isHalfCentimeter ? 15 : 8,
        showNumber: isCentimeterMark && i > 0,
        number: i / 10 // Convert to cm
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
    // Center ruler on initial load
    position.x = (window.innerWidth - 400) / 2
    position.y = (window.innerHeight - 60) / 2
  })
  
  onDestroy(() => {
    // Clean up event listeners
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  })
</script>

<!-- Ruler container -->
<div 
  bind:this={rulerElement}
  class="ruler-container" 
  style={rulerStyle}
  on:mousedown={handleMouseDown}
>
  <!-- Drag handle -->
  <div class="ruler-handle">
    <div class="handle-grip"></div>
  </div>
  
  <!-- Ruler body -->
  <div class="ruler-body">
    <!-- Top markings -->
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
    
    <!-- Ruler scale line -->
    <div class="ruler-scale"></div>
    
    <!-- Bottom markings -->
    <div class="ruler-markings ruler-bottom">
      {#each markings as mark}
        <div 
          class="mark" 
          style="left: {mark.position}px; height: {mark.height}px;"
        ></div>
      {/each}
    </div>
  </div>
</div>

<style>
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
  
  /* Prevent text selection during drag */
  .ruler-container * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
</style>