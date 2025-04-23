"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    categories: false,
    profile: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories", hasDropdown: true },
    { name: "About", path: "/about" },
  ];

  const categoryDropdown = [
    { name: "Protein", path: "/categories/protein" },
    { name: "Pre-Workout", path: "/categories/pre-workout" },
    { name: "Creatine", path: "/categories/creatine" },
    { name: "Mass Gainers", path: "/categories/mass-gainers" },
    { name: "BCAAs", path: "/categories/bcaas" },
    { name: "Vitamins & Minerals", path: "/categories/vitamins-minerals" },
  ];

  const profileDropdown = [
    { name: "Dashboard", path: "/account", icon: "User" },
    { name: "Profile", path: "/account/profile", icon: "User" },
    { name: "Orders", path: "/account/orders", icon: "ShoppingBag" },
    { name: "Settings", path: "/account/settings", icon: "Settings" },
    { name: "Logout", path: "/logout", icon: "LogOut" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 shadow-md ${
        isScrolled
          ? "bg-background/70 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              FUTURIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => toggleDropdown("categories")}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen.categories && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 bg-card/80 backdrop-blur-md border border-border rounded-md shadow-lg p-2 z-50"
                      >
                        {categoryDropdown.map((category) => (
                          <Link
                            key={category.name}
                            href={category.path}
                            className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                            onClick={() =>
                              setIsDropdownOpen({
                                ...isDropdownOpen,
                                categories: false,
                              })
                            }
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* User and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <button
                className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => toggleDropdown("profile")}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {isDropdownOpen.profile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-card/80 backdrop-blur-md border border-border rounded-md shadow-lg p-2 z-50"
                  >
                    {profileDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors flex items-center gap-2"
                        onClick={() =>
                          setIsDropdownOpen({
                            ...isDropdownOpen,
                            profile: false,
                          })
                        }
                      >
                        {item.icon === "User" && <User className="h-4 w-4" />}
                        {item.icon === "ShoppingBag" && (
                          <ShoppingBag className="h-4 w-4" />
                        )}
                        {item.icon === "Heart" && <Heart className="h-4 w-4" />}
                        {item.icon === "MapPin" && (
                          <MapPin className="h-4 w-4" />
                        )}
                        {item.icon === "CreditCard" && (
                          <CreditCard className="h-4 w-4" />
                        )}
                        {item.icon === "Settings" && (
                          <Settings className="h-4 w-4" />
                        )}
                        {item.icon === "LogOut" && (
                          <LogOut className="h-4 w-4" />
                        )}
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/cart">
              <Button variant="ghost" className="relative p-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground/80 hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                    FUTURIX
                  </span>
                </Link>
                <button
                  className="text-foreground/80 hover:text-primary transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.name} className="space-y-2">
                      <button
                        className="flex items-center justify-between w-full text-lg font-medium"
                        onClick={() => toggleDropdown("categories")}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen.categories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 space-y-2"
                          >
                            {categoryDropdown.map((category) => (
                              <Link
                                key={category.name}
                                href={category.path}
                                className="block py-2 text-foreground/70 hover:text-primary transition-colors"
                                onClick={toggleMobileMenu}
                              >
                                {category.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.path}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  )
                )}

                <div className="space-y-2">
                  <button
                    className="flex items-center justify-between w-full text-lg font-medium"
                    onClick={() => toggleDropdown("profile")}
                  >
                    <span>Account</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen.profile && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 space-y-2"
                      >
                        {profileDropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.path}
                            className="block py-2 text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
                            onClick={toggleMobileMenu}
                          >
                            {item.icon === "User" && (
                              <User className="h-4 w-4" />
                            )}
                            {item.icon === "ShoppingBag" && (
                              <ShoppingBag className="h-4 w-4" />
                            )}
                            {item.icon === "Heart" && (
                              <Heart className="h-4 w-4" />
                            )}
                            {item.icon === "MapPin" && (
                              <MapPin className="h-4 w-4" />
                            )}
                            {item.icon === "CreditCard" && (
                              <CreditCard className="h-4 w-4" />
                            )}
                            {item.icon === "Settings" && (
                              <Settings className="h-4 w-4" />
                            )}
                            {item.icon === "LogOut" && (
                              <LogOut className="h-4 w-4" />
                            )}
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              <div className="mt-auto">
                <Link href="/cart" onClick={toggleMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full justify-between mt-8"
                  >
                    <span>View Cart</span>
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 text-xs flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </Link>
                <Link href="/login" onClick={toggleMobileMenu}>
                  <Button variant="default" className="w-full mt-4">
                    Login / Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
