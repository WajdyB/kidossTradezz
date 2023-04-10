import React from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Conditionsandterms = ({
  open,
  onStateChange,
  handleclickk,
  setIsSignedUp,
}) => {
  const navigate = useNavigate();
  function handleClick(e) {
    handleclickk();
    onStateChange(false);
    //setIsSignedUp(true);
    // navigate("/", { replace: true });
    // e.preventDefault();
  }
  const handleClose = () => {
    onStateChange(false);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
    setIsButtonDisabled(!event.target.checked);
  }

  console.log("isChecked*****", isChecked);
  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          boxShadow: "0 8px 32px rgba(31,28,135,0.37)",
          backdropFilter: " blur(8.5px)",
        }}
      >
        <DialogTitle style={{ color: "#2D033B" }}>
          Terms and Conditions
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <div style={{ color: "purple" }}>Product Listing:</div> The user
            agrees to list the toy product accurately, including its condition,
            age range, and other relevant details.
          </Typography>
          <Typography gutterBottom>
            <div style={{ color: "purple" }}>Price Agreement: </div>
            The user agrees to only offer toys for sale or exchange that are
            approximately the same value as the toy they wish to receive in
            exchange or sell. In case there is a difference in the value of the
            toys, both parts should agree to a fair price adjustment.
          </Typography>
          <Typography gutterBottom>
            <div style={{ color: "purple" }}> Communication:</div>
            The user agrees to communicate respectfully and clearly with other
            users regarding any transactions or negotiations. Any use of
            inappropriate language or behavior may result in suspension or
            termination of the account.
          </Typography>
          <Typography gutterBottom>
            <div style={{ color: "purple" }}> User Safety:</div>
            The user agrees to prioritize their safety and take necessary
            precautions when meeting in person to exchange toys. The platform is
            not responsible for any damages, injuries, or thefts that may occur
            during the exchange.
          </Typography>
          <Typography gutterBottom>
            <div style={{ color: "purple" }}> Prohibited Items:</div>
            The user agrees not to list any prohibited items such as weapons,
            drugs, or any items that are illegal or violate intellectual
            property rights.
          </Typography>
          <Typography gutterBottom>
            <div style={{ color: "purple" }}> Account Responsibility:</div>
            The user agrees to keep their account information up-to-date,
            including their contact details and any products they have listed.
            The user is responsible for maintaining the security of their
            account and keeping their login credentials confidential.
          </Typography>
          <Typography gutterBottom>
            <div style={{ color: "purple" }}> Platform Guidelines: </div>
            The user agrees to follow all platform guidelines, terms of service,
            and policies. Any violation of these guidelines may result in
            suspension or termination of the user's account.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
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
                  fontSize: 16,
                  color: "#2D033B",
                }}
              >
                I have read and agree at the terms and conditons
              </Typography>
            }
          />
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color="error"
            sx={{ mt: 2, mb: 2, marginLeft: "0px" }}
          >
            Cancel
          </Button>
          <Button
            disabled={isButtonDisabled}
            onClick={handleClick}
            autoFocus
            color="secondary"
            sx={{ mt: 2, mb: 2, marginLeft: "0px" }}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Conditionsandterms;
