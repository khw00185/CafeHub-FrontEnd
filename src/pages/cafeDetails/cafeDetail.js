import styled from "../../styles/GlobalStyle.module.css"
import style from "./cafeDetail.module.css"
import CafeImgBg from "../../asset/img/img_deerSweetLab.png"
import  { ReactComponent as Icon_pin} from "../../asset/icon/icon_pin.svg"
import  { ReactComponent as Icon_clock} from "../../asset/icon/icon_clock.svg"
import  { ReactComponent as Icon_call} from "../../asset/icon/icon_call.svg"
import { ReactComponent as Icon_like } from "../../asset/icon/icon_like.svg"
import { ReactComponent as Icon_notLike } from "../../asset/icon/icon_notLike.svg"
import { ReactComponent as Icon_go } from "../../asset/icon/icon_go.svg"
import img_star from "../../asset/img/img_star.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import WriteReview from '../../asset/icon/icon_nicknameAlt.png';


function CafeDetail(){
    const navigate = useNavigate();

    const [like, setLike] = useState(cafeData.bookmarkChecked);
    const changeColor = () => {
        setLike(!like);
    }
    const likeColor =() => {
        const Like = like ? Icon_like : Icon_notLike;
        return (
            <div className={style.likeContainer} onClick={changeColor}>
            <Like fill={like ? "#FF4F4F" : "#FFF"} className={style.like} />
            </div>
        )
    }

    const onClickWriteReview = () => {
        navigate('/WriteReview')
    }

    return(
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>
                    <article className={style.cafeInfo}>
                        <img className={style.cafeInfoBg} src={cafeData.cafePhotoUrl}></img>

                        <div className={style.cafeInfoTitleContainer}>
                            <div className={style.cafeInfoTitleLike}>
                                <span className={style.cafeInfoTitle}>{cafeData.cafeName}</span>
                                {likeColor()}
                            </div>
                            <div className={style.cafeInfoPlus}>
                                <span>{cafeData.cafeTheme}</span>
                                <img src={img_star} style={{ width: '20px', height: '20px', marginLeft:'15px' }}></img>
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
                            <span>메뉴 더보기</span>
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
                            <div className={style.writeReview} onClick={onClickWriteReview}>
                                <img src={WriteReview} style={{width:'10px', height:'10px'}}></img>
                                <span style={{marginLeft:'2px'}}>리뷰작성</span>
                            </div>
                        </div>
                        <hr/>
                        <ul>
                            {cafeData.bestReviewList.map((data)=>(<BestReviewList key={data.reviewId} props={data}/>))}
                        </ul>

                    </article>


                </main>
            </div>
    )
}
export default CafeDetail;

function BestReviewList(props){
    console.log(props.props) //지금 여기서 reviewRating이 undefined가 뜸 -> props로 제대로 안오고 있는 것 같음. -
    return(
        <li className={style.bestReviewflexLine}>
            <div className={style.authorNameDate}>
                <span className={style.authorName}>{props.props.author}</span>
                <span className={style.authorDate}>{props.props.reviewDate}</span>
            </div>
            <Rating rating={props.props.reviewRating}/>


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
            photoUrls: [
                { photoUrl1 : CafeImgBg},
                { photoUrl2 : CafeImgBg},
            ]
        },
        { 
            reviewId : 2,
            author : "빅뱅",
            reviewRating : 4,
            reviewContent : "완벽한 쑥라떼 마카롱과 쑥라떼와 쇼콜라라떼 모두 맛있었다. 마카롱, 레몬케이크도 굿굿. 이 곳 쑥라테 유네스코 세계문화유 산으로 지정해야함. 커피까진 모르겠는데 뭐 어쩌라고! 돌이킬 수 없더라고! ",
            reviewDate : "2024.04.07",
            likeCnt : 3600,
            commentCnt : 6,
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

function Rating({rating}){
    console.log(rating)
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<img className={style.starSize}key={i} src={img_star} alt="star"/>);
        } else {
            stars.push(<img className={`${style.grayStar} ${style.starSize}`} key={i} src={img_star} alt="Notstar"/>);
        }
    }
    return (
        <div>
            {stars}
        </div>
    );
}