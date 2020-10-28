import ConnectionProviderOSC from '../connectionProviders/ConnectionProviderOSC'

class DeviceProviderResolumeArena extends ConnectionProviderOSC {
  static providerRegistration = {
    id: 'DeviceProviderResolumeArena',
    label: 'Resolume Arena',
    parameters: this.parameters,
    constructor: DeviceProviderResolumeArena
  }

  providerFunctions = [
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

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      // Clearing Things
      case 'clearComposition': // Clear Composition
        this.connectionProviderInterface({
          address: '/composition/disconnectall',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'clearLayer': // Clear Layer
        this.connectionProviderInterface({
          address: `/composition/layers/${_action.parameters.layer}/clear`,
          args: [{ type: 'i', value: 1 }]
        })
        break

      // Connecting Things
      case 'connectColumn': // Connect Column
        this.connectionProviderInterface({
          address: `/composition/columns/${_action.parameters.column}/connect`,
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'connectNextColumn': // Connect Column
        this.connectionProviderInterface({
          address: '/composition/connectnextcolumn',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'connectPrevColumn': // Connect Column
        this.connectionProviderInterface({
          address: '/composition/connectprevcolumn',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'connectClip': // Connect Clip
        this.connectionProviderInterface({
          address: `/composition/layers/${_action.parameters.layer}/clips/${_action.parameters.clip}/connect`,
          args: [{ type: 'i', value: 1 }]
        })
        break

      // Selecting Things
      case 'selectDeck': // Select Deck
        this.connectionProviderInterface({
          address: `/composition/decks/${_action.parameters.deck}/select`,
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'selectLayer': // Select Deck
        this.connectionProviderInterface({
          address: `/composition/layers/${_action.parameters.layer}/select`,
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'selectClip': // Select Deck
        this.connectionProviderInterface({
          address: `/composition/layers/${_action.parameters.layer}/clips/${_action.parameters.clip}/select`,
          args: [{ type: 'i', value: 1 }]
        })
        break

      // BPM Things
      case 'setBPM': // Set BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempo',
          args: [{ type: 'f', value: _action.parameters.find((p) => (p.id === 'bpm')).value }]
        })
        break
      case 'decBPM': // Decrease BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempodec',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'incBPM': // Increase BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempoint',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'pullBPM': // Pull BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempopull',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'pushBPM': // Push BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempopush',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'divBPM': // Divide BPM by 2
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempodividetwo',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'multBPM': // Multiply BPM by 2
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempomultiplytwo',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'tapBPM': // Tap Tempo
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/tempotap',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'resyncBPM': // Resync BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/resync',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'pauseBPM': // Pause BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/pause',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'resumeBPM': // Resume BPM
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/pause',
          args: [{ type: 'i', value: 0 }]
        })
        break
      case 'startMetronome': // Start Metronome
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/metronome',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'stopMetronome': // Stop Metronome
        this.connectionProviderInterface({
          address: '/composition/tempocontroller/metronome',
          args: [{ type: 'i', value: 0 }]
        })
        break

      // Record
      case 'startRecord': // Start Recorder
        this.connectionProviderInterface({
          address: '/composition/recorder/record',
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'stopRecord': // Stop Recorder
        this.connectionProviderInterface({
          address: '/composition/recorder/record',
          args: [{ type: 'i', value: 0 }]
        })
        break
    }
  }
}

export default DeviceProviderResolumeArena
