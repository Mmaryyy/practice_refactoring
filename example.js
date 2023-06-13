// 값이 바뀌지 않는 변수를 매개변수로 전달
export function amountFor(aPerformance, play) {
  // 변수를 초기화
  let result = 0;
  switch (play.type) {
    case "tragedy": //비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy": //희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르 : ${play.type}`);
  }
  // 함수 안에서 값이 바뀌는 변수 반환
  return result;
}
