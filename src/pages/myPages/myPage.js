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
import BasicImg from "../../asset/img/img_basicUserPhoto.png"
import Loading from '../../components/loading';
import { KakaoLogin } from '../../components/kakaoLogins/kakaoLogin';



function MyPage() {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('accessToken')
    const [userNickname, setUserNickname] = useState(userData.nickname);
    const [userProfileImg, setUserProfileImg] = useState(BasicImg);
    const [change, setChange] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem('accessToken') === null) {
            KakaoLogin();
        }
        axios.get(`${process.env.REACT_APP_APIURL}/api/auth/mypage`, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => {
                setUserData(res.data.data)
                setUserNickname(res.data.data.nickname);
                setUserProfileImg(res.data.data.profileImg || BasicImg);
                console.log(res)
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
    }, [change]);

    const handleLogout = () => {
        axios.post(`${process.env.REACT_APP_APIURL}/api/auth/logout`, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
    }
    const profileUpdate = async () => {
        const formData = new FormData();
        formData.append("nickname", userNickname);
        if (userProfileImg instanceof File) {
            formData.append("profileImg", userProfileImg);
        }
        {/*formData.append("nickname", new Blob([JSON.stringify(userNickname)], { type: "application/json" }));
        if (userProfileImg.length > 0) {
            formData.append("profileImg", userProfileImg)
        }*/}
        axios.post(`${process.env.REACT_APP_APIURL}/api/auth/mypage`, formData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(res => {
                console.log("Update success");
                setChange(!change)
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
    }

    const handleChange = (event) => {
        setUserNickname(event.target.value);
    };
    const profileImgUpdate = (event) => {
        setUserProfileImg(event.target.file);
        profileUpdate();
    }
    const userNicknameUpdate = () => {
        profileUpdate();
    }

    if (!userData) {
        return <Loading />
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
                                <Icon_logout className={style.logout} />
                            </button>
                        </article>

                        <article className={style.photoArti}>
                            <img src={userProfileImg} className={style.photo}></img>
                            <label for="file" className={style.photoAltWrapper}>
                                <Icon_camera className={style.photoAlt} />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={profileImgUpdate}
                                className={style.fileInput}
                                accept="image/jpg,image/png,image/jpeg"
                            />

                        </article>

                        <article className={style.container}>
                            <article className={style.nicknameArti}>
                                <div className={style.nickDiv}>
                                    <Icon_nickname className={style.nicknameIcon} />
                                    <input type="text" value={userNickname} className={style.nickText} onChange={handleChange}></input>
                                </div>
                                <img src={NicknameArti} className={style.nicknameArtiIcon} onClick={userNickname.length > 1 ? userNicknameUpdate : {}} />
                            </article>

                            <article className={style.emailArti}>
                                <Icon_mail className={style.nicknameIcon} />
                                <input type="text" value={userData.email} className={style.emailText} readOnly></input>
                            </article>
                        </article>
                    </article>

                    <ul className={style.ulList}>
                        {myList.map((data) => (<MyPagelist key={data.id} props={data} />))}
                    </ul>
                </main>
            </div>
        </>
    )
}

export default MyPage;



const myList = [
    { id: 1, src: MyReview, title: "내 리뷰" },
    { id: 2, src: MyComment, title: "내 댓글" },
    { id: 5, src: GoodBye, title: "회원탈퇴" },
    { id: 6, src: MyAsk, title: "문의하기" }
]

function MyPagelist({ props }) {
    console.log(props.src)
    return (
        <li className={style.flexLine}>
            <div className={style.imgTitleBox}>
                <img src={props.src} className={style.img}></img>
                <span className={style.text}>{props.title}</span>
            </div>
            <FontAwesomeIcon className={style.imgV} icon={faChevronRight} />
        </li>
    )
}