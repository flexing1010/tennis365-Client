import "./PostItemForm.scss";

const PostItemForm = ({
  handleInputChange,
  handleItemSubmit,
  handleFiles,
  handleCoverImg,
}) => {
  return (
    <form
      encType="multipart/form-data"
      method="post"
      className="post-item__form"
      onSubmit={(e) => handleItemSubmit(e)}
    >
      <div className="item__specs">
        <div>
          <label htmlFor="상품명">상품명</label>
          <input
            type="text"
            name="product_name"
            id="상품명"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="브랜드">브랜드</label>
          <select
            name="brand"
            id="브랜드"
            onChange={handleInputChange}
            required
          >
            <option></option>
            <option value="1">1.Babolat</option>
            <option value="2">2.Wilson</option>
            <option value="3">3.Head</option>
            <option value="4">4.Yonex</option>
            <option value="5">5.Dunlop</option>
            <option value="6">6.Prince</option>
            <option value="7">7.TecniFibre</option>
            <option value="8">8.ProKennex</option>
          </select>
        </div>
        <div>
          <label htmlFor="무게">무게</label>
          <input
            type="number"
            min="200"
            max="400"
            name="weight"
            id="무게"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="밸런스">밸런스</label>
          {/* <input type="text" name="헤드사이즈" id="헤드사이즈" /> */}
          <select
            name="balance"
            id="밸런스"
            onChange={handleInputChange}
            required
          >
            <option></option>
            <option value="헤드 라이트">헤드 라이트</option>
            <option value="헤드 헤비">헤드 헤비</option>
            <option value="이븐(Even)">이븐</option>
          </select>
        </div>
        <div>
          <label htmlFor="스트링패턴">스트링패턴</label>
          {/* <input type="text" name="스트링패턴" id="스트링패턴" /> */}
          <select
            name="string_pattern"
            id="스트링패턴"
            onChange={handleInputChange}
            required
          >
            <option></option>
            <option value="16x19">16x19</option>
            <option value="16x18">16x18</option>
            <option value="18x20">18x20</option>
          </select>
        </div>
        <div>
          <label htmlFor="헤드사이즈">헤드사이즈</label>
          <input
            type="number"
            min="90"
            max="120"
            name="head_size"
            id="헤드사이즈"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="길이">길이</label>
          <input
            type="number"
            min="18"
            max="30"
            name="length"
            id="길이"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="그립사이즈">그립사이즈</label>
          <input
            type="text"
            name="grip_size"
            id="그립사이즈"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="가격">가격</label>
          <input
            type="number"
            name="price"
            id="가격"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="수량">수량</label>
          <input
            type="number"
            name="stock"
            id="수량"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="item__description">
        <textarea
          name="description"
          id="설명"
          cols="30"
          rows="10"
          onChange={handleInputChange}
          required
        ></textarea>
        <label htmlFor="coverImg">커버 이미지</label>
        <input
          type="file"
          name="coverImg"
          accept="image/*"
          className="cover-img-input"
          onChange={handleCoverImg}
          required
        />
        <label htmlFor="itemImgs">상품 이미지</label>
        <input
          type="file"
          name="itemImgs"
          accept="image/*"
          onChange={handleFiles}
          multiple
          required
        />
        <button>등록</button>
      </div>
    </form>
  );
};

export default PostItemForm;
