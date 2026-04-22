import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { BiLoader } from "react-icons/bi";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { pharmaCategories, tokenExpired } from "../../libs/library";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CustomUploadAdapterPlugin } from "../../libs/uploader";
import API from "../../libs/apiCall";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedId = +e.target.value;

    const course = pharmaCategories.find((c) => c.id === selectedId);
    setCategory(course);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("title", title);
      fd.append("categoryId", category?.id);
      fd.append("categoryName", category?.name);
      fd.append("content", content);
      if (featuredImage) fd.append("file", featuredImage);

      await API.post("/post/createPost", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog created");
      setTitle("");
      setCategory("");
      setFeaturedImage(null);
      setContent("");
      navigate("/dashboard/blog-list");
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Create Blog
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/blog-list")}
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
                  required
                />
              </div>
              <div className="inpt-row">
                <label>Category</label>
                <select onChange={handleSelectChange} required>
                  <option value="">Select Category</option>
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
                <label>Poster</label>
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
                "Add"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
