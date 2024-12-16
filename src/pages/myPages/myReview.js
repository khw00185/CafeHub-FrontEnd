import styled from "../../styles/GlobalStyle.module.css";
import style from "./myReview.module.css";
import img_review from "../../asset/img/img_review.png";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Icon_list } from "../../asset/icon/icon_lists.svg";
import ModalComponent from "../../components/modalComponent";
import ReviewList from "../../components/ReviewList";
import Loading from "../../components/loading";

function MyReview() {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageReLoad, setPageReLoad] = useState(false);

  const [ref, inView] = useInView();
  const [isLast, setIsLast] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const displayComment = true;

  useEffect(() => {
    pageLoad(currentPage);
  }, [currentPage, pageReLoad]);

  useMemo(() => {
    if (inView) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  }, [inView]);

  const pageLoad = (currentPage) => {
    const config = token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {};
    axios
      .get(`${process.env.REACT_APP_APIURL}/api/auth/mypage/reviews`, config)
      .then((response) => {
        console.log("API 응답 데이터:", response.data.data);

        // 현재 페이지가 마지막 페이지인지 설정
        setIsLast(response.data.data.isLast);

        // 응답 데이터 검증 및 데이터 병합
        const newReviews = Array.isArray(response.data.data.reviewList)
          ? response.data.data.reviewList
          : [];

        if (currentPage === 0) {
          // 첫 페이지 로딩: 새 데이터로 교체
          setDataList(newReviews);
        } else {
          // 추가 페이지 로딩: 기존 데이터와 병합
          setDataList((prevDataList) => {
            const safePrevDataList = Array.isArray(prevDataList)
              ? prevDataList
              : [];
            return [...safePrevDataList, ...newReviews];
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const loadList = () => {
    if (dataList?.length !== 0) {
      return (
        <>
          <ul className={style.ulListContainer}>
            {dataList?.map((data, index) => (
              <ReviewList
                key={index}
                props={data}
                pageReLoad={pageReLoad}
                setPageReLoad={setPageReLoad}
                cafeId={false}
                cafePhotoUrl={false}
                cafeName={false}
                displayComment={displayComment}
              />
            ))}
          </ul>
          {isLast ? null : (
            <div ref={ref} className={style.refContainer}>
              <Loading ref={ref} />
            </div>
          )}
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <div className={styled.page_wrapper}>
      <main className={styled.main_container}>
        <Top />
        <article className={style.cafeBestReviewContainer}>
          <div style={{ width: "100%" }}>{loadList()}</div>
        </article>
        {loginModalOpen && (
          <ModalComponent
            modalIsOpen={loginModalOpen}
            setModalIsOpen={setLoginModalOpen}
          ></ModalComponent>
        )}
      </main>
    </div>
  );
}
export default MyReview;

function Top() {
  return (
    <article className={style.containerWrapper}>
      <img src={img_review} className={style.imgBg} />
      <article className={style.textContainer}>
        <Icon_list fill="white" className={style.icon} />
        <span className={style.textOnBg}>전체 리뷰 목록</span>
      </article>
    </article>
  );
}
