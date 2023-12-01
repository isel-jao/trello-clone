import { ListWithCards } from "@/types";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  lists: ListWithCards[];
  index: number;
}

export default function ListItem({ lists, index }: Props) {
  const list = lists[index];
  if (!list) return null;
  return <div>{list.title}</div>;
}
