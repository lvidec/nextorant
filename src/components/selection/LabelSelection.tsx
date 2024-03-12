"use client";

import { LabelSelect } from "@/components/selection/LabelSelect";
import { LabelWithIsActive } from "@/lib/types";
import { Label } from "@/prisma/generated/client";
import { useState } from "react";

interface ILabelSelectionProps {
  labels: Label[];
}

const labelAll: LabelWithIsActive = { id: "", name: "All", isActive: true };

export function LabelSelection({ labels }: ILabelSelectionProps) {
  const allLabels: LabelWithIsActive[] = labels.map((label) => {
    return { ...label, isActive: false };
  });

  const [labelsWithIsActive, setLabelsWithIsActive] = useState<
    LabelWithIsActive[]
  >([labelAll, ...allLabels]);

  const setFalsyOtherLabels = (labelId: string) => {
    setLabelsWithIsActive(
      labelsWithIsActive.map((label) =>
        label.id !== labelId ? { ...label, isActive: false } : { ...label }
      )
    );
  };

  return (
    <div className="flex gap-4 flex-wrap mx-4">
      {labelsWithIsActive.map((label) => (
        <LabelSelect
          key={label.id}
          label={label}
          setFalsyOtherLabels={setFalsyOtherLabels}
        />
      ))}
    </div>
  );
}
