import { cn } from "@/lib/utils";

export function HorizontalLine(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("w-full h-[2px] bg-slate-300 my-6", props.className)}
    ></div>
  );
}
