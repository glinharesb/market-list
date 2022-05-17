import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

interface IProducts {
  name: string
  quantity: number
  price: number
}

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS'
})

const Home: NextPage = () => {
  const [date, setDate] = useState('')

  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState<IProducts[]>([])

  useEffect(() => {
    let newTotal = 0
    products.forEach((product) => {
      newTotal += product.quantity * product.price
    })

    setTotal(newTotal)
  }, [products])

  useEffect(() => {
    const today = new Date()
    const formatDate = today.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    setDate(formatDate)

    setProducts([
      ...products,
      {
        name: 'Teste',
        quantity: 1,
        price: 10
      },
      {
        name: 'Teste 2',
        quantity: 3,
        price: 15
      }
    ])
  }, [])

  return (
    <div className="text-white font-poppins antialiased px-4 pt-5">
      <div className="flex flex-col m-auto max-w-3xl w-full pt-10 pb-20">
        <h1 className="text-3xl font-bold">Compra do dia</h1>
        <p className="text-2xl mt-2">{date}</p>
        <div className="mt-10">
          <p>Total da compra</p>
          <p className="text-2xl font-bold mt-2">{formatter.format(total)}</p>
        </div>
        <div className="mt-5">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-5 rounded-md text-sm mt-5"
            >
              <div className="flex justify-between font-bold">
                <p>{product.name}</p>
                <p>{formatter.format(product.price)}</p>
              </div>
              <p className="flex justify-between mt-3 text-zinc-500">
                Quantidade: {product.quantity}{' '}
                <span>{formatter.format(product.price)} / unid.</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="fixed m-auto left-0 right-0 bottom-5 bg-green-500 w-14 h-14 rounded-full text-2xl">
        +
      </button>
    </div>
  )
}

export default Home
