import styled from "../../styles/GlobalStyle.module.css";
import style from "./myComment.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { ReactComponent as Icon_setting } from "../../asset/icon/icon_setting.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ModalComponent from "../../components/modalComponent";
import ReviewList from "../../components/ReviewList";
import Loading from "../../components/loading";

function MyComment() {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  /*사실 페이징 기법으로 무한 스크롤이 구현됐어야 했는데 서버 코드상 현재 페이지를 전달받지 않아서 currentPage를 서버쪽에서 모르고 상위 100개의 댓글을 보내줌.
    -> 그래서 그냥 데이터 한번에 다 받아서 화면에 뿌렸음 */
  const [pageReLoad, setPageReLoad] = useState(false);

  const [ref, inView] = useInView();
  const [isLast, setIsLast] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [commentRegisterFlag, setCommentRegisterFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pageReLoad || (!isLast && !isLoading)) {
        setIsLoading(true);

        const config = token
          ? {
              headers: {
                Authorization: token,
              },
            }
          : {};
        axios
          .get(`${process.env.REACT_APP_APIURL}/api/auth/mypage/comments`, config)
          .then((response) => {
            console.log("API 응답 데이터:", response.data.data);
    
            // 현재 페이지가 마지막 페이지인지 설정
            setIsLast(response.data.data.isLast);
      
            // 응답 데이터 검증 및 데이터 병합
            const newcommentList = Array.isArray(response.data.data.commentList)
              ? response.data.data.commentList
              : [];
      
            setDataList(newcommentList)

          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          })
          .finally(() => {
            setIsLoading(false); // 로딩 완료
            setPageReLoad(false);
          });
    }
  }, [pageReLoad]);

  useEffect(() => {
    if (inView && !isLast) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  }, [inView, isLast]);


  const loadList = () => {
    if (dataList?.length !== 0 || dataList?.length === 0) {
      return (
        <>
          <ul>
            {dataList?.map((data, index) => (
              <CommentList
                key={index}
                data={data}
                pageReLoad={pageReLoad}
                setPageReLoad={setPageReLoad}
                commentRegisterFlag={commentRegisterFlag}
                setCommentRegisterFlag={setCommentRegisterFlag}
              />
            ))}
          </ul>
          {!isLast && <div ref={ref}><Loading /></div>}
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <div className={styled.page_wrapper}>
      <main className={styled.main_container}>
        
        <div className={style.myCommentContainer}>{isLoading ? <Loading /> : loadList()}</div>
      </main>
    </div>
  );
}
export default MyComment;

const CommentList = ({
  data,
  pageReLoad,
  setPageReLoad,
  commentRegisterFlag,
  setCommentRegisterFlag,
}) => {
  console.log(data);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const token = sessionStorage.getItem("accessToken");

  const toggleDropMenu = (e) => {
    e.stopPropagation(); // 이벤트 캡처링 방지
    setIsDropMenuOpen((prevState) => !prevState);
  };
  const toggleDropMenuDown = (e) => {
    e.stopPropagation(); // 이벤트 캡처링 방지
    setIsDropMenuOpen(false);
  };
  const commentManagementCheck = () => {
    return (
      <>
        {data.commentManagement && (
          <span className={style.settingIconWrapper} onClick={toggleDropMenu}>
            <Icon_setting fill="#828282" />
          </span>
        )}
      </>
    );
  };

  const deleteComment = () => {
    console.log(data.commentId, "asd");
    const commentId = data.commentId;
    axios
      .post(
        `${process.env.REACT_APP_APIURL}/api/auth/reviews/${commentId}/delete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setPageReLoad(true);
        setCommentRegisterFlag(!commentRegisterFlag);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  return (
    <>
      <li className={style.flexLine} onClick={toggleDropMenuDown}>
        <article className={style.nicknameAndDateWrapper}>
          <div>
            <span className={style.nickname}>{data.nickname}</span>
            <span className={style.commentDate}>{data.commentDate}</span>
          </div>
          {commentManagementCheck()}
          {isDropMenuOpen && (
            <ul className={style.dropMenuContainer}>
              <li className={style.dropMenuWrapper} onClick={deleteComment}>
                <span>삭제</span>
              </li>
            </ul>
          )}
        </article>

        <article className={style.contentWrapper}>
          <span className={style.content}>{data.commentContent}</span>
        </article>
      </li>
    </>
  );
};
