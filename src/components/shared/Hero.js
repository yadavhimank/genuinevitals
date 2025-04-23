"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0  z-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('/istockphoto.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        />

        {/* Animated gradient shapes */}
        <motion.div
          initial={{ opacity: 0.2, x: "-10%" }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            x: ["0%", "5%", "0%"],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-20 left-0 w-[60%] h-[60%] rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 blur-[100px] -z-10"
        />
        <motion.div
          initial={{ opacity: 0.2, x: "10%" }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            x: ["0%", "-5%", "0%"],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute bottom-20 right-0 w-[50%] h-[50%] rounded-full bg-gradient-to-r from-blue-600/20 to-primary/20 blur-[100px] -z-10"
        />

        {/* Grid pattern overlay */}
      </div>

      <div className="container mx-auto px-4 z-10 mt-16">
        <div className="max-w-3xl  text-black p-8 rounded-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-sm md:text-base uppercase tracking-wider text-[#dae1e3] font-semibold mb-2 md:mb-4">
              The Future of Supplements
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight"
          >
            Fuel the Beast. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 ">
              Train for the Future.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl"
          >
            Cutting-edge supplements engineered with advanced formulas to push
            your performance beyond limits. Backed by science, designed for
            results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products">
              <Button variant="glow" size="lg" className="text-base md:text-lg">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                variant="outline"
                size="lg"
                className="text-base md:text-lg bg-background/10 backdrop-blur-sm border-primary/50 hover:bg-background/20 hover:border-primary text-white"
              >
                Explore Categories
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="particles"
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              className="particle absolute bg-white/10 rounded-full"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -(Math.random() * 100 + 50)],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
