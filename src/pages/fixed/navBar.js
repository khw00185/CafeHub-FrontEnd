import style from "./navBar.module.css"
import ReviewData from '../../asset/img/img_review.png';
import CafeData from '../../asset/img/img_cafe.png';
import Home from '../../asset/img/img_home.png';
import Bookmark from '../../asset/img/img_bookmark.png';
import MyPage from '../../asset/img/img_mypage.png';

export default function(){
    return (
        <>
            <nav className={style.wrapper}>
                {navList.map((data)=>(<NavList key={data.id} props={data}/>))}
            </nav>
        </>
    )
}

const navList = [
    {id:1, src: ReviewData, title:"리뷰작성"}, 
    {id:2, src: CafeData, title:"카페둘러보기"}, 
    {id:3, src: Home, title:"홈"}, 
    {id:4, src: Bookmark, title:"북마크"}, 
    {id:5, src: MyPage, title:"마이페이지"}

]

function NavList({props}){
    console.log(props.src)
    return (
        <>
            <a className={style.navA}>
            <img src={props.src} className={style.img}></img>
            <span className={style.text}>{props.title}</span>
            </a>
        </>
    )
}