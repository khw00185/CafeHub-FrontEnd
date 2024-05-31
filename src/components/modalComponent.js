import ReactModal from "react-modal";
import style from "./modalComponent.module.css"

function ModalComponent({modalIsOpen, setModalIsOpen}) {
    const modalStyles = getModalStyles();

    return(
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            ariaHideApp={false}
            contentLabel="Pop up Message"
            shouldCloseOnOverlayClick={true}
            style={modalStyles}>
                <div className={style.modalWrapper}>
                    <span className={style.cafeHub}>CafeHub</span>
                    <span className={style.modalContent}>로그인 좀 해주십사하고</span>
                    <span className={style.modalContent}>모달창 띄웠습니다.</span>
                    <button className={style.modalBtn} onClick={() => setModalIsOpen(false)}>닫기</button>
                </div>
        </ReactModal>
    )

}

export default ModalComponent;

const getModalStyles = () => ({
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      width: "100vw",
      height: "100vh",
      position: 'fixed',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: '5'
    },
    content: {
      width: "360px",
      height: "180px",
      zIndex: '5',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto"
    }
  });