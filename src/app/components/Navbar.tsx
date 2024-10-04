import Link from "next/link";

export default function Navbar(props: {
  items: { key: string; value: string }[];
}) {
  return (
    <nav className="p-1 rounded-2xl bg-slate-100 gap-x-2 flex whitespace-nowrap overflow-x-auto my-4">
      {props.items.map((i, idx) => (
        <Link href={{ search: `?nav_id=${i.key}` }}>
          <div
            key={idx}
            className="px-4 py-1 bg-white rounded-2xl text-stone-500 font-semibold"
          >
            {i.value}
          </div>
        </Link>
      ))}
    </nav>
  );
}
