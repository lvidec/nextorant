"use client";

import { Label } from "@/prisma/generated/client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ILabelSelectionProps {
  labels: Label[];
  handleLabelSelection: (isActive: boolean, labelId: string) => void;
}

type LabelWithIsActive = Label & { isActive: boolean };

const labelAll: LabelWithIsActive = {id: '', name: 'All', isActive: true}

export function LabelSelection({
  labels,
  handleLabelSelection,
}: ILabelSelectionProps) {
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
        <LabelComponent
          key={label.id}
          label={label}
          handleLabelSelection={handleLabelSelection}
          setFalsyOtherLabels={setFalsyOtherLabels}
        />
      ))}
    </div>
  );
}

interface LabelComponentProps {
  label: LabelWithIsActive;
  handleLabelSelection: (isActive: boolean, labelId: string) => void;
  setFalsyOtherLabels: (labelId: string) => void;
}

export function LabelComponent({
  label,
  handleLabelSelection,
  setFalsyOtherLabels,
}: LabelComponentProps) {
  const [isActive, setIsActive] = useState(false);

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
