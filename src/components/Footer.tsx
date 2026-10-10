export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-10 sm:mt-12">
      <div className="max-w-6xl mx-auto px-4 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-gray-600">
          <span className="font-semibold text-gray-800">বাজার দর</span> — প্রয়োজনীয়
          পণ্যের দাম এক নজরে।
        </p>
        <p className="text-[10px] sm:text-xs text-gray-400">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}