"use client";

import React from "react";

const FooterSection = ({ items }: any) => (
  <div className="w-full md:w-1/2 mb-4 md:mb-0">
    <ul>
      {items.map((item: any, index: number) => (
        <li key={index} className="mb-1">
          {typeof item === "object" && item.link ? (
            <a href={item.link} className="text-gray-400 text-sm hover:text-gray-300">
              {item.text}
            </a>
          ) : (
            <span className="text-gray-400 text-sm">{item}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const companyInfo = [
    "상호: 성일씨앤피",
    "대표이사: 정환석",
    { text: "전화번호: 070-4035-5752", link: "tel:070-4035-5752" },
    "팩스: 02-2272-5649",
    { text: "이메일: sungil5647@hanmail.net", link: "mailto:sungil5647@hanmail.net" },
  ];

  const addressInfo = [
    "주소: 서울시 중구 충무로4길 2 정화빌딩 201호",
    "사업등록번호: 214-14-06105",
    "통신사업자등록번호: 중구 07644호",
  ];

  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-2">
          <FooterSection items={companyInfo} />
          <FooterSection items={addressInfo} />
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4 text-xs text-center">
          <p>© 2024 성일씨앤피. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
