
import { get, toPolar } from '../../fn/module.js';
import Soundstage, { config } from '../../soundstage/module.js';

// Config

config.basePath = '/static/soundstage/';

const collisionSynthData = {
    volume: 0.25,

    // Data has to be complete for some reason
    // Todo: soundstage - how are we gonna represent these routings really?
    data: {
        velocity: {
            gain: {
                gain: { min: 0.03125, max: 1 },
                rate: { min: 1, max : 2 }
            },

            frequency: {
                gain: { min: 0.5, max: 1 },
                rate: { min: 1, max: 2 }
            }
        },

        frequency: {
            gain: {
                gain: { scale: 0 },
                rate: { scale: 0.2 }
            },

            frequency: {
                gain: { scale: 0.4 },
                rate: { scale: 0 }
            }
        }
    },

    sources: [{
        type: 'noise',
        data: {
            type: 'pink',
            mix: 1
        }
    }, {
        type: 'tone',
        data: {
            type: 'square',
            detune: 8,
            mix: 0.375
        }
    }, {
        type: 'tone',
        data: {
            type: 'sine',
            detune: -90,
            mix: 0.75
        }
    }],

    // Oooooo.... not working
    // Todo: soundstage - why not working?
    gainEnvelope: {
		"attack":[[0,"step",0],[0.01,"linear",0]],
		"release":[[0,"target",0,0.07000007629394532]]
	}
};

// Soundstage

const stage = new Soundstage();
const maxImpulse = 20;

var collisionSynth;

stage
.create('tone-synth', collisionSynthData)
.then((node) => {
    collisionSynth = node;
    stage.createConnection(stage.identify(node), '0');
});

function setPan(angle, voice) {
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
    collisionSynth.sources.map(get('data')).reduce(setPan, angle);

    // Make bats produce high note
    const note    = collision.object2.score !== undefined ? 58 : 52 ;
    const impulse = toPolar([collision.impulse.x,collision.impulse.y])[0];
    const voice   = collisionSynth.start(time, 3 * impulse / maxImpulse + note, impulse / maxImpulse).stop(time + 0.06);
    return collision;
}

window.stage = stage;
