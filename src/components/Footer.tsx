
export function Footer() {
  return (
    <footer className="bg-black px-6 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-xl font-bold text-white">SiteHarvester</span>
          </div>
          <p className="text-gray-500 text-center text-sm">
            Built with LangGraph • Under Active Development
          </p>
        </div>
      </div>
    </footer>
  );
}