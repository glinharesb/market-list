import {
  useCallback,
  SyntheticEvent,
  useContext,
  useRef,
  useEffect
} from 'react'
import { addProduct } from '../helpers/products'
import { CloseIcon } from './CloseIcon'
import { AppContext } from './Context'

export const Modal = () => {
  const { products, setProducts, setShowModal, setIsLoading } =
    useContext(AppContext)

  const nameRef = useRef<HTMLInputElement>(null)
  const quantityRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current!.focus()
  }, [])

  const clearInputs = useCallback(() => {
    nameRef.current!.value = ''
    quantityRef.current!.value = ''
    priceRef.current!.value = ''

    nameRef.current!.focus()
  }, [])

  const sendForm = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault()

      if (!setShowModal || !setProducts || !products || !setIsLoading) return

      const name = nameRef.current!.value
      const quantity = quantityRef.current!.value
      const price = priceRef.current!.value

      if (!name?.length || !quantity?.length || !price?.length) return

      const uuid = new Date().valueOf()

      setIsLoading(true)

      await addProduct({
        name,
        quantity: Number(quantity),
        price: Number(price),
        uuid
      })

      setTimeout(() => setIsLoading(false), 500)

      setShowModal(false)
      clearInputs()
    },
    [setShowModal, setProducts, products, clearInputs, setIsLoading]
  )

  return (
    <>
      <div className="absolute bg-opacity-50 bg-black top-0 left-0 bottom-0 right-0" />
      <div
        className={`absolute bottom-0 left-0 w-full p-5 pb-10 bg-zinc-800 rounded-t-xl`}
      >
        <div className="flex justify-between">
          <p className="font-bold">Novo Item</p>
          <button
            className="w-10 h-10 flex absolute right-3 top-3 justify-center items-center"
            onClick={() => setShowModal && setShowModal(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <form className="flex flex-col" onSubmit={sendForm}>
          <input
            className="mt-5 p-4 bg-zinc-900 rounded-md"
            placeholder="Nome"
            type="text"
            ref={nameRef}
          />
          <input
            className="mt-5 p-4 bg-zinc-900 rounded-md"
            placeholder="Quantidade"
            type="number"
            ref={quantityRef}
          />
          <input
            className="mt-5 p-4 bg-zinc-900 rounded-md"
            placeholder="Valor por unidade"
            type="number"
            ref={priceRef}
          />
          <button
            className="mt-5 bg-green-500 p-4 rounded-md focus:ring"
            type="submit"
          >
            Adicionar
          </button>
          <button
            className="mt-2 bg-red-500 p-4 rounded-md focus:ring"
            onClick={(e) => {
              e.preventDefault()
              clearInputs()
            }}
          >
            Limpar
          </button>
        </form>
      </div>
    </>
  )
}
