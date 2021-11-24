const int_to_day = async function (day) {
    switch(day) {
        case 1:
            return "월";
        case 2:
            return "화";
        case 3:
            return "수";
        case 4:
            return "목";
        case 5:
            return "금";
        case 6:
            return "토";
        case 7:
            return "일";
        default:
            return "잘못된 입력";
    }
}

const int_to_building = async function(building) {
    switch(building) {
        case 0:
            return "";
        case 1:
            return "베어드홀";
        case 2:
            return "숭덕경상관";
        case 3:
            return "문화관";
        case 4:
            return "안익태기념관";
        case 5:
            return "형남공학관";
        case 6:
            return "교육관";
        case 7:
            return "백마관";
        case 8:
            return "한경직기념관";
        case 9:
            return "신양관";
        case 10:
            return "벤처중소기업센터";
        case 11:
            return "진리관";
        case 12:
            return "조만식기념관";
        case 13:
            return "한국기독교박물관";
        case 14:
            return "중앙도서관";
        case 15:
            return "연구관";
        case 16:
            return "창신관";
        case 17:
            return "생활관";
        case 18:
            return "학생생활관";
        case 19:
            return "전산관";
        case 20:
            return "미래관";
        case 21:
            return "정보과학관";
        case 22:
            return "웨스트임스터홀";
        case 23:
            return "학생회관";
        case 24:
            return "창의관";
        case 25:
            return "대운동장";
        default:
            return "잘못된 입력";
    }
}

module.exports = {
    int_to_day,
    int_to_building,
}