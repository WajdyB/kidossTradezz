import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./Signin.css";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import PropTypes from "prop-types";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputUnstyled, { inputUnstyledClasses } from "@mui/base/InputUnstyled";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import basestyle from "../Base.module.css";
import { Button, Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
const SmallVisibilityIcon = styled(Visibility)({
  fontSize: 16,
  marginRight: 5,
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
  padding: 12px 12px;
  outline: 0;
`
);

const IconButton = styled(ButtonUnstyled)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border:none ;
  size:3px,
  
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[700]};
  `
);
const InputAdornment = styled("div")`
color:white;
margin:8px,
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
{
  /*************************************************************************************************/
}

{
  /*************************************************************************************************/
}

function Signin(setUserState) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [values, setValues] = React.useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    homeAddress: "",
    password: "",
    confirmpassword: "",
    phone: "",
    avgResponseTime: "",
    description: "",
    showPassword: false,
    showconfirmPassword: false,
  });
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{8}$/;

    if (!values.username) {
      error.username = "User Name is required";
    }

    if (!values.phone) {
      error.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
      error.phone = "Phone number should contain exactly 8 numbers";
    }

    if (!values.avgResponseTime) {
      error.avgResponseTime = "Average Response Time is required";
    }

    if (!values.homeAddress) {
      error.homeAddress = "Home Adress is required";
    }

    if (!values.firstname) {
      error.firstname = "First Name is required";
    }

    if (!values.lastname) {
      error.lastname = "Last Name is required";
    }

    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
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

    if (!values.confirmpassword) {
      error.confirmpassword = "Confirm Password is required";
    } else if (values.confirmpassword !== values.password) {
      error.confirmpassword = "Confirm password and password should be same";
    }

    return error;
  };

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
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage(null);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const post = {
        username: values.username,
        password: values.password,
        confirmpassword: values.confirmpassword,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        homeAddress: values.homeAddress,
        phone: values.phone,
        avgResponseTime: values.avgResponseTime,
        description: values.description,
      };
      console.log(post);
      axios
        .post("http://localhost:2023/api/auth/signup", post)
        .then((res) => {
          alert(res.data.message);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    }
  }, [formErrors]);

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <React.Fragment>
          <Container>
            <Box className="main">
              <Box
                sx={{
                  display: "-ms-grid",
                  justifyContent: "row",
                  // backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "column",
                    //backgroundColor: "orange",
                    width: "70vh",
                    height: "530px",
                  }}
                >
                  <Box
                    sx={{
                      width: "276px",
                      padding: "20px",
                      height: "530px",
                      //backgroundColor: "red",
                    }}
                  >
                    <FormControl variant="standard" sx={{ margin: "10px" }}>
                      {/*******************************************************first name****************************************************************************************/}
                      <Box>
                        <InputLabel
                          shrink
                          htmlFor=" First-name "
                          sx={{
                            color: "gris",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          First name
                        </InputLabel>
                        <CustomInput
                          name="firstname"
                          onChange={handleChange}
                          value={values.firstname}
                          sx={{ marginTop: "20px" }}
                          id="firstname"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                        <p className={basestyle.button_common}>
                          {formErrors.firstname}
                        </p>
                      </Box>
                      {/*******************************************************phone****************************************************************************************/}

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="username"
                          sx={{
                            color: "gris",
                            marginTop: "95px",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          User Name
                        </InputLabel>
                        <CustomInput
                          name="username"
                          onChange={handleChange}
                          value={values.username}
                          sx={{ marginTop: "20px" }}
                          id="username"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                        <p className={basestyle.button_common}>
                          {formErrors.username}
                        </p>
                      </Box>
                      {/*******************************************************user name****************************************************************************************/}

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="phone"
                          sx={{
                            color: "gris",
                            marginTop: "190px",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          Phone Number
                        </InputLabel>
                        <CustomInput
                          name="phone"
                          onChange={handleChange}
                          value={values.phone}
                          sx={{ marginTop: "20px" }}
                          id="phone"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                        <p className={basestyle.button_common}>
                          {formErrors.phone}
                        </p>
                      </Box>
                      {/*******************************************************first name****************************************************************************************/}

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="password"
                          sx={{
                            color: "gris",
                            marginTop: "280px",
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

                      {/*******************************************************email****************************************************************************************/}

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="avgResponseTime"
                          sx={{
                            color: "gris",
                            marginTop: "370px",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          Average Response Time
                        </InputLabel>
                        <CustomInput
                          name="avgResponseTime"
                          onChange={handleChange}
                          value={values.avgResponseTime}
                          sx={{ marginTop: "15px" }}
                          id="avgResponseTime"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                      </Box>
                    </FormControl>
                    <p className={basestyle.button_common}>
                      {formErrors.avgResponseTime}
                    </p>
                  </Box>
                  {/*******************************************************last name****************************************************************************************/}

                  <Box
                    sx={{
                      width: "276px",
                      padding: "20px",
                      height: "68vh",
                      marginLeft: "60px",
                      // backgroundColor: "blue",
                    }}
                  >
                    <FormControl variant="standard">
                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="lastname"
                          sx={{
                            color: "gris",
                            marginTop: "9px",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          Last name
                        </InputLabel>
                        <CustomInput
                          name="lastname"
                          onChange={handleChange}
                          value={values.lastname}
                          sx={{ marginTop: "29px" }}
                          id="lastname"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                        <p className={basestyle.button_common}>
                          {formErrors.lastname}
                        </p>
                      </Box>

                      {/*******************************************************average response time****************************************************************************************/}

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="email"
                          sx={{
                            color: "gris",
                            marginTop: "105px",

                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          Email
                        </InputLabel>
                        <CustomInput
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          sx={{ marginTop: "20px" }}
                          id="email"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                        <p className={basestyle.button_common}>
                          {formErrors.email}
                        </p>
                      </Box>
                      {/*******************************************************password****************************************************************************************/}

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="homeAddress"
                          sx={{
                            color: "gris",
                            marginTop: "200px",
                            marginLeft: "0px",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          Home Adress
                        </InputLabel>
                        <CustomInput
                          name="homeAddress"
                          onChange={handleChange}
                          value={values.homeAddress}
                          sx={{ marginTop: "20px" }}
                          id="homeAddress"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                        <p className={basestyle.button_common}>
                          {formErrors.homeAddress}
                        </p>
                      </Box>
                      {/*******************************************************description****************************************************************************************/}

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="confirm-password"
                          sx={{
                            color: "gris",
                            marginTop: "290px",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          Confirm Password
                        </InputLabel>
                        <CustomInput
                          sx={{ marginTop: "15px" }}
                          name="confirmpassword"
                          id="confirm-password"
                          type={
                            values.showconfirmPassword ? "text" : "password"
                          }
                          value={values.confirmpassword}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment>
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleClickShowPasswordd}
                                onMouseDown={handleMouseDownPassword}
                                sx={{ backgroundColor: "white" }}
                              >
                                {values.showconfirmPassword ? (
                                  <SmallVisibilityOffIconc />
                                ) : (
                                  <SmallVisibilityIconc />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <p className={basestyle.button_common}>
                          {formErrors.confirmpassword}
                        </p>
                      </Box>

                      <Box>
                        <InputLabel
                          shrink
                          htmlFor="description"
                          sx={{
                            color: "gris",
                            marginTop: "385px",
                            marginLeft: "0px",
                            "&.Mui-focused": { color: "purple" },
                          }}
                        >
                          Description
                        </InputLabel>
                        <CustomInput
                          name="description"
                          onChange={handleChange}
                          value={values.description}
                          sx={{ marginTop: "20px" }}
                          id="description"
                          startAdornment={<InputAdornment> </InputAdornment>}
                        />
                      </Box>
                      {/*******************************************************button****************************************************************************************/}
                    </FormControl>
                  </Box>
                </Box>
                <form onSubmit={handleclickk}>
                  {/* form fields */}
                  <Snackbar
                    open={errorMessage !== null}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    sx={{
                      marginBottom: "40px",
                      marginLeft: "10px",
                    }}
                  >
                    <MuiAlert
                      variant="filled"
                      onClose={handleCloseSnackbar}
                      severity="error"
                      sx={{
                        width: "480px",
                        height: "50px",
                        backgroundColor: "purple",
                      }}
                    >
                      {errorMessage}
                    </MuiAlert>
                  </Snackbar>
                </form>
                <div
                  style={{
                    display: "flex",
                    // backgroundColor: "purple",
                  }}
                >
                  <Button
                    type="submit"
                    color="secondary"
                    variant="outlined"
                    sx={{
                      mt: 1,
                      width: "300px",
                      marginLeft: "120px",
                    }}
                    onClick={handleclickk}
                  >
                    Register
                  </Button>
                </div>
              </Box>
            </Box>
          </Container>
        </React.Fragment>
      </Grid>
    </Grid>
  );
}

export default Signin;
