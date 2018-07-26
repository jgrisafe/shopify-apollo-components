// @flow

import React, { Component } from 'react'

// eslint-disable-next-line
const { Provider, Consumer }: React.createContext<any> = React.createContext()

type State = {
  product: Object,
  loading: boolean
}

export class ProductProvider extends Component<any, State> {
  constructor() {
    super()
    this.state = {
      product: window.context.product,
      loading: !window.context.product
    }
  }

  componentDidMount() {
    this.fetchProduct()
  }

  fetchProduct = async () => {
    if (!this.state.product) {
      console.log('fetching product...') // eslint-disable-line no-console
      this.setState({ loading: true })

      const request = await fetch('?view=json', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
        },
        credentials: 'include',
      })

      try {
        const { product } = await request.json()
        this.setState({ product, loading: false })
      } catch (err) {
        console.log("couldn't fetch json product, are you sure you have a product.json.liquid template?")
      }
    }
  }

  render() {
    const { loading, product } = this.state
    return (
      <Provider value={{ loading, product }}>
        {this.props.children}
      </Provider>
    )
  }
}

export const ProductConsumer = Consumer
