'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from '@heroui/drawer'
import { useDisclosure } from '@heroui/react'
import { createContext, useContext, ReactNode, useState } from 'react'

type DrawerContentType = ReactNode

interface JodyDrawerContextType {
  openDrawer: (content: DrawerContentType) => void
  closeDrawer: () => void
}

const JodyDrawerContext = createContext<JodyDrawerContextType | null>(null)

export const useJodyDrawer = () => {
  const ctx = useContext(JodyDrawerContext)
  if (!ctx) throw new Error('useJodyDrawer must be used within JodyDrawerProvider')
  return ctx
}

export function JodyDrawerProvider({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [drawerContent, setDrawerContent] = useState<DrawerContentType>(null)

  const openDrawer = (content: DrawerContentType) => {
    setDrawerContent(content)
    onOpen()
  }

  const closeDrawer = () => {
    onOpenChange(false)
    setDrawerContent(null)
  }

  return (
    <JodyDrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
        <DrawerContent>
          {(onClose) => (
            <>
              {/* Drawer layout is fixed; content is injected */}
              {drawerContent}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </JodyDrawerContext.Provider>
  )
}
