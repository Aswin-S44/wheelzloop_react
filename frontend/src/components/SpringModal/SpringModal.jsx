import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useSpring, animated } from "@react-spring/web";
// import "./SpringModal.css";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function SpringModal({ open, handleClose, onSubmit }) {
  const [formData, setFormData] = React.useState({
    fullName: "",
    phoneNumber: "",
    allowMessages: false,
  });

  const [errors, setErrors] = React.useState({
    fullName: "",
    phoneNumber: "",
  });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  React.useEffect(() => {
    const isValid = validateForm();
    setIsSubmitEnabled(isValid);
  }, [formData]);

  const [isSubmitEnabled, setIsSubmitEnabled] = React.useState(false);

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
          >
            Fill in your details
          </Typography>

          <form onSubmit={handleSubmit}>
            <Typography className="input-field-label">Full Name</Typography>
            <input
              style={{ outline: "none" }}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-100 cusstom-input    input-field ${
                errors.fullName ? "input-field-error" : ""
              }`}
            />
            {errors.fullName && (
              <Typography color="error" variant="body2">
                {errors.fullName}
              </Typography>
            )}
            <div className="mt-3"></div>

            <Typography className="input-field-label">Phone Number</Typography>
            <input
              style={{ outline: "none" }}
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-100 input-field ${
                errors.phoneNumber ? "input-field-error" : ""
              }`}
            />
            {errors.phoneNumber && (
              <Typography color="error" variant="body2">
                {errors.phoneNumber}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.allowMessages}
                  onChange={handleChange}
                  name="allowMessages"
                  sx={{ color: "#333", marginRight: 1 }}
                />
              }
              label="Allow messages on WhatsApp"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#21cb98",
                mt: 3,
                width: "100%",
                padding: "10px 0",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#1fa98f",
                },
              }}
              disabled={!isSubmitEnabled}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
