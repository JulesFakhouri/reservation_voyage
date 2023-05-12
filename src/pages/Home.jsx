import { useContext, useState } from "react";
import { GlobalContext } from "../context/global";
import {
  AppBar,
  Grid,
  FormControl,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import Nav from "../components/Nav";
import Posts from "../components/Posts/Posts";

const INIT = {
  country: "",
  city: "",
  image: "",
  company: "",
  date_start: "2023-01-17",
  date_end: "2023-01-17",
};

const Home = () => {
  const [formData, setFormData] = useState(INIT);
  const { modal, loading, setModal } = useContext(GlobalContext);
  const handleSubmit = () => {
    fetch("https://node-event78250.herokuapp.com/addjourney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => {
      setFormData(INIT);
    });
  };

  return (
    <>
      <Nav />
      <Dialog
        open={modal.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="filterDialog"
      >
        <DialogTitle id="alert-dialog-title">{`${modal.data.country}, ${modal.data.city}`}</DialogTitle>
        <DialogContent style={{ minWidth: "400px" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Card sx={{ maxWidth: 345, marginTop: "2rem" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={modal.data.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {modal.data.company} ,
                    {`Started: ${modal.data.date_start}, Ended: ${modal.data.date_end}`}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal({ open: false, data: "" })} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={3}
        sx={{ marginTop: "5rem" }}
      >
        <Grid item xs={12} sm={6} md={9}>
          <Posts />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar
            position="static"
            color="inherit"
            sx={{
              borderRadius: 4,
              marginBottom: "1rem",
              display: "flex",
              padding: "16px",
            }}
          >
            <Typography variant="h4" sx={{ my: "1rem" }}>
              Ajouter une voyage
            </Typography>
            <FormControl sx={{ display: "flex", gap: "1.5rem" }}>
              <TextField
                label="Country"
                variant="outlined"
                value={formData.country}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, country: e.target.value }))
                }
              />
              <TextField
                label="City"
                variant="outlined"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
              <TextField
                label="Image"
                variant="outlined"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
              />
              <TextField
                label="Company"
                variant="outlined"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
              />
              <TextField
                label="Start Date"
                type="datetime-local"
                value={formData.date_start}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    date_start: e.target.value.split("T")[0],
                  }))
                }
              />
              <TextField
                label="End Date"
                type="datetime-local"
                value={formData.date_end}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    date_end: e.target.value.split("T")[0],
                  }))
                }
              />

              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </FormControl>
          </AppBar>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
