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

import book01 from "@/_assets/book_01.png";
import book02 from "@/_assets/book_02.png";
import book03 from "@/_assets/book_03.png";
import book04 from "@/_assets/book_04.png";
import Image from "next/image";

import print01 from "@/_assets/print_01.png";
import print02 from "@/_assets/print_02.png";
import print03 from "@/_assets/print_03.jpeg";

import Select from "react-select";
import { calculatePrice } from "@/_utils";
import { data_a4 } from "@/_utils/a4";
import { data_a5 } from "@/_utils/a5";
import { data_b5 } from "@/_utils/b5";

type OptionType = { value: string; label: string };

const sizeInfo = {
  A4: { cutSize: "210*297", workSize: "216*303" },
  B5: { cutSize: "182*257", workSize: "182*2563" },
  A5: { cutSize: "148*210", workSize: "154*216" },
};

function formatNumberWithCommas(number: any) {
  // 숫자가 유효한지 확인합니다.
  if (isNaN(number)) {
    return "0";
  }

  // 숫자를 정수로 변환한 후 문자열로 변환하여 콤마를 추가합니다.
  var integerPart = Math.floor(number);
  return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#e57373" : "#d1d5db", // 연한 빨간색
    boxShadow: state.isFocused ? "0 0 0 1px #e57373" : "none",
    "&:hover": {
      borderColor: "#e57373",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e57373"
      : state.isFocused
      ? "#ffcdd2"
      : "white",
    color: state.isSelected ? "white" : "#333",
    "&:active": {
      backgroundColor: "#ef9a9a",
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#333",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#333",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: "#7d7d7d",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#e57373",
    "&:hover": {
      color: "#ef9a9a",
    },
  }),
};

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollY > sectionTop - window.innerHeight &&
          scrollY < sectionTop + sectionHeight
        ) {
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

  const [binding, setBinding] = useState<OptionType | null>({
    value: "wireBinding",
    label: "무선제본",
  });
  const [coverPaper, setCoverPaper] = useState<OptionType | null>({
    value: "snow",
    label: "스노우지",
  });
  const [coverWeight, setCoverWeight] = useState<OptionType | null>({
    value: "180",
    label: "180g",
  });
  const [coverCoating, setCoverCoating] = useState<OptionType | null>({
    value: "",
    label: "코팅없음",
  });
  const [innerPaper, setInnerPaper] = useState<OptionType | null>({
    value: "ivoryMosaic",
    label: "미색모조",
  });
  const [innerWeight, setInnerWeight] = useState<OptionType | null>({
    value: "80",
    label: "80g",
  });
  const [innerPrinting, setInnerPrinting] = useState<OptionType | null>({
    value: "doubleBlack",
    label: "양면흑백",
  });
  //const [outPrinting, setOutPrinting] = useState<OptionType | null>({ value: "doubleBlack", label: "양면흑백" });
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const [selectedSize, setSelectedSize] = useState<OptionType | null>({
    value: "A4",
    label: "A4(210mm X 297mm)",
  });
  const [quantity, setQuantity] = useState<OptionType>({
    value: "20",
    label: "20부",
  });

  const [coverPages, setCoverPages] = useState(4);
  const [innerPages, setInnerPages] = useState(52);

  const generateInnerPageOptions = () => {
    let options = [];
    for (let i = 52; i <= 1000; i += 2) {
      options.push({ value: i.toString(), label: `${i}페이지` });
    }
    return options;
  };

  const innerPageOptions = generateInnerPageOptions();

  const sizeOptions: OptionType[] = [
    { value: "A4", label: "A4(210mm X 297mm)" },
    { value: "A5", label: "A5(148mm X 210mm)" },
    { value: "B5", label: "B5(188mm X 257mm)" },
  ];

  const quantityOptions: OptionType[] = [
    { value: "10", label: "10부" },
    { value: "20", label: "20부" },
    { value: "30", label: "30부" },
    { value: "50", label: "50부" },
    { value: "100", label: "100부" },
    { value: "150", label: "150부" },
    { value: "200", label: "200부" },
    { value: "250", label: "250부" },
    { value: "300", label: "300부" },
    { value: "400", label: "400부" },
    { value: "500", label: "500부" },
    { value: "1000", label: "1000부" },
  ];

  const bindingOptions: OptionType[] = [
    { value: "wireBinding", label: "무선제본" },
    { value: "springBinding", label: "스프링제본(트윈링)" },
  ];

  const coverPaperOptions: OptionType[] = [
    { value: "snow", label: "스노우지" },
    { value: "art", label: "아트지" },
    { value: "rendezvous", label: "랑데부지" },
  ];

  const getCoverWeightOptions = (
    paperType: string | undefined
  ): OptionType[] => {
    switch (paperType) {
      case "rendezvous":
        return [
          { value: "190", label: "190g" },
          { value: "210", label: "210g" },
          { value: "240", label: "240g" },
        ];
      case "snow":
        return [
          { value: "180", label: "180g" },
          { value: "200", label: "200g" },
          { value: "250", label: "250g" },
          { value: "300", label: "300g" },
        ];
      case "art":
        return [
          { value: "180", label: "180g" },
          { value: "200", label: "200g" },
          { value: "250", label: "250g" },
          { value: "300", label: "300g" },
        ];
      default:
        return [];
    }
  };

  const coverCoatingOptions: OptionType[] = [
    { value: "", label: "코팅없음" },
    { value: "singleMatteCoating", label: "단면무광코팅" },
    { value: "singleGlossCoating", label: "단면유광코팅" },
  ];

  const innerPaperOptions: OptionType[] = [
    { value: "ivoryMosaic", label: "미색모조" },
    { value: "whiteMosaic", label: "백색모조" },
    { value: "newPlus", label: "뉴플러스지" },
  ];

  const getInnerWeightOptions = (
    paperType: string | undefined
  ): OptionType[] => {
    switch (paperType) {
      case "ivoryMosaic":
      case "whiteMosaic":
      case "newPlus":
        return [
          { value: "80", label: "80g" },
          { value: "100", label: "100g" },
        ];
      default:
        return [];
    }
  };

  const innerPrintingOptions: OptionType[] = [
    { value: "doubleBlack", label: "양면흑백" },
    { value: "doubleColor", label: "양면칼라" },
  ];

  // 선택된 옵션과 일치하는 데이터 찾기
  function findMatchingData(options: any, selectedSize: string) {
    let data;
    switch (selectedSize) {
      case "A4":
        data = data_a4;
        break;
      case "A5":
        data = data_a5;
        break;
      case "B5":
        data = data_b5;
        break;
      default:
        data = data_a4;
    }

    const parseOption = { ...options };
    delete parseOption["pages"];
    delete parseOption["quantity"];

    return data.find((item: any) => {
      const itemOptions = item.options;
      return Object.entries(parseOption).every(([key, value]) => {
        if (Array.isArray(itemOptions[key])) {
          return itemOptions[key].includes(value);
        }
        return itemOptions[key] === value;
      });
    });
  }

  function findXAxisIndex(xAxis: number[], pages: number): number {
    // pages가 최소값(여기서는 50)보다 작은 경우
    if (pages < xAxis[0]) {
      return 0;
    }

    // 각 범위의 시작점을 기준으로 인덱스 결정
    for (let i = 0; i < xAxis.length; i++) {
      if (
        pages >= xAxis[i] &&
        (i === xAxis.length - 1 || pages < xAxis[i + 1])
      ) {
        return i;
      }
    }

    // 이 부분에 도달하면 안되지만, TypeScript를 위해 기본값 반환
    return xAxis.length - 1;
  }

  // y축 인덱스 찾기
  function findYAxisIndex(yAxis: any, quantity: any) {
    return yAxis.findIndex((value: any) => quantity <= value);
  }

  function calculatePrice(options: any, selectedSize: any) {
    const matchingData = findMatchingData(options, selectedSize);

    if (!matchingData) return null;

    const xIndex = findXAxisIndex(matchingData.xAxis, options.pages);
    const yIndex = findYAxisIndex(matchingData.yAxis, options.quantity);

    console.log(matchingData, "matchingData");
    console.log(xIndex, "xindex");
    console.log(yIndex, "yIndex");

    let price = matchingData.values[yIndex][xIndex];

    console.log(price, "price::::");

    // 100페이지 미만일 경우 나누기 연산
    // if (options.pages < 100) {
    //   price = price / matchingData.xAxis[xIndex];
    // }

    // 소수점 둘째 자리까지 반올림
    return price;
  }

  useEffect(() => {
    const price = calculatePrice(
      {
        binding: binding?.value,
        coverPaper: coverPaper?.value,
        coverWeight: coverWeight?.value,
        coverCoating: coverCoating?.value,
        innerPaper: innerPaper?.value,
        innerWeight: innerWeight?.value,
        innerPrinting: innerPrinting?.value,
        quantity: parseInt(quantity.value),
        pages: innerPages,
      },
      selectedSize?.value
    );
    setEstimatedPrice(price || 0);
  }, [
    binding,
    coverPaper,
    coverWeight,
    coverCoating,
    innerPaper,
    innerWeight,
    innerPrinting,
    quantity,
    innerPages,
    selectedSize,
  ]);

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
      <section
        id="calc"
        className="px-4 sm:px-6 lg:px-8 py-6 sm:py-16 mt-[48px] bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="w-full mb-6 rounded-lg overflow-hidden">
            <div className="flex flex-col">
              <div className="flex">
                <div className="w-1/2 h-[150px] xs:h-[200px] sm:h-[300px] lg:h-[400px] relative">
                  <Image
                    src={book01}
                    alt="Book cover example 1"
                    layout="fill"
                    objectFit="contain"
                    className="bg-gray-100"
                  />
                </div>
                <div className="w-1/2 h-[150px] xs:h-[200px] sm:h-[300px] lg:h-[400px] relative">
                  <Image
                    src={book02}
                    alt="Book cover example 2"
                    layout="fill"
                    objectFit="contain"
                    className="bg-gray-100"
                  />
                </div>
                <div className="w-1/2 h-[150px] xs:h-[200px] sm:h-[300px] lg:h-[400px] relative">
                  <Image
                    src={book03}
                    alt="Book cover example 3"
                    layout="fill"
                    objectFit="contain"
                    className="bg-gray-100"
                  />
                </div>
                <div className="w-1/2 h-[150px] xs:h-[200px] sm:h-[300px] lg:h-[400px] relative">
                  <Image
                    src={book04}
                    alt="Book cover example 4"
                    layout="fill"
                    objectFit="contain"
                    className="bg-gray-100"
                  />
                </div>
              </div>

              {/* 안내 문구 영역 */}
              <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-md">
                <p className="text-center text-lg font-semibold text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">
                  추가할 안내문구
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column */}
            <div className="lg:w-2/3">
              {/* 기본정보 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 bg-[#bd1f2b] text-white p-2">
                  기본정보
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      규격
                    </label>
                    <Select
                      isSearchable={false}
                      options={sizeOptions}
                      value={selectedSize}
                      onChange={(option) => setSelectedSize(option)}
                      styles={customStyles}
                    />
                  </div>
                  {selectedSize && (
                    <div className="bg-gray-100 p-4 rounded-md">
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left font-semibold">규격</th>
                            <th className="text-left font-semibold">
                              재단사이즈
                            </th>
                            <th className="text-left font-semibold">
                              작업사이즈
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{selectedSize.value}</td>
                            <td>
                              {
                                sizeInfo[
                                  selectedSize.value as keyof typeof sizeInfo
                                ].cutSize
                              }
                            </td>
                            <td>
                              {
                                sizeInfo[
                                  selectedSize.value as keyof typeof sizeInfo
                                ].workSize
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      수량
                    </label>
                    <Select
                      isSearchable={false}
                      options={quantityOptions}
                      value={quantity}
                      onChange={(option) => setQuantity(option as OptionType)}
                      styles={customStyles}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      제본
                    </label>
                    <Select
                      isSearchable={false}
                      options={bindingOptions}
                      value={binding}
                      onChange={(option) => setBinding(option)}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>

              {/* 표지 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 bg-[#bd1f2b] text-white p-2">
                  표지
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        용지
                      </label>
                      <Select
                        isSearchable={false}
                        options={coverPaperOptions}
                        value={coverPaper}
                        onChange={(option) => setCoverPaper(option)}
                        styles={customStyles}
                      />
                    </div>
                    <div className="sm:w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0 mobile:hidden">
                        평량
                      </label>
                      <Select
                        isSearchable={false}
                        options={getCoverWeightOptions(coverPaper?.value)}
                        value={coverWeight}
                        onChange={(option) => setCoverWeight(option)}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      페이지
                    </label>
                    <input
                      type="number"
                      value={coverPages}
                      readOnly
                      className="w-full px-3 py-2 border rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      코팅
                    </label>
                    <Select
                      isSearchable={false}
                      options={coverCoatingOptions}
                      value={coverCoating}
                      onChange={(option) => setCoverCoating(option)}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>

              {/* 내지 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 bg-[#bd1f2b] text-white p-2">
                  내지
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        용지
                      </label>
                      <Select
                        options={innerPaperOptions}
                        value={innerPaper}
                        onChange={(option) => setInnerPaper(option)}
                        styles={customStyles}
                      />
                    </div>
                    <div className="sm:w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0 mobile:hidden">
                        평량
                      </label>
                      <Select
                        options={getInnerWeightOptions(innerPaper?.value)}
                        value={innerWeight}
                        onChange={(option) => setInnerWeight(option)}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      페이지
                    </label>
                    <Select
                      isSearchable={false}
                      options={innerPageOptions}
                      value={innerPageOptions.find(
                        (option) => option.value === innerPages.toString()
                      )}
                      onChange={(option) =>
                        setInnerPages(Number(option?.value))
                      }
                      styles={customStyles}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      인쇄도수
                    </label>
                    <Select
                      isSearchable={false}
                      options={innerPrintingOptions}
                      value={innerPrinting}
                      onChange={(option) => setInnerPrinting(option)}
                      styles={customStyles}
                    />
                  </div>
                  <div className="text-sm text-[#bd1f2b]">
                    50페이지 미만 별도 문의
                  </div>
                  <div className="mt-8 sm:mt-12 text-center bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg">
                    <span className="text-xl font-medium text-gray-700 mr-2">
                      면지 추가
                    </span>
                    <span className="text-xl text-[#bd1f2b]">별도 문의</span>
                  </div>
                  <div className="flex items-center"></div>
                  <div className="mt-8 sm:mt-12 text-center bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg">
                    <p className="text-base sm:text-lg md:text-xl mb-2 text-[#212121] mb-[0px]">
                      후가공 - 별도 문의
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:w-1/3">
              <div className="bg-gray-100 p-4 rounded-lg sticky top-[120px]">
                <h3 className="text-xl font-semibold mb-4 text-[#bd1f2b]">
                  예상견적 금액
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>인쇄비</span>
                    <span>{formatNumberWithCommas(estimatedPrice)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>제본비</span>
                    <span>포함</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#bd1f2b]">
                    <span>합계(VAT별도)</span>
                    <span>{formatNumberWithCommas(estimatedPrice)}원</span>
                  </div>
                </div>
                <button className="w-full bg-[#bd1f2b] text-white py-2 px-4 rounded hover:bg-red-300 transition-colors mt-4">
                  문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="home"
        className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white"
      >
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#212121] my-font">
              교육교재, 학원교재
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#212121] mb-2 sm:mb-4 my-font">
              이제는 <span className="text-[#bd1f2b]">디지털 인쇄</span>로
              진행해보세요
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-1 sm:mb-2">
              디지털 윤전의 품질보다 고퀄리티의 품질!
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600">
              디지털 윤전보다 저렴한 금액!
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600">
              가격과 품질 두마리 다잡았다!!
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600">
              고객을 만족 시키는 성일과 함께 하세요
            </p>
          </div>
          {/* <div className="w-full aspect-video max-w-2xl mx-auto">
            <div className="w-full h-full bg-gradient-to-br from-[#bd1f2b] to-[#8a1720] flex justify-center items-center rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-white text-3xl sm:text-lg md:text-xl lg:text-5xl font-bold">
                고품질 디지털 인쇄
              </span>
            </div>
          </div> */}
          <div className="w-full max-w-5xl mx-auto relative py-10 px-4">
            <div className="bg-[#FFA500] rounded-lg shadow-2xl overflow-hidden relative h-[500px] sm:h-[500px] mobile:h-72 w-full">
              <div className="absolute inset-0">
                <Image
                  src={print03}
                  alt="배경 이미지"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-10"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-center">
                  고품질 인쇄
                </h2>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                  다운된 가격
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-1/2 max-w-[500px] min-w-[300px] transform translate-y-1/4 sm:translate-y-1/4 lg:translate-x-1/4 mobile:hidden">
              <div
                className="relative w-full"
                style={{ paddingBottom: "160%" }}
              >
                <Image
                  src={print02}
                  alt="프린터 이미지 2"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div
                className="relative w-full"
                style={{
                  paddingBottom: "100%",
                  marginTop: "-105%",
                }}
              >
                <Image
                  src={print01}
                  alt="프린터 이미지 1"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-[#326bb4] my-font">
            접수 가능 파일
          </h2>
          <div className="flex flex-row justify-center items-center space-x-4 sm:space-x-8">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-cyan-300 rounded-bl-full opacity-50"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-600 relative z-10">
                PDF
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                고품질 문서
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 rounded-bl-full opacity-50"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 relative z-10">
                JPG
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                선명한 이미지
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#326bb4] my-font">
                포토샵 작업시 주의 사항
              </h2>
              <p className="text-lg sm:text-xl text-cyan-700 mb-4 sm:mb-6">
                PDF로 저장시 글씨는 래스터화 해주세요
              </p>
              <ul className="text-base sm:text-lg text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  글꼴 래스터화
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
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
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#8c4b99] my-font">
              해상도 & 색상모드
            </h3>
            <div className="mb-8 sm:mb-12">
              <p className="text-xl sm:text-2xl md:text-3xl text-center font-semibold mb-4 text-cyan-700">
                300dpi(픽셀/인치) 이상, CMYK
              </p>
              <div
                className="w-full relative"
                style={{ paddingBottom: "23.96%" }}
              >
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
                  <Image
                    src={img05}
                    alt="img_05"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg shadow-xl"
                  />
                </div>
                <p className="text-xl font-semibold text-cyan-700">300dpi</p>
                <p className="text-lg text-gray-600">선명한 화질</p>
              </div>
              <div className="text-center">
                <div className="w-80 h-80 sm:w-96 sm:h-96 relative mb-6">
                  <Image
                    src={img04}
                    alt="img_04"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg shadow-xl"
                  />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#326bb4] my-font">
              일러스트 작업시 주의 사항
            </h2>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-center text-cyan-700">
            모든 이미지는 연결(링크)포함 적용해주세요
          </p>
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-xl">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-700">
                  이미지(링크)포함전 사진
                </h4>
                <div
                  className="w-full relative"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={img01}
                    alt="img_01"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-xl">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-700">
                  이미지 포함 방법
                </h4>
                <div
                  className="w-full relative"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={img02_01}
                    alt="img02_01"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-xl">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-700">
                  이미지(링크)포함 후 사진
                </h4>
                <div
                  className="w-full relative"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={img02}
                    alt="img_02"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 text-center bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg">
              <p className="text-base sm:text-lg md:text-xl mb-2 text-[#212121] mb-[0px]">
                오른쪽 상단의 ▼삼선표시 누르시면 -&gt; 이미지포함을 클릭하시면
                됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="outline" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-[#8c4b99] my-font">
            윤곽선 만들기 (일러스트)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-cyan-700">
                텍스트 아웃라인 전
              </h3>
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
              <h3 className="text-xl font-semibold mb-4 text-cyan-700">
                텍스트 아웃라인 후
              </h3>
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
            <h3 className="text-xl font-semibold mb-4 text-cyan-700">
              윤곽선 만들기 방법
            </h3>
            <div
              className="relative max-w-2xl mx-auto"
              style={{ paddingBottom: "56.25%" }}
            >
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
            <p className="text-lg sm:text-xl md:text-2xl text-[#212121] mb-2">
              문자 -&gt; 윤곽선 만들기
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              (단축키: Shift+Ctrl+O)
            </p>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mt-8 text-center text-cyan-700 font-semibold">
            윤곽선만들기(일러스트) 적용 / 검정색 글자 K100으로 지정
          </p>
        </div>
      </section>

      <section id="background" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-[#8c4b99] my-font">
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
              <div
                className="relative w-full max-w-xl mx-auto"
                style={{ paddingBottom: "40%" }}
              >
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
                <p className="mt-2 text-cyan-700 font-semibold">
                  중복인쇄 체크 해제
                </p>
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
                <p className="mt-2 text-cyan-700 font-semibold">
                  중복인쇄 체크
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="guidelines" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center text-[#326bb4] my-font">
            안내사항
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-[#326bb4]">
                파일접수전 주의사항
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600">
                <li>교정확인(오탈자, 띄어쓰기, 페이지번호등등)을 해주세요</li>
                <li>
                  책자사이즈는 원하시는 사이즈로 작업이 되었는지 확인해주세요
                </li>
                <li>재단여분(도련)까지 배경이 채워주셔야 합니다.</li>
                <li>해상도와 색상모드는 300dpi CMYK가 맞는지 확인해주세요</li>
                <li>중복인쇄 체크는 해제 해주세요</li>
                <li>이미지가 유실되거나 수정하지 않으셨는지 확인해주세요</li>
                <li>
                  {`글씨는 아웃라인으로 해주세요 글씨가 활성화 되어있으면 파일을 열었을때 저희가->(당사) 없는 서체일경우 글씨가 바뀔수 있습니다.`}
                </li>
                <li>
                  검정색 글씨는 K100 으로 해주세요 (색상이 섞이면 검정색이
                  깨끗하게 나오지 않습니다.)
                </li>
                <li>
                  본문 내용은 재단선 안쪽으로 여유를(15mm이상) 두고 작업하셔야
                  합니다.
                </li>
                <li>
                  재단선 가까이 내용이 있으면 재단시 잘릴수 있으니 참고 해주세요
                </li>
                <li>4도인쇄물이기 때문에 별색지정하시면 안됩니다.</li>
                <li>
                  검정색 배경이미지를 원하시면 K100+C10~20%로 지정해주세요
                </li>
                <li>인쇄할 때마다 색상차이는 있을수 있습니다.</li>
                <li>
                  같은데이터라도 작업날짜가 다르면 약간의 색감차이가 있는 부분
                  참고해주세요
                </li>
                <li>모니터 색상과 인쇄 출력 색상은 다르게 보일수 있습니다.</li>
                <li>
                  무선제본의 경우에 풀칠로 인해서 책이 완전히 펼쳐지지 않기
                  때문에 중간에 그림이나 글씨가 삽입이 될 경우 겹치는 부분이
                  재단여분을 포함해서 5mm정도 작업을 해주셔야 합니다.
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-cyan-700">
                배송정보
              </h3>
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2 text-gray-700">
                  택배배송
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600">
                  <li>도서, 산간, 오지 일부는 배송료가 추가됩니다.</li>
                  <li>
                    배송은 발송일로부터 1~2일정도 소요됩니다. (주말, 공휴일
                    제외)
                  </li>
                  <li>
                    연휴나 명절같은 배송량이 증가되는 시기에는 배송업체의 사정에
                    따라 기간이 변동 될 수 있습니다.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-700">
                  퀵배송/방문수령
                </h4>
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
