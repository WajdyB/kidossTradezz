import React from "react";
import Navbarprofile from "../../Components/Navbarprofile/Navbarprofile";
import Navprofile from "../../Components/navprofile/Navprofile";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Tabpanell from "../../Components/Tabpanel/Tabpanell";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import axios from "axios";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import glassy from "../../Asserts/Logos/glassy.png";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Grid } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const useStyles = makeStyles((theme) => ({
  photoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "120px",
    width: "120px",
    border: "1px solid black",
    cursor: "pointer",
  },
  photo: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
}));
const useStyless = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#810CA8",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#810CA8",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#810CA8",
    },
  },
});
const Profile = (setIsSignedUp) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoClick = () => {
    if (photo) {
      window.open(photo);
    }
  };
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
    const [errorMessage, setErrorMessage] = useState("");

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              // color: "#2D033B",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  {
    /*********************************************************************************/
  }
  const classeusername = useStyless();
  const [openusername, setOpenusername] = React.useState(false);

  const handleClickOpenusername = () => {
    setOpenusername(true);
  };

  const handleCloseusername = () => {
    setOpenusername(false);
  };

  {
    /*********************************************************************************/
  }
  const classefirstname = useStyless();
  const [openfirstname, setOpenfirstname] = React.useState(false);

  const handleClickOpenfirstname = () => {
    setOpenfirstname(true);
  };

  const handleClosefirstname = () => {
    setOpenfirstname(false);
  };

  {
    /*********************************************************************************/
  }
  const classelastname = useStyless();
  const [openlastname, setOpenlastname] = React.useState(false);

  const handleClickOpenlastname = () => {
    setOpenlastname(true);
  };

  const handleCloselastname = () => {
    setOpenlastname(false);
  };
  {
    /*********************************************************************************/
  }
  const classeemail = useStyless();
  const [openemail, setOpenemail] = React.useState(false);

  const handleClickOpenemail = () => {
    setOpenemail(true);
  };

  const handleCloseemail = () => {
    setErrorMessageemail(false);
    setOpenemail(false);
  };
  {
    /*********************************************************************************/
  }
  const classetown = useStyless();
  const [opentown, setOpentown] = React.useState(false);

  const handleClickOpentown = () => {
    setOpentown(true);
  };

  const handleClosetown = () => {
    setOpentown(false);
  };
  {
    /*********************************************************************************/
  }
  const classeavg = useStyless();
  const [openavg, setOpenavg] = React.useState(false);

  const handleClickOpenavg = () => {
    setOpenavg(true);
  };

  const handleCloseavg = () => {
    setOpenavg(false);
  };
  {
    /*********************************************************************************/
  }
  const classedes = useStyless();
  const [opendes, setOpendes] = React.useState(false);

  const handleClickOpendes = () => {
    setOpendes(true);
  };

  const handleClosedes = () => {
    setOpendes(false);
  };
  {
    /*********************************************************************************/
  }
  const classepassword = useStyless();
  const [openpassword, setOpenpassword] = React.useState(false);

  const handleClickOpenpassword = () => {
    setOpenpassword(true);
  };

  const handleClosepassword = () => {
    setErrorMessage1("");
    setErrorMessage("");
    setOpenpassword(false);
  };
  {
    /*********************************************************************************/
  }
  const classephone = useStyless();
  const [openphone, setOpenphone] = React.useState(false);

  const handleClickOpenphone = () => {
    setOpenphone(true);
  };

  const handleClosephone = () => {
    setErrorMessagephone("");

    setOpenphone(false);
  };
  {
    /************************************************************************************************/
  }
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessage1, setErrorMessage1] = useState(null);
  const [errorMessageemail, setErrorMessageemail] = useState(null);
  const [errorMessagephone, setErrorMessagephone] = useState(null);

  const textFieldRefusername = useRef();
  const textFieldReffirstname = useRef();
  const textFieldReflastname = useRef();
  const textFieldRefemail = useRef();
  const textFieldRefhome = useRef();
  const textFieldRefavg = useRef();
  const textFieldRefdescription = useRef();
  const textFieldRefpassword = useRef();
  const textFieldRefconfirmpassword = useRef();
  const textFieldRefphone = useRef();

  const savechangeusername = () => {
    const textFieldusername = textFieldRefusername.current.value;
    console.log(textFieldusername);
    const id = localStorage.getItem("id");
    console.log(id);
    console.log(localStorage.getItem("token"));

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-username?newUsername=${textFieldusername}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // handle success
        console.log(res);
        setOpenusername(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const savechangefirstname = () => {
    const textFieldfirstname = textFieldReffirstname.current.value;
    const id = localStorage.getItem("id");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-firstname?newFirstName=${textFieldfirstname}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setOpenfirstname(false);
        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const savechangelasttname = () => {
    const textFieldlastname = textFieldReflastname.current.value;
    const id = localStorage.getItem("id");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-lastname?newLastName=${textFieldlastname}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setOpenlastname(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const savechangeemail = () => {
    const textFieldemail = textFieldRefemail.current.value;
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(textFieldemail)) {
      setErrorMessageemail("This is not a valid email format");
      return;
    }
    const id = localStorage.getItem("id");
    setErrorMessageemail("");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-email?newEmail=${textFieldemail}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setErrorMessageemail("");

        setOpenemail(false);
        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const savechangehome = () => {
    const textFieldhome = textFieldRefhome.current.value;

    const id = localStorage.getItem("id");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-homeaddress?newHomeAddress=${textFieldhome}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setOpentown(false);
        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const savechangeavg = () => {
    const textFieldavg = textFieldRefavg.current.value;

    const id = localStorage.getItem("id");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-avgresponsetime?newAvgResponseTime=${textFieldavg}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setOpenavg(false);
        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const savechangedescription = () => {
    const textFielddescription = textFieldRefdescription.current.value;
    const id = localStorage.getItem("id");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-description?newDescription=${textFielddescription}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setOpendes(false);
        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const savechangedpassword = () => {
    const textFieldpassword = textFieldRefpassword.current.value;
    const textFieldconfirmpassword = textFieldRefconfirmpassword.current.value;
    const id = localStorage.getItem("id");
    if (textFieldpassword !== textFieldconfirmpassword) {
      setErrorMessage("Confirmed password and password should be the same");
      setErrorMessage1("");
      console.log("Confirmed password and password should be the same");
      return;
    } else if (textFieldpassword < 8) {
      setErrorMessage("");

      setErrorMessage1("Password must be at least 8 characters");
      return;
    } else if (!/^[A-Z]/.test(textFieldpassword)) {
      setErrorMessage("");

      setErrorMessage1("Password must start with a capital letter");
      return;
    } else if (!/\d/.test(textFieldpassword)) {
      setErrorMessage("");

      setErrorMessage1("Password must contain at least one number");
      return;
    } else if (!/[!@#$%^&*]/.test(textFieldpassword)) {
      setErrorMessage("");

      setErrorMessage1("Password must contain at least one special character");
      return;
    }
    setErrorMessage1("");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-password?newPassword=${textFieldpassword}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setErrorMessage1("");
        setErrorMessage("");

        setOpenpassword(false);
        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const savechangephone = () => {
    const textFieldphone = textFieldRefphone.current.value;
    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(textFieldphone)) {
      setErrorMessagephone("Phone number should contain exactly 8 numbers");
      return;
    }
    const id = localStorage.getItem("id");
    setErrorMessagephone("");

    axios
      .put(
        `http://localhost:2023/accounts/${id}/update-phone?newPhone=${textFieldphone}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setErrorMessagephone("");

        setOpenphone(false);
        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const id = localStorage.getItem("id");

    axios
      .delete(
        `http://localhost:2023/accounts/${id}/delete-account`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("username");
        localStorage.removeItem("lastname");
        localStorage.removeItem("password");
        localStorage.removeItem("avgResponseTime");
        localStorage.removeItem("firstname");
        localStorage.removeItem("description");
        localStorage.removeItem("homeAddress");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/", { replace: true });
        window.location.reload();
        setIsSignedUp(true);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  const InputAdornment = styled("div")`
color:white;
margin:6px,
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding:0px;
`;
  const SmallVisibilityIcon = styled(Visibility)({
    fontSize: 16,
    marginRight: 5,
    padding: 0,
  });
  const SmallVisibilityOffIcon = styled(VisibilityOff)({
    fontSize: 16,
    marginRight: 5,
  });
  const SmallVisibilityIconc = styled(Visibility)({
    fontSize: 16,
    marginRight: 5,
  });
  const SmallVisibilityOffIconc = styled(VisibilityOff)({
    fontSize: 16,
    marginRight: 5,
  });
  const [values, setValues] = React.useState({
    showPassword: false,
    showconfirmPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPasswordd = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswordd = () => {
    setValues({
      showconfirmPassword: !values.showconfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyItems: "column",
        width: "100%",
        // backgroundImage: `url(${glassy})`,
        //backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "inline-block",
          position: "sticky",
          top: 0,
          height: "100%",
        }}
      >
        <Navprofile />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "65px",
            top: 0,
            right: 0,
            position: "sticky",
            width: "100%",
            zIndex: 2,
          }}
        >
          <Navbarprofile />
        </div>
        <div
          style={{
            zIndex: "0",
            display: "inline-block",
          }}
        >
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol xl="12" lg="10" md="10" sm="10" xs="8">
                <MDBCard
                  style={{ borderRadius: "10px", backgroundColor: "white" }}
                >
                  <div className="rounded-top text-white d-flex flex-row">
                    <div
                      className="ms-4 mt-5 "
                      style={{
                        width: "150px",
                        marginLeft: "20px",

                        height: "200px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <MDBCardImage
                        src="https://i.pinimg.com/564x/e1/be/95/e1be95e26e853c491ff3a09e6b996783.jpg"
                        alt="Generic placeholder image"
                        className="img-thumbnail"
                        fluid
                        style={{ width: "150px", zIndex: "0" }}
                      />

                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",

                          marginRight: "0px",
                          width: "150px",
                          padding: "0px",
                        }}
                      >
                        <MDBBtn
                          className="mx-2"
                          color="#ffffff00"
                          onClick={handleClickOpen}
                          style={{
                            height: "28px",
                            width: "135px",
                            fontSize: "18px",
                            padding: "0px",
                            margin: "0px",
                            color: "white",
                          }}
                        >
                          <div>Edit profile</div>
                        </MDBBtn>
                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                          sx={{
                            boxShadow: "0 8px 32px rgba(31,28,135,0.37)",
                            backdropFilter: " blur(8.5px)",
                          }}
                        >
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                            sx={{ color: "#2D033B" }}
                          >
                            Edit Profile
                          </BootstrapDialogTitle>
                          <DialogContent dividers sx={{ width: "500px" }}>
                            <p style={{ color: "grey" }}>Profile photo</p>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                className={classes.photoContainer}
                                onClick={handlePhotoClick}
                              >
                                {photo && (
                                  <img
                                    src={photo}
                                    alt="photo"
                                    className={classes.photo}
                                  />
                                )}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "5px",
                              }}
                            >
                              <Button
                                variant="Text"
                                component="label"
                                color="secondary"
                                sx={{ mt: 2, mb: 2, color: "#810CA8" }}
                              >
                                Upload File
                                <input
                                  type="file"
                                  hidden
                                  onChange={handlePhotoChange}
                                />
                              </Button>
                            </div>
                            {/**********************************************************************************************/}
                            <p style={{ color: "grey" }}>
                              Personal information
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>Username</p>
                              <IconButton onClick={handleClickOpenusername}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={openusername}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleCloseusername}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="username"
                                    label="username"
                                    type="username"
                                    fullWidth
                                    variant="standard"
                                    className={classeusername.root}
                                    sx={{
                                      margin: "0px",
                                      "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        padding: "10px",
                                      },
                                    }}
                                    inputRef={textFieldRefusername}
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangeusername}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>First name</p>
                              <IconButton onClick={handleClickOpenfirstname}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={openfirstname}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleClosefirstname}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="first_name"
                                    label="First name"
                                    type="firstname"
                                    fullWidth
                                    variant="standard"
                                    className={classefirstname.root}
                                    sx={{ margin: "0px" }}
                                    inputRef={textFieldReffirstname}
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangefirstname}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>Last name</p>
                              <IconButton onClick={handleClickOpenlastname}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={openlastname}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleCloselastname}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="last_name"
                                    label="Last name"
                                    type="lastname"
                                    fullWidth
                                    variant="standard"
                                    className={classelastname.root}
                                    sx={{ margin: "0px" }}
                                    inputRef={textFieldReflastname}
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangelasttname}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>Email</p>
                              <IconButton onClick={handleClickOpenemail}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={openemail}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleCloseemail}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email"
                                    type="Email"
                                    fullWidth
                                    variant="standard"
                                    className={classeemail.root}
                                    sx={{ margin: "0px" }}
                                    inputRef={textFieldRefemail}
                                  />
                                  {errorMessageemail && (
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {errorMessageemail
                                        .split("\n")
                                        .map((line, index) => (
                                          <span key={index}>
                                            {line}
                                            <br />
                                          </span>
                                        ))}
                                    </p>
                                  )}
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangeemail}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>Password</p>
                              <IconButton onClick={handleClickOpenpassword}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={openpassword}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleClosepassword}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent
                                  sx={{
                                    width: "280px",
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                  }}
                                >
                                  <TextField
                                    // size="small"
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    type={
                                      values.showPassword ? "text" : "password"
                                    }
                                    placeholder="Enter Password"
                                    fullWidth
                                    variant="standard"
                                    className={classepassword.root}
                                    sx={{
                                      marginBottom: "16px",
                                    }}
                                    inputRef={textFieldRefpassword}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment>
                                          <IconButton
                                            sx={{ backgroundColor: "white" }}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                              handleMouseDownPassword
                                            }
                                          >
                                            {values.showPassword ? (
                                              <SmallVisibilityOffIcon />
                                            ) : (
                                              <SmallVisibilityIcon />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  {errorMessage1 && (
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {errorMessage1
                                        .split("\n")
                                        .map((line, index) => (
                                          <span key={index}>
                                            {line}
                                            <br />
                                          </span>
                                        ))}
                                    </p>
                                  )}

                                  <TextField
                                    // size="medium"
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label=" Confirm Password"
                                    type={
                                      values.showconfirmPassword
                                        ? "text"
                                        : "password"
                                    }
                                    placeholder="Enter Password" //fullWidth
                                    variant="standard"
                                    className={classepassword.root}
                                    inputRef={textFieldRefconfirmpassword}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment>
                                          <IconButton
                                            sx={{ backgroundColor: "white" }}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordd}
                                            onMouseDown={
                                              handleMouseDownPasswordd
                                            }
                                          >
                                            {values.showconfirmPassword ? (
                                              <SmallVisibilityOffIcon />
                                            ) : (
                                              <SmallVisibilityIcon />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  {errorMessage && (
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {errorMessage
                                        .split("\n")
                                        .map((line, index) => (
                                          <span key={index}>
                                            {line}
                                            <br />
                                          </span>
                                        ))}
                                    </p>
                                  )}
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangedpassword}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>Home Adress</p>
                              <IconButton onClick={handleClickOpentown}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={opentown}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleClosetown}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="Home Adress"
                                    label="home_adress"
                                    type="Home Adress"
                                    fullWidth
                                    variant="standard"
                                    className={classetown.root}
                                    sx={{ margin: "0px" }}
                                    inputRef={textFieldRefhome}
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangehome}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>Phone number</p>
                              <IconButton onClick={handleClickOpenphone}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={openphone}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleClosephone}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="Phone Number"
                                    label="Phone Number"
                                    type="Phone Number"
                                    fullWidth
                                    variant="standard"
                                    className={classephone.root}
                                    sx={{ margin: "0px" }}
                                    inputRef={textFieldRefphone}
                                  />
                                  {errorMessagephone && (
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {errorMessagephone
                                        .split("\n")
                                        .map((line, index) => (
                                          <span key={index}>
                                            {line}
                                            <br />
                                          </span>
                                        ))}
                                    </p>
                                  )}
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangephone}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>
                                Average Response Time
                              </p>
                              <IconButton onClick={handleClickOpenavg}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={openavg}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleCloseavg}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="avg"
                                    label="Average Response Time"
                                    type="Average Response Time"
                                    fullWidth
                                    variant="standard"
                                    className={classeavg.root}
                                    sx={{ margin: "0px" }}
                                    inputRef={textFieldRefavg}
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangeavg}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p style={{ color: "black" }}>Description</p>
                              <IconButton onClick={handleClickOpendes}>
                                <EditIcon />
                              </IconButton>
                              <Dialog open={opendes}>
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleClosedes}
                                  sx={{ color: "#2D033B", margin: "0px" }}
                                ></BootstrapDialogTitle>
                                <DialogContent sx={{ width: "280px" }}>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label=" Description"
                                    type=" Description"
                                    fullWidth
                                    variant="standard"
                                    className={classedes.root}
                                    sx={{ margin: "0px" }}
                                    inputRef={textFieldRefdescription}
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    autoFocus
                                    onClick={savechangedescription}
                                    sx={{ color: "#2D033B" }}
                                  >
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </DialogContent>
                          <DialogActions
                            sx={{ display: "flex", justifyContent: "row" }}
                          >
                            <Button
                              onClick={handleDeleteAccount}
                              autoFocus
                              sx={{
                                color: "red",
                                marginRight: "200px",
                              }}
                            >
                              Delete Account
                            </Button>
                            <Button
                              autoFocus
                              onClick={handleClose}
                              sx={{ color: "#2D033B" }}
                            >
                              Save changes
                            </Button>
                          </DialogActions>
                        </BootstrapDialog>
                      </div>
                    </div>

                    <Grid
                      container
                      spacing={1}
                      //className="ms-3"
                      style={{
                        marginTop: "50px",
                        marginLeft: "50px",
                        //backgroundColor: "red",
                        display: "flex",

                        height: "180px",
                      }}
                    >
                      <Grid
                        xs={10}
                        sx={{
                          height: "40px",
                        }}
                      >
                        <MDBTypography
                          tag="div"
                          style={{
                            display: "flex",
                            margin: "0px",
                            flexDirection: "column",
                            color: "#2D033B",
                            fontSize: "13px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",

                              flexDirection: "row",
                            }}
                          >
                            <h2
                              style={{
                                color: "white",
                                fontSize: "18px",
                                marginBottom: "15px",
                                padding: "0px",
                              }}
                            >
                              {localStorage.getItem("username")}
                            </h2>
                          </div>

                          <div
                            style={{
                              display: "flex",

                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                marginRight: "10px",
                                color: "#2D033B",
                                fontSize: "10px",

                                margin: "0px",
                              }}
                            >
                              HOME ADRESS:
                            </p>
                            <p
                              style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: "0px",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {localStorage.getItem("homeAddress")}
                            </p>
                          </div>
                          <br />
                          <div
                            style={{
                              display: "flex",
                              marginRight: "10px",
                              margin: "0px",
                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                marginRight: "10px",

                                color: "#2D033B",
                                fontSize: "10px",
                                margin: "0px",
                              }}
                            >
                              PHONE NUMBER:
                            </p>
                            <p
                              style={{
                                color: "gray",
                                fontSize: "10px",
                                fontFamily: "sans-serif",
                                margin: "0px",
                              }}
                            >
                              {localStorage.getItem("phone")}
                            </p>
                          </div>
                          <br />
                          <div
                            style={{
                              display: "flex",

                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                marginRight: "10px",
                                color: "#2D033B",
                                fontSize: "10px",
                                margin: "0px",
                              }}
                            >
                              AVERAGE RESPONSE TIME:
                            </p>
                            <p
                              style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: "0px",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {localStorage.getItem("avgResponseTime")}
                            </p>
                          </div>
                          <br />
                          <div
                            style={{
                              display: "flex",

                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                marginRight: "10px",
                                color: "#2D033B",
                                fontSize: "10px",
                                margin: "0px",
                              }}
                            >
                              DESCRIPTION:
                            </p>
                            <p
                              style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: "0px",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {localStorage.getItem("description")}
                            </p>
                          </div>
                        </MDBTypography>
                      </Grid>
                    </Grid>
                  </div>
                  <MDBCardBody
                    style={{
                      height: "600px",

                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    <Tabpanell />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
};
export default Profile;
