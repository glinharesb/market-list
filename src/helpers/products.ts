import { IProducts } from '../components/Context'

export async function getProducts() {
  try {
    const data = localStorage.getItem('products')
    const parsedData = !data ? [] : JSON.parse(data)

    return parsedData
  } catch (error) {
    console.error(error)
  }

  return []
}

export async function addProduct(product: IProducts) {
  try {
    const products = await getProducts()

    localStorage.setItem('products', JSON.stringify([...products, product]))
  } catch (error) {
    console.error(error)
  }
}

export async function removeProduct(uuid: number) {
  try {
    const products = await getProducts()
    if (!products.length) return

    const filteredProducts = products.filter(
      (product: IProducts) => product.uuid !== uuid
    )

    localStorage.setItem('products', JSON.stringify(filteredProducts))
  } catch (error) {
    console.error(error)
  }
}
