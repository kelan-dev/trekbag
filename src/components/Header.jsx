import Counter from "./Counter";
import Logo from "./Logo";
import { useItemsStore } from "../stores/ItemsStore";

export default function Header() {
  const currentItems = useItemsStore((state) => state.currentItems);
  const totalItems = useItemsStore((state) => state.totalItems);

  return (
    <header>
      <Logo />
      <Counter
        currentItems={currentItems}
        totalItems={totalItems}
        label="items packed"
      />
    </header>
  );
}
