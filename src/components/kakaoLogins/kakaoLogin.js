


function KakaoLogin(){

    return (
        <button type='button' onClick={Login}>
          로그인 하기
        </button>
      );
}

  export default KakaoLogin;
function Login() {
    const REST_API_KEY = '6fdc45e2ed6b06ea66e7558cc28560a9';
    const REDIRECT_URI = 'http://localhost:3000';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return(
        window.location.href = link
    )
};
