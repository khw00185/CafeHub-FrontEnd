import style from "./myPage.module.css"
import Login from "../../asset/img/Login.svg"
import Photo from '../../asset/img/img_photo.png';
import CameraAlt from '../../asset/img/img_cameraAlt.png';
import Nickname from '../../asset/img/img_nickname.png';
import NicknameArti from '../../asset/img/img_nicknameAlt.png';
import MailOutline from '../../asset/img/img_mailOutline.png';
import MyReview from '../../asset/img/img_myReview.png';
import MyComment from '../../asset/img/img_myComment.png';
import MyLike from '../../asset/img/img_myLike.png';
import ChangePW from '../../asset/img/img_changePW.png';
import GoodBye from '../../asset/img/img_goodBye.png';
import MyAsk from '../../asset/img/img_myAsk.png';
import V from '../../asset/img/img_v.png';



export default function(){
    return (
        <>
            <main className={style.profile}>
                <article className={style.profileInfoLogout}>
                    <span className={style.profileInfo}>프로필 정보</span>
                    <button type="button" className={style.logoutBtn}>
                        <span>로그아웃</span>
                        <img src={Login}></img>
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

                <ul className={style.ulList}>
                    {myList.map((data)=>(<MyPagelist key={data.id} props={data}/>))}
                </ul>

            </main>


        </>
    )
}

const myList = [
    {id:1, src:MyReview, title:"내 리뷰", arrow:V},
    {id:2, src:MyComment, title:"내 댓글", arrow:V},
    {id:3, src:MyLike, title:"좋아요한 리뷰", arrow:V},
    {id:4, src:ChangePW, title:"비밀번호 변경", arrow:V},
    {id:5, src:GoodBye, title:"회원탈퇴", arrow:V},
    {id:6, src:MyAsk, title:"문의하기", arrow:V}
]

function MyPagelist({props}){
    console.log(props.src)
    return (
        <li className={style.flexLine}>
            <div className={style.imgTitleBox}>
                <img src={props.src} className={style.img}></img>
                <span className={style.text}>{props.title}</span>
            </div>
            <img src={props.arrow} className={style.imgV}></img>
        </li>
    )
}