import ImageCard from "../ImageCard/ImageCard";
import style from "./ImageGallery.module.css";

const ImageGallery = ({items, openModal}) => {
  return (
    <ul className={style.list}>
	{items.map((image) => (
    <li key={image.id}>
      <ImageCard smallImg={image.urls.small} largeImg={image.urls.regular} description={image.alt_description} openModal={openModal} />
    </li>
  ))}
</ul>
  );
};

export default ImageGallery;