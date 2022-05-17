import React, {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import { getProducts } from '../helpers/products'

export interface IProducts {
  name: string
  quantity: number
  price: number
  uuid: number
}

interface IAppContext {
  date?: string
  total?: number
  products?: IProducts[]
  setProducts?: React.Dispatch<React.SetStateAction<IProducts[]>>
  showModal?: boolean
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<IAppContext>({})

export const AppProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  const [date, setDate] = useState('')
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState<IProducts[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // get and insert date
    const today = new Date()
    const formatDate = today.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    setDate(formatDate)
  }, [])

  useEffect(() => {
    // sum total value
    let totalValue = 0
    products.forEach(
      (product) => (totalValue += product.quantity * product.price)
    )

    setTotal(totalValue)

    getProducts().then(setProducts)
  }, [products])

  useEffect(() => {
    // modal prevent scroll
    if (showModal) {
      document.querySelector('html')!.classList.add('disable-scroll')
    } else {
      document.querySelector('html')!.classList.remove('disable-scroll')
    }
  }, [showModal])

  return (
    <AppContext.Provider
      value={{
        date,
        total,
        products,
        setProducts,
        showModal,
        setShowModal
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
