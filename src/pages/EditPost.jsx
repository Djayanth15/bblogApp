import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const post = await appwriteService.getPost(slug);
          if (post) {
            setPost(post);
          }
        } catch (error) {
          // Handle the error, e.g., by logging it or showing an error message
          console.error("Failed to fetch the post:: edit post page ::", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  return post ? (
    <div className="py-32">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <h1>Failed to load the post</h1>
  );
}

export default EditPost;
