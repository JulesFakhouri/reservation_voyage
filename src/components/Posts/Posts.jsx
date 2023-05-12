import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://node-event78250.herokuapp.com/journey")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Grid
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {posts.map((post, index) => {
        return (
          <Post
            id={post._id}
            img={post.image}
            country={{ country: post.country, city: post.city }}
            company={post.company}
            start={post.date_start}
            end={post.date_end}
            key={index}
          />
        );
      })}
    </Grid>
  );
};

export default Posts;
