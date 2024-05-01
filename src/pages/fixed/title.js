import style from "./title.module.css"

import Kakao from "../../asset/img/img_kakaotalk.png"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function Title({setSelectedId}){
    const [hastoken, setHastoken] = useState(0);

    function TokenChecked(){
        return !hastoken && 
        <button type="button" className={style.loginBtn}>
            <img src={Kakao} className={style.kakao}></img>
            <span className={style.loginText}>로그인</span>
        </button>
    }

    const handleClick = () => {
        setSelectedId(1);
      }
    return (
        <>
            <header className={style.topBar}>
                <Link to="/" onClick={handleClick}><span className={style.cafeHub}>CafeHub</span></Link>
                <Link to="/MyPage">
                    <TokenChecked/>
                </Link>
            </header>

        </>
    )
}
export default Title;