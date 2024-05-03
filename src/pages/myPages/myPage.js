import styled from '../../styles/GlobalStyle.module.css';
import style from "./myPage.module.css"
import Login from "../../asset/img/Login.svg"
import Photo from '../../asset/img/img_photo.png';
import CameraAlt from '../../asset/img/img_cameraAlt.png';
import Nickname from '../../asset/img/img_nickname.png';
import NicknameArti from '../../asset/icon/icon_nicknameAlt.png';
import MailOutline from '../../asset/img/img_mailOutline.png';
import MyReview from '../../asset/icon/icon_myReview.png';
import MyComment from '../../asset/icon/icon_myComment.png';
import GoodBye from '../../asset/icon/icon_goodBye.png';
import MyAsk from '../../asset/icon/icon_myAsk.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


function MyPage(){
    return (
        <>
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>
                    <article className={style.profile}>
                        <article className={style.profileInfoLogout}>
                            <span className={style.profileInfo}>프로필 정보</span>
                            <button type="button" className={style.logoutBtn}>
                                <span>로그아웃</span>
                                <img src={Login} className={style.logout}></img>
                            </button>
                        </article>

                        <article className={style.photoArti}>
                            <img src={Photo} className={style.photo}></img>
                            <img src={CameraAlt} className={style.photoAlt}></img>
                        </article>

                        <article className={style.container}>
                            <article className={style.nicknameArti}>
                                <div className={style.nickDiv}>
                                <img src={Nickname} className={style.nicknameIcon}></img>
                                <input type="text" placeholder="닉네임" className={style.nickText}></input>
                                </div>
                                <img src={NicknameArti} className={style.nicknameArtiIcon}></img>
                            </article>

                            <article className={style.emailArti}>
                                <img src={MailOutline} className={style.nicknameIcon}></img>
                                <input type="text" placeholder="ksng0185@naver.com" className={style.emailText}></input>
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