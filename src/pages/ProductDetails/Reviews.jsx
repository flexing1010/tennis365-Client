import "./Reviews.scss";

import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ReviewForm from "./ReviewForm";
import { useAxios } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context";
import DeleteItem from "../../components/Admin/DeleteItem";

const Reviews = () => {
  const { authState } = useContext(AuthContext);
  const [modalOpen, openModal, closeModal] = useModal();
  const [reviewBody, setReviewBody] = useState("");
  const [reviews, setReviews] = useState([]);

  let { id } = useParams();

  const { response } = useAxios({
    method: "get",
    url: `/view/${id}/review`,
  });

  const handleReviewBtn = () => {
    openModal();
  };

  const handleReview = (e) => {
    setReviewBody(e.target.value);
  };

  const postReview = (e) => {
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
      .post(`https://tennis365-api.herokuapp.com/view/${id}/review`, {
        reviewBody,
        createdAt,
        username: authState.username,
      })
      .then((response) => {
        // setTemporaryId(response.data);
        const newReview = {
          review_body: reviewBody,
          createdAt,
          username: authState.username,
          id: response.data,
        };
        setReviews([newReview, ...reviews]);
      });
  };

  const filterReviews = (targetId) => {
    setReviews(reviews.filter((item) => item.id !== parseInt(targetId)));
    // console.log(itemList, "filter");
  };

  useEffect(() => {
    if (response) {
      setReviews(response);
    }
  }, [response]);

  return (
    <div className="reviews-container">
      <div className="reviews__top">
        <h2>상품후기</h2>
        {authState.status && (
          <Button text="리뷰작성" handleBtnClick={handleReviewBtn} />
        )}
      </div>
      <div className="reviews">
        {reviews.map((review) => {
          return (
            <div className="review-box" key={review.id}>
              <p>{review.review_body}</p>
              <DeleteItem
                closeModal={null}
                filterItemList={filterReviews}
                targetId={review.id}
                text={"리뷰 삭제"}
                url={`https://tennis365-api.herokuapp.com/view/${id}/review`}
              />
              <ul className="review-box__info">
                <li>
                  <small className="review-box__info--title">작성자</small>
                  <span className="review-box__info--value">
                    {review.username}
                  </span>
                </li>
                <li>
                  <small className="review-box__info--title">작성일</small>
                  <span className="review-box__info--value">
                    {review.createdAt}
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      <Modal open={modalOpen} close={closeModal} header="리뷰작성">
        <ReviewForm
          close={closeModal}
          postReview={postReview}
          handleReview={handleReview}
        />
      </Modal>
    </div>
  );
};

export default Reviews;
