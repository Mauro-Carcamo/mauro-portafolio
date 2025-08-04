import { useState } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  libraries: string[];
  slug: string;
  details: {
    overview: string;
    features: string[];
    challenges: string[];
    results: string[];
  };
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--accent-color)]">
            {project.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-[var(--primary-color)]">
                Descripción del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--accent-color)]/80 leading-relaxed">
                {project.details.overview}
              </p>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-[var(--primary-color)]">
                Tecnologías Utilizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.libraries.map((library) => (
                  <span 
                    key={library} 
                    className="px-3 py-1 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium"
                  >
                    {library}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-[var(--primary-color)]">
                Características Principales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    <span className="text-[var(--accent-color)]/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-[var(--primary-color)]">
                Desafíos Técnicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.details.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    <span className="text-[var(--accent-color)]/80">{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-[var(--primary-color)]">
                Resultados y Logros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.details.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    <span className="text-[var(--accent-color)]/80">{result}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              className="bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90 flex-1"
              onClick={() => window.open("https://github.com/maurocarcamo", "_blank")}
            >
              <Github className="mr-2 h-4 w-4" />
              Ver en GitHub
            </Button>
            <Button
              variant="outline"
              className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white flex-1"
              onClick={() => window.open("#", "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo en Vivo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}