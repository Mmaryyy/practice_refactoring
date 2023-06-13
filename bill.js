//! An import assertion in a static import
// 2023년 3월 키워드가 assert -> with 로 변경되었다.
import plays from "./plays.json" assert { type: "json" };
import invoices from "./invoices.json" assert { type: "json" };

//! An import assertion in a dynamic import
// const plays = await import("./plays.json", {
//   assert: { type: "json" },
// });
// const invoices = await import("./invoices.json", {
//   assert: { type: "json" },
// });

const statement = (invoice, plays) => {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }
  // let volumeCredits = totalVolumeCredits();
  result += `총액 : ${usd(totalAmount())}\n`;
  result += `적립 포인트 : ${totalVolumeCredits()}점\n`;
  return result;

  // 값이 바뀌지 않는 변수를 매개변수로 전달
  function amountFor(aPerformance) {
    // 변수를 초기화
    let result = 0;
    switch (playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르 : ${playFor(aPerformance).type}`);
    }
    // 함수 안에서 값이 바뀌는 변수 반환
    return result;
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    // 포인트를 적립한다.
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === playFor(aPerformance).type)
      volumeCredits += Math.floor(aPerformance.audience / 5);

    return volumeCredits;
  }
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
    // 단위 변환 로직도 이 함수 안으로 이동
  }
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      // 추출한 함수를 이용해 값을 누적
      result += volumeCreditsFor(perf);
    }

    return result;
  }
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }

    return result;
  }
};

console.log(statement(invoices, plays));
