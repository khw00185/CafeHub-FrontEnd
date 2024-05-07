import style from "../../styles/CafeListStyle.module.css"
import styled from "../../styles/GlobalStyle.module.css"
import img_cafeList_bg from "../../asset/img/img_cafeList.png"
import img_deerSweetLab from "../../asset/img/img_deerSweetLab.png";
import img_star from "../../asset/img/img_star.png"
import { ReactComponent as Icon_cafe } from "../../asset/icon/icon_cafe.svg"
import SortedType from "../../components/sortedType"
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";


function CafeList() {
    const location = useLocation();
    const type = location.state.type;

    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(response => {
                setDataList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);


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