"use client";

import { Badge } from "@/components/ui/badge";
import { useLabelsStore } from "@/lib/store/labelsStore";
import { LabelWithIsActive } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ILabelBadgeProps {
  label: LabelWithIsActive;
  setFalsyOtherLabels: (labelId: string) => void;
}

export function LabelBadge({
  label,
  setFalsyOtherLabels,
}: ILabelBadgeProps) {
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

  return (
    <Badge
      variant={"outline"}
      className={cn("py-3 px-5", { "border-2 border-sky-700": label.isActive })}
      onClick={() => handleLabelSelect(label.id)}
    >
      {label.name}
    </Badge>
  );
}
