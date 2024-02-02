'use client'
import { PricesList, TicketDetails } from '@/lib/types'
import { Agency, Contact, Plan, User } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'

interface ModalProviderProps {
  children: React.ReactNode
}

export type ModalData = {
  user?: User
  agency?: Agency
  ticket?: TicketDetails[0]
  contact?: Contact
  plans?: {
    defaultPriceId: Plan
    plans: PricesList['data']
  }
}

/**
 * setOpen 设置是否打开模态框，modal为传入节点,fetchData为获取的数据，提供全局使用
 */
type ModalContextType = {
  data: ModalData
  isOpen: boolean
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void
  setClose: () => void
}

/** 充当全局modal数据状态管理者 */
export const ModalContext = createContext<ModalContextType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
})

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<ModalData>({})
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null)
  /** 标识dom挂载，避免水合错误 */
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<any>
  ) => {
    if (modal) {
      if (fetchData) {
        setData({ ...data, ...(await fetchData()) } || {})
      }
      setShowingModal(modal)
      setIsOpen(true)
    }
  }

  const setClose = () => {
    setIsOpen(false)
    setData({})
  }

  if (!isMounted) return null

  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {/* 接收带有任何数据的Modal */}
      {showingModal} 
    </ModalContext.Provider>
  )
}

/** 提供全局使用的Modal方法 */
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within the modal provider')
  }
  return context
}

export default ModalProvider
