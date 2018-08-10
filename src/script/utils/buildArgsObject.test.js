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
        ProductImageSortKeys: 'CREATED_AT | POSITION | ID | RELEVANCE',
        maxWidth: 'Int',
        maxHeight: 'Int',
        CropRegion: 'CENTER | TOP | BOTTOM | LEFT | RIGHT',
        scale: 'Int'
      },
      options: {
        first: 'Int'
      },
      variantBySelectedOptions: {
        SelectedOptionInput: {
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
        ProductVariantSortKeys: 'TITLE | SKU | POSITION | ID | RELEVANCE'
      }
    }

    expect(args).toEqual(expectedResult)
  })
})
