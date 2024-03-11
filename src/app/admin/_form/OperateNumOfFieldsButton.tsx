import { Button } from "@/components/ui/button";

interface OperateNumOfFieldsButtonProps {
  numOfSelectedFields: number;
  numOfFields: number;
  setNumOfFields: React.Dispatch<React.SetStateAction<number>>;
}

export function OperateNumOfFieldsButton({
  numOfSelectedFields,
  numOfFields,
  setNumOfFields,
}: OperateNumOfFieldsButtonProps) {
  return (
    <div>
      <Button
        className="w-12 mr-2"
        disabled={numOfFields > 1 || numOfSelectedFields > 2}
        onClick={(e) => {
          e.preventDefault();
          setNumOfFields((prev) => prev + 1);
        }}
      >
        <span className="text-xl">+</span>
      </Button>
      <Button
        className="w-12"
        disabled={
          numOfFields === numOfSelectedFields - 1 ||
          numOfFields === 0 ||
          numOfSelectedFields > 2
        }
        onClick={(e) => {
          e.preventDefault();
          setNumOfFields((prev) => prev - 1);
        }}
      >
        <span className="text-xl">-</span>
      </Button>
    </div>
  );
}
