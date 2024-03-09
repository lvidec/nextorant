import { create } from "zustand";

interface LabelsStore {
  selectedLabel: string;
  handleLabelSelection: (isActive: boolean, labelId: string) => void;
}

export const useLabelsStore = create<LabelsStore>((set) => ({
  selectedLabel: "",
  handleLabelSelection: (isActive, labelId) => {
    set(() => ({ selectedLabel: isActive ? labelId : "" }));
  },
}));
