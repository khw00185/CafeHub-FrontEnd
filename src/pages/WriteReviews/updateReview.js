import styled from "../../styles/GlobalStyle.module.css"
import style from "./writeReview.module.css"
import React, { useState } from 'react'
import Select from 'react-select'
import axios from "axios"
import { useLocation } from "react-router-dom"
import Rating from "../../components/Rating"

function UpdateReview(){
    const location = useLocation();
    const { cafeId, prevReviewRating, prevPhotoUrls, prevreviewContent } = location.state || {};

    const options = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 }
      ]

    const [reviewContent, setReviewContent] = useState(prevreviewContent);
    const [reviewRating, setReviewRating] = useState(prevReviewRating);
    const [photoUrls, setPhotoUrls] = useState(prevPhotoUrls);


    const handleSubmit = () => {
        if (reviewContent.trim() !== '') {
            console.log('reviewContent submitted:', reviewContent);
            const formData = new FormData();
            formData.append('reviewRating', reviewRating);
            formData.append('reviewContent', reviewContent);

            photoUrls.forEach((file) => {
                formData.append('photoUrls', file);  // Use 'photoUrls' to match the backend parameter name
            });

            axios.post(`http://localhost:8080/cafe/${cafeId}/review`, formData)
            .then(res => {
                console.log(res);
                setReviewContent('');
                setPhotoUrls([]);
                setReviewRating(null);
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        }
    };
    const handleFileChange = (event) => {
        setPhotoUrls(Array.from(event.target.files));
    };
    const handleChange = (event) => {
        setReviewContent(event.target.value);
    };
    return (
        <> 
            <div className={styled.page_wrapper}>
                <main className={styled.main_container}>

                    <form className= {style.contentInputContainer} encType="multipart/form-data">
                        <Select options={options} 
                        value={options.find(option => option.value === reviewRating)} 
                        placeholder="별점..."  
                        onChange={(selectedOption) => {
                            setReviewRating(selectedOption.value);
                        }} />
                        <Rating rating= {reviewRating} />

                        <input
                            type="file"
                            multiple
                            value={photoUrls}
                            onChange={handleFileChange}
                            className={style.fileInput}
                        />
                        <input
                            type="text"
                            value={reviewContent}
                            onChange={handleChange}
                            placeholder="리뷰 작성..."
                            className= {style.contentInput}
                        />
                        {reviewContent.length > 0 ? <button onClick={handleSubmit} className={style.submitButton} disabled={false}>
                            등록
                        </button> : <button onClick={handleSubmit} className={style.submitButton} disabled={true}>
                            등록
                        </button>}
                    </form>
                    
                </main>
            </div>
        </>
    )
}

export default UpdateReview;