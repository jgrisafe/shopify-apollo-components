// @flow

import buildArgsObject from './buildArgsObject'
import { data } from '../../../graphql.schema.json'

describe('buildArgsObject', () => {
  it('should build the args object', () => {
    const shop = data.__schema.types.find(type => type.name === 'Shop')
    const collectionByHandle = shop.fields.find(type => type.name === 'collectionByHandle')
    const args = buildArgsObject(collectionByHandle)
    console.log(args) // eslint-disable-line no-console
  })
})
