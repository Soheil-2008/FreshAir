import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  styled,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UseGlobalState } from "../../Components/States/GlobalState";
import axios, { isAxiosError } from "axios";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import {
  DataGrid,
  GridCellParams,
  GridToolbarContainer,
  // GridToolbarDensitySelector,
  // GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UseGeneralDataState } from "../../Components/States/GeneralDataState";

function CustomNoResultsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 523 299"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-results-primary"
          d="M262 20c-63.513 0-115 51.487-115 115s51.487 115 115 115 115-51.487 115-115S325.513 20 262 20ZM127 135C127 60.442 187.442 0 262 0c74.558 0 135 60.442 135 135 0 74.558-60.442 135-135 135-74.558 0-135-60.442-135-135Z"
        />
        <path
          className="no-results-primary"
          d="M348.929 224.929c3.905-3.905 10.237-3.905 14.142 0l56.569 56.568c3.905 3.906 3.905 10.237 0 14.143-3.906 3.905-10.237 3.905-14.143 0l-56.568-56.569c-3.905-3.905-3.905-10.237 0-14.142ZM212.929 85.929c3.905-3.905 10.237-3.905 14.142 0l84.853 84.853c3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0l-84.853-84.853c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-results-primary"
          d="M212.929 185.071c-3.905-3.905-3.905-10.237 0-14.142l84.853-84.853c3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-84.853 84.853c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-results-secondary"
          d="M0 43c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 53 0 48.523 0 43ZM0 89c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 99 0 94.523 0 89ZM0 135c0-5.523 4.477-10 10-10h74c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 181c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 227c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM523 227c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10ZM523 181c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 135c0 5.523-4.477 10-10 10h-74c-5.523 0-10-4.477-10-10s4.477-10 10-10h74c5.523 0 10 4.477 10 10ZM523 89c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 43c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>No results found.</Box>
    </StyledGridOverlay>
  );
}

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .no-results-primary": {
    fill: "#3D4751",
    ...theme.applyStyles("light", {
      fill: "#AEB8C2",
    }),
  },
  "& .no-results-secondary": {
    fill: "#1D2126",
    ...theme.applyStyles("light", {
      fill: "#E8EAED",
    }),
  },
}));

const CustomToolbar = (props: {
  setOpenNewProjectDialog: (value: boolean) => void;
}) => {
  return (
    <GridToolbarContainer className="m-3 flex justify-between">
      <div className="flex gap-3">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => props.setOpenNewProjectDialog(true)}
        >
          Project
        </Button>
        {/* <GridToolbarExport /> */}
        {/* <GridToolbarDensitySelector /> */}
      </div>

      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

type NewProject = {
  Name: string;
  Reference: string;
  Consultant: string;
  Contractor: string;
  Client: string;
  Note?: string;
};

type Project = {
  id: number;
  Name: string;
  Reference: string;
  CreatedBy: string;
  CreatedAt: string;
  Consultant: string;
  Contractor: string;
  Client: string;
  Note?: string;
};

interface Section {
  name: string;
  width: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = UseGlobalState();
  const { setGeneralData } = UseGeneralDataState();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const [projects, setProjects] = useState<Project[]>([]);

  const [openNewProjectDialog, setOpenNewProjectDialog] =
    useState<boolean>(false);

  const [openEditProjectDialog, setOpenEditProjectDialog] =
    useState<boolean>(false);

  const [newProjectData, setNewProjectData] = useState<NewProject>({
    Name: "",
    Reference: "",
    Client: "",
    Consultant: "",
    Contractor: "",
    Note: "",
  });

  const [editProjectData, setEditProjectData] = useState<Project>({
    id: 0,
    Name: "",
    Reference: "",
    Client: "",
    Consultant: "",
    Contractor: "",
    Note: "",
    CreatedAt: "",
    CreatedBy: "",
  });

  useEffect(() => {
    if (!globalState.user.id) return;
    getProjects();
    getGeneralDataOptions();
    //eslint-disable-next-line
  }, []);

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

  const getGeneralDataOptions = async () => {
    try {
      const response = await axios.get(
        `${globalState.server}/api/account/GetGeneralData`
      );
      if (response.status == 200) {
        setGeneralData((prev) => ({
          ...prev,
          CurrencyOptions: response.data.Currencies || [],
          currency: response.data.Currencies[0] || "",

          FrameMaterialOptions: response.data["Frame Material"] || [],
          frameMaterial: response.data["Frame Material"][0] || "",

          InnerSkinMaterialOptions: response.data["Inner Skin Material"] || [],
          innerSkinMaterial: response.data["Inner Skin Material"][0] || "",

          OuterSkinMaterialOptions: response.data["Outer Skin Material"] || [],
          outerSkinMaterial: response.data["Outer Skin Material"][0] || "",
        }));

        const toRemove = response.data.Sections.map((ele: Section) => {
          let random = Math.random();
          if (random < 0.3) {
            random += 0.3;
          }
          return {
            name: ele,
            width: random,
          };
        });

        setGlobalState((prev) => ({
          ...prev,
          // sections: response.data.Sections,
          sections: toRemove,
        }));
        // setGeneralData();
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

  const getProjects = async () => {
    try {
      const response = await axios.get(
        `${globalState.server}/api/projects/GetProjects/${globalState.user.id}`
      );
      if (response.status == 200 && Array.isArray(response.data)) {
        setProjects(response.data);
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
    } finally {
      setIsDataFetched(true);
    }
  };

  const handleAddProject = async () => {
    try {
      const response = await axios.post(
        `${globalState.server}/api/projects/AddProjects/${globalState.user.id}`,
        {
          Name: newProjectData.Name,
          Reference: newProjectData.Reference,
          Client: newProjectData.Client,
          Consultant: newProjectData.Consultant,
          Contractor: newProjectData.Contractor,
          Note: newProjectData.Note,
          Username: globalState.user.name,
        }
      );
      if (response.data.message === "Success") {
        Swal.fire({
          icon: "success",
          title: "Project created successfully",
        });
        setOpenNewProjectDialog(false);
        setNewProjectData({
          Name: "",
          Reference: "",
          Client: "",
          Consultant: "",
          Contractor: "",
          Note: "",
        });
        getProjects();
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

  const handleEditProject = async () => {
    try {
      const response = await axios.put(
        `${globalState.server}/api/projects/EditInfoProject/${editProjectData.id}`,
        {
          Name: editProjectData.Name,
          Reference: editProjectData.Reference,
          Consultant: editProjectData.Consultant,
          Contractor: editProjectData.Contractor,
          Client: editProjectData.Client,
          Note: editProjectData.Note,
        }
      );
      if (response.data.message === "successfully.") {
        Swal.fire({
          icon: "success",
          title: "Project updated successfully",
        });
        setOpenEditProjectDialog(false);
        setEditProjectData({
          id: 0,
          Name: "",
          Reference: "",
          Client: "",
          Consultant: "",
          Contractor: "",
          Note: "",
          CreatedAt: "",
          CreatedBy: "",
        });
        getProjects();
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

  const goToProject = async (params: GridCellParams) => {
    if (params.field == "Delete" || params.field == "Edit") return;

    const project: Project = params.row;
    sessionStorage.setItem("openedProject", JSON.stringify(project));
    sessionStorage.setItem("sections", JSON.stringify(globalState.sections));

    setGlobalState((prev) => ({
      ...prev,
      openedProject: project,
      openedProjectTags: [],
    }));

    navigate("/user/project");
  };

  return isDataFetched ? (
    <main className="projects container bg-[#eff2eb]">
      <div className="flex justify-between items-center mb-5 border-b border-slate-300 pb-7">
        <div>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Link
              color="inherit"
              to={""}
              className="text-sky-700 hover:underline font-semibold"
            >
              Dashboard
            </Link>

            <span className="font-semibold">Project</span>

            <span className="font-semibold">Design</span>
          </Breadcrumbs>
        </div>
      </div>
      <h4 className="text-xl mb-2">Projects</h4>
      <DataGrid
        className="bg-[#fbfef8]"
        rows={projects}
        columns={[
          {
            field: "Name",
            headerName: "Name",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "CreatedBy",
            headerName: "Created By",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "CreatedAt",
            headerName: "Created At",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "Reference",
            headerName: "Reference",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "Consultant",
            headerName: "Consultant",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "Contractor",
            headerName: "Contractor",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "Client",
            headerName: "Client",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "Note",
            headerName: "Note",
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: "Delete",
            headerName: "Delete",
            width: 130,
            disableColumnMenu: true,
            renderCell: (params) => (
              <Button
                startIcon={<DeleteIcon />}
                variant="outlined"
                color="error"
                onClick={() =>
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const project: Project = params.row;
                      const projectID: number = project.id;
                      axios
                        .delete(
                          `${globalState.server}/api/projects/DeleteProject/${projectID}`
                        )
                        .then(() => {
                          Swal.fire(
                            "Deleted!",
                            "Project has been deleted.",
                            "success"
                          );
                          getProjects();
                        });
                    }
                  })
                }
              >
                Delete
              </Button>
            ),
          },

          {
            field: "Edit",
            headerName: "Edit",
            width: 130,
            disableColumnMenu: true,
            renderCell: (params) => (
              <Button
                startIcon={<EditOutlinedIcon />}
                variant="outlined"
                color="info"
                onClick={() => {
                  const project: Project = params.row;
                  setEditProjectData({
                    id: project.id,
                    Name: project.Name,
                    Reference: project.Reference,
                    Client: project.Client,
                    Consultant: project.Consultant,
                    Contractor: project.Contractor,
                    Note: project.Note,
                    CreatedAt: "",
                    CreatedBy: "",
                  });
                  setOpenEditProjectDialog(true);
                }}
              >
                Edit
              </Button>
            ),
          },
        ]}
        autoHeight
        onCellClick={goToProject}
        hideFooter
        slots={{
          toolbar: () => (
            <CustomToolbar setOpenNewProjectDialog={setOpenNewProjectDialog} />
          ),
          noResultsOverlay: CustomNoResultsOverlay,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0
            ? "striped-row-even"
            : "striped-row-odd"
        }
      />

      {/*//! Add Project */}
      <Dialog
        open={openNewProjectDialog}
        onClose={() => setOpenNewProjectDialog(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleAddProject();
          },
        }}
      >
        <DialogTitle>Add new project</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To add a new project, please provide the following information:
          </DialogContentText>
          <div className="flex">
            <div className="pr-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Project Name"
                value={newProjectData.Name}
                onChange={(event) =>
                  setNewProjectData({
                    ...newProjectData,
                    Name: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
            <div className="pr-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Reference"
                value={newProjectData.Reference}
                onChange={(event) =>
                  setNewProjectData({
                    ...newProjectData,
                    Reference: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
          </div>

          <div className="flex">
            <div className="pr-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Consultant"
                value={newProjectData.Consultant}
                onChange={(event) =>
                  setNewProjectData({
                    ...newProjectData,
                    Consultant: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
            <div className="pl-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Contractor"
                value={newProjectData.Contractor}
                onChange={(event) =>
                  setNewProjectData({
                    ...newProjectData,
                    Contractor: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
          </div>
          <div className="flex">
            <div className="grow pr-2">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Client"
                value={newProjectData.Client}
                onChange={(event) =>
                  setNewProjectData({
                    ...newProjectData,
                    Client: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
            <div className="grow pl-2">
              <TextField
                fullWidth
                name="new-password"
                variant="standard"
                label="Note"
                value={newProjectData.Note}
                onChange={(event) =>
                  setNewProjectData({
                    ...newProjectData,
                    Note: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <div className="flex px-3 justify-center w-full pb-2 gap-5">
            <Button
              startIcon={<CloseIcon />}
              color="error"
              onClick={() => setOpenNewProjectDialog(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button startIcon={<AddIcon />} type="submit" variant="outlined">
              Add
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/*//! Edit Project */}
      <Dialog
        open={openEditProjectDialog}
        onClose={() => setOpenEditProjectDialog(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleEditProject();
          },
        }}
      >
        <DialogTitle>Edit project</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To edit a new project, please provide the following information:
          </DialogContentText>
          <div className="flex">
            <div className="pr-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Project Name"
                value={editProjectData.Name}
                onChange={(event) =>
                  setEditProjectData({
                    ...editProjectData,
                    Name: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
            <div className="pr-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Reference"
                value={editProjectData.Reference}
                onChange={(event) =>
                  setEditProjectData({
                    ...editProjectData,
                    Reference: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
          </div>

          <div className="flex">
            <div className="pr-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Consultant"
                value={editProjectData.Consultant}
                onChange={(event) =>
                  setEditProjectData({
                    ...editProjectData,
                    Consultant: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
            <div className="pl-2 grow">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Contractor"
                value={editProjectData.Contractor}
                onChange={(event) =>
                  setEditProjectData({
                    ...editProjectData,
                    Contractor: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
          </div>
          <div className="flex">
            <div className="grow pr-2">
              <TextField
                fullWidth
                required
                name="new-password"
                variant="standard"
                label="Client"
                value={editProjectData.Client}
                onChange={(event) =>
                  setEditProjectData({
                    ...editProjectData,
                    Client: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
            <div className="grow pl-2">
              <TextField
                fullWidth
                name="new-password"
                variant="standard"
                label="Note"
                value={editProjectData.Note}
                onChange={(event) =>
                  setEditProjectData({
                    ...editProjectData,
                    Note: event.target.value,
                  })
                }
                margin="dense"
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <div className="flex px-3 justify-center w-full pb-2 gap-5">
            <Button
              startIcon={<CloseIcon />}
              color="error"
              onClick={() => setOpenEditProjectDialog(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              startIcon={<SaveOutlinedIcon />}
              type="submit"
              variant="outlined"
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </main>
  ) : (
    <LinearProgress color="inherit" />
  );
};

export default Dashboard;
