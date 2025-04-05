import Modal from "react-modal";
import style from "./ImageModal.module.css"

const ImageModal = ({ isOpen, imageUrl, onClose, description }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={style.content}
      overlayClassName={style.overlay}
    >
      <div>
        <img className={style.img} src={imageUrl} alt={description} />
      </div>
    </Modal>
  );
};

export default ImageModal;
