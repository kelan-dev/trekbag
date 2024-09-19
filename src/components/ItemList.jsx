import Select from "react-select";
import EmptyView from "./EmptyView";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/ItemsStore";

const options = [
  { label: "Sort by default", value: "default" },
  { label: "Sort by packed", value: "packed" },
  { label: "Sort by unpacked", value: "unpacked" },
];

export default function ItemList() {
  const items = useItemsStore((state) => state.items);

  const [sortBy, setSortBy] = useState("default");

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return !a.packed && b.packed ? 1 : -1;
        }
        if (sortBy === "unpacked") {
          return a.packed && !b.packed ? 1 : -1;
        }
        return 0;
      }),
    [sortBy, items]
  );

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.length > 0 && (
        <section className="sorting">
          <Select
            options={options}
            defaultValue={options[0]}
            onChange={(option) => setSortBy(option.value)}
          />
        </section>
      )}
      {sortedItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  const togglePacked = useItemsStore((state) => state.togglePacked);
  const removeItem = useItemsStore((state) => state.removeItem);

  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => togglePacked(item.id)}
        />
        {item.name}
      </label>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}
