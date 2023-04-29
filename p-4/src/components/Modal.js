function Modal({ setModalOpen, setSelectedImage, selectedImage,generateVariations }) {

  function closeModal() {
    setModalOpen(false);
    setSelectedImage(null);
  }

  return (
    <div className="modal">
      <div onClick={closeModal} className="close-modal">X</div>
      <div className="img-container">
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="img to upload" />}
      </div>
	  <button onClick={generateVariations}>Generate</button>
    </div>
  );
}

export default Modal;
