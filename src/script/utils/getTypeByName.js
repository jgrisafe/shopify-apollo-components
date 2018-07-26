// @flow

import { TYPES } from '../constants'

export default function getTypeByName(name: string) {
  for (let i = 0; i < TYPES.length; i += 1) {
    const type = TYPES[i]
    if (name === type.name) return type
  }

  return null
}
