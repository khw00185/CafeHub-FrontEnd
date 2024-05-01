import styled from "../../styles/GlobalStyle.module.css"
import style from "./registerPage.module.css"
import Photo from '../../asset/img/img_photo.png';
import CameraAlt from '../../asset/img/img_cameraAlt.png';
import NavBar from "../fixed/navBar";
import Title from "../fixed/title";

function RegisterPage(){
    return (
        <> 
            <div className={style.page_wrapper}>
                <Title/>
                <main className={styled.main_container}>
                    <article className={style.textContainer}>
                        <span>회원가입</span>
                    </article>

                    <article className={style.inputContainer}>
                        <article className={style.photoArti}>
                            <img src={Photo} className={style.photo}></img>
                            <img src={CameraAlt} className={style.photoAlt}></img>
                        </article>
                    </article>
                </main>
                <NavBar/>
            </div>
        </>
    )
}

export default RegisterPage;