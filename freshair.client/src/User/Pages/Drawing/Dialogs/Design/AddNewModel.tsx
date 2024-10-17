import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { UseGlobalState } from "../../../../../Components/States/GlobalState";
import Swal from "sweetalert2";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface DialogOptions {
  open: boolean;
  type: string;
}

interface NewModel {
  name: string;
  height: string;
  width: string;
}

const AddNewModel = ({
  open,
  setDialogOptions,
}: {
  open: boolean;
  setDialogOptions: React.Dispatch<React.SetStateAction<DialogOptions>>;
}) => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = UseGlobalState();
  const [newModelData, setNewModelData] = useState<NewModel>({
    name: "",
    height: "",
    width: "",
  });

  const resetUser = () => {
    setGlobalState((prev) => ({
      ...prev,
      user: {
        id: 0,
        name: "",
        token: "",
        permission: "",
        units: {
          Length: "",
          Temperature: "",
          Weight: "",
          WaterFlowRate: "",
          FinsPerLength: "",
          Capacity: "",
          WaterPressureDrop: "",
          StaticPressure: "",
          CoilHumidity: "",
          AirFlowRate: "",
          WaterVolumeAcrossCoil: "",
          CoilHeaderAndConnection: "",
          RefrigerantMassFlow: "",
          AirVelocity: "",
          NominalPower: "",
          Diameter: "",
          BeltSpeed: "",
          HumidifierLoad: "",
          CircuitLength: "",
          Altitude: "",
          Torque: "",
        },
      },
    }));
  };

  const handleAddModel = () => {
    if (
      newModelData.name === "" ||
      newModelData.height === "" ||
      newModelData.width === ""
    ) {
      setDialogOptions({ open: false, type: "" });
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
      }).then(() => {
        setDialogOptions({ open: true, type: "addNewModel" });
      });
      return;
    }
    if (
      parseFloat(newModelData.height) <= 0 ||
      parseFloat(newModelData.width) <= 0
    ) {
      setDialogOptions({ open: false, type: "" });
      Swal.fire({
        icon: "warning",
        title: "Height and Width must be greater than 0",
      }).then(() => {
        setDialogOptions({ open: true, type: "addNewModel" });
      });
      return;
    }
    try {
      console.log(globalState.server);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          resetUser();
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message,
          });
        }
      }
    } finally {
      setDialogOptions({ open: false, type: "" });
    }
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
          Add new model
        </h6>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span className="text-red-600">
            Make sure you provide the measurements in millimeters.
          </span>
        </DialogContentText>
        <div className="flex gap-5 mt-6">
          <TextField
            fullWidth
            label="Model Name"
            variant="standard"
            size="small"
            value={newModelData.name}
            onChange={(e) =>
              setNewModelData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            label="Model Height"
            variant="standard"
            size="small"
            value={newModelData.height}
            onChange={(e) =>
              setNewModelData((prev) => ({
                ...prev,
                height: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            label="Model Width"
            variant="standard"
            size="small"
            value={newModelData.width}
            onChange={(e) =>
              setNewModelData((prev) => ({
                ...prev,
                width: e.target.value,
              }))
            }
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color={"success"} onClick={handleAddModel}>
          Add
        </Button>

        <Button
          variant="outlined"
          color={"error"}
          onClick={() => {
            setDialogOptions({ open: false, type: "" });
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewModel;
