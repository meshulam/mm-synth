
export function EnvelopeNode(ctx, a=0, d=0.5, s=1, r=0) {
    const gainNode = ctx.createGain();
    Object.assign(gainNode, EnvelopeNode.prototype);
    gainNode.initialize(a, d, s, r);
    return gainNode;
};

Object.assign(EnvelopeNode.prototype, {
    initialize(a, d, s, r) {
        this.gain.value = 0;

        this.attack = a;
        this.decay = d;
        this.sustain = s;
        this.releaseTime = r;
    },
    trigger(time=this.context.currentTime, length=undefined) {
        const gain = this.gain;

        gain.cancelScheduledValues(time);
        gain.setValueAtTime(0, time);
        gain.linearRampToValueAtTime(1.0, time + this.attack);
        gain.linearRampToValueAtTime(this.sustain,
                                     time + this.attack + this.decay);
        if (length) {
            setTimeout(() => this.release(), length * 1000);
        }
    },
    release() {
        const now = this.context.currentTime;

        this.gain.cancelScheduledValues(now);
        this.gain.setValueAtTime(this.gain.value, now);
        this.gain.linearRampToValueAtTime(0, now + this.releaseTime);
    }
});

