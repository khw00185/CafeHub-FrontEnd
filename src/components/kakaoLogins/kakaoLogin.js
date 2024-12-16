export const KakaoLogin = () => {
  const Rest_api_key = process.env.REACT_APP_Rest_api_key; // REST API KEY
  const redirect_uri = 'http://localhost:3000/OAuthCallback'; // Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  window.location.href = kakaoURL;
};
