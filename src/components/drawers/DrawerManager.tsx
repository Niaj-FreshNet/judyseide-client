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
        isOpen={isOpen}
        onClose={closeDrawer}
        placement="right"
        size="2xl"
        hideCloseButton
        isDismissable
        className="rounded-none"
      >
        <DrawerContent>
          <NextUIDrawerHeader>
            <DrawerHeader
              onAddToBag={() => openDrawer("cart")}
              onWishlist={() => openDrawer("wishlist")}
              currentDrawer={currentDrawer === "cart" || currentDrawer === "wishlist" ? currentDrawer : "cart"}
            />

            {/* <DrawerCloseButton /> */}
          </NextUIDrawerHeader>

          <DrawerBody className="px-6 py-4">
            {currentDrawer === "cart" && <CartDrawer />}
            {currentDrawer === "wishlist" && <WishlistDrawer />}
            {currentDrawer === "custom" && customDrawerContent}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
};
