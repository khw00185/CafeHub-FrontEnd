import styled from "../../styles/GlobalStyle.module.css"
import style from "./cafeDetail.module.css"
import  { ReactComponent as Icon_pin} from "../../asset/icon/icon_pin.svg"
import  { ReactComponent as Icon_clock} from "../../asset/icon/icon_clock.svg"
import  { ReactComponent as Icon_call} from "../../asset/icon/icon_call.svg"
import { ReactComponent as Icon_like } from "../../asset/icon/icon_like.svg"
import { ReactComponent as Icon_notLike } from "../../asset/icon/icon_notLike.svg"
import { ReactComponent as Icon_go } from "../../asset/icon/icon_go.svg"
import { ReactComponent as Icon_comment } from "../../asset/icon/icon_comment.svg"
import img_star from "../../asset/img/img_star.png"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import WriteReview from '../../asset/icon/icon_nicknameAlt.png';
import axios from "axios"
import Rating from "../../components/Rating"
import ReviewList from "../../components/ReviewList"


function CafeDetail(){
    const navigate = useNavigate();
    const location = useLocation();
    const cafeId = location.state?.cafeId;
    
    const [cafeData, setCafeData] = useState({
        cafePhotoUrl: "",
        cafeName: "",
        cafeTheme: "",
        cafeRating: "",
        cafeReviewCnt: "",
        cafeAddress: "",
        cafePhone: "",
        cafeOperationHour: "",
        bestMenuList: [],
        bestReviewList: [],
        bookmarkChecked: false
    });

    const pageLoad = () => {        
        axios.get(`http://localhost:8080/cafe/${cafeId}`)
        .then(response => {
            setCafeData(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    useEffect(() => {
        if (cafeId) {
            pageLoad();
        }
    }, [cafeId]);

    const [cafeLike, setCafeLike] = useState(cafeData.bookmarkChecked);
    const changeCafeLikeColor = () => {
        setCafeLike(!cafeLike);
    }
    const cafeLikeColor =() => {
        const Like = cafeLike ? Icon_like : Icon_notLike;
        return (
            <div className={style.likeContainer} onClick={changeCafeLikeColor}>
            <Like fill={cafeLike ? "#FF4F4F" : "#FFF"} className={style.like}/>
            </div>
        )
    }

    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        if (initialized) {
        const data = {
            cafeId: cafeId,
            bookmarkChecked: cafeLike
        };

        console.log("Sending data to server:", data); // 콘솔에 데이터를 출력하여 확인
        axios.post(`http://localhost:8080/bookmark`, data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
            setInitialized(true);
        }
    }, [cafeLike]);


    const moveWriteReview = () => {
        navigate('/WriteReview')
    }

    const moveMoreMenu = () => {
        navigate('/Menu', {state: {cafeId : cafeId}});
    }
    const moveMoreReview = () => {
        navigate('/Review', {state:{cafeId : cafeId}})
    }

    

    return(
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>
                    <article className={style.cafeInfo}>
                        <img className={style.cafeInfoBg} src={cafeData.cafePhotoUrl}></img>

                        <div className={style.cafeInfoTitleContainer}>
                            {cafeLikeColor()}
                            <div className={style.cafeInfoTitleLike}>
                                <span className={style.cafeInfoTitle}>{cafeData.cafeName}</span>
                            </div>
                            <div className={style.cafeInfoPlus}>
                                <span>{cafeData.cafeTheme}</span>
                                <img src={img_star} className={style.reviewStar}></img>
                                <span style={{marginLeft:'2px'}}>별점<span style={{color: 'red', marginLeft:'3px'}}>{cafeData.cafeRating}</span></span>
                                <span style={{marginLeft: '15px'}}>리뷰</span>
                                <span style={{color: 'red', marginLeft:'3px'}}>{cafeData.cafeReviewCnt}</span>
                            </div>

                        </div>
                        <div className={style.cafeInfoDetailContainer}>
                            <div className={style.cafeInfoDetailWrapper}>
                                <span className={style.detailInfo}>상세 정보</span>
                                <div className={style.reviewHRContainer}><hr className={style.reviewHR}/></div>

                                <div className={style.iconTextContainer}>
                                    <div>
                                        <Icon_pin className={style.icon_detail} style={{height:'13px'}}/>
                                        <span className={style.detailText}>{cafeData.cafeAddress}</span>
                                    </div>
                                    <div className={style.iconTextWrapper}>
                                        <Icon_call className={style.icon_detail} style={{height:'13px'}}/>
                                        <span className={style.detailText}>{cafeData.cafePhone}</span>
                                    </div>
                                    <div className={style.iconTextWrapper}>
                                        <Icon_clock className={style.icon_detail} style={{height:'13px'}}/>
                                        <span className={style.detailText}>{cafeData.cafeOperationHour}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className={style.cafeMenuContainer}>
                        <span className={style.cafeMenuTextMenu}>대표 메뉴</span>
                        <ul className={style.bestMenuList}>
                            {cafeData.bestMenuList.map((data, index)=>(<BestMenuList key={index} props={data}/>))}
                        </ul>
                        <div className={style.menuPlus}>
                            <span onClick={moveMoreMenu}>메뉴 더보기</span>
                            <Icon_go fill="rgb(104, 104, 104)" style={{width:'9px', height:'9px', marginLeft:'2px'}}/>
                        </div>
                    </article>

                    <article className={style.cafeBestReviewContainer}>
                        <div className={style.cafeBestReviewReviewCnt}>
                            <span>리뷰</span>
                            <span style={{color: 'red', marginLeft:'3px'}}>{cafeData.cafeReviewCnt}</span>
                        </div>
                        <div className={style.cafeBestReviewRatingContainer}>
                            <span className={style.cafeRatingFontSize}>{cafeData.cafeRating}점</span>
                            <Rating rating={cafeData.cafeRating}/>
                            <div className={style.writeReview} onClick={moveWriteReview}>
                                <img src={WriteReview} className={style.reviewWriteBtn} style={{width:'10px', height:'10px'}}></img>
                                <span style={{marginLeft:'2px'}}>리뷰작성</span>
                            </div>
                        </div>
                        <div className={style.reviewHRContainer}><hr className={style.reviewHR}/></div>
                        <ul>
                            {cafeData.bestReviewList.map((data)=>(<ReviewList key={data.reviewId} props={data}/>))}
                        </ul>
                        <div className={style.reviewPlus}>
                            <span onClick={moveMoreReview}>리뷰 더보기</span>
                            <Icon_go fill="rgb(104, 104, 104)" style={{width:'9px', height:'9px', marginLeft:'2px'}}/>
                        </div>

                    </article>


                </main>
            </div>
    )
}
export default CafeDetail;




function BestMenuList({props}){

    return (
        <div className={style.flexLineWrapper}>
            <li className={style.flexLine}>
                <span>{props.name}</span>
                <span>{props.price}</span>
            </li>
            <hr style={{marginTop:'15px'}}/>
        </div>
    )
}
