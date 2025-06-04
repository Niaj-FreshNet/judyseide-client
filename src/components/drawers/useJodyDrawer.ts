import { useDrawerManager } from "./DrawerManager";

export function useJodyDrawer() {
  const { openDrawer, closeDrawer } = useDrawerManager();

  return {
    openDrawer: (component: JSX.Element) => {
      console.warn("⚠️ useJodyDrawer is deprecated. Please use useDrawerManager.");
      openDrawer("custom", component);
    },
    closeDrawer,
    closeButtonClass: "text-sm text-gray-500 hover:text-orange-400",
  };
}
