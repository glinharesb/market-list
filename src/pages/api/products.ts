import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs/promises'

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

  if (req.method === 'GET') {
    const data = await getProducts()

    res.status(200).json(data)
  } else if (req.method === 'POST') {
    try {
      const data = await getProducts()

      await fs.writeFile('./products.json', JSON.stringify([...data, req.body]))

      res.status(200).json(req.body)
    } catch (error) {
      res.status(200).json({ error })
    }
  }
}
