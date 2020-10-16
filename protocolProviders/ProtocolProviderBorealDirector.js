import { executeStack } from '../../../stacks'
import { devices } from '../../../db'
import log from '../../../utils/log'
import STATUS from '../../../utils/statusEnum'

class ProtocolProviderBorealDirector {
  constructor (_device) {
    this.device = _device
  }

  static providerRegistration = {
    id: 'ProtocolProviderBorealDirector',
    label: 'BorealSystems Director Core',
    parameters: [],
    constructor: ProtocolProviderBorealDirector
  }

  providerFunctions = [
    {
      id: 'executeStack',
      label: 'Execute Stack',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Stack ID',
          id: 'stack'
        }
      ]
    },
    {
      id: 'writeToLog',
      label: 'Add A Log Message',
      parameters: [
        {
          inputType: 'textInput',
          label: 'Log Content',
          id: 'content'
        }
      ]
    }
  ]

  init = () => devices.updateOne({ id: this.device.id }, { $set: { status: STATUS.OK } })

  destroy = () => {}

  recreate = () => {}

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      case 'executeStack':
        executeStack(_action.parameters.find((parameter) => { return parameter.id === 'stack' }).value)
        break

      case 'writeToLog':
        log('info', 'Manual Log', _action.parameters.find((parameter) => { return parameter.id === 'content' }).value)
        break
    }
  }
}

export default ProtocolProviderBorealDirector
