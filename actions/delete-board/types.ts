import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = string;
export type OutputType = ActionState<InputType, Board>;
