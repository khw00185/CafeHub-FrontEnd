import style from "./navBar.module.css"
import { useNavigate } from "react-router-dom";
import { ReactComponent as Home } from "../../asset/icon/icon_home.svg"
import { ReactComponent as CafeData } from "../../asset/icon/icon_cafe.svg"
import { ReactComponent as Bookmark } from "../../asset/icon/icon_bookmark.svg"
import { ReactComponent as MyPage } from "../../asset/icon/icon_myPage.svg"



const navList = [
    {id:1, src: Home, title:"홈", url:"/"},
    {id:2, src: CafeData, title:"카페둘러보기", url:"/CafeList"},
    {id:3, src: Bookmark, title:"북마크", url:"/Bookmark"},
    {id:4, src: MyPage, title:"마이페이지", url:"/MyPage"}
]

function NavBar({selectedId, setSelectedId, token, setToken, setModalIsOpen}){
    return (
        <>
            <nav className={style.wrapper}>
                {navList.map((data)=>(
                    <NavList
                        key={data.id}
                        props={data}
                        setSelectedId={setSelectedId}
                        isSelected = {selectedId === data.id}
                        setModalIsOpen = {setModalIsOpen}
                        token ={token}
                        setToken={setToken}
                    />
                ))}
            </nav>
        </>
    )
}
export default NavBar;

function NavList({props, setSelectedId, isSelected, token, setToken, setModalIsOpen}){
    const navigate = useNavigate();

    const color = isSelected ? "#492228" : "#ACABB0";

    const func = () => {
        setSelectedId(props.id);
        if(props.id === 2){
            navigate(props.url, {state: {type: "All"}});
        }
        else if(props.id === 4 && token){
            navigate(props.url, {state: {token: token, setToken: setToken}});
        }
        else if((props.id === 3 || props.id === 4) && !token){
            navigate("/");
            setModalIsOpen(true);
            setSelectedId(1)
        }
        
        else {
            navigate(props.url);
        }
    }
    
    return (
        <>
            <div className={style.navA} onClick={func}>
                <props.src className={style.img} fill={color}/>
                <span className={style.text} style={{color: color}}>{props.title}</span>
            </div>
        </>
    )
}