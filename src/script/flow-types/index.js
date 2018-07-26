// @flow

export type OperationType = 'mutation' | 'query'
export type Query = {
  args: any,
  fields: any,
  name: string,
  operationType: OperationType
}
