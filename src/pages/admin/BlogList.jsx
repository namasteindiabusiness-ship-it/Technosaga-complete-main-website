import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { PostDataTable } from "../../components/Tables";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function BlogList() {
  const [postData, setPostData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const updatePostStatus = async (id) => {
    try {
      await API.put(`/post/updatePostStatus/${id}`);
      fetchPosts();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data: res } = await API.get("/post/getPosts");
      setPostData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await API.delete(`/post/deletePost/${id}`);
      toast.success("Post deleted");
      fetchPosts();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    fetchPosts();
  }, []);

  if (pageLoading) return <Loading />;

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Blogs
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/blog-create")}
          >
            Add
          </Button>
        </h2>
      </div>
      <div className="table-data">
        <Toaster richColors position="top-center" />
        <div className="manage">
          <PostDataTable
            deletePost={deletePost}
            postData={postData}
            updatePostStatus={updatePostStatus}
          />
        </div>
      </div>
    </>
  );
}
