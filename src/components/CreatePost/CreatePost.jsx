import "./CreatePost.scss";
import { Editor } from "@nick4fake/react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "@nick4fake/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { AuthContext } from "../../Context";
import { useHistory } from "react-router";

const CreatePost = () => {
  const { authState } = useContext(AuthContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [boardCategory, setBoardCategory] = useState(0);
  let history = useHistory();
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

  const handleBoardCategory = (e) => {
    setBoardCategory(parseInt(e.target.value));
  };

  const submitPost = (e) => {
    e.preventDefault();
    // console.log(content, postTitle, authState.username);
    axios
      .post("http://localhost:3001/board/create-post", {
        // axios.post("https://tennis365-api.herokuapp.com/board/create-post", {
        content,
        postTitle,
        username: authState.username,
        board_category: authState.isAdmin ? boardCategory : 1,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("글이 등록되었습니다");
        }
      });

    history.goBack();
    // history.push("/board/qna");
  };

  useEffect(() => {
    // console.log(postTitle);
    // setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    // setContent(
    //   JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    // );

    // console.log(content);
  }, [editorState]);
  return (
    <div className="create-post">
      <form onSubmit={submitPost}>
        <div className="create-title">
          <input
            className="title"
            type="text"
            placeholder="제목"
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          />
        </div>
        {authState.isAdmin ? (
          <select
            name="board_category"
            id="board_category"
            onChange={handleBoardCategory}
          >
            <option value="0">공지사항</option>
            <option value="1">상품QnA</option>
          </select>
        ) : null}
        <Editor
          editorState={editorState}
          toolbarClassName="post-toolbar"
          wrapperClassName="post-wrapper"
          editorClassName="post-editor"
          onEditorStateChange={onEditorStateChange}
          placeholder="내용을 작성해주세요."
        />
        <div className="post-btn">
          <Button text={"등록"} />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
