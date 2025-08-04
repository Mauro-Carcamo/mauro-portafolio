import { FaWhatsapp, FaGithub } from "react-icons/fa";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      <a
        href="https://wa.me/56990381919"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center text-xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        title="WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://github.com/maurocarcamo"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center text-xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        title="GitHub"
      >
        <FaGithub />
      </a>
    </div>
  );
}
