import React from "react";
import { PiXBold } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

const CompanyName = () => <span className="text-undtextdark">{"<공책>"}</span>;

function PrivacyPolicy() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const previousPath = location?.state?.from || "/settings";
    navigate(previousPath);
  };

  return (
    <div className="relative bg-undbgmain z-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8 text-start">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>
          <PiXBold size={30} className="items-center" onClick={handleBack} />
        </div>

        <section>
          <h2 className="text-2xl font-semibold">
            제1조(개인정보의 처리 목적)
          </h2>
          <p className=" text-sm text-undtextgray leading-relaxed text-start">
            <CompanyName />은 다음의 목적을 위하여 개인정보를 처리합니다. <br />{" "}
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며
            이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라
            별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <div className=" space-y-4">
            <div>
              <h3 className="font-semibold text-start">
                1. 홈페이지 회원가입 및 관리
              </h3>
              <p className=" text-sm text-undtextgray  text-start">
                회원 가입의사 확인, 회원자격 유지·관리, 만14세 미만 아동의
                개인정보 처리 시 법정대리인의 동의여부 확인 목적으로 개인정보를
                처리합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">2. 재화 또는 서비스 제공</h3>
              <p className=" text-sm text-undtextgray ">
                서비스 제공, 콘텐츠 제공, 요금결제·정산을 목적으로 개인정보를
                처리합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">3. 마케팅 및 광고에의 활용</h3>
              <p className=" text-sm text-undtextgray ">
                신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성
                정보 제공 및 참여기회 제공, 서비스의 유효성 확인, 접속 빈도 파악
                또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를
                처리합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제2조(개인정보의 처리 및 보유 기간)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              ① <CompanyName />은 법령에 따른 개인정보 보유·이용기간 또는
              정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
              보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            </p>
            <div className=" space-y-4">
              <div>
                <h3 className="font-semibold">1. 회원가입 및 관리</h3>
                <p className=" text-sm text-undtextgray ">
                  ○ 회원가입 및 관리와 관련한 개인정보는 수집.이용에 관한
                  동의일로부터 서비스를 탈퇴 또는 이용자격을 상실할 경우
                  지체없이 파기 전까지 위 이용목적을 위하여 보유.이용됩니다.
                </p>
                <p className=" text-sm text-undtextgray ">
                  ○ 보유근거 : 정보통신망 이용촉진 및 정보보호 등에 관한 법률
                </p>
              </div>
              <div>
                <h3 className="font-semibold">2. 재화 또는 서비스 제공</h3>
                <p className=" text-sm text-undtextgray ">
                  ○ 재화 또는 서비스 제공과 관련한 개인정보는 수집.이용에 관한
                  동의일로부터 지체없이 파기까지 위 이용목적을 위하여
                  보유.이용됩니다.
                </p>
                <p className=" text-sm text-undtextgray ">
                  ○ 보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률
                </p>
                <p className=" text-sm text-undtextgray ">
                  ○ 관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제3조(처리하는 개인정보의 항목)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              ① <CompanyName />은 다음의 개인정보 항목을 처리하고 있습니다.
            </p>
            <div className=" space-y-4">
              <div>
                <p className=" text-sm text-undtextgray ">
                  ○ 회원 가입 시 기본수집사항(필수항목): 로그인 SNS
                  식별자(Apple, Google, Facebook 로부터 제공받은 유저식별자),
                  프로필 이름
                </p>
                <p className=" text-sm text-undtextgray ">
                  ○ 서비스 이용과정에서 자동으로 수집: 기기 정보(모델명, OS), 앱
                  설정값, 메타 데이터, 서비스 이용기록
                </p>
                <p className=" text-sm text-undtextgray ">
                  ○ 유료서비스 이용 시: 오픈마켓사업자가 제공하는 구입 내역
                </p>
                <p className=" text-sm text-undtextgray ">
                  ○ 고충처리 시: 이용자로부터 위 각 정보 중 필요한 항목 및 해당
                  고충처리에 필요한 별개 항목을 수집 및 처리
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제4조(개인정보의 제3자 제공에 관한 사항)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              ① <CompanyName />은 개인정보를 제1조(개인정보의 처리 목적)에서
              명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정
              등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만
              개인정보를 제3자에게 제공합니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ② <CompanyName />은 현재 개인정보를 제3자에게 제공하고 있지
              않습니다.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제5조(개인정보처리의 위탁에 관한 사항)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              ① <CompanyName />은 원활한 개인정보 업무처리를 위하여 다음과 같이
              개인정보 처리업무를 위탁하고 있습니다.
            </p>
            <div className=" space-y-2">
              <p className=" text-sm font-semibold">
                1. {"<서비스 이용에 대한 데이터 처리>"}
              </p>
              <ul className="space-y-2 text-undtextgray">
                <li>
                  - 위탁받는 자 (수탁자) : Google Analytics, Google Cloud
                  Platform (Firebase)
                </li>
                <li>
                  - 위탁하는 업무의 내용 : 회원제 서비스 이용에 따른 본인확인,
                  신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성
                  정보 제공 및 참여기회 제공
                </li>
                <li>- 위탁기간 : 회원 탈퇴시까지</li>
              </ul>
            </div>
            <p className=" text-sm text-undtextgray">
              ② <CompanyName />은 위탁계약 체결시 「개인정보 보호법」 제26조에
              따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적
              보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에
              관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를
              안전하게 처리하는지를 감독하고 있습니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
              개인정보 처리방침을 통하여 공개하도록 하겠습니다.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제6조(개인정보의 파기절차 및 파기방법)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              ① <CompanyName />은 개인정보 보유기간의 경과, 처리목적 달성 등
              개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
              파기합니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나
              처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
              계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
              데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
            </p>
            <div className=" space-y-4">
              <div>
                <p className=" text-sm font-semibold">1. 파기절차</p>
                <p className=" text-sm text-undtextgray ">
                  ○ <CompanyName />은 파기 사유가 발생한 개인정보를 선정하고,{" "}
                  <CompanyName />의 개인정보 보호책임자의 승인을 받아 개인정보를
                  파기합니다.
                </p>
              </div>
              <div>
                <p className=" text-sm font-semibold">2. 파기방법</p>
                <p className=" text-sm text-undtextgray ">
                  ○ 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
                  방법을 사용합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              ① 정보주체는 공책에 대해 언제든지 개인정보 열람·정정·삭제·처리정지
              요구 등의 권리를 행사할 수 있습니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ② 제1항에 따른 권리 행사는 공책에 대해 「개인정보 보호법」 시행령
              제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실
              수 있으며 공책은 이에 대해 지체 없이 조치하겠습니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은
              자 등 대리인을 통하여 하실 수 있습니다. 이 경우 "개인정보 처리
              방법에 관한 고시(제2020-7호)" 별지 제11호 서식에 따른 위임장을
              제출하셔야 합니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조
              제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수
              있습니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
              대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
            </p>
            <p className=" text-sm text-undtextgray">
              ⑥ 공책은 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구,
              처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한
              대리인인지를 확인합니다.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제8조(개인정보의 안전성 확보조치에 관한 사항)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              <CompanyName />가 개인정보의 안전성 확보를 위해 다음과 같은 조치를
              취하고 있습니다.
            </p>
            <div className="space-y-4 ">
              <div>
                <p className=" text-sm font-semibold">
                  1. 개인정보에 대한 접근 제한
                </p>
                <p className=" text-sm text-undtextgray">
                  개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
                  부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여
                  필요한 조치를 하고 있으며 침입차단시스템을 이용하여
                  외부로부터의 무단 접근을 통제하고 있습니다.
                </p>
              </div>
              <div>
                <p className=" text-sm font-semibold">2. 개인정보의 암호화</p>
                <p className=" text-sm text-undtextgray">
                  이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고
                  있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                  데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도
                  보안기능을 사용하고 있습니다.
                </p>
              </div>
              <div>
                <p className=" text-sm font-semibold">
                  3. 해킹 등에 대비한 기술적 대책
                </p>
                <p className=" text-sm text-undtextgray">
                  <CompanyName />은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보
                  유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인
                  갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을
                  설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제9조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에
            관한 사항)
          </h2>
          <p className=" text-sm text-undtextgray">
            공책은 정보주체의 이용정보를 저장하고 수시로 불러오는
            '쿠키(cookie)'를 사용하지 않습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제10조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              행태정보의 수집·이용·제공 및 거부등에 관한 사항
            </p>
            <p className=" text-sm text-undtextgray ">
              - <CompanyName />은 온라인 맞춤형 광고 등을 위한 행태정보를
              수집·이용·제공하지 않습니다.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            제11조(개인정보 보호책임자에 관한 사항)
          </h2>
          <div className="space-y-4">
            <p className=" text-sm text-undtextgray">
              ① <CompanyName />은 개인정보 처리에 관한 업무를 총괄해서 책임지고,
              개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="">
              <h3 className="font-semibold">▶ 개인정보 보호책임자</h3>
              <ul className=" space-y-2 text-undtextgray">
                <li>- 성명: 김재원</li>
                <li>- 직책: 대표이사</li>
                <li>- 연락처: wodnjs3580@naver.com</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="mt-8 pt-4 border-t border-gray-200">
          <p className=" text-sm text-undtextgray">
            부칙 (2024. 12. 17.)
            <br />이 개인정보처리방침은 2024년 12월 17부터 적용됩니다.
          </p>
        </footer>
      </div>
      <div className="flex flex-col opacity-10 absolute bottom-10 z-10 gap-10">
        <img
          className="h-auto w-auto"
          src="../../../public/assets/img/마참내!.jpg"
          alt=""
        />
        <img
          className="h-auto w-auto"
          src="../../../public/assets/img/즐겁다.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default PrivacyPolicy;
