import { useDrawerManager } from "./DrawerManager";

export function useJodyDrawer() {
  const { openDrawer, closeDrawer } = useDrawerManager();

  return {
    openDrawer: (component: JSX.Element) => {
      openDrawer("custom", component);
    },
    closeDrawer,
    closeButtonClass: "text-sm text-gray-500 hover:text-orange-400",
  };
}
