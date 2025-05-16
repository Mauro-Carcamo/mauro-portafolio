import { PERSONAL_INFO } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-xl mb-2">{PERSONAL_INFO.name.split(" ")[0]} {PERSONAL_INFO.name.split(" ")[1]}</h3>
            <p className="text-gray-300">{PERSONAL_INFO.title}</p>
          </div>
          
          <div className="text-center md:text-right">
            <p>&copy; {currentYear} {PERSONAL_INFO.name.split(" ")[0]} {PERSONAL_INFO.name.split(" ")[1]}. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
