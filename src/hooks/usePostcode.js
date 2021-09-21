import { useState } from "react";

const usePostcode = () => {
  let [fullAddress, setFullAddress] = useState("");

  const handleComplete = (data) => {
    // data.preventDefault();
    fullAddress = data.address;
    let extraAddress = "";

    if (data.userSelectedType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    } else {
      fullAddress = data.jibunAddress;
    }
    setFullAddress(fullAddress);
    console.log(fullAddress);
  };
  return [fullAddress, setFullAddress, handleComplete];
};

export default usePostcode;
