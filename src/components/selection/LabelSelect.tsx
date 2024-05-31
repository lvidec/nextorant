"use client";

import { Badge } from "@/components/ui/badge";
import { useLabelsStore } from "@/lib/store/labelsStore";
import { LabelWithIsActive } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ILabelSelectProps {
  label: LabelWithIsActive;
  setFalsyOtherLabels: (labelId: string) => void;
}

export function LabelSelect({ label, setFalsyOtherLabels }: ILabelSelectProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);

  const handleLabelSelection = useLabelsStore(
    (state) => state.handleLabelSelection
  );

  const handleLabelSelect = (labelId: string) => {
    label.isActive = !label.isActive;

    const newIsActive = !isActive;
    setIsActive(newIsActive);
    handleLabelSelection(label.isActive, labelId);
    setFalsyOtherLabels(labelId);
  };

  const replacePageParam = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Badge
      id="label-badge"
      variant={"outline"}
      className={cn("py-3 px-5", { "border-2 border-sky-700": label.isActive })}
      onClick={() => {
        replacePageParam()
        handleLabelSelect(label.id);
      }}
    >
      {label.name}
    </Badge>
  );
}
