export const KakaoLogin = () => {
  const Rest_api_key = '63d9777750d474aa71c162e109b4e451'; // REST API KEY
  const redirect_uri = 'http://localhost:8080/OAuthCallback'; // Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  window.location.href = kakaoURL;
};
