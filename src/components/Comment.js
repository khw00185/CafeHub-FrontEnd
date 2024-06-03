import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import style from "./Comment.module.css"
import Loading from "./loading";
import { ReactComponent as Icon_setting } from "../asset/icon/icon_setting.svg"



function Comment({ props, commentCnt, setCommentCnt, pageReLoad, setPageReLoad }){
    console.log(props, "이거 이거이거")
    const [commentRegisterFlag, setCommentRegisterFlag] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);


    return (
        <>
            <CommentInput reviewId={props.reviewId} commentCnt={commentCnt} setCommentCnt={setCommentCnt}
            commentRegisterFlag={commentRegisterFlag} setCommentRegisterFlag={setCommentRegisterFlag}
            setCurrentPage={setCurrentPage}/>
            {props.commentCnt !== 0 && <GetComment props={props} commentRegisterFlag={commentRegisterFlag} currentPage={currentPage}
            setCurrentPage={setCurrentPage} pageReLoad={pageReLoad} setPageReLoad={setPageReLoad}/>}
        </>
    )
}

export default Comment;

const CommentInput = ({ reviewId, commentCnt, setCommentCnt, commentRegisterFlag, setCommentRegisterFlag, setCurrentPage }) => {
    const [comment, setComment] = useState('');

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        if (comment.trim() !== '') {
            console.log('Comment submitted:', comment);
            // 여기에 댓글 등록 로직을 추가하세요.
            const data = {
                commentContent: comment
            }
            axios.post(`http://localhost:8080/api/auth/reviews/${reviewId}/comment`, data)
            .then(res => {
                console.log(res);
                setComment('');
                setCommentCnt(commentCnt+1);
                setCommentRegisterFlag(!commentRegisterFlag);
                setCurrentPage(0)
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        }
    };

    return (
        <div className= {style.commentInputContainer}>
            <input
                type="text"
                value={comment}
                onChange={handleChange}
                placeholder="댓글 추가..."
                className= {style.commentInput}
            />
            <button onClick={handleSubmit} className={style.submitButton}>
                등록
            </button>
        </div>
    )
}

const GetComment = ({ props, commentRegisterFlag, currentPage, setCurrentPage, pageReLoad, setPageReLoad }) => {
    console.log(commentRegisterFlag)

    
    const [ref, inView] = useInView();
    const [isLast, setIsLast] = useState(false);
    const [dataList, setDataList] = useState([]);

    const pageLoad = (currentPage) => {        
        console.log("다시 get 요청!!")
        axios.get(`http://localhost:8080/api/reviews/${props.reviewId}/comments/${currentPage}`)
        .then(response => {
            console.log(response.data); // 서버 응답 확인@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            setIsLast(response.data.data.isLast);
            
            if (currentPage === 0) {
                setDataList(response.data.data.comments);
            } else{
                setDataList((prevDataList) => [...prevDataList, ...response.data.data.comments]);
                
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    useEffect(()=>{
        pageLoad(currentPage);
    }, [currentPage, commentRegisterFlag])


    useMemo(()=>{
        if(inView){
            setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        }
    },[inView])


    const loadList = () => {
        if (dataList?.length !== 0 || dataList?.length === 0) {
            return (
                <>
                    <ul>
                        {dataList?.map((data, index) => (<CommentList key={index} data={data} pageReLoad={pageReLoad} setPageReLoad={setPageReLoad}/>))}
                    </ul>
                    {isLast ? null : <div ref={ref} className={style.refContainer}><Loading/></div>}
                </>
            );
        } else {
            return <Loading />;
        }
    };

    return(

        <div style={{width: '100%'}}>
                        {loadList()}
                    </div>
    )

}



const CommentList = ({ data, pageReLoad, setPageReLoad }) => {
    console.log(data)
    const [isDropMenuOpen, setIsDropMenuOpen] = useState(false)
    
    const toggleDropMenu = (e) => {
        e.stopPropagation(); // 이벤트 캡처링 방지
        setIsDropMenuOpen(prevState => !prevState);
    }
    const toggleDropMenuDown = (e) => {
        e.stopPropagation(); // 이벤트 캡처링 방지
        setIsDropMenuOpen(false);
    }
    const commentManagementCheck = () => {
        return (
            <>
                {data.commentManagement && <span className={style.settingIconWrapper} onClick={toggleDropMenu}>
                <Icon_setting fill="#828282" /></span>}
            </>
        )
    }

    const deleteReview = () => {
        console.log(data.reviewId, "asd")
        const commentId = data.commentId
        axios.post(`http://localhost:8080/api/auth/reviews/${commentId}/delete`)
        .then(res => {
            console.log(res);
            setPageReLoad(!pageReLoad)
        })
        .catch(error => {
            console.error('Error updating data: ', error);

        });
    }

    return(
        <>
            <li className={style.flexLine} onClick={toggleDropMenuDown}>
                <article className={style.nicknameAndDateWrapper}>
                    <span className={style.nickname}>{data.nickname}</span>
                    <span className={style.commentDate}>{data.commentDate}</span>
                    {commentManagementCheck()}
                    {isDropMenuOpen && (
                    <ul className={style.dropMenuContainer}>
                        <li className={style.dropMenuWrapper} onClick={deleteReview}>
                            <span>삭제</span>
                        </li>
                    </ul>)}
                </article>
                
                <article className={style.contentWrapper}>
                    <span className={style.content}>{data.commentContent}</span>
                </article>
                
            </li>
        </>

    )

}