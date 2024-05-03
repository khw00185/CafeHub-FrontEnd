import styled from "../../styles/GlobalStyle.module.css"
import style from "./cafeDetail.module.css"
import CafeImgBg from "../../asset/img/img_deerSweetLab.png"
import  { ReactComponent as Icon_pin} from "../../asset/icon/icon_pin.svg"
import  { ReactComponent as Icon_clock} from "../../asset/icon/icon_clock.svg"
import  { ReactComponent as Icon_call} from "../../asset/icon/icon_call.svg"
import { ReactComponent as Icon_like } from "../../asset/icon/icon_like.svg"
import { ReactComponent as Icon_notLike } from "../../asset/icon/icon_notLike.svg"
import { ReactComponent as Icon_go } from "../../asset/icon/icon_go.svg"
import { ReactComponent as Icon_comment } from "../../asset/icon/icon_comment.svg"
import img_star from "../../asset/img/img_star.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import WriteReview from '../../asset/icon/icon_nicknameAlt.png';


function CafeDetail(){
    const navigate = useNavigate();

    const [cafeLike, setCafeLike] = useState(cafeData.bookmarkChecked);
    const changeCafeLikeColor = () => {
        setCafeLike(!cafeLike);
    }
    const cafeLikeColor =() => {
        const Like = cafeLike ? Icon_like : Icon_notLike;
        return (
            <div className={style.likeContainer} onClick={changeCafeLikeColor}>
            <Like fill={cafeLike ? "#FF4F4F" : "#FFF"} className={style.like} />
            </div>
        )
    }

    const moveWriteReview = () => {
        navigate('/WriteReview')
    }

    const moveMoreMenu = () => {
        navigate('/Menu')
    }
    const moveMoreReview = () => {
        navigate('/Review')
    }

    return(
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>
                    <article className={style.cafeInfo}>
                        <img className={style.cafeInfoBg} src={cafeData.cafePhotoUrl}></img>

                        <div className={style.cafeInfoTitleContainer}>
                            <div className={style.cafeInfoTitleLike}>
                                <span className={style.cafeInfoTitle}>{cafeData.cafeName}</span>
                                {cafeLikeColor()}
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
                        <span className={style.cafeMenuTextMenu}>메뉴</span>
                        <ul className={style.bestMenuList}>
                            {cafeData.bestMenuList.map((data)=>(<BestMenuList key={data.bestMenuId} props={data}/>))}
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
                            {cafeData.bestReviewList.map((data)=>(<BestReviewList key={data.reviewId} props={data}/>))}
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

function BestReviewList(props){
    //리뷰가 3줄이 넘어가면 더보기 띄우기
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const reviewContent = props.props.reviewContent;
    const reviewContentLines = reviewContent.match(/.{1,30}/g);
    const displayContentLines = showMore ? reviewContentLines : reviewContentLines.slice(0, 3);
    
    //
    const [reviewLike, setReviewLike] = useState(props.props.reviewChecked);
    const [reviewLikeCnt, setReviewLikeCnt] = useState(props.props.likeCnt);
    
    const changeReviewLikeColor = () => {
        setReviewLike(!reviewLike);
        setReviewLikeCnt(reviewLike ? reviewLikeCnt-1 : reviewLikeCnt+1) //이거 왜 반대로 해야 원하는 동작이 이루어지지..?
    }
    const CheckReviewLike = () => {
        const Like = reviewLike ? Icon_like : Icon_notLike;
        return ( <Like fill= {reviewLike ? "#FF4F4F" : "#FFF"} style={{width: '14px', height: '12px', marginRight:'5px', cursor: 'pointer'}} onClick={changeReviewLikeColor}/> )
    }


    const navigate = useNavigate();
    const moveCommentPage = () => {
        navigate('/Comment')
    }

    return(
        <li className={style.bestReviewflexLine}>
            <div className={style.bestReviewFlexLineWrapper}>

                <div className={style.authorNameDate}>
                    <span className={style.authorName}>{props.props.author}</span>
                    <span className={style.authorDate}>{props.props.reviewDate}</span>
                </div>
                <Rating rating={props.props.reviewRating} size={{width:'25px', height:'25px'}}/>
                <div className={style.reviewContentContainer}>
                    {displayContentLines.map((line, index) => (
                        <span key={index} className={style.reviewContent}>
                            {line}
                            <br/>
                        </span>
                    ))}
                    {reviewContentLines.length > 3 && (
                        <span className={style.viewMore} onClick={toggleShowMore}>
                            {showMore ? 
                            <span style={{lineHeight:'25px'}}>. . . 간략히 보기</span> : <span style={{lineHeight:'25px'}}>. . . 더보기</span>}
                        </span>
                    )}
                </div>
                <div className={style.reviewCommentLikeContainer} style={{marginTop:'20px'}}>
                    <div style={{display:'flex', cursor: 'pointer'}} onClick={moveCommentPage}>
                        <Icon_comment fill="#828282" style={{width: '16px', height: '14px'}}/>
                        {props.props.commentCnt === 0 ? (<span style={{marginLeft:'5px'}}>댓글 달기</span>) : 
                        (<span style={{marginLeft:'5px'}}>댓글 ({props.props.commentCnt})</span>)}
                    </div>
                    <div style={{display:'flex'}}>
                        {<CheckReviewLike/>}
                        <span>{reviewLikeCnt}</span>
                    </div>
                </div>
                <div className={style.reviewHRContainer} style={{marginTop:'6px'}}><hr className={style.reviewHR}/></div>
                
            </div>
        </li>
    )
}


const cafeData = {
    cafePhotoUrl:CafeImgBg, 
    cafeName: "디어스윗랩",
    bookmarkChecked : false,
    cafeTheme: "디저트",
	cafeReviewCnt : 109,
    cafeOperationHour : "11:00 ~ 21:00",
    cafeAddress :"경기 수원시 영통구 센트럴파크로127번길 147 1층 (우)16506",
    cafePhone : "010-2585-3287",
    cafeRating : 4,
    bestMenuList : [
        { bestMenuId: 1, name: "아메리카노", price: 5000 },
        { bestMenuId: 2, name: "아이스 박스", price: 5500 },
    ],
    bestReviewList : [
        { 
            reviewId : 1,
            author : "김형우",
            reviewRating : 3,
            reviewContent : "아니 이 집 로드킬 고기를..?",
            reviewDate : "2024.04.07",
            likeCnt : 2400,
            commentCnt : 5,
            reviewChecked : true,
            photoUrls: [
                { photoUrl1 : CafeImgBg},
                { photoUrl2 : CafeImgBg},
            ]
        },
        { 
            reviewId : 2,
            author : "빅뱅",
            reviewRating : 4,
            reviewContent : "완벽한 쑥라떼 마카롱과 쑥라떼와 쇼콜라라떼 모두 맛있었다. 마카롱, 레몬케이크도 굿굿. 이 곳 쑥라테 유네스코 세계문화유산으로 지정해야함. 커피까진 모르겠는데 뭐 어쩌라고! 돌이킬 수 없더라고! ",
            reviewDate : "2024.04.07",
            likeCnt : 3599,
            commentCnt : 0,
            reviewChecked : false,
            photoUrls: [
                { photoUrl1 : CafeImgBg},
                { photoUrl2 : CafeImgBg},
            ]
        }
    ]
}

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

function Rating({rating, size}){
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<img className={style.starSize}key={i} src={img_star} alt="star" style={size}/>);
        } else {
            stars.push(<img className={`${style.grayStar} ${style.starSize}`} key={i} src={img_star} alt="Notstar" style={size}/>);
        }
    }
    return (
        <div>
            {stars}
        </div>
    );
}