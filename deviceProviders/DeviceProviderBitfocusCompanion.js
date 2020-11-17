import ConnectionProviderOSC from '../connectionProviders/ConnectionProviderOSC'

class DeviceProviderBitfocusCompanion extends ConnectionProviderOSC {
  static providerRegistration = {
    id: 'DeviceProviderBitfocusCompanion',
    label: 'Bitfocus Companion',
    parameters: this.parameters,
    constructor: DeviceProviderBitfocusCompanion
  }

  providerFunctions = [
    {
      id: 'buttonTrigger',
      label: 'Trigger Button (Down and Up)',
      parameters: [
        {
          inputType: 'textInput',
          id: 'page',
          label: 'Page'
        },
        {
          inputType: 'textInput',
          id: 'button',
          label: 'Button'
        }
      ]
    },
    {
      id: 'buttonDown',
      label: 'Press Button (Down)',
      parameters: [
        {
          inputType: 'textInput',
          id: 'page',
          label: 'Page'
        },
        {
          inputType: 'textInput',
          id: 'button',
          label: 'Button'
        }
      ]
    },
    {
      id: 'buttonUp',
      label: 'Release Button (Up)',
      parameters: [
        {
          inputType: 'textInput',
          id: 'page',
          label: 'Page'
        },
        {
          inputType: 'textInput',
          id: 'button',
          label: 'Button'
        }
      ]
    },
    {
      id: 'buttonText',
      label: 'Set Button Text',
      parameters: [
        {
          inputType: 'textInput',
          id: 'page',
          label: 'Page'
        },
        {
          inputType: 'textInput',
          id: 'button',
          label: 'Button'
        },
        {
          inputType: 'textInput',
          id: 'text',
          label: 'Text'
        }
      ]
    }
  ]

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      case 'buttonTrigger': // Trigger Button
        this.connectionProviderInterface({
          address: `/press/bank/${_action.parameters.page}/${_action.parameters.button}`,
          args: []
        })
        break
      case 'buttonDown': // Button Down actions
        this.connectionProviderInterface({
          address: `/press/bank/${_action.parameters.page}/${_action.parameters.button}`,
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'buttonUp': // Button Up actions
        this.connectionProviderInterface({
          address: `/press/bank/${_action.parameters.page}/${_action.parameters.button}`,
          args: [{ type: 'i', value: 0 }]
        })
        break
      case 'buttonText': // Button Up actions
        this.connectionProviderInterface({
          address: `/style/text/${_action.parameters.page}/${_action.parameters.button}`,
          args: [{ type: 's', value: _action.parameters.text }]
        })
        break
    }
  }
}

export default DeviceProviderBitfocusCompanion
