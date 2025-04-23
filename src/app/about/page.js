"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const teamMembers = [
  {
    name: "Dr. Raj Sharma",
    role: "Founder & CEO",
    image: "/doc_ram-murti-sharma2.jpg",
    bio: "Former professional athlete with a PhD in Nutritional Science, Dr. Sharma founded Futurix with a vision to create supplements that truly deliver results.",
  },
  {
    name: "Dr. Priya Patel",
    role: "Chief Scientific Officer",
    image: "/beautiful-african-america.webp",
    bio: "With over 15 years of research experience in biochemistry and sports nutrition, Dr. Patel leads our R&D team in formulating cutting-edge supplements.",
  },
  {
    name: "Vikram Mehta",
    role: "Head of Product Development",
    image: "/medium_Dr_Rajiv_Dang_e69a1f3903.jpeg",
    bio: "A fitness enthusiast with expertise in food science, Vikram ensures every Futurix product meets the highest standards of quality and effectiveness.",
  },
  {
    name: "Ananya Singh",
    role: "Nutrition Consultant",
    image: "/doc_ram-murti-sharma2.jpg",
    bio: "Certified nutritionist who works with professional athletes, Ananya brings real-world expertise to our supplement formulations.",
  },
];

const coreValues = [
  {
    title: "Science-Based Innovation",
    description:
      "Every formula is created based on peer-reviewed research and clinical studies.",
    icon: "🧪",
  },
  {
    title: "Maximum Transparency",
    description:
      "We disclose all ingredients and their precise dosages without proprietary blends.",
    icon: "🔍",
  },
  {
    title: "Ethical Sourcing",
    description:
      "Our ingredients are ethically sourced with respect for environmental sustainability.",
    icon: "🌱",
  },
  {
    title: "Continuous Improvement",
    description:
      "We constantly refine our formulas based on emerging research and customer feedback.",
    icon: "📈",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 -z-10" />
        <div
          className="absolute inset-0 opacity-10 -z-10"
          style={{
            backgroundImage: "url('/images/pattern-bg.svg')",
            backgroundSize: "cover",
          }}
        />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <div className="mb-6 inline-block text-sm font-medium text-primary">
                OUR STORY
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pioneering the Future of Nutrition and Performance
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Founded in 2019, Futurix was born from a simple belief:
                supplements should deliver real results, backed by science,
                without compromises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg">
                    View Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg">
                    Explore Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 rounded-lg overflow-hidden shadow-xl"
                >
                  <Image
                    src="/about1.jpg"
                    alt="Futurix Research Lab"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-card/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 animate-pulse" />
                <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-white">
                  <Image
                    src="/channels4_profile.jpg"
                    alt="Our Mission"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                At Futurix, we&apos;re driven by a clear mission: to develop
                innovative supplements that help athletes and fitness
                enthusiasts of all levels achieve their peak performance and
                optimal health.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      Advancing Nutritional Science
                    </h3>
                    <p className="text-muted-foreground">
                      We invest in research to stay at the cutting edge of
                      nutritional science and sports performance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Uncompromising Quality</h3>
                    <p className="text-muted-foreground">
                      We enforce strict quality control standards that exceed
                      industry requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      Empowering Through Education
                    </h3>
                    <p className="text-muted-foreground">
                      We believe in educating our customers about nutrition and
                      how our products help achieve their goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Our diverse team of scientists, athletes, and nutrition experts
              work together to create supplements that set new standards for
              quality and effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg overflow-hidden shadow-sm border border-border"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/images/placeholder-person.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              These principles guide every decision we make, from formulation to
              customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Quality Standards</h2>
              <p className="text-lg mb-8">
                Quality isn&apos;t just a buzzword at Futurix—it&apos;s the
                foundation of everything we do. Our supplements undergo rigorous
                testing and verification at every stage of production.
              </p>

              <div className="space-y-6">
                <div className="bg-card/40 border border-border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">Third-Party Tested</h3>
                  <p className="text-muted-foreground">
                    All our products are independently tested by accredited
                    laboratories to verify potency and purity.
                  </p>
                </div>

                <div className="bg-card/40 border border-border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">GMP Certified</h3>
                  <p className="text-muted-foreground">
                    Our manufacturing facilities follow Good Manufacturing
                    Practices to ensure consistent quality.
                  </p>
                </div>

                <div className="bg-card/40 border border-border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">
                    Clean Ingredient Profile
                  </h3>
                  <p className="text-muted-foreground">
                    We avoid artificial fillers, synthetic colors, and
                    unnecessary additives in all our formulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <Image
                src="/istockphoto-12.jpg"
                alt="Futurix Quality Testing Lab"
                width={600}
                height={500}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience the Futurix Difference
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of athletes and fitness enthusiasts who trust Futurix
            supplements to help them reach their goals.
          </p>
          <Link href="/products">
            <Button size="lg">
              Shop Our Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
