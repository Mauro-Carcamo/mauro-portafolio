import { Download, University, Code, Cog, Brain, Users, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const studies = [
  {
    title: "Diplomado en Data Science",
    institution: "Universidad Católica de Chile",
    date: "2022 | Nota: 6,4",
    icon: University,
    iconColor: "bg-blue-500",
    certificate: "/attached_assets/Certificado Diplomado_1754333919792.pdf"
  },
  {
    title: "Full Stack Python Trainee",
    institution: "Talento Digital - Bootcamp",
    date: "2023 | 462 horas",
    icon: Code,
    iconColor: "bg-green-500",
    certificate: "/attached_assets/Full Stack Python Certificado_1754333919795.pdf"
  },
  {
    title: "Metodologías Ágiles y Lean",
    institution: "UC - Teleduc",
    date: "2022 | Nota: 6,2",
    icon: Cog,
    iconColor: "bg-cyan-500",
    certificate: "/attached_assets/Certificado Metodologia Agil_1754333919793.pdf"
  },
  {
    title: "Especialización Ciencia de Datos",
    institution: "SENCE - Reconversión Laboral",
    date: "2024 | 166 horas",
    icon: Brain,
    iconColor: "bg-amber-500",
    certificate: "/attached_assets/Legal Ciencia de Datos_1754333919797.pdf"
  },
  {
    title: "Título de Sociólogo",
    institution: "Universidad Central de Chile",
    date: "2015",
    icon: Users,
    iconColor: "bg-gray-500",
    certificate: "/attached_assets/Certificado Profesion_1754333919793.pdf"
  },
  {
    title: "Green Digital Skills",
    institution: "INCO Academy - LinkedIn",
    date: "2024 | 24 horas",
    icon: Leaf,
    iconColor: "bg-emerald-500",
    certificate: "/attached_assets/Green digital Skills Mauricio Carcamo_1754333919796.pdf"
  }
];

export default function Studies() {
  return (
    <section id="estudios" className="py-20 bg-[var(--light-bg)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--accent-color)] mb-4 relative">
            Formación Académica
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[var(--primary-color)] rounded"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studies.map((study, index) => {
            const Icon = study.icon;
            return (
              <Card
                key={index}
                className="study-card bg-white border-0 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`${study.iconColor} text-white rounded-lg p-3 flex-shrink-0`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-[var(--accent-color)] text-lg mb-1">
                        {study.title}
                      </h3>
                      <p className="text-[var(--primary-color)] font-medium mb-1">
                        {study.institution}
                      </p>
                      <p className="text-[var(--accent-color)]/70 text-sm">
                        {study.date}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-[var(--secondary-color)] text-[var(--accent-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300"
                      onClick={() => window.open(study.certificate, "_blank")}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
