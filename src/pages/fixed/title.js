import style from "./title.module.css"

import Kakao from "../../asset/img/img_kakaotalk.png"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";


function Title({setSelectedId, token, setToken}){

    function TokenChecked(){
        return !token && 
        <div className={style.loginBtn} onClick={handleLogin}>
            <img src={Kakao} className={style.kakao}></img>
            <span className={style.loginText}>로그인</span>
        </div>
    }

    const redirect = (redirectUrl) => {
        window.location.href = `${redirectUrl}`;

    }


    const handleLogin = () => {
        axios.get(`http://localhost:8080/api/member/login`)
        .then(response => {
            redirect(response.data)
            console.log(response.data)
            setToken(true)
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    const handleClick = () => {
        setSelectedId(1);
      }
    return (
        <>
            <header className={style.topBar}>
                <Link to="/" onClick={handleClick}><span className={style.cafeHub}>CafeHub</span></Link>
                <TokenChecked/>
            </header>

        </>
    )
}
export default Title;