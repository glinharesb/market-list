import type { NextPage } from 'next'
import { useContext } from 'react'

import { AppContext } from '../components/Context'
import { Modal } from '../components/Modal'
import { formatter } from '../helpers/formatter'
import { removeProduct } from '../helpers/products'

const Home: NextPage = () => {
  const { date, total, products, setShowModal, showModal } =
    useContext(AppContext)

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="p-4">
        <div className="flex flex-col m-auto max-w-xl w-full pt-10 pb-20">
          <h1 className="text-3xl font-bold">Compra do dia</h1>
          <p className="text-2xl mt-2">{date}</p>
          {products && products?.length > 0 ? (
            <div className="mt-10">
              <p>Total da compra</p>
              <p className="text-2xl font-bold mt-2">
                {total && formatter.format(total)}
              </p>
            </div>
          ) : null}
          <div className="mt-5">
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <div
                  key={product.uuid}
                  className="bg-zinc-800 p-5 rounded-md text-sm mt-5"
                  onClick={async () => await removeProduct(product.uuid)}
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
        <button
          className="fixed m-auto left-0 right-0 bottom-10 md:bottom-20 bg-green-500 w-14 h-14 rounded-full text-2xl"
          onClick={() => setShowModal && setShowModal(true)}
        >
          +
        </button>
        {showModal && <Modal />}
      </main>
      <footer className="bg-zinc-800 border-t-2 border-zinc-700">
        <p className="text-xs md:text-sm text-center py-1">
          Copyright © {new Date().getFullYear()} | Made by{' '}
          <a
            href="https://github.com/glinharesb"
            target="_blank"
            rel="noreferrer"
            className="font-bold"
          >
            Gabriel Linhares
          </a>
          <span className="ml-1">🚀</span>
        </p>
      </footer>
    </div>
  )
}

export default Home
