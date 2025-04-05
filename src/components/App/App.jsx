import style from "./App.module.css";

import { fetchImagesWithTopic } from "../../images-api";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";



const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const loadMoreBtnRef = useRef(null);

const handleSearch = async (newTopic) => {
  setTopic(newTopic);
  setPage(1);
  setImages([]);
  setError(false);
  setLoading(true);
try {
  const data = await fetchImagesWithTopic(newTopic, 1);
  setImages(data.images);
  setLoadMore(data.loadMore);
} catch (error) {
  setError(true);
} finally {
  setLoading(false);
}
};

const loadMoreImages = async () => {
  if(!loadMore) return;

  setLoading(true);
  try {
    const nextPage = page + 1;
    const data = await fetchImagesWithTopic(topic, nextPage);
    setImages((prevImages) => 
    [...prevImages, ...data.images]);
    setLoadMore(data.loadMore);
    setPage(nextPage);

    // if (loadMoreBtnRef.current) {
    //   loadMoreBtnRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    // }
  } catch (error) {
    setError(true);
  } finally {
    setLoading(false);
  }
}

const openModal = (imageUrl, description) => {
  setModalImageUrl(imageUrl);
  setModalDescription(description);
  setModalOpen(true);
}

const closeModal = () => {
  setModalOpen(false);
  setModalImageUrl("");
  setModalDescription("");
}

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [closeModal]);

// useEffect(() => {
//   if (images.length > 0 && loadMoreBtnRef.current) {
//     loadMoreBtnRef.current.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   }
// }, [images]);

  return (
    <div className={style.section}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} openModal={openModal} />}
      {loadMore && !loading && <LoadMoreBtn ref={loadMoreBtnRef} onClick={loadMoreImages} />}
      {modalOpen && <ImageModal isOpen={openModal} onClose={closeModal} imageUrl={modalImageUrl} description={modalDescription} />}
    </div>
  );
};

export default App;
