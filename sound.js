import Soundstage from "./soundstage/module.js";

const setup = {
  label: "Guitar",
  nodes: [
    {
      id: "output",
      type: "output",
      data: { channels: [0, 1], name: "Out 1-2" }
    },
    {
      id: "tone-synth",
      type: "/soundstage/nodes/tone-synth.js",
      data: {
        expression: 0,
        pitch: 0,
        frequency: 143.03369140625,
        Q: 2.4696221351623535,
        output: 0.10000000149011612,
        sources: [
          {
            type: "sine",
            detune: -370.08196721311435,
            mix: 0.8670874974644809,
            pan: -0.8
          },
          {
            type: "sine",
            detune: -87.90983606557211,
            mix: 1,
            pan: -0.8498975409836066
          },
          {
            type: "triangle",
            detune: -646.7213114754096,
            mix: 1,
            pan: 0.35604508196721407
          }
        ],
        type: "lowpass",
        gainEnvelope: {
          attack: [
            [0, "step", 0],
            [0.007500000000000001, "linear", 2.4946210980839743],
            [0.1300000762939453, "exponential", 0.0000152587890625]
          ],
          release: [[0, "target", 0, 0.009999847412109374]]
        },
        frequencyFromVelocity: 0.5,
        frequencyEnvelope: {
          attack: [
            [0, "step", 0],
            [0.02, "linear", 16384],
            [0.25333333333333335, "exponential", 16]
          ],
          release: [[0, "target", 0, 0.02]]
        },
        gain: 1
      }
    }
  ],
  connections: [{ source: "tone-synth", target: "output" }],
  events: [[0, "sequence", "test", "synth", 2]],
  sequences: [{ id: "test", events: [[0, "note", 49, 0.5, 1]] }],
  controls: [
    {
      source: { device: "keyboard" },
      target: "tone-synth",
      data: {
        type: "all",
        transform: "linear",
        min: 0,
        max: 1,
        latencyCompensation: true
      }
    },
    {
      source: { device: "midi", port: "-808311221", channel: 1, type: "all" },
      target: "tone-synth",
      data: {
        type: "all",
        transform: "linear",
        min: 0,
        max: 1,
        latencyCompensation: true
      }
    }
  ]
};
const stage = new Soundstage(setup, {
  baseURL: "http://127.0.0.1:58863/soundstage"
});

export default stage;
export function playHitBat() {
  const synth = stage.get("tone-synth");
  synth.start(stage.time, 55, 1).stop(stage.time + 0.1);
}
