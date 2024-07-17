"use client";

import { useEffect, useState } from "react";
import img01 from "@/_assets/img_01.webp";
import img02 from "@/_assets/img_02.webp";
import img02_01 from "@/_assets/img_02_01.webp";
import img04 from "@/_assets/img_04.webp";
import img05 from "@/_assets/img_05.webp";
import img_register from "@/_assets/img_ register.webp";
import info_img from "@/_assets/info_img.webp";
import text_on from "@/_assets/text_on.webp";
import text_off from "@/_assets/text_off.webp";
import outline_img from "@/_assets/outline_img.webp";

import background_on from "@/_assets/background_on.webp";
import background_off from "@/_assets/background_off.webp";
import overprint_img from "@/_assets/overprint_img.webp";
import Image from "next/image";

import Select, { SingleValue } from "react-select";
import { calculatePrice } from "@/_utils";

type OptionType = { value: string; label: string };

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

  const [selectedSize, setSelectedSize] = useState<OptionType | null>({ value: "B5", label: "B5(188mm X 257mm)" });
  const [quantity, setQuantity] = useState<number>(20);
  const [binding, setBinding] = useState<OptionType | null>({ value: "무선제본", label: "무선제본" });
  const [coverPaper, setCoverPaper] = useState<OptionType | null>({ value: "스노우지", label: "스노우지" });
  const [coverWeight, setCoverWeight] = useState<OptionType | null>({ value: "180", label: "180g" });
  const [coverPrinting, setCoverPrinting] = useState<OptionType | null>({ value: "양면칼라", label: "양면칼라" });
  const [coverCoating, setCoverCoating] = useState<OptionType | null>({ value: "코팅없음", label: "코팅없음" });
  const [innerPaper, setInnerPaper] = useState<OptionType | null>({ value: "미색모조", label: "미색모조" });
  const [innerWeight, setInnerWeight] = useState<OptionType | null>({ value: "80", label: "80g" });
  const [innerPrinting, setInnerPrinting] = useState<OptionType | null>({ value: "양면흑백", label: "양면흑백" });
  const [innerPages, setInnerPages] = useState<number>(100);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const sizeOptions: OptionType[] = [
    { value: "B5", label: "B5(188mm X 257mm)" },
    { value: "A4", label: "A4(210mm X 297mm)" },
    { value: "A5", label: "A5(148mm X 210mm)" },
  ];

  const bindingOptions: OptionType[] = [
    { value: "무선제본", label: "무선제본" },
    { value: "스프링제본", label: "스프링제본(트윈링)" },
  ];

  const coverPaperOptions: OptionType[] = [
    { value: "스노우지", label: "스노우지" },
    { value: "랑데부지", label: "랑데부지" },
  ];

  const getCoverWeightOptions = (paperType: string | undefined): OptionType[] => {
    switch (paperType) {
      case "스노우지":
        return [
          { value: "180", label: "180g" },
          { value: "200", label: "200g" },
          { value: "250", label: "250g" },
          { value: "300", label: "300g" },
        ];
      case "랑데부지":
        return [
          { value: "190", label: "190g" },
          { value: "210", label: "210g" },
          { value: "240", label: "240g" },
        ];
      default:
        return [];
    }
  };

  const coverPrintingOptions: OptionType[] = [{ value: "양면칼라", label: "양면칼라" }];

  const coverCoatingOptions: OptionType[] = [
    { value: "코팅없음", label: "코팅없음" },
    { value: "단면무광코팅", label: "단면무광코팅" },
    { value: "단면유광코팅", label: "단면유광코팅" },
  ];

  const innerPaperOptions: OptionType[] = [
    { value: "미색모조", label: "미색모조" },
    { value: "백색모조", label: "백색모조" },
    { value: "뉴플러스지", label: "뉴플러스지" },
  ];

  const getInnerWeightOptions = (paperType: string | undefined): OptionType[] => {
    switch (paperType) {
      case "미색모조":
      case "백색모조":
      case "뉴플러스지":
        return [
          { value: "80", label: "80g" },
          { value: "100", label: "100g" },
        ];
      default:
        return [];
    }
  };

  const innerPrintingOptions: OptionType[] = [
    { value: "양면흑백", label: "양면흑백" },
    { value: "양면칼라", label: "양면칼라" },
  ];

  useEffect(() => {
    const price = calculatePrice({
      coverPaper: coverPaper?.value,
      coverWeight: coverWeight?.value,
      innerWeight: innerWeight?.value,
      binding: binding?.value,
      innerPrinting: innerPrinting?.value,
      innerPages,
      quantity,
    });
    setEstimatedPrice(price);
  }, [coverPaper, coverWeight, innerWeight, binding, innerPrinting, innerPages, quantity]);

  // Effect to update coverWeight when coverPaper changes
  useEffect(() => {
    const newOptions = getCoverWeightOptions(coverPaper?.value);
    setCoverWeight(newOptions.length > 0 ? newOptions[0] : null);
  }, [coverPaper]);

  // Effect to update innerWeight when innerPaper changes
  useEffect(() => {
    const newOptions = getInnerWeightOptions(innerPaper?.value);
    setInnerWeight(newOptions.length > 0 ? newOptions[0] : null);
  }, [innerPaper]);

  return (
    <main className="w-full bg-gray-50">
      <section id="calc" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-16 mt-[48px] bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Book cover images */}
          <div className="w-full aspect-[2/1] bg-gray-200 mb-6 rounded-lg relative overflow-hidden">
            <Image src="/path-to-your-image.jpg" alt="Book cover examples" layout="fill" objectFit="cover" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column */}
            <div className="lg:w-2/3">
              {/* 기본정보 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-2">기본정보</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">규격</label>
                    <Select
                      options={sizeOptions}
                      value={selectedSize}
                      onChange={(option) => setSelectedSize(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">수량</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제본</label>
                    <Select
                      options={bindingOptions}
                      value={binding}
                      onChange={(option) => setBinding(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 표지 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-2">표지</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">용지</label>
                    <Select
                      options={coverPaperOptions}
                      value={coverPaper}
                      onChange={(option) => setCoverPaper(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">평량</label>
                    <Select
                      options={getCoverWeightOptions(coverPaper?.value)}
                      value={coverWeight}
                      onChange={(option) => setCoverWeight(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">인쇄도수</label>
                    <Select
                      options={coverPrintingOptions}
                      value={coverPrinting}
                      onChange={(option) => setCoverPrinting(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">코팅</label>
                    <Select
                      options={coverCoatingOptions}
                      value={coverCoating}
                      onChange={(option) => setCoverCoating(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 내지 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-2">내지</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">용지</label>
                    <Select
                      options={innerPaperOptions}
                      value={innerPaper}
                      onChange={(option) => setInnerPaper(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">평량</label>
                    <Select
                      options={getInnerWeightOptions(innerPaper?.value)}
                      value={innerWeight}
                      onChange={(option) => setInnerWeight(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">인쇄도수</label>
                    <Select
                      options={innerPrintingOptions}
                      value={innerPrinting}
                      onChange={(option) => setInnerPrinting(option)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">페이지</label>
                    <input
                      type="number"
                      value={innerPages}
                      onChange={(e) => setInnerPages(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:w-1/3">
              <div className="bg-gray-100 p-4 rounded-lg sticky top-[100px]">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">예상견적 금액</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>인쇄비</span>
                    <span>{estimatedPrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>제본비</span>
                    <span>포함</span>
                  </div>
                  <div className="flex justify-between font-bold text-blue-600">
                    <span>합계(VAT별도)</span>
                    <span>{estimatedPrice.toLocaleString()}원</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mt-4">
                  문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-[#212121]">접수 가능 파일</h2>
          <div className="flex flex-row justify-center items-center space-x-4 sm:space-x-8">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-cyan-300 rounded-bl-full opacity-50"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-600 relative z-10">PDF</p>
              <p className="mt-2 text-sm sm:text-base text-gray-600">고품질 문서</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 rounded-bl-full opacity-50"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 relative z-10">JPG</p>
              <p className="mt-2 text-sm sm:text-base text-gray-600">선명한 이미지</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#212121]">
                포토샵 작업시 주의 사항
              </h2>
              <p className="text-lg sm:text-xl text-cyan-700 mb-4 sm:mb-6">PDF로 저장시 글씨는 래스터화 해주세요</p>
              <ul className="text-base sm:text-lg text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  글꼴 레지스터화
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  해상도 확인
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  색상 모드 설정
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="w-full relative" style={{ paddingBottom: "75%" }}>
                <Image
                  src={img_register}
                  alt="img_register"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="file-requirements" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#212121]">
              해상도 & 색상모드
            </h3>
            <div className="mb-8 sm:mb-12">
              <p className="text-xl sm:text-2xl md:text-3xl text-center font-semibold mb-4 text-cyan-700">
                300dpi(픽셀/인치) 이상, CMYK
              </p>
              <div className="w-full relative" style={{ paddingBottom: "23.96%" }}>
                <Image
                  src={info_img}
                  alt="info_img"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-16">
              <div className="text-center">
                <div className="w-80 h-80 sm:w-96 sm:h-96 relative mb-6">
                  <Image src={img05} alt="img_05" layout="fill" objectFit="contain" className="rounded-lg shadow-xl" />
                </div>
                <p className="text-xl font-semibold text-cyan-700">300dpi</p>
                <p className="text-lg text-gray-600">선명한 화질</p>
              </div>
              <div className="text-center">
                <div className="w-80 h-80 sm:w-96 sm:h-96 relative mb-6">
                  <Image src={img04} alt="img_04" layout="fill" objectFit="contain" className="rounded-lg shadow-xl" />
                </div>
                <p className="text-xl font-semibold text-cyan-700">72dpi</p>
                <p className="text-lg text-gray-600">흐린 화질</p>
              </div>
            </div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mt-8 sm:mt-12 text-center text-cyan-700 font-semibold">
            검정색 글자 K100으로 지정
          </p>
        </div>
      </section>

      <section id="services" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="w-full mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#212121]">
              일러스트 작업시 주의 사항
            </h2>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-center text-cyan-700">
            모든 이미지는 연결(링크)포함 적용해주세요
          </p>
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-xl">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-700">이미지(링크)포함전 사진</h4>
                <div className="w-full relative" style={{ paddingBottom: "75%" }}>
                  <Image src={img01} alt="img_01" layout="fill" objectFit="contain" className="rounded-lg" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-xl">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-700">이미지 포함 방법</h4>
                <div className="w-full relative" style={{ paddingBottom: "75%" }}>
                  <Image src={img02_01} alt="img02_01" layout="fill" objectFit="contain" className="rounded-lg" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-xl">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-700">
                  이미지(링크)포함 후 사진
                </h4>
                <div className="w-full relative" style={{ paddingBottom: "75%" }}>
                  <Image src={img02} alt="img_02" layout="fill" objectFit="contain" className="rounded-lg" />
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 text-center bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg">
              <p className="text-base sm:text-lg md:text-xl mb-2 text-[#212121] mb-[0px]">
                오른쪽 상단의 ▼삼선표시 누르시면 -&gt; 이미지포함을 클릭하시면 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="outline" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-[#212121]">
            윤곽선 만들기 (일러스트)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-cyan-700">텍스트 아웃라인 전</h3>
              <div className="relative" style={{ paddingBottom: "75%" }}>
                <Image
                  src={text_off}
                  alt="텍스트 아웃라인 후"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-cyan-700">텍스트 아웃라인 후</h3>
              <div className="relative" style={{ paddingBottom: "75%" }}>
                <Image
                  src={text_on}
                  alt="텍스트 아웃라인 전"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4 text-cyan-700">윤곽선 만들기 방법</h3>
            <div className="relative max-w-2xl mx-auto" style={{ paddingBottom: "56.25%" }}>
              <Image
                src={outline_img}
                alt="윤곽선 만들기 방법"
                layout="fill"
                objectFit="contain"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="text-center bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <p className="text-lg sm:text-xl md:text-2xl text-[#212121] mb-2">문자 -&gt; 윤곽선 만들기</p>
            <p className="text-base sm:text-lg text-gray-600">(단축키: Shift+Ctrl+O)</p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mt-8 text-center text-cyan-700 font-semibold">
            윤곽선만들기(일러스트) 적용 / 검정색 글자 K100으로 지정
          </p>
        </div>
      </section>

      <section id="background" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-[#212121]">
            중복인쇄(오버프린트)
          </h2>
          <div className="mb-8 text-center">
            <p className="text-lg sm:text-xl text-red-600 font-semibold">
              칠, 선 중복인쇄 체크를 해제 해주셔야 합니다.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mt-2">
              이것으로 인한 인쇄 사고는 당사에서 책임을 지지 않습니다.
            </p>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="text-center">
              <div className="relative w-full max-w-xl mx-auto" style={{ paddingBottom: "40%" }}>
                <Image
                  src={overprint_img}
                  alt="오버프린트 설정"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8">
              <div className="text-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                  <Image
                    src={background_on}
                    alt="중복인쇄 체크 전"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-2 text-cyan-700 font-semibold">중복인쇄 체크 해제</p>
              </div>
              <div className="text-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                  <Image
                    src={background_off}
                    alt="중복인쇄 체크 후"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-2 text-cyan-700 font-semibold">중복인쇄 체크</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="guidelines" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center text-[#212121]">
            안내사항
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-cyan-700">파일접수전 주의사항</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600">
                <li>교정확인(오탈자, 띄어쓰기, 페이지번호등등)을 해주세요</li>
                <li>책자사이즈는 원하시는 사이즈로 작업이 되었는지 확인해주세요</li>
                <li>재단여분(도련)까지 배경이 채워주셔야 합니다.</li>
                <li>해상도와 색상모드는 300dpi CMYK가 맞는지 확인해주세요</li>
                <li>중복인쇄 체크는 해제 해주세요</li>
                <li>이미지가 유실되거나 수정하지 않으셨는지 확인해주세요</li>
                <li>
                  {`글씨는 아웃라인으로 해주세요 글씨가 활성화 되어있으면 파일을 열었을때 저희가->(당사) 없는 서체일경우 글씨가 바뀔수 있습니다.`}
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
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-cyan-700">배송정보</h3>
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2 text-gray-700">택배배송</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600">
                  <li>도서, 산간, 오지 일부는 배송료가 추가됩니다.</li>
                  <li>배송은 발송일로부터 1~2일정도 소요됩니다. (주말, 공휴일 제외)</li>
                  <li>연휴나 명절같은 배송량이 증가되는 시기에는 배송업체의 사정에 따라 기간이 변동 될 수 있습니다.</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-700">퀵배송/방문수령</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  주문전에 요청 주셔야 하시고 비용은 100%고객부담입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
