// @flow

import buildArgsObject from './buildArgsObject'
import { data } from '../../../graphql.schema.json'

describe('buildArgsObject', () => {
  it('should build the args object', () => {
    const shop = data.__schema.types.find(type => type.name === 'Shop')
    const collectionByHandle = shop.fields.find(type => type.name === 'productByHandle')
    const args = buildArgsObject(collectionByHandle)
    const expectedResult = {
      handle: 'String',
      collections: {
        first: 'Int',
        after: 'String',
        last: 'Int',
        before: 'String',
        reverse: 'Boolean'
      },
      description: {
        truncateAt: 'Int'
      },
      images: {
        first: 'Int',
        after: 'String',
        last: 'Int',
        before: 'String',
        reverse: 'Boolean',
        sortKey: 'CREATED_AT | POSITION | ID | RELEVANCE',
        maxWidth: 'Int',
        maxHeight: 'Int',
        crop: 'CENTER | TOP | BOTTOM | LEFT | RIGHT',
        scale: 'Int'
      },
      options: {
        first: 'Int'
      },
      variantBySelectedOptions: {
        selectedOptions: {
          name: 'String',
          value: 'String'
        }
      },
      variants: {
        first: 'Int',
        after: 'String',
        last: 'Int',
        before: 'String',
        reverse: 'Boolean',
        sortKey: 'TITLE | SKU | POSITION | ID | RELEVANCE'
      }
    }

    expect(args).toEqual(expectedResult)
  })
})
