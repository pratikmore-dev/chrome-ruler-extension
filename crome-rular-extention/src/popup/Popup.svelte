<script>
  import { onMount } from 'svelte'
  
  let isRulerVisible = false
  let rotationAngle = 0
  
  // Get current tab and send messages to content script
  async function sendMessageToTab(message) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    try {
      await chrome.tabs.sendMessage(tab.id, message)
    } catch (error) {
      console.log('Error sending message:', error)
    }
  }
  
  // Toggle ruler visibility
  async function toggleRuler() {
    isRulerVisible = !isRulerVisible
    await sendMessageToTab({
      action: 'toggleRuler',
      visible: isRulerVisible
    })
  }
  
  // Update ruler rotation
  async function updateRotation() {
    await sendMessageToTab({
      action: 'rotateRuler',
      angle: rotationAngle
    })
  }
  
  // Load saved state on mount
  onMount(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    try {
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'getRulerState' })
      if (response) {
        isRulerVisible = response.visible || false
        rotationAngle = response.angle || 0
      }
    } catch (error) {
      // Content script might not be ready yet
      console.log('Could not get ruler state:', error)
    }
  })
</script>

<div class="popup-container">
  <div class="header">
    <h2>Chrome Ruler</h2>
  </div>
  
  <div class="controls">
    <div class="control-group">
      <label class="toggle-label">
        <input 
          type="checkbox" 
          bind:checked={isRulerVisible} 
          on:change={toggleRuler}
          class="toggle-input"
        >
        <span class="toggle-slider"></span>
        Show Ruler
      </label>
    </div>
    
    <div class="control-group">
      <label for="rotation">Rotation: {rotationAngle}°</label>
      <input 
        id="rotation"
        type="range" 
        min="0" 
        max="360" 
        bind:value={rotationAngle} 
        on:input={updateRotation}
        class="rotation-slider"
        disabled={!isRulerVisible}
      >
    </div>
  </div>
</div>

<style>
  .popup-container {
    padding: 16px;
    background: #ffffff;
    min-height: 120px;
  }
  
  .header {
    margin-bottom: 16px;
  }
  
  .header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .control-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .toggle-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    font-weight: 500;
  }
  
  .toggle-input {
    display: none;
  }
  
  .toggle-slider {
    position: relative;
    width: 44px;
    height: 24px;
    background: #ddd;
    border-radius: 12px;
    margin-right: 12px;
    transition: background 0.2s;
  }
  
  .toggle-slider::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .toggle-input:checked + .toggle-slider {
    background: #4CAF50;
  }
  
  .toggle-input:checked + .toggle-slider::before {
    transform: translateX(20px);
  }
  
  label[for="rotation"] {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  
  .rotation-slider {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #ddd;
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;
  }
  
  .rotation-slider:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .rotation-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .rotation-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
</style>