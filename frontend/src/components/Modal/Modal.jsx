import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "800px",
  bgcolor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  p: 4,
  overflowY: "auto",
};

const imageStyle = {
  width: "200px",
  maxHeight: "auto",
  objectFit: "cover",
  borderRadius: "10px",
  cursor: "pointer",
};

const galleryStyle = {
  display: "flex",
  gap: "15px",
  marginTop: "20px",
  overflowX: "auto",
};

export default function TransitionsModal({ car, open, handleClose }) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(null);

  const handleOpenLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => setLightboxOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
          >
            {car.name} ({car.year})
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "18px" }}>
            <strong>Brand:</strong> {car.brand}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "16px" }}>
            <strong>Variant:</strong> {car.varient}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "16px" }}>
            <strong>Fuel Type:</strong> {car.fuelType}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "16px" }}>
            <strong>Transmission:</strong> {car.transmission}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "16px" }}>
            <strong>Price:</strong> ₹{car.rate.toLocaleString()}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "16px" }}>
            <strong>Mileage:</strong> {car.mileage} km/l
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "16px" }}>
            <strong>Location:</strong> {car.place}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: "16px" }}>
            <strong>Seats:</strong> {car.totalSeats}
          </Typography>

          <div style={{ marginTop: "30px" }}>
            <Typography variant="h6" fontWeight="bold">
              Car Images
            </Typography>
            <div style={galleryStyle}>
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Car image ${index + 1}`}
                  style={imageStyle}
                  onClick={() => handleOpenLightbox(image)}
                />
              ))}
            </div>
          </div>

          <Dialog open={lightboxOpen} onClose={handleCloseLightbox}>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogContent>
              <img
                src={currentImage}
                alt="Lightbox preview"
                style={{ width: "100%" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseLightbox} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Fade>
    </Modal>
  );
}
