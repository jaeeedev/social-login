import { useEffect } from "react";
import { SetRecoilState } from "recoil";
import modalState from "../../atom/modalState";
import styled from "styled-components";

const Modal = () => {
  const [modal, setModal] = SetRecoilState(modalState);

  //   useEffect(() => {
  //     if (modal.visible) {
  //       setTimeout(() => {
  //         setModal({
  //           ...modalState,
  //           visible: false,
  //         });
  //       }, 1500);
  //     }
  //   }, [modal.visible, setModal]);

  return (
    <div>
      <StyledModal>가나다라마ㅏㅇㅇㅇ</StyledModal>
    </div>
  );
};

const StyledModal = styled.div`
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
  background: #333;
  color: white;
`;

export default Modal;
