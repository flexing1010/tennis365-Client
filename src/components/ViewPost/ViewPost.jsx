import "./ViewPost.scss";
import { useHistory, useParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";

import { Editor } from "@nick4fake/react-draft-wysiwyg";
import { useContext, useEffect, useState } from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { AuthContext } from "../../Context";
import axios from "axios";
import QnAComment from "../../pages/QnA/QnAComment";

const ViewPost = () => {
  const [post, setPost] = useState({});
  const [body, setBody] = useState("");
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  const { response } = useAxios({
    method: "get",
    url: `/board/view-post/${id}`,
  });

  const toEditPost = () => {
    history.push(`/board/view-post/${id}/edit`);
  };

  const deletePost = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      axios
        .delete(
          `https://tennis365-api.herokuapp.com/board/view-post/${id}/delete`,
          {
            data: {
              id,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            history.push("/board/qna");
          }
        });
    }
  };

  useEffect(() => {
    if (response) {
      setBody(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(response[0].body))
        )
      );
      setPost(response[0]);
      console.log(post);
    }
  }, [response]);

  return (
    <div className="view-post">
      <div className="post">
        <header className="view-post__header">
          <div className="view-post__header--col1">
            <h2 className="view-post__header--title">{post.title}</h2>
            <div className="view-post__header--info">
              <div className="info-head">
                작성자
                <span className="post-owner"> {post.username}</span>
              </div>
              <span className="info-head">{` 작성일 ${new Date().getFullYear()}`}</span>
            </div>
          </div>
          <div className="view-post__header--col2">
            {post.username === authState.username && (
              <div className="view-post__header--btns">
                <button className="post-delete-btn" onClick={deletePost}>
                  삭제하기
                </button>
                <button className="post-edit-btn" onClick={toEditPost}>
                  수정하기
                </button>
              </div>
            )}
          </div>
        </header>
        <div className="view-post__body font-face-BBTreeL">
          <Editor
            editorState={body}
            readOnly={true}
            toolbarClassName={"readonly-toolbar"}
          />
        </div>
      </div>
      {post.board_category !== 0 && <QnAComment />}
    </div>
  );
};

export default ViewPost;
