import styled from '../../styles/GlobalStyle.module.css';
import style from "./myPage.module.css"
import Photo from '../../asset/img/img_photo.png';
import NicknameArti from '../../asset/icon/icon_nicknameAlt.png';
import MyReview from '../../asset/icon/icon_myReview.png';
import MyComment from '../../asset/icon/icon_myComment.png';
import GoodBye from '../../asset/icon/icon_goodBye.png';
import MyAsk from '../../asset/icon/icon_myAsk.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Icon_logout } from "../../asset/icon/icon_logout.svg"
import { ReactComponent as Icon_camera } from "../../asset/icon/icon_camera.svg"
import { ReactComponent as Icon_mail } from "../../asset/icon/icon_mail.svg"
import { ReactComponent as Icon_nickname } from "../../asset/icon/icon_myPage.svg"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function MyPage({ token, setToken }){
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/auth/mypage`)
        .then(res => {
            console.log(res)
            setUserData(res.data.data)
        })
        .catch(error => {
            console.error('Error updating data: ', error);
        });
    },)

    const handleLogout=()=>{
        axios.post(`http://localhost:8080/api/auth/logout`)
        .then(res => {
            navigate("/")
            setToken(false);
        })
        .catch(error => {
            console.error('Error updating data: ', error);
        });
    }

    return (
        <>
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>
                    <article className={style.profile}>
                        <article className={style.profileInfoLogout}>
                            <span className={style.profileInfo}>프로필 정보</span>
                            <button type="button" className={style.logoutBtn} onClick={handleLogout}>
                                <span>로그아웃</span>
                                <Icon_logout className={style.logout}/>
                            </button>
                        </article>

                        <article className={style.photoArti}>
                            <img src={userData.memberImgUrl} className={style.photo}></img>
                            <div className={style.photoAltWrapper}>
                                <Icon_camera className={style.photoAlt}/>
                            </div>
                        </article>

                        <article className={style.container}>
                            <article className={style.nicknameArti}>
                                <div className={style.nickDiv}>
                                <Icon_nickname className={style.nicknameIcon}/>
                                <input type="text" placeholder={userData.nickname} className={style.nickText}></input>
                                </div>
                                <img src={NicknameArti} className={style.nicknameArtiIcon}></img>
                            </article>

                            <article className={style.emailArti}>
                                <Icon_mail className={style.nicknameIcon}/>
                                <input type="text" placeholder={userData.email} className={style.emailText}></input>
                            </article>
                        </article>
                    </article>

                    <ul className={style.ulList}>
                        {myList.map((data)=>(<MyPagelist key={data.id} props={data}/>))}
                    </ul>
                </main>
            </div>
        </>
    )
}

export default MyPage;



const myList = [
    {id:1, src:MyReview, title:"내 리뷰"},
    {id:2, src:MyComment, title:"내 댓글"},
    {id:5, src:GoodBye, title:"회원탈퇴"},
    {id:6, src:MyAsk, title:"문의하기"}
]

function MyPagelist({props}){
    console.log(props.src)
    return (
        <li className={style.flexLine}>
            <div className={style.imgTitleBox}>
                <img src={props.src} className={style.img}></img>
                <span className={style.text}>{props.title}</span>
            </div>
            <FontAwesomeIcon className={style.imgV} icon={faChevronRight}/>
        </li>
    )
}