import "./EditPost.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import { Editor } from "@nick4fake/react-draft-wysiwyg";
import "@nick4fake/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

import Button from "../Button/Button";
import axios from "axios";
import { AuthContext } from "../../Context";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const { authState } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { response } = useAxios({
    method: "get",
    url: `/board/view-post/${id}`,
  });

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

  const editPost = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:3001/board/view-post/${id}/edit`, {
      content,
      username: authState.username,
    });
  };

  useEffect(() => {
    if (response) {
      setPost(response[0]);
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(response[0].body))
        )
      );
    }
  }, [response, post]);

  useEffect(() => {
    setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  return (
    <div className="edit-post">
      <form onSubmit={editPost}>
        <div className="title-container">
          <input className="title" type="text" value={post.title} readOnly />
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="post-toolbar"
          wrapperClassName="post-wrapper"
          editorClassName="post-editor"
          onEditorStateChange={onEditorStateChange}
        />
        <div className="edit-post-btn">
          <Button text={"저장하기"} />
        </div>
      </form>
    </div>
  );
};

export default EditPost;
