import * as React from "react";
import Box from "@mui/material/Box";
import "./Myaccount.css";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import InputUnstyled, { inputUnstyledClasses } from "@mui/base/InputUnstyled";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import PropTypes from "prop-types";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import basestyle from "../../Components/Base.module.css";

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
 
  font-weight: 400;
  border-radius: 5px;
  color: ${theme.palette.mode === "light" ? grey[300] : grey[500]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? purpl[700] : grey[200]};
  box-shadow: 0px 2px  5px #b393d3 ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputUnstyledClasses.focused} {
    border-color: ${purpl};
    box-shadow: 0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3;

  }

  &:hover {
    border-color: ${purpl[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.8rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px ;
  outline: 0;
`
);

const IconButton = styled(ButtonUnstyled)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  size:10px,
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[700]};
  `
);

const InputAdornment = styled("div")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
const SmallVisibilityIcon = styled(Visibility)({
  fontSize: 16,
  marginRight: 5,
});
const SmallVisibilityOffIcon = styled(VisibilityOff)({
  fontSize: 16,
  marginRight: 5,
});

function Myaccount() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleclickk = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(values));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const post = {
        username: values.username,
        password: values.password,
        confirmpassword: values.confirmpassword,
      };
      console.log("heyy");
      console.log(post);
      axios
        .post("http://localhost:2023/api/auth/signin", post)
        .then((res) => {
          alert("found");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }, [formErrors]);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage(null);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = (values) => {
    const error = {};

    if (!values.username) {
      error.username = "User Name is required";
    }

    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 8) {
      error.password = "Password must be at least 8 characters";
    } else if (!/^[A-Z]/.test(values.password)) {
      error.password = "Password must start with a capital letter";
    } else if (!/\d/.test(values.password)) {
      error.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(values.password)) {
      error.password = "Password must contain at least one special character";
    }

    return error;
  };

  return (
    <Box
      style={{
        marginTop: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <Box className="box1">
          <Box className="mainContainer">
            <Box className="inputcontainer">
              <Box className="logo"></Box>
              <Box>
                <h2 id="welcome-heading">WELCOME BACK</h2>
              </Box>
            </Box>

            <Box sx={{ height: "100%", width: "50%" }}>
              <Box className="logincontainer">
                <Box className="login">
                  <h2 id="login-heading">Login</h2>
                </Box>

                <Box
                  component="form"
                  noValidate
                  sx={{
                    display: "grid",
                    margin: "0px",
                    gridTemplateColumns: { sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <FormControl variant="standard" sx={{ margin: "10px" }}>
                    <Box>
                      <InputLabel
                        shrink
                        htmlFor="Username"
                        sx={{
                          color: "gris",

                          "&.Mui-focused": { color: "purple" },
                        }}
                      >
                        Username
                      </InputLabel>
                      <CustomInput
                        sx={{ marginTop: "20px" }}
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        id="username"
                        startAdornment={<InputAdornment> </InputAdornment>}
                      />
                      <p className={basestyle.button_common}>
                        {formErrors.username}
                      </p>
                    </Box>
                    <Box>
                      <InputLabel
                        shrink
                        htmlFor="password"
                        sx={{
                          color: "gris",
                          marginTop: "90px",
                          "&.Mui-focused": { color: "purple" },
                        }}
                      >
                        Password
                      </InputLabel>
                      <CustomInput
                        name="password"
                        sx={{ marginTop: "15px" }}
                        id="password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment>
                            <IconButton
                              sx={{ backgroundColor: "white" }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <SmallVisibilityOffIcon />
                              ) : (
                                <SmallVisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />

                      <p className={basestyle.button_common}>
                        {formErrors.password}
                      </p>
                    </Box>
                  </FormControl>
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="secondary"
                      sx={{ color: "purple" }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Arial",
                        fontSize: 13,
                        color: "gray",
                      }}
                    >
                      Remember me
                    </Typography>
                  }
                />

                <Button
                  type="submit"
                  color="secondary"
                  variant="outlined"
                  sx={{ mt: 2, mb: 2, marginLeft: "0px" }}
                  onClick={handleclickk}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item>
                    <Link
                      href="/myaccount/forgotpassword"
                      variant="body2"
                      underline="hover"
                      sx={{ color: "purple" }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/myaccount/signin"
                      variant="body2"
                      underline="hover"
                      sx={{
                        color: "purple",
                        textAlign: "center",
                        display: "flex",
                        marginLeft: "50px",
                        marginTop: "4px",
                      }}
                    >
                      {"Don't have an account? "}
                      <br />
                      {"Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Myaccount;
