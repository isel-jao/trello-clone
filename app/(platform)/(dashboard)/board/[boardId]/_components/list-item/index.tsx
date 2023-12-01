import { ListWithCards } from "@/types";
import React from "react";
import ListHeader from "../list-header";

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  lists: ListWithCards[];
  index: number;
}

export default function ListItem({ lists, index }: Props) {
  const list = lists[index];
  if (!list) return null;
  return (
    <li className="  items-start justify-between gap-2 rounded bg-white/50 p-2 text-sm font-semibold shadow-sm backdrop-blur-sm">
      <ListHeader list={list} />
    </li>
  );
}
