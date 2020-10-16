import ConnectionProviderTCP from '../connectionProviders/ConnectionProviderTCP'

class ProtocolProviderTCP extends ConnectionProviderTCP {
  static providerRegistration = {
    id: 'ProtocolProviderTCP',
    label: 'Protocol: TCP',
    parameters: this.parameters,
    constructor: ProtocolProviderTCP
  }

  providerFunctions = [
    {
      id: 'message',
      label: 'Send ASCII over TCP',
      parameters: [
        {
          inputType: 'textInput',
          label: 'ASCII string',
          id: 'message'
        }
      ]
    }
  ]

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      case 'message':
        this.connectionProviderInterface({
          message: `${_action.parameters.find(parameter => parameter.id === 'message').value}\r`
        })
        break
    }
  }
}

export default ProtocolProviderTCP
