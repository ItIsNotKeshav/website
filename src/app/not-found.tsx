export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF4ED]">
      <div className="text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <h1
          className="mb-4 text-6xl font-bold text-[#1E2A3B]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          404
        </h1>
        <p className="mb-6 text-xl text-[#526070]">Page not found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 font-bold text-sm tracking-widest uppercase text-[#FFF4ED] bg-[#232629] border-4 border-[#232629] hover:bg-[#D63232] hover:border-[#D63232] transition-colors"
        >
          Return to Home →
        </a>
      </div>
    </div>
  );
}
