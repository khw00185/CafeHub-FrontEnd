import style from "./title.module.css"
import Login from "../../asset/img/Login.svg"

export default function(){
    return (
        <>
            <header className={style.topBar}>
                <span className={style.cafeHub}>CafeHub</span>
                <button type="button" className={style.loginBtn}>
                    <span>로그인</span>
                    <img src={Login}></img>
                </button>
            </header>

        </>
    )
}