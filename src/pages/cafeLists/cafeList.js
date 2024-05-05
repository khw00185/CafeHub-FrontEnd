import style from "../../styles/CafeListStyle.module.css"
import styled from "../../styles/GlobalStyle.module.css"
import img_cafeList_bg from "../../asset/img/img_cafeList.png"
import img_deerSweetLab from "../../asset/img/img_deerSweetLab.png";
import img_star from "../../asset/img/img_star.png"
import { ReactComponent as Icon_cafe } from "../../asset/icon/icon_cafe.svg"
import SortedType from "../../components/sortedType"
import { useLocation, useNavigate } from "react-router-dom";


function CafeList() {
    const location = useLocation();
    const type = location.state.type;

    const findTheme = cafeThemeDataList.find(item => item.themeId === type)

    return (
        <>
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>
                <CafeThemeList props = {findTheme}/>
                    <SortedType/>
                    <ul>
                        {dataList.map((data) => (<CafeListList key={data.cafeId} props={data}/>))}
                    </ul>
                </main>
            </div>
        </>
    )
}

export default CafeList;

const dataList = [
    {cafeId:1, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:31},
    {cafeId:2, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:32},
    {cafeId:3, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:33},
    {cafeId:4, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:34},
    {cafeId:5, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:31},
    {cafeId:6, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:32},
    {cafeId:7, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:33},
    {cafeId:8, cafePhotoUrl:img_deerSweetLab, cafeName:"디어스윗랩", cafeRating:"4.4", cafeTheme:"디저트", cafeReviewNum:34}
    ];

function CafeListList({props}){
    const navigate = useNavigate();

    const func = () => {
        navigate('/CafeDetail')
    }

    return (
        <div className={style.flexLine} onClick={func} style={{cursor:'pointer'}}>
                <img className={style.cafeImg} src={props.cafePhotoUrl}></img>
                <div className={style.CafeTextContainer}>
                    <div>
                        <span className={style.cafeTitle}>{props.cafeName}</span>
                        <span className={style.cafeTheme}>{props.cafeTheme}</span>
                        <div className={style.starRatingReview}>
                            <img className={style.img_star} src={img_star}></img>
                            <span className={style.cafeRating}>{props.cafeRating} ({props.cafeReviewNum})</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}

const cafeThemeDataList = [
    {themeId:1, image:img_cafeList_bg, themeIcon:Icon_cafe, themeText:"데이트 카페 리스트"},
    {themeId:2, image:img_cafeList_bg, themeIcon:Icon_cafe, themeText:"디저트 카페 리스트"},
    {themeId:3, image:img_cafeList_bg, themeIcon:Icon_cafe, themeText:"회의 카페 리스트"},
    {themeId:4, image:img_cafeList_bg, themeIcon:Icon_cafe, themeText:"공부 카페 리스트"},
    {themeId:5, image:img_cafeList_bg, themeIcon:Icon_cafe, themeText:"전체 카페 리스트"}
]

function CafeThemeList({props}) {

    return(
        <article className={style.containerWrapper}>
            <img src={props.image} className={style.imgBg}/>
            <article className={style.textContainer}>
                <props.themeIcon fill="white" className={style.icon}/>
                <span className={style.textOnBg}>{props.themeText}</span>
            </article>
        </article>
    )
}