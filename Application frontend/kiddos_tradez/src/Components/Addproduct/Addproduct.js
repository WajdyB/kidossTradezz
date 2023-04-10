import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputUnstyled, { inputUnstyledClasses } from "@mui/base/InputUnstyled";
import { useState } from "react";
import basestyle from "../Base.module.css";
import { useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { css } from "styled-components";
import "./Addproduct.css";

const purpl = {
  100: "#F5E1FF",
  200: "#CC99FF",
  400: "#9F40FF",
  500: "#7F00FF",
  600: "#6600CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
const StyledInputRoot = styled("div")(
  ({ theme }) => `
 width:213px;
 height:55px;
  font-weight: 400;
  border-radius: 5px;
  color: #810CA8;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${purpl[400]};
  box-shadow: 0px 2px  5px #b393d3 ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputUnstyledClasses.focused} {
    border-color: ${purpl};

  }

  &:hover {
    border-color: ${purpl[400]};
  }

  // firefox
  &:focus-visible {
    border-color: ${purpl[400]};
  }
`
);
const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
 
  border: none;
  border-radius: inherit;
  padding: 0px 0px;
  outline: 0;
  
`
);
const InputAdornment = styled("div")`

margin:0px,
  display: none;
  align-items: flex;
 
  padding:0px;
  background-color:blue;
`;
const useStyles = makeStyles((theme) => ({
  photoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    width: "400px",
    border: "1px ridge #d0d0d0dd ",
    borderRadius: "10px",
    cursor: "pointer",
  },
  photo: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  inputFocused: {
    borderColor: "#purpl",
  },
  inputHover: {
    borderColor: "#purpl[400]",
  },
}));
const CssTextField = styled(TextField)`
  ${({ theme }) =>
    css`
      --color-primary: #7f00ff;
      --color-secondary: #6600cc;
      --color-tertiary: #9f40ff;

      & label.Mui-focused {
        color: var(--color-primary);
      }

      & .MuiOutlinedInput-root {
        fieldset {
          border-color: var(--color-primary);
        }

        &:hover fieldset {
          border-color: var(--color-secondary);
        }

        &.Mui-focused fieldset {
          border-color: var(--color-primary);
          border-width: 1px;
        }
      }
    `}
`;
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { slots, ...other } = props;
  return (
    <InputUnstyled
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

CustomInput.propTypes = {
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType,
  }),
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const categories = [
  {
    value: "Blocks",
  },
  {
    value: "Magnetic Tiles",
  },
  {
    value: "Marble Runs",
  },
  {
    value: "Construction Sets",
  },
  {
    value: "Gear Sets",
  },
  {
    value: "Connectors",
  },
  {
    value: "Science Kits",
  },
  {
    value: "Math Games",
  },
  {
    value: "Language Learning Toys",
  },
  {
    value: "Geography Puzzles",
  },
  {
    value: "Coding Games",
  },
  {
    value: "Dollhouses",
  },
  {
    value: "Play Kitchen Sets",
  },
  {
    value: "Workbenches",
  },
  {
    value: "Doctor Kits",
  },
  {
    value: "Play Tools",
  },
  {
    value: "Teddy bears",
  },
  {
    value: "Other furry creatures",
  },
  {
    value: "Drawing Sets",
  },
  {
    value: "Painting Kits",
  },
  {
    value: "Bead Jewelry Kits",
  },
  {
    value: "Clay and Dough Sets",
  },
  {
    value: "Sewing Machines",
  },
  {
    value: "Trampolines",
  },
  {
    value: "Playhouses ",
  },
  {
    value: "Slides",
  },
  {
    value: "Swings",
  },
  {
    value: "Bikes",
  },
  {
    value: "Scooters",
  },
];
const state = [{ value: "New" }, { value: "old" }];
const childsage = [
  { value: "0-2" },
  { value: "2-4" },
  { value: "4-6" },
  { value: "+6" },
];
const productage = [
  { value: "0-12 months" },
  { value: "1-2 years" },
  { value: "3-5 years" },
  { value: "6-8 years" },
  { value: "9-12 years" },
  { value: "12+ years " },
];
export default function Addproduct({ openn, onStateChange }) {
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);
  const classes = useStyles();
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
      setValues({
        ...values,
        picture: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const handlePhotoClick = () => {
    if (photo) {
      window.open(photo);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const [values, setValues] = React.useState({
    name: "",
    price: "",
    state: "",
    picture: "null",
    ageChild: "",
    ageToy: "",
    description: "",
    category: "",
  });

  const validateForm = (values) => {
    const error = {};

    if (!values.name) {
      error.name = " Name is required";
    }
    if (!values.price) {
      error.price = " Price is required";
    }
    if (!values.state) {
      error.state = " State  is required";
    }

    if (!values.ageChild) {
      error.ageChild = " Age Child  is required";
    }
    if (!values.ageToy) {
      error.ageToy = " Age Toy  is required";
    }
    if (!values.description) {
      error.description = " Description  is required";
    }
    if (!values.category) {
      error.category = " Category  is required";
    }

    return error;
  };

  const handleaddannonce = () => {
    const post = {
      name: values.name,
      price: values.price,
      state: values.state,
      picture: values.picture,
      ageChild: values.ageChild,
      ageToy: values.ageToy,
      description: values.description,
      category: values.category,
    };
    console.log(post);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("id"));

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`http://localhost:2023/api/annonces/${id}/add-annonce`, post, {
        headers,
      })

      .then((res) => {
        console.log(res.data);
        if (res && res.data) {
          console.log(res.data);
          //console.log("res///////", res);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  {
    /*const handleaddannonce = () => {
    setFormErrors(validateForm(values));
    // onStateChange(false);
  };*/
  }

  const handleClose = () => {
    onStateChange(false);
  };

  return (
    <Dialog
      fullScreen
      open={openn}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "#2D033B",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add product
          </Typography>
          <Button autoFocus color="inherit" onClick={handleaddannonce}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div className="maindiv">
        <div style={{ width: "200px" }}></div>
        <div
          className="maindivphoto"
          style={{
            // backgroundColor: "pink",
            display: "flex",
            alignItems: "center",
            //gap: "50px",
            // marginLeft: "200px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              //backgroundColor: "#2D033B	",
              height: "460px",
              width: "500px",
              borderRadius: "9px",
              padding: "10px",
              maxWidth: "600px", // set a maximum width for the element
              margin: "0 auto", // center the element horizontally
            }}
          >
            <div
              className={classes.photoContainer}
              name="picture"
              onClick={handlePhotoClick}
            >
              {photo && (
                <img src={photo} alt="photo" className={classes.photo} />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // marginTop: "5px",
              }}
            >
              <Button
                variant="Text"
                component="label"
                color="secondary"
                sx={{ color: "#810CA8" }}
              >
                Upload File
                <input type="file" hidden onChange={handlePhotoChange} />
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            //backgroundColor: "red",
            width: "50px",
          }}
        >
          <div
            style={{
              borderLeft: "1px ridge #d0d0d0dd",
              height: "80%",
              //backgroundColor: "red",
            }}
          ></div>
        </div>

        {/************************************************************************************* */}
        <div
          style={{
            //backgroundColor: "purple",
            display: "flex",
            alignItems: "center",
            //  padding: "100px",
            // width: "50%",
            maxWidth: "600px", // set a maximum width for the element
            margin: "0px", // center the element horizontally
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "#2D033B	",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "column",
                  // backgroundColor: "blue",
                  borderRadius: "10px",
                  // width: "100%",
                  // height: "400px",
                }}
              >
                <Box
                  sx={{
                    width: "276px",
                    padding: "20px",
                    height: "300px",
                    // backgroundColor: "red",
                  }}
                >
                  <FormControl variant="standard" sx={{ margin: "10px" }}>
                    {/*******************************************************first name****************************************************************************************/}
                    <Box>
                      <InputLabel shrink htmlFor=" name ">
                        Name
                      </InputLabel>
                      <CustomInput
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        sx={{
                          marginTop: "20px",
                          // backgroundColor: "pink"
                        }}
                      />
                    </Box>
                  </FormControl>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <InputLabel
                      htmlFor="outlined-select-currency"
                      style={{
                        color: "balck",
                        margin: "0px",
                        fontSize: "0.8rem",
                        fontFamily: "inherit",
                        marginLeft: "9px",
                      }}
                    >
                      Categorie
                    </InputLabel>
                    <CssTextField
                      id="outlined-select-currency"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      select
                      //defaultValue="Blocks"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          top: "-20px",
                          height: "20px",
                          backgroundColor: "purple",
                          border: "2px solid red",
                        },
                      }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: "200px",
                            },
                          },
                        },
                      }}
                    >
                      {categories.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          //style={{ height: "40px" }}
                        >
                          {option.value}
                        </MenuItem>
                      ))}
                    </CssTextField>
                  </Box>
                  {/****************************************************state*************************************************** */}
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <InputLabel
                      htmlFor="outlined-select-currency"
                      style={{
                        color: "balck",
                        margin: "0px",
                        fontSize: "0.8rem",
                        fontFamily: "inherit",
                        marginLeft: "9px",
                      }}
                    >
                      State
                    </InputLabel>
                    <CssTextField
                      id="outlined-select-currency"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      select
                      //defaultValue="New"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          top: "-20px",
                          height: "20px",
                        },
                      }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: "200px",
                            },
                          },
                        },
                      }}
                    >
                      {state.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          //style={{ height: "40px" }}
                        >
                          {option.value}
                        </MenuItem>
                      ))}
                    </CssTextField>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "276px",
                    padding: "20px",
                    height: "300px",
                    // marginLeft: "40px",
                    // backgroundColor: "yellow",
                  }}
                >
                  <FormControl variant="standard" sx={{ margin: "10px" }}>
                    {/*******************************************************first name****************************************************************************************/}
                    <Box>
                      <InputLabel shrink htmlFor=" price ">
                        Price
                      </InputLabel>
                      <CustomInput
                        name="price"
                        onChange={handleChange}
                        value={values.price}
                        sx={{ marginTop: "20px" }}
                        id="price"
                      />
                    </Box>
                  </FormControl>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                      //backgroundColor: "red",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <InputLabel
                      htmlFor="outlined-select-currency"
                      style={{
                        color: "balck",
                        margin: "0px",
                        fontSize: "0.8rem",
                        fontFamily: "inherit",
                        marginLeft: "9px",
                      }}
                    >
                      Child's age
                    </InputLabel>
                    <CssTextField
                      id="outlined-select-currency"
                      name="ageChild"
                      value={values.ageChild}
                      onChange={handleChange}
                      select
                      defaultValue="New"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          top: "-20px",
                          height: "20px",
                        },
                      }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: "200px",
                            },
                          },
                        },
                      }}
                    >
                      {childsage.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          //style={{ height: "40px" }}
                        >
                          {option.value}
                        </MenuItem>
                      ))}
                    </CssTextField>
                  </Box>
                  {/**************************************************************************************** */}
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                      //backgroundColor: "red",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <InputLabel
                      htmlFor="outlined-select-currency"
                      style={{
                        margin: "0px",
                        fontSize: "0.8rem",
                        fontFamily: "inherit",
                        marginLeft: "9px",
                      }}
                    >
                      Product age
                    </InputLabel>
                    <CssTextField
                      //id="outlined-select-currency"
                      name="ageToy"
                      value={values.ageToy}
                      onChange={handleChange}
                      select
                      defaultValue="New"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          top: "-20px",
                          height: "20px",
                        },
                      }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: "200px",
                            },
                          },
                        },
                      }}
                    >
                      {productage.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          //style={{ height: "40px" }}
                        >
                          {option.value}
                        </MenuItem>
                      ))}
                    </CssTextField>
                  </Box>
                </Box>
              </Box>

              {/*******************************************************user name****************************************************************************************/}

              {/*******************************************************first name****************************************************************************************/}

              {/*******************************************************email****************************************************************************************/}

              {/*******************************************************last name****************************************************************************************/}
            </div>
            <Box
              sx={{
                // backgroundColor: "green",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControl variant="standard" sx={{ margin: "10px" }}>
                {/*******************************************************first name****************************************************************************************/}
                <InputLabel shrink htmlFor=" Description ">
                  Description
                </InputLabel>

                <CssTextField
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  id="outlined-multiline-static"
                  multiline
                  rows={3}
                  sx={{ marginTop: "21px" }}
                />
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
