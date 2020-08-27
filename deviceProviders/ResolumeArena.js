import { GenericOSC } from '../protocolProviders/GenericOSC'
import log from '../../../utils/log'
// import STATUS from '../../utils/statusEnum'
import REGEX from '../../../utils/regexEnum'

export default function load (providers) {
  log('info', 'core/lib/deviceProviders/Resolume', 'Loaded device provider: Resolume - Arena')
  providers.push(descriptor)
}

class ResolumeArena extends GenericOSC {
  interface = (_action) => {
    switch (_action.providerFunction.id) {
      // Clearing Things
      case 'clearComposition': // Clear Composition
        this.rawInterface(
          '/composition/disconnectall',
          [{ type: 'i', value: 1 }])
        break
      case 'clearLayer': // Clear Layer
        this.rawInterface(
          `/composition/layers/${_action.parameters.find((p) => (p.id === 'layer')).value}/clear`,
          [{ type: 'i', value: 1 }])
        break

      // Connecting Things
      case 'connectColumn': // Connect Column
        this.rawInterface(
          `/composition/columns/${_action.parameters.find((p) => (p.id === 'column')).value}/connect`,
          [{ type: 'i', value: 1 }])
        break
      case 'connectNextColumn': // Connect Column
        this.rawInterface(
          '/composition/connectnextcolumn',
          [{ type: 'i', value: 1 }])
        break
      case 'connectPrevColumn': // Connect Column
        this.rawInterface(
          '/composition/connectprevcolumn',
          [{ type: 'i', value: 1 }])
        break
      case 'connectClip': // Connect Clip
        this.rawInterface(`/composition/layers/${_action.parameters.find((p) => (p.id === 'layer')).value}/clips/${_action.parameters.find((p) => (p.id === 'clip')).value}/connect`,
          [{ type: 'i', value: 1 }])
        break

      // Selecting Things
      case 'selectDeck': // Select Deck
        this.rawInterface(`/composition/decks/${_action.parameters.find((p) => (p.id === 'deck')).value}/select`,
          [{ type: 'i', value: 1 }])
        break
      case 'selectLayer': // Select Deck
        this.rawInterface(`/composition/layers/${_action.parameters.find((p) => (p.id === 'layer')).value}/select`,
          [{ type: 'i', value: 1 }])
        break
      case 'selectClip': // Select Deck
        this.rawInterface(`/composition/layers/${_action.parameters.find((p) => (p.id === 'layer')).value}/clips/${_action.parameters.find((p) => (p.id === 'clip')).value}/select`,
          [{ type: 'i', value: 1 }])
        break

      // BPM Things
      case 'setBPM': // Set BPM
        this.rawInterface('/composition/tempocontroller/tempo',
          [{ type: 'f', value: _action.parameters.find((p) => (p.id === 'bpm')).value }])
        break
      case 'decBPM': // Decrease BPM
        this.rawInterface(
          '/composition/tempocontroller/tempodec',
          [{ type: 'i', value: 1 }])
        break
      case 'incBPM': // Increase BPM
        this.rawInterface(
          '/composition/tempocontroller/tempoint',
          [{ type: 'i', value: 1 }])
        break
      case 'pullBPM': // Pull BPM
        this.rawInterface(
          '/composition/tempocontroller/tempopull',
          [{ type: 'i', value: 1 }])
        break
      case 'pushBPM': // Push BPM
        this.rawInterface(
          '/composition/tempocontroller/tempopush',
          [{ type: 'i', value: 1 }])
        break
      case 'divBPM': // Divide BPM by 2
        this.rawInterface(
          '/composition/tempocontroller/tempodividetwo',
          [{ type: 'i', value: 1 }])
        break
      case 'multBPM': // Multiply BPM by 2
        this.rawInterface(
          '/composition/tempocontroller/tempomultiplytwo',
          [{ type: 'i', value: 1 }])
        break
      case 'tapBPM': // Tap Tempo
        this.rawInterface(
          '/composition/tempocontroller/tempotap',
          [{ type: 'i', value: 1 }])
        break
      case 'resyncBPM': // Resync BPM
        this.rawInterface(
          '/composition/tempocontroller/resync',
          [{ type: 'i', value: 1 }])
        break
      case 'pauseBPM': // Pause BPM
        this.rawInterface(
          '/composition/tempocontroller/pause',
          [{ type: 'i', value: 1 }])
        break
      case 'resumeBPM': // Resume BPM
        this.rawInterface(
          '/composition/tempocontroller/pause',
          [{ type: 'i', value: 0 }])
        break
      case 'startMetronome': // Start Metronome
        this.rawInterface(
          '/composition/tempocontroller/metronome',
          [{ type: 'i', value: 1 }])
        break
      case 'stopMetronome': // Stop Metronome
        this.rawInterface(
          '/composition/tempocontroller/metronome',
          [{ type: 'i', value: 0 }])
        break

      // Record
      case 'startRecord': // Start Recorder
        this.rawInterface(
          '/composition/recorder/record',
          [{ type: 'i', value: 1 }])
        break
      case 'stopRecord': // Stop Recorder
        this.rawInterface(
          '/composition/recorder/record',
          [{ type: 'i', value: 0 }])
        break
    }
  }
}

const descriptor = {
  id: 'resolume',
  type: 'device',
  label: 'Resolume Arena',
  Construct: ResolumeArena,
  protocol: 'osc',
  parameters: [
    {
      required: true,
      id: 'host',
      label: 'Host',
      regex: REGEX.HOST
    },
    {
      required: true,
      id: 'port',
      label: 'Port',
      regex: REGEX.PORT
    }
  ],
  providerFunctions: [
    {
      id: 'clearComposition',
      label: 'Clear Composition',
      parameters: [
      ]
    },
    {
      id: 'clearLayer',
      label: 'Clear Layer',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Layer',
          id: 'layer'
        }
      ]
    },
    {
      id: 'connectColumn',
      label: 'Connect Column',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Column',
          id: 'column'
        }
      ]
    },
    {
      id: 'connectNextColumn',
      label: 'Connect Next Column',
      parameters: []
    },
    {
      id: 'connectPrevColumn',
      label: 'Connect Previous Column',
      parameters: []
    },
    {
      id: 'connectClip',
      label: 'Connect Clip',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Clip',
          id: 'clip'
        },
        {
          inputType: 'textInput',
          label: 'Layer',
          id: 'layer'
        }
      ]
    },
    {
      id: 'selectDeck',
      label: 'Select Deck',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Deck',
          id: 'deck'
        }
      ]
    },
    {
      id: 'selectLayer',
      label: 'Select Layer',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Layer',
          id: 'layer'
        }
      ]
    },
    {
      id: 'selectClip',
      label: 'Select Clip',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Clip',
          id: 'clip'
        },
        {
          inputType: 'textInput',
          label: 'Layer',
          id: 'layer'
        }
      ]
    },
    {
      id: 'setBPM',
      label: 'Set BPM',
      parameters: [
        {
          inputType: 'textInput',
          label: 'BPM',
          id: 'bpm'
        }
      ]
    },
    {
      id: 'decBPM',
      label: 'Decrease Tempo',
      parameters: []
    },
    {
      id: 'incBPM',
      label: 'Increase Tempo',
      parameters: []
    },
    {
      id: 'pullBPM',
      label: 'Pull Tempo',
      parameters: []
    },
    {
      id: 'pushBPM',
      label: 'Push Tempo',
      parameters: []
    },
    {
      id: 'divBPM',
      label: 'Divide Tempo by 2',
      parameters: []
    },
    {
      id: 'multBPM',
      label: 'Multiply Tempo by 2',
      parameters: []
    },
    {
      id: 'tapBPM',
      label: 'Tap Tempo',
      parameters: []
    },
    {
      id: 'resyncBPM',
      label: 'Resync Tempo',
      parameters: []
    },
    {
      id: 'pauseBPM',
      label: 'Pause Tempo',
      parameters: []
    },
    {
      id: 'resumeBPM',
      label: 'Resume Tempo',
      parameters: []
    },
    {
      id: 'startMetronome',
      label: 'Start Metronome',
      parameters: []
    },
    {
      id: 'stopMetronome',
      label: 'Stop Metronome',
      parameters: []
    },
    {
      id: 'startRecord',
      label: 'Start Record',
      parameters: []
    },
    {
      id: 'stopRecord',
      label: 'Stop Record',
      parameters: []
    }
  ]
}
