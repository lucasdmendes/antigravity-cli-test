import { StoryPart } from '../types/story';

export const STORY_DATA: StoryPart[] = [
  {
    id: 1,
    chapterNumber: 1,
    title: 'The Drowned Airlock',
    location: 'Sector 09 // Sub-Level 04',
    text: 'The hydraulic seals hiss violently as airlock Gamma-4 depressurizes into the flooded subterranean depths of Sector Nine. Black saltwater churns past your reinforced boots, carrying the faint reek of ancient lithium batteries and rotted ozone. Ahead lies the primary bulkhead door, shuddering under immense hydrostatic pressure. An amber diagnostic beacon flickers rhythmically against the corroded steel plates, signaling an unstable acoustic frequency locking the emergency valve. Time is running out.',
    choices: [
      {
        id: '1-1',
        text: 'Force open the manual emergency bypass lever on the bulkhead.',
        isCorrect: false,
        consequence: 'The sudden pressure differential violently tears the hatch off its hinges, crushing you beneath five tons of turbulent seawater.',
      },
      {
        id: '1-2',
        text: 'Match the acoustic resonance frequency on your console to safely vent the airlock seal.',
        isCorrect: true,
      },
      {
        id: '1-3',
        text: 'Vent the auxiliary drainage conduit to relieve the airlock pressure.',
        isCorrect: false,
        consequence: 'Supercooled cryo-coolant surges through the duct, flash-freezing your life-support suit and shattering your visor.',
      },
    ],
  },
  {
    id: 2,
    chapterNumber: 2,
    title: 'The Flooded Atrium',
    location: 'Sector 09 // Power Distribution',
    text: 'Water drains through the deck grates with a hollow gurgle as the pressure equalization cycle completes. You step into the cavernous flooded atrium. Suspended above the oily surface, half-submerged conduits pulse with volatile turquoise current. To cross to the central terminal, you can leap across floating coolant drums, grapple toward the overhead gantry walkway, or wade across the shallow auxiliary drainage trench where dark metallic silhouettes stir beneath the mirrored surface. One false step is fatal.',
    choices: [
      {
        id: '2-1',
        text: 'Grapple toward the overhead gantry walkway to bypass the electrified water entirely.',
        isCorrect: true,
      },
      {
        id: '2-2',
        text: 'Leap across the floating coolant drums towards the central platform.',
        isCorrect: false,
        consequence: 'The toxic coolant drums rupture under your weight, triggering a boiling chemical fireball that consumes the atrium.',
      },
      {
        id: '2-3',
        text: 'Wade through the shallow drainage trench to slip beneath the live conduits.',
        isCorrect: false,
        consequence: 'Submerged defense bio-drones ambush you from the dark murky water, dragging you down into the intake filtration grates.',
      },
    ],
  },
  {
    id: 3,
    chapterNumber: 3,
    title: 'The Mainframe Vault',
    location: 'Sector 09 // Quantum Core Archive',
    text: 'You haul yourself onto the suspended mainframe platform, drenched and breathing hard. Before you stands the Omega core interface, surrounded by spinning holographic rings displaying corrupted telemetry logs. An automated defense protocol senses your unauthorized biosignature. Crimson warning lights bathe the chamber as targeting servos begin whining with high-voltage capacitance. Three terminal interfaces light up in rapid succession, demanding an immediate system authorization input to bypass.',
    choices: [
      {
        id: '3-1',
        text: 'Flood the mainframe interface with high-voltage bypass current to overload the security subroutines.',
        isCorrect: false,
        consequence: 'The core redirects 50,000 volts straight through the interface console, vaporizing your cyberware and incinerating your neural links.',
      },
      {
        id: '3-2',
        text: 'Disconnect the main quantum coolant lines to force an automated emergency purge.',
        isCorrect: false,
        consequence: 'Deprived of coolant, the quantum core instantly enters thermal runaway, disintegrating the entire platform in a burst of plasma.',
      },
      {
        id: '3-3',
        text: 'Input the legacy technician override cipher to synchronize and spoof the biosignature array.',
        isCorrect: true,
      },
    ],
  },
  {
    id: 4,
    chapterNumber: 4,
    title: 'The Abyss Causeway',
    location: 'Sector 09 // Geothermal Conduit',
    text: "The security rings power down with a descending mechanical whine, granting access to the abyss causeway. A narrow magnetic rail spans a bottomless vertical borehole plunging into the planet's mantle. Geothermal steam plumes buffet the catwalk as magnetic stabilizer clamps groan under thermal stress. Halfway across, the magnetic rail flickers, threatening total containment failure. To reach the extraction pod on the far side, you must decide your crossing protocol before the field completely collapses.",
    choices: [
      {
        id: '4-1',
        text: 'Sprint full speed across the catwalk before the magnetic rail loses all cohesion.',
        isCorrect: false,
        consequence: 'The magnetic field cuts out mid-stride; the catwalk disintegrates beneath your feet into the incandescent molten rock below.',
      },
      {
        id: '4-2',
        text: 'Anchor your magnetic boots and crawl along the reinforced lower structural truss.',
        isCorrect: true,
      },
      {
        id: '4-3',
        text: 'Deploy your emergency parachute pack to glide across the rising thermal updrafts.',
        isCorrect: false,
        consequence: 'Superheated volcanic steam shreds the parachute canopy in seconds, sending you spiraling down into the boiling abyss.',
      },
    ],
  },
  {
    id: 5,
    chapterNumber: 5,
    title: 'Extraction Pod Zenith',
    location: 'Sector 09 // Surface Launch Silo',
    text: 'You leap through the threshold of the primary escape bay just as the causeway plummets into the glowing abyss below. The heavy titanium blast doors slam shut behind you, sealing out the catastrophic thermal blowout. The extraction pod sits primed in the central launch tube, its navigation array awaiting one final command sequence to override the facility containment lock and fire the ascent thrusters before the reactor core goes critical. Enter the final sequence to initiate planetary ascent.',
    choices: [
      {
        id: '5-1',
        text: 'Purge the ascent fuel cells to vent excess heat before firing the main thrusters.',
        isCorrect: false,
        consequence: 'Without ignition propellant, the rocket thrusters sputter and die as the reactor core detonates beneath the launch silo.',
      },
      {
        id: '5-2',
        text: 'Engage the primary orbital booster burn and trigger the emergency explosive seal bolts.',
        isCorrect: true,
      },
      {
        id: '5-3',
        text: 'Route secondary battery power into the auxiliary kinetic shields instead of the thrusters.',
        isCorrect: false,
        consequence: 'The pod remains trapped in the launch tube as the facility collapses, crushing the hull beneath billions of tons of bedrock.',
      },
    ],
  },
];
