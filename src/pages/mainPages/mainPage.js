import style from "./mainPage.module.css"
import ImgDate from '../../asset/img/img_date.png';
import ImgDessert from '../../asset/img/img_dessert.png';
import ImgMeeting from '../../asset/img/img_meeting.png';
import ImgStudy from '../../asset/img/img_study.png';


export default function(){
    return (
        <> 
            <article className={style.mainUl}>
                <ul>
                    {dataList.map((data)=>(<Imglist key={data.id} props={data}/>))}
                </ul>
            </article>
        </>
    )
}

const dataList = [
{id:1, src: ImgDate, title:"데이트하기 좋은", tag:"#핫플 #분위기"}, 
{id:2, src:ImgDessert, title:"디저트가 맛있는", tag:"#디저트 맛집"},
{id:3, src:ImgMeeting, title:"데이트하기 좋은", tag:"#핫플 #분위기"},
{id:4, src:ImgStudy, title:"데이트하기 좋은", tag:"#핫플 #분위기"}];//나중에 link 시킬때 여기에 url 하나씩 주고 밑에 Imglist의 li에 url걸어줘야 함.

function Imglist({props}){
    console.log(props.src)
    return (
        <li className={style.flexLine}>
        <img src={props.src} className={style.img}></img>
        <p><span className={style.text}>{props.title}</span>
        <span className={style.text}>{props.tag}</span></p>
    </li>
    )
}