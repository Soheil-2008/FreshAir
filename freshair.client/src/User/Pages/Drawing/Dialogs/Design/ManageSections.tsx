import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { UseDesignState } from "../../../../../Components/States/DesignState";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ReorderIcon from "@mui/icons-material/Reorder";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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
  const [action, setAction] = useState<string>("reorder");
  const { designState, setDesignState } = UseDesignState();

  const [sectionsIndexToDelete, setSectionsIndexToDelete] = useState<number[]>(
    []
  );

  const handleToggleSection = (index: number) => {
    if (sectionsIndexToDelete.includes(index)) {
      setSectionsIndexToDelete(
        sectionsIndexToDelete.filter((i) => i !== index)
      );
    } else {
      setSectionsIndexToDelete([...sectionsIndexToDelete, index]);
    }
  };

  useEffect(() => {
    setSectionsIndexToDelete([]);
    setAction("reorder");
  }, [open]);

  const defaultSections = useMemo(() => {
    return designState.sections.map((section) => ({ ...section }));
    //eslint-disable-next-line
  }, [open]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedSections = Array.from(designState.sections);
    const [movedSection] = updatedSections.splice(source.index, 1);
    updatedSections.splice(destination.index, 0, movedSection);

    setDesignState((prev) => ({
      ...prev,
      sections: updatedSections,
      selectedSectionIndex: -1,
    }));
  };

  const handleReset = () => {
    setDesignState((prev) => ({
      ...prev,
      sections: [...defaultSections], // Reset to the default order
    }));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => setDialogOptions({ open: false, type: "" })}
    >
      <DialogTitle>
        <h6 className="text-center text-xl border-b-2 pb-1 border-sky-700 text-sky-700 font-semibold">
          Manage Sections
        </h6>
      </DialogTitle>

      <DialogContent>
        <div className="flex">
          <div className="w-1/4 border-r pr-2 mr-3">
            <div className="flex flex-col gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  setAction("reorder");
                }}
                color="secondary"
                variant={action === "reorder" ? "contained" : "outlined"}
                size="medium"
                startIcon={<ReorderIcon />}
              >
                Reorder
              </Button>
              <Button
                size="medium"
                startIcon={<DeleteIcon />}
                className="w-full"
                onClick={() => {
                  setAction("delete");
                }}
                variant={action === "delete" ? "contained" : "outlined"}
                color={"error"}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="w-3/4">
            {action === "reorder" ? (
              <>
                <DialogContentText>
                  <h6 className="text-red-600">
                    Drag And Drop Sections To Reorder Them
                  </h6>
                </DialogContentText>

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable
                    droppableId="sections"
                    //  direction="horizontal"
                  >
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {designState.sections.map((section, index) => (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div className="mx-auto p-1">
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`w-full rounded-lg p-3 shadow-md cursor-pointer font-semibold border`}
                                >
                                  {section.name}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            ) : (
              <>
                <DialogContentText>
                  <h6 className="text-red-600">Choose Sections To Remove</h6>
                </DialogContentText>
                <div className="flex flex-col flex-wrap">
                  {designState.sections.map((section, index) => (
                    <div className="w-full p-1" key={index}>
                      <div
                        onClick={() => {
                          handleToggleSection(index);
                        }}
                        className={`w-full border rounded-lg p-3 shadow-md cursor-pointer font-semibold ${
                          sectionsIndexToDelete.includes(index) &&
                          "border-red-500 bg-red-50"
                        }`}
                      >
                        {section.name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>

      {action === "reorder" ? (
        <DialogActions>
          <div className="flex justify-center gap-5 w-full">
            <Button
              startIcon={<CloseIcon />}
              variant="outlined"
              color={"error"}
              onClick={() => {
                setDialogOptions({ open: false, type: "" });
              }}
            >
              Close
            </Button>

            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<RestartAltIcon />}
            >
              Reset Order
            </Button>
          </div>
        </DialogActions>
      ) : (
        <DialogActions>
          <div className="flex justify-center gap-5 w-full">
            <Button
              startIcon={<CloseIcon />}
              variant="outlined"
              onClick={() => {
                setDialogOptions({ open: false, type: "" });
              }}
            >
              Cancel
            </Button>

            <Button
              startIcon={<DeleteIcon />}
              disabled={sectionsIndexToDelete.length === 0}
              color={"error"}
              variant="outlined"
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
          </div>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ManageSections;
