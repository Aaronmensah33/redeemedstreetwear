
export default function Footer() {
  return (
    <footer className="bg-white text-black py-6 mt-14 shadow-sm">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: copyright */}
        <p className="text-sm">&copy; 2024 Redeemed Streetwear. All rights reserved.</p>
        {/* Right: social media links */}
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/redeemedstreetwear/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
            Instagram
          </a> 
          </div>
      </div>
    </footer>
  );
}