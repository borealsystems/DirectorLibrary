import osc from 'osc'
import { devices } from '../../../db'
import log from '../../../utils/log'
import STATUS from '../../../utils/statusEnum'
import REGEX from '../../../utils/regexEnum'

export default function load (providers) {
  log('info', 'core/lib/deviceProviders/GenericOSC', 'Loaded device provider: Generic - OSC')
  providers.push(descriptor)
}
class GenericOSC {
  constructor (_device) {
    this.device = _device
  }

  init = () => {
    this.oscClient = new osc.UDPPort({
      localAddress: '0.0.0.0',
      localPort: 0,
      metadata: true
    })
    this.oscClient.open()
    this.oscClient.on('error', function (error) {
      log('error', `virtual/device/${this.device.id}`, error)
    })
    devices.get(this.device.id, (error, value) => {
      if (error) log('error', `virtual/device/${this.device.id}`, error)
      devices.put(this.device.id, { ...value, status: STATUS.OK })
    })
  }

  destroy = (callback) => {
    if (this.oscClient) {
      this.oscClient.close()
    }
    if (typeof callback === 'function') {
      callback()
    }
  }

  recreate = () => {}

  rawInterface = (_address, _args) => {
    this.oscClient.send(
      {
        address: _address,
        args: _args
      },
      this.device.configuration[0].value,
      this.device.configuration[1].value
    )
  }

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      case 'path':
        this.rawInterface(
          _action.parameters.find((parameter) => { return parameter.id === 'path' }).value
        )
        break
      case 'string':
        this.rawInterface(
          _action.parameters.find((parameter) => { return parameter.id === 'path' }).value,
          [
            {
              type: 's',
              value: _action.parameters.find((parameter) => { return parameter.id === 'string' }).value
            }
          ]
        )
        break
      case 'integer':
        this.rawInterface(
          _action.parameters.find((parameter) => { return parameter.id === 'path' }).value,
          [
            {
              type: 'i',
              value: _action.parameters.find((parameter) => { return parameter.id === 'int' }).value
            }
          ]
        )
        break
      case 'float':
        this.rawInterface(
          _action.parameters.find((parameter) => { return parameter.id === 'path' }).value,
          [
            {
              type: 'f',
              value: _action.parameters.find((parameter) => { return parameter.id === 'float' }).value
            }
          ]
        )
        break
    }
  }
}

const descriptor = {
  id: 'Generic-OSC',
  type: 'protocol',
  label: 'Generic OSC',
  Construct: GenericOSC,
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
      id: 'string',
      label: 'Send String',
      parameters: [
        {
          inputType: 'textInput',
          label: 'OSC Path',
          id: 'path'
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
          label: 'OSC Path',
          id: 'path'
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
          label: 'OSC Path',
          id: 'path'
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
      id: 'path',
      label: 'Send Path',
      parameters: [
        {
          inputType: 'textInput',
          label: 'OSC Path',
          id: 'path'
        }
      ]
    }
  ]
}

export { GenericOSC }
