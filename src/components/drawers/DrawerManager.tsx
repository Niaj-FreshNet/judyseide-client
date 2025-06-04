"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader as NextUIDrawerHeader,
  DrawerFooter,
} from "@heroui/drawer";
import { createContext, useContext, useState, ReactNode } from "react";

import { DrawerHeader } from "./DrawerHeader";
import { CartDrawer } from "./CartDrawer/CartDrawer";
import { WishlistDrawer } from "./WishlistDrawer/WishlistDrawer";

type DrawerType = "cart" | "wishlist" | "custom" | null;

interface DrawerContextType {
  openDrawer: (type: DrawerType, content?: ReactNode) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function useDrawerManager() {
  const context = useContext(DrawerContext);

  if (!context) throw new Error("Must use within <DrawerProvider>");

  return context;
}

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDrawer, setCurrentDrawer] = useState<DrawerType>(null);
  const [customDrawerContent, setCustomDrawerContent] = useState<ReactNode | null>(null);

  const openDrawer = (type: DrawerType, content?: ReactNode) => {
    setCurrentDrawer(type);
    if (type === "custom" && content) {
      setCustomDrawerContent(content);
    }
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setCurrentDrawer(null);
    setCustomDrawerContent(null);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}

      <Drawer
        hideCloseButton
        isDismissable
        className="rounded-none"
        isOpen={isOpen}
        placement="right"
        size="2xl"
        onClose={closeDrawer}
      >
        <DrawerContent>
          <NextUIDrawerHeader>
            <DrawerHeader
              currentDrawer={
                currentDrawer === "cart" || currentDrawer === "wishlist" ? currentDrawer : "cart"
              }
              onAddToBag={() => openDrawer("cart")}
              onWishlist={() => openDrawer("wishlist")}
            />

            {/* <DrawerCloseButton /> */}
          </NextUIDrawerHeader>

          <DrawerBody className="px-6 py-4">
            {currentDrawer === "cart" && <CartDrawer />}
            {currentDrawer === "wishlist" && <WishlistDrawer />}
            {currentDrawer === "custom" && customDrawerContent}
          </DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
};
