import style from "./ImageCard.module.css"
const ImageCard = ( {smallImg, largeImg, description, openModal}) => {
  return (
		<div>
		  <img className={style.img} src={smallImg} alt={description} onClick={() => openModal(largeImg, description)} />
		</div>
  )
}

export default ImageCard;