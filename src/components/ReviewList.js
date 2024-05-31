import React, { useEffect, useState } from "react";
import style from "./ReviewList.module.css"
import { ReactComponent as Icon_like } from "../asset/icon/icon_like.svg"
import { ReactComponent as Icon_notLike } from "../asset/icon/icon_notLike.svg"
import Rating from "../components/Rating"
import { ReactComponent as Icon_comment } from "../asset/icon/icon_comment.svg"
import { ReactComponent as Icon_setting } from "../asset/icon/icon_setting.svg"
import axios from "axios";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactModal from "react-modal";

function ReviewList({ props, pageReLoad, setPageReLoad, cafeId}) {
    console.log(props)
    //리뷰가 3줄이 넘어가면 더보기 띄우기
    const navigate = useNavigate();

    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const reviewContent = props.reviewContent;
    const reviewContentLines = reviewContent.match(/.{1,27}/g);
    const displayContentLines = showMore ? reviewContentLines : reviewContentLines.slice(0, 3);

    //
    const [reviewLike, setReviewLike] = useState(props.reviewChecked);
    const [reviewLikeCnt, setReviewLikeCnt] = useState(props.likeCnt);

    const [initialized, setInitialized] = useState(false);

    const [commentCnt, setCommentCnt] = useState(props.commentCnt);

    useEffect(() => {
        if (initialized) {
            const reviewId = props.reviewId;
            const data = {
                reviewLike: reviewLike
            };

            console.log("Sending data to server:", data); // 콘솔에 데이터를 출력하여 확인
            axios.post(`http://localhost:8080/cafe/${reviewId}/like`, data)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.error('Error updating data: ', error);
                });
        } else {
            setInitialized(true);
        }
    }, [reviewLikeCnt]);



    const changeReviewLikeColor = () => {
        setReviewLike(!reviewLike);
        setReviewLikeCnt(!reviewLike ? reviewLikeCnt + 1 : reviewLikeCnt - 1)
    }
    const CheckReviewLike = () => {
        const Like = reviewLike ? Icon_like : Icon_notLike;
        return (<Like fill={reviewLike ? "#FF4F4F" : "#FFF"} style={{ width: '14px', height: '12px', marginRight: '5px', cursor: 'pointer' }} onClick={changeReviewLikeColor} />)
    }

    const [commentOpen, setCommentOpen] = useState(false)
    const commentBtnColor = commentOpen ? "#FF4F4F" : "#828282"
    const commentCntColor = commentOpen ? "#828282" : "#FF4F4F"
    const openComment = () => {
        setCommentOpen(!commentOpen);
    }


    const [isDropMenuOpen, setIsDropMenuOpen] = useState(false)
    const toggleDropMenu = (e) => {
        e.stopPropagation(); // 이벤트 캡처링 방지
        setIsDropMenuOpen(prevState => !prevState);
    }
    const toggleDropMenuDown = (e) => {
        e.stopPropagation(); // 이벤트 캡처링 방지
        setIsDropMenuOpen(false);
    }
    const reviewManagementCheck = () => {
        return (
            <>
                {props.reviewManagement && <div className={style.settingIconWrapper} onClick={toggleDropMenu}> 
                <Icon_setting fill="#828282" /></div>}
            </>
        )
    }

    const deleteReview = () => {
        console.log(props.reviewId, "asd")
        const reviewId = props.reviewId
        axios.post(`http://localhost:8080/cafe/${reviewId}/delete`)
        .then(res => {
            console.log(res);
            setPageReLoad(!pageReLoad)
        })
        .catch(error => {
            console.error('Error updating data: ', error);

        });
    }
    const updateReview = () => {
        navigate('/updateReview', {state: {
            cafeId : cafeId,
            prevReviewRating : props.reviewRating,
            prevPhotoUrls : photoUrls,
            prevreviewContent : props.reviewContent
            }})
    }


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [indexOfClickedImage, setIndexOfClickedImage] = useState(0);

    const openModal = (index) => {
        setIndexOfClickedImage(index);
        setModalIsOpen(true);

    }
    const closeModal = () => setModalIsOpen(false);
    const photoUrls = props.photoUrls.map(photo => photo.photoUrl);


    const images = photoUrls.map((url) => ({
        original: url,
        thumbnail: url
    }));

    const renderLeftNav = (onClick, disabled) => (
        <button
            type="button"
            className={`${style.customArrow} image-gallery-icon image-gallery-left-nav`}
            disabled={disabled}
            onClick={onClick}
            aria-label="Previous Slide"
        >
            &#9664; {/* 왼쪽 화살표 아이콘 */}
        </button>
    );

    const renderRightNav = (onClick, disabled) => (
        <button
            type="button"
            className={`${style.customArrow} image-gallery-icon image-gallery-right-nav`}
            disabled={disabled}
            onClick={onClick}
            aria-label="Next Slide"
        >
            &#9654; {/* 오른쪽 화살표 아이콘 */}
        </button>
    );


    return (
        <li className={style.bestReviewflexLine} onClick={toggleDropMenuDown}>
            <div className={style.ReviewFlexLineWrapper}>
                <div className={style.authorNameDate}>
                    <div className={style.authorNameDateWrapper}>
                        <span className={style.authorName}>{props.author}</span>
                        <span className={style.authorDate}>{props.reviewCreateDate}</span>
                    </div>
                    {reviewManagementCheck()}
                </div>
                {isDropMenuOpen && (
                    <ul className={style.dropMenuContainer}>
                        <li className={style.dropMenuWrapper} onClick={updateReview}>
                            <span>수정</span>
                        </li>
                        <li className={style.dropMenuWrapper} onClick={deleteReview}>
                            <span>삭제</span>
                        </li>
                    </ul>
                )}
                <Rating rating={props.reviewRating} size={{ width: '25px', height: '25px' }} />


                {photoUrls && photoUrls?.length > 0 && (
                    <div className={style.photoContainer}>
                        {photoUrls.slice(0, 2).map((url, index) => (
                            <img key={index} src={url} alt={`Review photo ${index + 1}`} className={style.reviewPhoto} onClick={() => openModal(index)}/>
                        ))}
                        {photoUrls.length > 2 && (
                            <div className={style.morePhotosContainer} onClick={() => openModal(2)}>
                                <img src={photoUrls[2]} alt="More photos" className={style.reviewPhoto} style={{ opacity: 0.5 }} />
                                <div className={style.morePhotosOverlay}>+{photoUrls.length - 3}</div>
                            </div>
                        )}
                    </div>
                )}


                <div className={style.reviewContentContainer}>
                    {displayContentLines.map((line, index) => (
                        <span key={index} className={style.reviewContent}>
                            {line}
                            <br />
                        </span>
                    ))}
                    {reviewContentLines.length > 3 && (
                        <span className={style.viewMore} onClick={toggleShowMore}>
                            {showMore ?
                                <span style={{ lineHeight: '25px' }}>. . . 간략히 보기</span> : <span style={{ lineHeight: '25px' }}>. . . 더보기</span>}
                        </span>
                    )}
                </div>
                <div className={style.reviewCommentLikeContainer} style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', cursor: 'pointer', color: `${commentBtnColor}` }} onClick={openComment}>
                        <Icon_comment fill={commentBtnColor} style={{ width: '16px', height: '14px' }} />
                        {props.commentCnt === 0 ? (<span className={style.comment} >댓글 달기</span>) :
                            (<span className={style.comment} >댓글 <span style={{ color: `${commentCntColor}` }}>({commentCnt})</span></span>)}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {<CheckReviewLike />}
                        <span>{reviewLikeCnt}</span>
                    </div>
                </div>
                {commentOpen && <Comment props={props} commentCnt={commentCnt} setCommentCnt={setCommentCnt} pageReLoad={pageReLoad} setPageReLoad={setPageReLoad}/>}
                <div className={style.reviewHRContainer} style={{ marginTop: '6px' }}><hr className={style.reviewHR} /></div>

            </div>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Gallery"
                className={style.modal}
                overlayClassName={style.modalOverlay}
                ariaHideApp={false}
            >
                <div className={style.modalExit} onClick={closeModal}>X</div>
                <ImageGallery items={images} startIndex={indexOfClickedImage} showThumbnails={false}
                showFullscreenButton={false} showPlayButton={false} style={{ WebkitUserDrag: 'none' }}
                renderLeftNav={renderLeftNav}
                renderRightNav={renderRightNav}/>
            </ReactModal>
        </li>
    )

}
export default ReviewList;
