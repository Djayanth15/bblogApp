import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-32 backdrop-blur-lg">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
