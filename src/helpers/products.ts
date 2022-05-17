import { IProducts } from '../components/Context'

export async function getProducts() {
  try {
    const response = await fetch('/api/products')
    const data = response.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function addProduct(product: IProducts) {
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  } catch (error) {
    console.error(error)
  }
}

export async function removeProduct(uuid: number) {
  try {
    await fetch('/api/products', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ uuid })
    })
  } catch (error) {
    console.error(error)
  }
}
