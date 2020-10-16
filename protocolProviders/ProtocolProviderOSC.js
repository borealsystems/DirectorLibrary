import ConnectionProviderOSC from '../connectionProviders/ConnectionProviderOSC'
import REGEX from '../../../utils/regexEnum'

class ProtocolProviderOSC extends ConnectionProviderOSC {
  static providerRegistration = {
    id: 'ProtocolProviderOSC',
    label: 'Protocol: OSC',
    parameters: this.parameters,
    constructor: ProtocolProviderOSC
  }

  providerFunctions = [
    {
      id: 'string',
      label: 'Send String',
      parameters: [
        {
          inputType: 'textInput',
          label: 'OSC Address',
          id: 'address'
        },
        {
          inputType: 'textInput',
          label: 'Value',
          id: 'string'
        }
      ]
    },
    {
      id: 'integer',
      label: 'Send Integer',
      parameters: [
        {
          inputType: 'textInput',
          label: 'OSC Address',
          id: 'address'
        },
        {
          inputType: 'textInput',
          label: 'Value',
          id: 'int',
          regex: REGEX.SIGNEDINT
        }
      ]
    },
    {
      id: 'float',
      label: 'Send Float',
      parameters: [
        {
          inputType: 'textInput',
          label: 'OSC Address',
          id: 'address'
        },
        {
          inputType: 'textInput',
          label: 'Value',
          id: 'float',
          regex: REGEX.SIGNEDFLOAT
        }
      ]
    },
    {
      id: 'address',
      label: 'Send address',
      parameters: [
        {
          inputType: 'textInput',
          label: 'OSC Address',
          id: 'address'
        }
      ]
    }
  ]

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      case 'address':
        this.connectionProviderInterface({
          address: _action.parameters.find((parameter) => { return parameter.id === 'address' }).value
        })
        break
      case 'string':
        this.connectionProviderInterface({
          address: _action.parameters.find((parameter) => { return parameter.id === 'address' }).value,
          args: [
            {
              type: 's',
              value: _action.parameters.find((parameter) => { return parameter.id === 'string' }).value
            }
          ]
        })
        break
      case 'integer':
        this.connectionProviderInterface({
          address: _action.parameters.find((parameter) => { return parameter.id === 'address' }).value,
          args: [
            {
              type: 'i',
              value: _action.parameters.find((parameter) => { return parameter.id === 'int' }).value
            }
          ]
        })
        break
      case 'float':
        this.connectionProviderInterface({
          address: _action.parameters.find((parameter) => { return parameter.id === 'address' }).value,
          args: [
            {
              type: 'f',
              value: _action.parameters.find((parameter) => { return parameter.id === 'float' }).value
            }
          ]
        })
        break
    }
  }
}

export default ProtocolProviderOSC
