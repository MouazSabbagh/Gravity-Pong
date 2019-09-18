
import { get, toPolar } from '../../fn/module.js';
import Soundstage from '../../soundstage/module.js';

const collisionSynthData = {
    voice: {
        nodes: [{
            id:   'osc-1',
            type: 'tone',
            data: {
                type: 'square',
                detune: -1045
            }
        }, {
            id:   'osc-2',
            type: 'tone',
            data: {
                type: 'sawtooth',
                detune: 632
            }
        }, {
            id:   'osc-3',
            type: 'noise',
            data: {
                type: 'pink'
            }
        }, {
            id:   'mix-1',
            type: 'mix',
            data: {
                gain: 0.333333,
                pan: 0
            }
        }, {
            id:   'mix-2',
            type: 'mix',
            data: {
                gain: 0.25,
                pan: 0
            }
        }, {
            id:   'mix-3',
            type: 'mix',
            data: {
                gain: 2,
                pan: 0
            }
        }, {
            id:   'gain-envelope',
            type: 'envelope',
            data: {
                attack: [
                    [0,     "step",   0],
                    [0.008, "linear", 1],
                    [0.2,   "exponential", 0.125]
                ],

                release: [
                    [0, "target", 0, 0.1]
                ]
            }
        }, {
            id:   'filter-envelope',
            type: 'envelope',
            data: {
                attack: [
                    [0,     "step",   0],
                    [0.008, "linear", 1],
                    [0.1,   "exponential", 0.125]
                ],

                release: [
                    [0, "target", 0, 0.05]
                ]
            }
        }, {
            id:   'gain',
            type: 'gain',
            data: {
                gain: 0
            }
        }, {
            id:   'filter',
            type: 'biquad-filter',
            data: {
                type: 'lowpass',
                frequency: 120,
                Q: 5
            }
        }],

        connections: [
            { source: 'gain-envelope', target: 'gain.gain' },
            { source: 'filter-envelope', target: 'filter.frequency' },
            { source: 'osc-1', target: 'mix-1' },
            { source: 'osc-2', target: 'mix-2' },
            { source: 'osc-3', target: 'mix-3' },
            { source: 'mix-1', target: 'gain' },
            { source: 'mix-2', target: 'gain' },
            { source: 'mix-3', target: 'gain' },
            { source: 'gain', target: 'filter' }
        ],

        properties: {
            frequency: 'filter.frequency',
            Q: 'filter.Q',
            type: 'filter.type'
        },

        __start: {
            'gain-envelope': {
                gain: {
                    2: { type: 'logarithmic', min: 0.00390625, max: 0.5 }
                }
            },

            'filter-envelope': {
                gain: {
                    1: { type: 'scale', scale: 0.6 },
                    2: { type: 'logarithmic', min: 200, max: 4000 }
                }
            },

            'osc-1': {
                frequency: {
                    1: { type: 'none' }
                }
            },

            'osc-2': {
                frequency: {
                    1: { type: 'none' }
                }
            },

            'osc-3': {}
        },

        // Can only be 'self' if voice is a node. It isn't.
        output: 'filter'
    },

    output: 1
};

// Soundstage

const stage = new Soundstage();
const maxImpulse = 20;

var collisionSynth;

stage
.create('instrument', collisionSynthData)
.then((node) => {
    collisionSynth = node;
    stage.createConnection(stage.identify(node), '0');
});

function setPan(angle, voice) {
console.log(angle, voice);
    voice.pan = angle;
    return angle;
}

export function playCollision(collision) {
    if (!collisionSynth) { return; }
    const time  = stage.timeAtDomTime(collision.time);

    if (time < 0) {
        console.warn('Time is less than 0', time);
        return;
    }

    const angle = 2 * (collision.position.x / parseInt(collision.viewport.width, 10)) - 1;

    // Make bats produce high note, walls a low note
    const note    = collision.object2.score !== undefined ? 58 + Math.random() + Math.random() : 52 + Math.random() + Math.random() ;
    const impulse = toPolar([collision.impulse.x,collision.impulse.y])[0];
    const voice   = collisionSynth
    .start(time, 3 * impulse / maxImpulse + note, impulse / maxImpulse)
    .stop(time + 0.06);

    voice.get('mix-1').pan.setValueAtTime(angle, time);
    voice.get('mix-2').pan.setValueAtTime(angle, time);
    voice.get('mix-3').pan.setValueAtTime(angle, time);

    return collision;
}

window.stage = stage;
