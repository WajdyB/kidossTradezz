import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
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
export default function Test(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

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
              color: "#2D033B",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>

      <Dialog
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
          {props.name}
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText>set a new username</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="{props.name}"
            type="username"
            fullWidth
            variant="standard"
            className={classes.root}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{ color: "#2D033B" }}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
