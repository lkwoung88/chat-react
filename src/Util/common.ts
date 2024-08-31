export const nowDateToString = () =>{

    const now = new Date();
    // 연도, 월, 일, 시간, 분, 초 값 가져오기
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

// 사용자 정의 형식으로 변환
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}