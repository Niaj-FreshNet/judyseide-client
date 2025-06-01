import { useJodyDrawer } from "./JodyDrawer";

export function DrawerHeader() {
  const { closeDrawer } = useJodyDrawer();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold">Add To Bag</h2>
      <button className="text-gray-400 hover:text-gray-600" onClick={closeDrawer}>✕</button>
    </header>
  );
}
