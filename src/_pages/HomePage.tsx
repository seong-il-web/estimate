"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
          section.classList.add("opacity-100");
          section.classList.remove("opacity-0");
        } else {
          section.classList.add("opacity-0");
          section.classList.remove("opacity-100");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full">
      <section id="home" className="min-h-screen flex items-center bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
              교육교재, 학원교재
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">이제는 디지털 인쇄로 진행해보세요</p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              디지털 윤전의 품질보다 고퀄리티의 품질과
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              고객을 만족 시키는 가격으로 성일과 함께하세요
            </p>
          </div>
          <div className="w-full aspect-video max-w-2xl">
            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="file-requirements"
        className="min-h-screen flex items-center bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-16"
      >
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">접수 가능 파일</h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8">PDF, JPG</p>
          </div>

          <div className="w-full max-w-4xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">해상도 & 색상모드</h3>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">300dpi(픽셀/인치) 이상, CMYK</p>
            <div className="w-full aspect-video bg-gray-200 flex justify-center items-center rounded-lg mb-8">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 flex justify-center items-center rounded-lg mb-2">
                  <span className="text-gray-500 text-sm">로고 이미지</span>
                </div>
                <p className="text-sm">300dpi</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 flex justify-center items-center rounded-lg mb-2">
                  <span className="text-gray-500 text-sm">로고 이미지</span>
                </div>
                <p className="text-sm">72dpi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
              포토샵 작업시 주의 사항
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              PDF로 저장시 글씨는 레지스터화 해주세요
            </p>
          </div>
          <div className="w-full aspect-video max-w-2xl">
            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-4">검정색 글자 K100으로 지정</p>
        </div>
      </section>

      <section id="services" className="min-h-screen flex items-center bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
              일러스트 작업시 주의 사항
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              윤곽선만들기(일러스트)적용/ 검정색 글자 K100으로 지정
            </p>
          </div>
          <div className="w-full aspect-video max-w-2xl mb-8">
            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8">
            모든 이미지는 연결(링크)포함 적용해주세요
          </p>
          <div className="w-full aspect-video max-w-2xl mb-8">
            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
          </div>
          <div className="w-full max-w-4xl mt-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">이미지(링크) 포함전 사진</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium mb-2">이미지(링크)포함전 사진</h4>
                <div className="w-full aspect-video bg-gray-200 flex justify-center items-center rounded-lg">
                  <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">이미지(링크)포함 후 사진</h4>
                <div className="w-full aspect-video bg-gray-200 flex justify-center items-center rounded-lg">
                  <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
                </div>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-4">
              오른쪽 상단의 ▼삽선표시 누르시면 -&gt; 이미지포함을 클릭하시면 됩니다.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2">
              윤곽선만들기(일러스트)적용/ 검정색 글자 K100으로 지정
            </p>
          </div>
        </div>
      </section>

      <section
        id="guidelines"
        className="min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8 py-8 sm:py-16"
      >
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 text-center text-blue-600">
            안내사항
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">파일접수전 주의사항</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>교정확인(오탈자, 띄어쓰기, 페이지번호등등)을 해주세요</li>
                <li>책자사이즈는 원하시는 사이즈로 작업이 되었는지 확인해주세요</li>
                <li>재단여분(도련)까지 배경이 채워주셔야 합니다.</li>
                <li>해상도와 색상모드는 300dpi CMYK가 맞는지 확인해주세요</li>
                <li>중복인쇄 체크는 해제 해주세요</li>
                <li>이미지가 유실되거나 수정하지 않으셨는지 확인해주세요</li>
                <li>
                  글씨는 아웃라인으로 해주세요 글씨가 활성화 되어있으면 파일을 열었을때 저희가 없는 서체일경우 글씨가
                  바뀔수 있습니다.
                </li>
                <li>검정색 글씨는 K100 으로 해주세요 (색상이 섞이면 검정색이 깨끗하게 나오지 않습니다.)</li>
                <li>본문 내용은 재단선 안쪽으로 여유를(15mm이상) 두고 작업하셔야 합니다.</li>
                <li>재단선 가까이 내용이 있으면 재단시 잘릴수 있으니 참고 해주세요</li>
                <li>4도인쇄물이기 때문에 별색지정하시면 안됩니다.</li>
                <li>검정색 배경이미지를 원하시면 K100+C10~20%로 지정해주세요</li>
                <li>인쇄할 때마다 색상차이는 있을수 있습니다.</li>
                <li>같은데이터라도 작업날짜가 다르면 약간의 색감차이가 있는 부분 참고해주세요</li>
                <li>모니터 색상과 인쇄 출력 색상은 다르게 보일수 있습니다.</li>
                <li>
                  무선제본의 경우에 풀칠로 인해서 책이 완전히 펼쳐지지 않기 때문에 중간에 그림이나 글씨가 삽입이 될 경우
                  겹치는 부분이 재단여분을 포함해서 5mm정도 작업을 해주셔야 합니다.
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">배송정보</h3>
              <h4 className="text-lg font-medium mb-2 text-blue-600">택배배송</h4>
              <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700">
                <li>도서, 산간, 오지 일부는 배송료가 추가됩니다.</li>
                <li>배송은 발송일로부터 1~2일정도 소요됩니다. (주말, 공휴일 제외)</li>
                <li>연휴나 명절같은 배송량이 증가되는 시기에는 배송업체의 사정에 따라 기간이 변동 될 수 있습니다.</li>
              </ul>
              <h4 className="text-lg font-medium mb-2 text-blue-600">퀵배송/방문수령</h4>
              <p className="text-gray-700">주문전에 요청 주셔야 하시고 비용은 100%고객부담입니다.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
