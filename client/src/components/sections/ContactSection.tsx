import { useState } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { PERSONAL_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Github, 
  Twitter,
  CheckCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(3, { message: "El asunto debe tener al menos 3 caracteres" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form data:", data);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Mensaje enviado",
        description: "Gracias por tu mensaje, te responderé a la brevedad.",
        variant: "default",
      });
      
      form.reset();
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-16 section-bg-muted data-viz-bg relative">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>Contacto</SectionTitle>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="section-bg-light p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-xl mb-4 text-primary">Información de Contacto</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-secondary bg-opacity-10 p-3 rounded-full mr-4">
                  <MapPin className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Ubicación</h4>
                  <p className="text-gray-600">{PERSONAL_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary bg-opacity-10 p-3 rounded-full mr-4">
                  <Mail className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">{PERSONAL_INFO.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary bg-opacity-10 p-3 rounded-full mr-4">
                  <Phone className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Teléfono</h4>
                  <p className="text-gray-600">{PERSONAL_INFO.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary bg-opacity-10 p-3 rounded-full mr-4">
                  <Globe className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Sitio Web</h4>
                  <p className="text-gray-600">{PERSONAL_INFO.website}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-3">Redes Sociales</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary bg-opacity-10 p-3 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="https://github.com/Mauro-Carcamo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary bg-opacity-10 p-3 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary bg-opacity-10 p-3 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="section-bg-light p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-xl mb-4 text-primary">Enviar Mensaje</h3>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h4 className="text-xl font-medium text-center">¡Mensaje Enviado!</h4>
                <p className="text-gray-600 text-center mt-2">
                  Gracias por tu mensaje. Te responderé a la brevedad.
                </p>
                <Button 
                  className="mt-6"
                  onClick={() => setIsSubmitted(false)}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Asunto del mensaje" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Escribe tu mensaje aquí..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-accent text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
