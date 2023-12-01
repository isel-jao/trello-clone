"use client";

import { ListWithCards } from "@/types";
import React, { useEffect } from "react";
import ListForm from "../list-form";
import { list } from "unsplash-js/dist/methods/photos";
import ListItem from "../list-item";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

export default function ListContainer({ lists, boardId }: ListContainerProps) {
  const [orderLists, setOrderLists] = React.useState(lists);

  useEffect(() => {
    setOrderLists(lists);
  }, [lists]);

  return (
    <ol className="  flex items-start gap-2 [&>li]:w-64">
      {orderLists.map((list, index) => (
        <ListItem lists={lists} index={index} key={list.id}>
          {list.title}
        </ListItem>
      ))}
      <ListForm />
      <div className="w-1 flex-shrink-0 " />
    </ol>
  );
}
