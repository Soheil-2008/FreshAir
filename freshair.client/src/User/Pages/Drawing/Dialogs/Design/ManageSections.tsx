import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { UseDesignState } from "../../../../../Components/States/DesignState";

interface DialogOptions {
  open: boolean;
  type: string;
}

const ManageSections = ({
  open,
  setDialogOptions,
}: {
  open: boolean;
  setDialogOptions: React.Dispatch<React.SetStateAction<DialogOptions>>;
}) => {
  const { designState, setDesignState } = UseDesignState();

  const [sectionsIndexToDelete, setSectionsIndexToDelete] = useState<number[]>(
    []
  );

  const handleToggleSection = (index: number) => {
    console.log(index);
    console.log(sectionsIndexToDelete);
    if (sectionsIndexToDelete.includes(index)) {
      setSectionsIndexToDelete(
        sectionsIndexToDelete.filter((i) => i !== index)
      );
    } else {
      setSectionsIndexToDelete([...sectionsIndexToDelete, index]);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => setDialogOptions({ open: false, type: "" })}
    >
      <DialogTitle>Choose sections to remove</DialogTitle>
      <DialogContent>
        <div className="flex flex-wrap">
          {designState.sections.map((section, index) => (
            <div className="w-1/4 p-1" key={index}>
              <div
                onClick={() => {
                  handleToggleSection(index);
                }}
                className={`w-full bg-gray-100 rounded-lg border-2 border-gray-300 p-3 shadow-md cursor-pointer hover:bg-gray-200 ${
                  sectionsIndexToDelete.includes(index) && "border-red-500"
                }`}
              >
                {section.name}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          color={"disabled"}
          onClick={() => {
            setDialogOptions({ open: false, type: "" });
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color={"error"}
          onClick={() => {
            setDesignState((prev) => ({
              ...prev,
              sections: prev.sections.filter(
                (_section, index) => !sectionsIndexToDelete.includes(index)
              ),
              selectedSectionIndex: -1,
            }));
            setDialogOptions({ open: false, type: "" });
          }}
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageSections;
