import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/logo";

export default function MarketingPage() {
  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className="flex items-center justify-start flex-col">
        <div className="flex items-center p-4 border gap-2  shadow-sm bg-amber-100 text-amber-700 rounded-full mb-4 font-semibold uppercase">
          <Medal className="h-6 w-6 " />
          No 1 task management app
        </div>
        <h1
          className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 font-bold "
          style={{
            letterSpacing: "-0.025em",
          }}
        >
          Taskify helps teams move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md mb-2">
          Work forward.
        </div>
        <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center">
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is
          unique—accomplish it all with Taskify.
        </div>
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Started for free</Link>
      </Button>
    </div>
  );
}
