import { executeStack } from '../../../stacks'
import { devices, controllers, panels } from '../../../db'
import { pubsub } from '../../../network/graphql/schema'
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

  providerFunctions = (args) => new Promise((resolve, reject) => {
    const funcs = [
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
      },
      {
        id: 'assignControllerPanel',
        label: 'Assign Panel to Controller',
        parameters: [
          {
            inputType: 'comboBox',
            label: 'Controller',
            id: 'controller',
            items: async (args) => {
              const realmFilter = args.realm ? { realm: args.realm } : {}
              const coreFilter = args.core ? { core: args.core } : {}
              return await controllers.find({ ...realmFilter, ...coreFilter }).toArray()
            }
          },
          {
            inputType: 'comboBox',
            label: 'Panel',
            id: 'panel',
            items: async (args) => {
              const realmFilter = args.realm ? { realm: args.realm } : {}
              const coreFilter = args.core ? { core: args.core } : {}
              return await panels.find({ ...realmFilter, ...coreFilter }).toArray()
            }
          }
        ]
      }
    ]
    resolve(funcs)
  })

  init = () => devices.updateOne({ id: this.device.id }, { $set: { status: STATUS.OK } })

  destroy = () => {}

  recreate = () => {}

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      case 'executeStack':
        executeStack(_action.parameters.stack)
        break

      case 'writeToLog':
        log('info', 'Manual Log', _action.parameters.content)
        break

      case 'assignControllerPanel':
        console.log(_action)
        controllers.findOne({ id: _action.parameters.controller })
          .then((controller) => {
            log('info', 'core/lib/controllers', `Updated ${controller.id}`)
            pubsub.publish('CONTROLLER_UPDATE', { controller: controller })
          })
        break
    }
  }
}

export default ProtocolProviderBorealDirector
