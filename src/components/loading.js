import React from "react";
import Spinner from "../asset/gif/git_loading.gif"

const Loading = () => {
    return(
        <div>
            <img src={Spinner} alt="로딩" width="10%"/>
        </div>
    )
}
export default Loading;