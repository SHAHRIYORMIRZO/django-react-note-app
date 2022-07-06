import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts";

const baseURL = "http://localhost:8000";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const createNote = async (event) => {
    event.preventDefault();

    const new_request = new Request(`${baseURL}/posts/`, {
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "Application/Json",
      },
      method: "POST",
    });

    const response = await fetch(new_request);

    const data = await response.json();

    if (response.ok) {
      setPosts(data)
    } else {
      console.log("Failed Network Request");
    }

    setTitle("");
    setContent("");

    setModalVisible(false);

    getAllPosts();
  };

  const getAllPosts = async () => {
    const response = await fetch(`${baseURL}/posts/`);

    const data = await response.json();

    if (response.ok) {
      setPosts(data);
    } else {
      console.log("Failed Network Request");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const deleteItem = async (noteId) => {

    const response = await fetch(`${baseURL}/posts/${noteId}/`, {
      method: "DELETE",
    });

    if (response.ok) {
    }

    getAllPosts();
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <p className="title">Guest Book</p>
        </div>
        <div className="add-section">
          <a className="add-btn" href="#" onClick={() => setModalVisible(true)}>
            Add Note
          </a>
        </div>
      </div>
      {posts.length > 0 ? (
        <div className="post-list">
          {posts.map((item) => (
            <Posts
              title={item.title}
              content={item.content}
              onClick={() => deleteItem(item.id)}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="posts">
          <p style={{color: "white", fontSize: 40, textTransform: "uppercase"}}>No Posts</p>
        </div>
      )}

      <div className={modalVisible ? "modal" : "modal-not-visible"}>
        <div className="form">
          <div className="form-header">
            <div>
              <p className="form-header-text">Create a Note</p>
            </div>
            <div>
              <a
                href="#"
                className="close-btn"
                onClick={() => setModalVisible(!modalVisible)}
              >
                X
              </a>
            </div>
          </div>
          <form action="">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={titleHandler}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">content</label>
              <textarea
                name="content"
                id=""
                cols="30"
                value={content}
                onChange={contentHandler}
                rows="5"
                className="form-control"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Save"
                className="btn"
                onClick={createNote}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default App;
