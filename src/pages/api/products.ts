import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs/promises'
import { IProducts } from '../../components/Context'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function getProducts() {
    try {
      const data = await fs.readFile('./products.json')
      return JSON.parse(data.toString())
    } catch (error) {
      res.status(200).json({ error })
    }
  }

  async function setProducts(products: IProducts[]) {
    try {
      await fs.writeFile('./products.json', JSON.stringify(products, null, 2))
    } catch (error) {
      res.status(200).json({ error })
    }
  }

  if (req.method === 'GET') {
    const data = await getProducts()

    res.status(200).json(data)
  } else if (req.method === 'POST') {
    try {
      const data = await getProducts()

      await setProducts([...data, req.body])

      res.status(200).json(req.body)
    } catch (error) {
      res.status(200).json({ error })
    }
  } else if (req.method === 'DELETE') {
    try {
      const data: IProducts[] = await getProducts()

      const filteredProducts = data.filter(
        (products) => products.uuid !== req.body.uuid
      )

      await setProducts(filteredProducts)

      res.status(200).json(req.body)
    } catch (error) {
      res.status(200).json({ error })
    }
  } else {
    res.status(200).json({ error: 'invalid method' })
  }
}
