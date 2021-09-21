import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DaumPostcode from "react-daum-postcode";
import useModal from "../../hooks/useModal";
// import usePostcode from "../../hooks/usePostcode";
import Modal from "../Modal/Modal";
import "./AdressInput.scss";

const AddressInput = ({
  handleInputChange,
  handleComplete,
  fullAddress,
  address2,
}) => {
  const [modalOpen, openModal, closeModal] = useModal();
  // const [fullAddress, handleComplete] = usePostcode();

  return (
    <div className="address">
      <div className="address__icon">
        <FontAwesomeIcon className="fa-icon" icon={faMapMarkerAlt} />
      </div>
      <div className="address__input">
        <div className="find-address">
          <input
            readOnly
            type="text"
            name="address1"
            value={fullAddress || ""}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            주소찾기
          </button>
          <Modal open={modalOpen} close={closeModal} header="주소찾기">
            <DaumPostcode
              // autoClose={true}
              onComplete={(e) => {
                handleComplete(e);
                closeModal();
              }}
              style={{ height: 500 }}
            />
          </Modal>
        </div>
        <div className="detail-address">
          <input
            type="text"
            name="address2"
            placeholder="상세주소"
            value={address2 || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
