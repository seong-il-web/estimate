export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">회사</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  회사 소개 내용 출력
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-sm">
          <p>© 2024 성일씨앤피. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
