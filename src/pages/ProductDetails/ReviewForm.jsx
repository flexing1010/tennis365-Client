import Button from "../../components/Button/Button";
import "./ReviewForm.scss";

const ReviewForm = ({ postReview, handleReview }) => {
  return (
    <form className="review-form" onSubmit={postReview}>
      <textarea
        name="review-body"
        id=""
        cols="40"
        rows="10"
        placeholder="리뷰를 남겨주세요"
        onChange={handleReview}
      ></textarea>
      <Button text="리뷰 등록" />
    </form>
  );
};

export default ReviewForm;
