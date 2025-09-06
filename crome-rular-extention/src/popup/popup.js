import Popup from './Popup.svelte'
import './popup.css'

// Initialize Svelte component
const popup = new Popup({
  target: document.getElementById('popup')
})

export default popup