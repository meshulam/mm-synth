import { EnvelopeNode } from "./audioNodes";

export function DemoVoice(opts) {
    this.context = opts.context || new window.AudioContext();
    this.destination = opts.destination || this.context.destination;

    /*
    this.filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 2;
    filter.frequency.value = 2000;
    filter.connect(this.destination);
    */

    this.envelope = EnvelopeNode(this.context, 0.1, 0.5, 0.2, 0.5);

    this.osc = this.context.createOscillator();
    this.osc.type = 'triangle';
    this.osc.start();

    this.osc.connect(this.envelope);
    this.envelope.connect(this.destination);

    this.trigger = function(frequency, duration) {
        console.log("Triggering");
        const now = this.context.currentTime;
        //this.envelope.release();
        this.osc.frequency.setValueAtTime(frequency, now);
        this.envelope.trigger(now, duration);
    }
}

