import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { pharmaCategories, tokenExpired } from "../libs/library";
import { BiLoader } from "react-icons/bi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CustomUploadAdapterPlugin } from "../libs/uploader";
import { toast, Toaster } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../libs/apiCall";

export default function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { blogId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const checkPath = location.pathname.includes("update-news");

  const updateUrl = checkPath
    ? `/news/updateNews/${blogId}`
    : `/post/updatePostById/${blogId}`;

  const detailsUrl = checkPath
    ? `/news/getNewsDetailsById/${blogId}`
    : `/post/getPostDetailsById/${blogId}`;

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const course = pharmaCategories.find((c) => c.id === selectedId);
    setCategory(course);
  };

  const fetchPost = async () => {
    try {
      const { data: res } = await API.get(detailsUrl);
      const post = res.data;
      setTitle(post.title);
      setCategory({ _id: post.categoryId, categoryName: post.categoryName });
      setPreviewImage(post.imageUrl);
      setContent(post.content);
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("title", title);
      fd.append("categoryId", category?._id);
      fd.append("categoryName", category?.categoryName);
      fd.append("content", content);
      if (featuredImage) fd.append("file", featuredImage);

      await API.put(updateUrl, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated");
      checkPath
        ? navigate("/dashboard/news-list")
        : navigate("/dashboard/blog-list");
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [blogId]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          {checkPath ? "Update News" : "Update Blog"}
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                checkPath ? "/dashboard/news-list" : "/dashboard/blog-list"
              )
            }
          >
            Back to list
          </Button>
        </h2>
      </div>
      <div className="manage">
        <div className="add-product">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="inpt-row">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  disabled
                  required
                />
              </div>
              <div className="inpt-row">
                <label>Category</label>
                <select
                  onChange={handleSelectChange}
                  value={category?._id || ""}
                  required
                >
                  {pharmaCategories.map((categ) => (
                    <option value={categ?.id} key={categ?.id}>
                      {categ?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="inpt-row">
                <label>Photo</label>
                {previewImage && (
                  <div style={{ marginBottom: "10px" }}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: "150px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="inpt-row">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    extraPlugins: [CustomUploadAdapterPlugin],
                  }}
                  data={content}
                  onChange={(event, editor) => setContent(editor.getData())}
                />
              </div>
            </div>

            <Button type="submit" variant="contained" disableElevation>
              {loading ? (
                <BiLoader size={24} className="animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
