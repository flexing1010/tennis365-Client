import { useEffect, useState } from "react";
import "./Announcement.scss";
import MessageBoard from "../../components/MessageBoard/MessageBoard";
import { useAxios } from "../../hooks/useAxios";

import Button from "../../components/Button/Button";
import { useHistory } from "react-router";
const Announcement = () => {
  const [announcementPost, setAnnouncementPost] = useState([]);

  let history = useHistory();
  const { response } = useAxios({
    method: "get",
    url: `/board/announcement`,
  });

  const createAnnouncementBtn = () => {
    history.push("/board/create-post");
  };

  useEffect(() => {
    setAnnouncementPost(response);
  }, [response]);

  return (
    <main className="announcement">
      <header>
        <h1>공지사항</h1>
      </header>
      <MessageBoard
        messageList={announcementPost}
        historyUrl={`/board/view-post/`}
      />
      <div className="write-a-post-button">
        <Button text={"글쓰기"} handleBtnClick={createAnnouncementBtn} />
      </div>
    </main>
  );
};

export default Announcement;
