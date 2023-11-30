import { Separator } from "@/components/ui/separator";
import Info from "./_components/info";
import BoardList from "./_components/board-list";

export default async function Organization() {
  return (
    <div className="flex flex-col  h-full   px-6 py-12">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
}
