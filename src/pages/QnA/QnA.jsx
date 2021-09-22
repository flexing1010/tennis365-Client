import "./QnA.scss";
import MessageBoard from "../../components/MessageBoard/MessageBoard";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../Context";
import { useHistory } from "react-router";

const QnA = () => {
  window.reactTimestamp = Date.now();
  const [qnaPost, setQna] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  const { response } = useAxios({
    method: "get",
    url: `/board/qna`,
  });

  const createPostBtn = () => {
    if (authState.status === false) {
      history.push("/login");
      alert("글을 등록하려면 로그인하셔야 합니다");
    } else {
      history.push("/board/create-post");
    }
  };

  useEffect(() => {
    setQna(response);
  }, [response]);
  // useEffect(() => {
  //   console.log(window.reactTimestamp);
  //   setQna(response);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [window.reactTimestamp]);

  return (
    <main className="qna">
      <header>
        <h1>QnA</h1>
      </header>
      <MessageBoard messageList={qnaPost} historyUrl={`/board/view-post/`} />
      <div className="write-a-post-button">
        <Button text={"글쓰기"} handleBtnClick={createPostBtn} />
      </div>
    </main>
  );
};

export default QnA;
