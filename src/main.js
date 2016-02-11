
import { DemoVoice } from "./synth";

const ac = new window.AudioContext();
const btn = document.querySelector('#note-trigger');

const voice = new DemoVoice({context: ac});

btn.onclick = function() {
    const freq = 440.0;
    const duration = 1.5;
    voice.trigger(freq, duration);
}
