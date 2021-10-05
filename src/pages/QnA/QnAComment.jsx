import "./QnAComment.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import DeleteItem from "../../components/Admin/DeleteItem";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { AuthContext } from "../../Context";
import { useAxios } from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";
import ReviewForm from "../ProductDetails/ReviewForm";
// import Reviews from "../ProductDetails/Reviews";

const QnAComment = () => {
  const { authState } = useContext(AuthContext);
  const [modalOpen, openModal, closeModal] = useModal();
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState([]);

  let { id } = useParams();

  const { response } = useAxios({
    method: "get",
    url: `/board/view-post/${id}/comment`,
  });

  const handleCommentBtn = () => {
    openModal();
  };

  const handleCommentBody = (e) => {
    setCommentBody(e.target.value);
  };

  const postComment = (e) => {
    e.preventDefault();
    let createdAt = new Date();
    createdAt =
      createdAt.getFullYear() +
      "-" +
      (createdAt.getMonth() + 1) +
      "-" +
      createdAt.getDate();

    closeModal();

    axios
      .post(
        `https://tennis365-api.herokuapp.com/board/view-post/${id}/comment`,
        {
          commentBody,
          createdAt,
          username: authState.username,
        }
      )
      .then((response) => {
        // setTemporaryId(response.data);
        const newReview = {
          comment_body: commentBody,
          createdAt,
          username: authState.username,
          id: response.data,
        };
        setComments([newReview, ...comments]);
        // console.log(newReview, "newreview");
      });
  };

  const filterReviews = (targetId) => {
    setComments(comments.filter((item) => item.id !== parseInt(targetId)));
    // console.log(itemList, "filter");
  };

  useEffect(() => {
    if (response) {
      setComments(response);
    }
  }, [response]);

  return (
    <div className="comment-container">
      <div className="comments__top">
        <h2>Comment</h2>
        {authState.status && (
          <Button text="댓글작성" handleBtnClick={handleCommentBtn} />
        )}
      </div>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <div className="comment-box" key={comment.id}>
              <p>{comment.comment_body}</p>
              <DeleteItem
                closeModal={null}
                filterItemList={filterReviews}
                targetId={comment.id}
                owner={comment.username}
                text={"리뷰 삭제"}
                url={`https://tennis365-api.herokuapp.com/board/view-post/${id}/comment`}
              />
              <ul className="review-box__info">
                <li>
                  <small className="review-box__info--title">작성자</small>
                  <span className="review-box__info--value">
                    {comment.username}
                  </span>
                </li>
                <li>
                  <small className="review-box__info--title">작성일</small>
                  <span className="review-box__info--value">
                    {comment.createdAt}
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      <Modal open={modalOpen} close={closeModal} header="댓글작성">
        <ReviewForm
          close={closeModal}
          postReview={postComment}
          handleReview={handleCommentBody}
        />
      </Modal>
    </div>
  );
};

export default QnAComment;
