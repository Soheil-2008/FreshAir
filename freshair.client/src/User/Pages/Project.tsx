import { Link, useNavigate } from "react-router-dom";
import { UseGlobalState } from "../../Components/States/GlobalState";
import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import axios, { isAxiosError } from "axios";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import AirIcon from "@mui/icons-material/Air";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Project {
  id: number;
  Name: string;
  CreatedBy: string;
  CreatedAt: string;
  Reference: string;
  Consultant: string;
  Contractor: string;
  Client: string;
  Note?: string;
}

const Project = () => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = UseGlobalState();
  const [loading, setLoading] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<string>("");

  const [newTagName, setNewTagName] = useState<string>("");

  const [editOrDeleteTagName, setEditOrDeleteTagName] = useState<string>("");

  const [newEditTagName, setNewEditTagName] = useState<string>("");

  const [openTagMenu, setOpenTagMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const storedProject = sessionStorage.getItem("openedProject");
    const storedSections = sessionStorage.getItem("sections");
    if (storedProject && storedSections) {
      const project: Project = JSON.parse(storedProject);
      setGlobalState((prev) => ({
        ...prev,
        openedProject: project,
        sections: JSON.parse(storedSections),
      }));
      setAxiosDefaultHeaders();
      getTags(project.id);
    } else {
      navigate("/user/dashboard");
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOpenTagMenu(false);
  }, [openDialog]);

  const setAxiosDefaultHeaders = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const resetUser = () => {
    setGlobalState((prev) => ({
      ...prev,
      user: {
        id: 0,
        name: "",
        token: "",
        permission: "",
        units: {
          Dimensions: "",
          Temperature: "",
          Weight: "",
          WaterFlowRate: "",
          FinsPerLength: "",
          Capacity: "",
          // SensibleCapacity: "",
          WaterPressureDrop: "",
          StaticPressure: "",
          CoilHumidity: "",
          AirFlowRate: "",
          WaterVolumeAcrossCoil: "",
          CoilHeaderAndConnection: "",
          RefrigerantMassFlow: "",
          AirVelocity: "",
          NominalPower: "",
          PulleyDiameter: "",
          ShaftDiameter: "",
          NicotraCentredist: "",
          BeltSpeed: "",
          HumidifierLoad: "",
          CircuitLength: "",
          Altitude: "",
          Torque: "",
        },
      },
    }));
  };

  const getTags = async (projectID: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${globalState.server}/api/projects/GetTag/${projectID}`
      );
      setGlobalState((prev) => ({
        ...prev,
        openedProjectTags: response.data,
      }));
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
      setLoading(false);
    }
  };

  const getTagData = async (id: string, name: string) => {
    try {
      const response = await axios.get(
        `${globalState.server}/api/projects/GetTagInputData/${id}`
      );
      if (response.data?.message == "No Sections available.") {
        const openedTag = {
          name: name,
          sections: [],
          inputData: {},
        };

        sessionStorage.setItem("openedTag", JSON.stringify(openedTag));

        setGlobalState((prev) => ({
          ...prev,
          openedTag,
        }));
      } else {
        const openedTag = {
          name: name,
          sections: response.data,
          inputData: {},
        };

        sessionStorage.setItem("openedTag", JSON.stringify(openedTag));

        setGlobalState((prev) => ({
          ...prev,
          openedTag,
        }));
      }
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
    }
  };

  const handleAddTag = async () => {
    try {
      const response = await axios.post(
        `${globalState.server}/api/projects/AddTagProject/${globalState.openedProject.id}`,
        {
          TagName: newTagName,
        }
      );
      if (response.data.message == "Success") {
        Swal.fire({
          icon: "success",
          title: "Tag Added Successfully",
        });
        getTags(globalState.openedProject.id);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          resetUser();
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.response?.data.message,
          });
        }
      }
    } finally {
      setOpenDialog("");
      setNewTagName("");
    }
  };

  const handleDuplicateTag = async () => {
    try {
      const tagId = globalState.openedProjectTags.find(
        (tag) => tag.name === editOrDeleteTagName
      )?.id;
      console.log(editOrDeleteTagName);
      const response = await axios.post(
        `${globalState.server}/api/projects/AddCopyTag/${tagId}`,
        {
          TagName: newEditTagName,
        }
      );
      if (response.data.message == "Tag Copied Successfully.") {
        Swal.fire({
          icon: "success",
          title: "Tag Copied Successfully",
        });
        getTags(globalState.openedProject.id);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          resetUser();
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.response?.data.message,
          });
        }
      }
    } finally {
      setOpenDialog("");
      setNewTagName("");
    }
  };

  const handleDeleteTag = async () => {
    const tagId = globalState.openedProjectTags.find(
      (t) => t.name === editOrDeleteTagName
    )?.id;
    try {
      await axios.delete(
        `${globalState.server}/api/projects/DeleteTag/${tagId}`
      );
      getTags(globalState.openedProject.id);
      Swal.fire({
        icon: "success",
        title: "Tag Deleted Successfully",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          resetUser();
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.response?.data.message,
          });
        }
      }
    } finally {
      setOpenDialog("");
      setEditOrDeleteTagName("");
    }
  };

  const handleEditTag = async () => {
    try {
      const tagId = globalState.openedProjectTags.find(
        (t) => t.name === editOrDeleteTagName
      )?.id;
      const response = await axios.put(
        `${globalState.server}/api/projects/EditInfoTag/${tagId}`,
        {
          TagName: newEditTagName,
        }
      );
      if (response.data.message == "Success") {
        getTags(globalState.openedProject.id);
        Swal.fire({
          icon: "success",
          title: "Tag Edited Successfully",
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          resetUser();
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.response?.data.message,
          });
        }
      }
    } finally {
      setOpenDialog("");
      setNewTagName("");
    }
  };

  const handleDuplicateTagClicked = () => {
    setNewEditTagName(editOrDeleteTagName + " - Copy");
    setOpenDialog("duplicateTag");
  };

  const handleEditTagClicked = () => {
    setNewEditTagName(editOrDeleteTagName);
    setOpenDialog("editTag");
  };

  return (
    <main className="projectTags container bg-[#eff2eb]">
      <div className="flex justify-between items-center mb-5 border-b border-slate-300 pb-7">
        <div>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Link
              color="inherit"
              to="/user/dashboard"
              className="hover:underline font-semibold"
            >
              Dashboard
            </Link>
            <Link
              color="inherit"
              to={""}
              className="text-sky-700 hover:underline font-semibold"
            >
              Project
            </Link>
            <span className="font-semibold">Design</span>
          </Breadcrumbs>
        </div>
      </div>

      <div className="flex">
        <section className="w-1/2 lg:w-1/3 min-h-[75dvh] mr-2">
          <div className="flex flex-col p-3 h-full">
            <div className="flex items-center justify-between w-full border-b border-slate-300 pb-3">
              <h2 className="text-xl text-black flex items-center gap-2">
                <AccountTreeIcon color="primary" />
                Project Data
              </h2>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Project Name :</h4>
              <h4>{globalState.openedProject.Name || "N/A"}</h4>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Created By :</h4>
              <h4>{globalState.openedProject.CreatedBy || "N/A"}</h4>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Created At :</h4>
              <h4>{globalState.openedProject.CreatedAt || "N/A"}</h4>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Reference :</h4>
              <h4>{globalState.openedProject.Reference || "N/A"}</h4>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Consultant :</h4>
              <h4>{globalState.openedProject.Consultant || "N/A"}</h4>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Contractor :</h4>
              <h4>{globalState.openedProject.Contractor || "N/A"}</h4>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Client :</h4>
              <h4>{globalState.openedProject.Client || "N/A"}</h4>
            </div>

            <div className="flex justify-between pt-4 pb-3 items-center border-b border-slate-300 px-2 hover:bg-slate-200">
              <h4>Note :</h4>
              <h4>{globalState.openedProject.Note || "N/A"}</h4>
            </div>
          </div>
        </section>

        <section className="w-1/2 lg:w-1/3 min-h-[75dvh] bg-[#fbfef8] shadow-md">
          <div className="flex flex-col p-3 h-full">
            <div className="flex items-center justify-between w-full border-b border-slate-300 pb-3">
              <h2 className="text-xl text-black flex items-center gap-2">
                <AirIcon color="primary" />
                Air Handling Units
              </h2>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog("addTag")}
                size="small"
              >
                ADD
              </Button>
            </div>

            {globalState.openedProjectTags.map((tag) => (
              <div
                key={tag.id}
                className={`flex items-center justify-between border-b border-slate-300 hover:bg-slate-100 cursor-pointer ${
                  globalState.openedTag.name == tag.name && "bg-slate-200"
                }`}
              >
                <h4
                  className="grow h-full flex items-center p-3"
                  onClick={() => {
                    getTagData(tag.id, tag.name);
                  }}
                >
                  {tag.name}
                </h4>

                <IconButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setAnchorEl(e.currentTarget);
                    setOpenTagMenu(true);
                    setEditOrDeleteTagName(tag.name);
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openTagMenu}
                  onClose={() => setOpenTagMenu(false)}
                >
                  <MenuItem
                    onClick={() => {
                      handleDuplicateTagClicked();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <AddIcon color="success" />
                      <span>Duplicate</span>
                    </div>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleEditTagClicked();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <EditOutlinedIcon color="info" />
                      <span>Edit</span>
                    </div>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setOpenDialog("deleteTag");
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <DeleteOutlineOutlinedIcon color="error" />
                      <span> Delete</span>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            ))}
          </div>
        </section>

        {/* <section className="w-1/2 lg:w-1/4 min-h-[75dvh] bg-[#FBFEF8] shadow-md">
          <div className="flex flex-col p-3 h-full">
            <h2 className="text-xl text-black flex items-center gap-2 border-b border-slate-300 pb-3">
              <ArticleIcon color="primary" />
              Properties & Performance
            </h2>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Tag :</h4>
              <h4>{globalState.tagInfo.Name || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Supply Air Flow :</h4>
              <h4>{globalState.tagInfo.AirFlow || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Product :</h4>
              <h4>{globalState.tagInfo.Product || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>QTY :</h4>
              <h4>{globalState.tagInfo.QTY || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Model :</h4>
              <h4>{globalState.tagInfo.Model || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Serial No. :</h4>
              <h4>{globalState.tagInfo.SerialNo || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Air System :</h4>
              <h4>{globalState.tagInfo.AirSystem || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Configuration :</h4>
              <h4>{globalState.tagInfo.Configuration || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Location :</h4>
              <h4>{globalState.tagInfo.Location || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Weather Rating :</h4>
              <h4>{globalState.tagInfo.WeatherRating || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Service :</h4>
              <h4>{globalState.tagInfo.Service || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center border-b border-slate-300 hover:bg-slate-100">
              <h4>Certification :</h4>
              <h4>{globalState.tagInfo.Certification || "N/A"}</h4>
            </div>

            <div className="flex justify-between p-[6px] items-center hover:bg-slate-100">
              <h4>Remarks :</h4>
              <h4>{globalState.tagInfo.Remarks || "N/A"}</h4>
            </div>
          </div>
        </section> */}

        <section className="w-1/2 lg:w-1/3 min-h-[75dvh] bg-[#FBFEF8] shadow-md relative">
          <div className="flex flex-col p-3 h-full">
            <h2 className="text-xl text-black flex items-center gap-2 border-b border-slate-300 pb-3">
              <ArticleIcon color="disabled" />
              Sections
            </h2>
            {globalState.openedTag.sections.length > 0 ? (
              globalState.openedTag.sections.map((section) => (
                <div
                  key={section}
                  className="border-b border-slate-300 hover:bg-slate-100 p-4"
                >
                  <h4>{section}</h4>
                </div>
              ))
            ) : globalState.openedTag.name != "" ? (
              <div className="text-red-600 font-semibold p-4">
                <h4>No sections found for ({globalState.openedTag.name})</h4>
              </div>
            ) : (
              <div className="text-[#1b77d2] font-semibold p-4">
                <h4>Select an AHU to see sections</h4>
              </div>
            )}
          </div>

          <div className="absolute bottom-3 right-3">
            <Button
              variant="contained"
              color="info"
              disabled={!globalState.openedTag.name}
              onClick={() => navigate("/user/design")}
            >
              Edit AHU
            </Button>
          </div>
        </section>
      </div>

      {/*//! New Tag Dialog */}
      <Dialog
        open={openDialog == "addTag"}
        onClose={() => setOpenDialog("")}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleAddTag();
          },
        }}
      >
        <DialogTitle>Create New Air Handling Unit</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            required
            name="new-password"
            variant="standard"
            label="AHU Tag"
            value={newTagName}
            onChange={(event) => setNewTagName(event.target.value)}
            margin="dense"
          />
        </DialogContent>

        <DialogActions>
          <div className="flex px-3 justify-between w-full pb-2">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDialog("")}
              size="medium"
            >
              Cancel
            </Button>
            <Button type="submit" variant="outlined" size="medium">
              Create
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/*//! Delete Tag Dialog */}
      <Dialog
        open={openDialog == "deleteTag"}
        onClose={() => {
          setOpenDialog("");
        }}
      >
        <DialogTitle>{"Delete Tag?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete ({editOrDeleteTagName}) tag?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              setOpenDialog("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="error"
            onClick={() => handleDeleteTag()}
          >
            Yes Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/*//! Edit Tag Dialog */}
      <Dialog
        open={openDialog === "editTag"}
        onClose={() => setOpenDialog("")}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleEditTag();
          },
        }}
      >
        <DialogTitle>Edit Air Handling Unit Tag</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            required
            name="new-password"
            variant="standard"
            label="AHU Tag"
            value={newEditTagName}
            onChange={(event) => setNewEditTagName(event.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenDialog("")}
            size="medium"
          >
            Cancel
          </Button>
          <Button type="submit" variant="outlined" size="medium">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/*//! Duplicate Tag Dialog */}
      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={openDialog === "duplicateTag"}
        onClose={() => setOpenDialog("")}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleDuplicateTag();
          },
        }}
      >
        <DialogTitle>Duplicate Air Handling Unit?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please make sure to enter a different tag name
          </DialogContentText>
          <TextField
            fullWidth
            required
            name="new-password"
            variant="standard"
            label="AHU Tag"
            value={newEditTagName}
            onChange={(event) => setNewEditTagName(event.target.value)}
            margin="dense"
            className="mt-5"
          />
        </DialogContent>
        <DialogActions>
          <div className="flex px-3 justify-between w-full pb-2">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDialog("")}
              size="small"
            >
              Cancel
            </Button>
            <Button type="submit" variant="outlined" size="small">
              Create
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {loading && <Loading />}
    </main>
  );
};

export default Project;
