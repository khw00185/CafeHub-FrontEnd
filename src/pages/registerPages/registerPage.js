import style from "./registerPage.module.css"
import Photo from '../../asset/img/img_photo.png';
import CameraAlt from '../../asset/img/img_cameraAlt.png';



export default function(){
    return (
        <> 
            <article className={style.textContainer}>
                <span>회원가입</span>
            </article>

            <article className={style.inputContainer}>
                <article className={style.photoArti}>
                    <img src={Photo} className={style.photo}></img>
                    <img src={CameraAlt} className={style.photoAlt}></img>
                </article>
            </article>
        </>
    )
}