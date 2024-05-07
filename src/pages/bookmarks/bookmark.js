import styled from "../../styles/GlobalStyle.module.css";
import style from "../../styles/CafeListStyle.module.css";
import styles from "./bookmark.module.css"
import img_bookmark_bg from "../../asset/img/img_bookmark_bg.png";
import img_deerSweetLab from "../../asset/img/img_deerSweetLab.png";
import img_star from "../../asset/img/img_star.png"
import { ReactComponent as Icon_bookmark } from "../../asset/icon/icon_bookmark.svg"
import { ReactComponent as Icon_like } from "../../asset/icon/icon_like.svg"
import { ReactComponent as Icon_notLike } from "../../asset/icon/icon_notLike.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Bookmark(){
    return (
        <>
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>
                    <article className={style.containerWrapper}>
                        <img src={img_bookmark_bg} className={style.imgBg}/>
                        <article className={style.textContainer}>
                            <Icon_bookmark fill="white" className={style.icon}/>
                            <span className={style.textOnBg}>북마크 카페 리스트</span>
                        </article>
                    </article>

                    <ul>
                        {dataList.map((data) => (<BookmarkList key={data.cafeId} props={data}/>))}
                    </ul>
                </main>
            </div>
        </>
    )
}
export default Bookmark;


const dataList = [
    {cafeId:1, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:31, like:true},
    {cafeId:2, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:32, like:true},
    {cafeId:3, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:33, like:true},
    {cafeId:4, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:34, like:true},
    {cafeId:5, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:31, like:true},
    {cafeId:6, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:32, like:true},
    {cafeId:7, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:33, like:true},
    {cafeId:8, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:34, like:true}
    ];

function BookmarkList({props}){
    const [like, setLike] = useState(props.like);

    const changeColor = () => {
        setLike(!like);
    }

    const likeColor =() => {
        const Like = like ? Icon_like : Icon_notLike;
        return (
            <div className={style.like} onClick={changeColor}>
                <Like fill={like ? "#FF4F4F" : "#FFF"} />
            </div>
        )
    }
    const navigate = useNavigate();

    const func = () => {
        navigate('/CafeDetail')
    }
    return (  
        <div className={style.flexLine}>
            <img className={style.cafeImg} src={props.cafePhotoUrl} style={{cursor:'pointer'}} onClick={func}></img>
            <div className={style.CafeTextContainer}>
                <div  onClick={func} style={{cursor:'pointer'}}>
                    <span className={style.cafeTitle}>{props.cafeName}</span>
                    <span className={style.cafeTheme}>{props.cafeTheme}</span>
                    <div className={style.starRatingReview}>
                        <img className={style.img_star} src={img_star}></img>
                        <span className={style.cafeRating}>{props.cafeRating} ({props.cafeReviewNum})</span>
                    </div>
                </div>
                <div className={styles.likeContainer} style={{cursor:'pointer'}}>
                    {likeColor()}
                </div>
            </div>
        </div>
    )
}