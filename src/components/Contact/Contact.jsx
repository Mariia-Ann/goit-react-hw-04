import { IoPersonSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import style from "./Contact.module.css";

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <>
      <div className={style.contact}>
        <p className={style.text}>
          <IoPersonSharp className={style.icon} />
          {name}
        </p>
        <p className={style.text}>
          <BsTelephoneFill className={style.icon} />
          {number}
        </p>
      </div>
      <button className={style.btnDelete} onClick={() => onDelete(id)}>
        Delete
      </button>
    </>
  );
};

export default Contact;
