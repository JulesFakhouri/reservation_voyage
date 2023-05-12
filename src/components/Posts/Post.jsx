import { useContext } from "react";
import { GlobalContext } from "../../context/global";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

const Post = ({ id, img, country, company, start, end }) => {
  const { setModal, setLoading } = useContext(GlobalContext);

  const moreDetails = () => {
    setModal({ open: true, data: "" });
    setLoading(true);
    fetch(`https://node-event78250.herokuapp.com/journey/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setModal({ open: true, data });
      });
  };

  return (
    <Card sx={{ maxWidth: 345, marginTop: "2rem" }}>
      <CardMedia sx={{ height: 140 }} image={img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${country.country}, ${country.city}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company} ,{`Started: ${start}, Ended: ${end}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={moreDetails}>
          Encore plus
        </Button>
      </CardActions>
    </Card>
  );
};
export default Post;
