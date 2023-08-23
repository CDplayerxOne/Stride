import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useFloating, offset } from "@floating-ui/react-dom";
import logo from "../../public/logo.svg";

export default function Home() {
  const [x, setX] = useState(100);
  const [theme, setTheme] = useState<null | string>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {} = useFloating({
    open: isOpen,
    middleware: [offset(10)],
  });

  useEffect(() => {
    if (
      !("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      localStorage.theme = "dark";
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggleTheme(): void {
    if (theme === "dark") {
      setTheme("light");
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <div className="text-black dark:text-white h-full min-h-screen w-full dark:bg-black bg-amber-50">
      <div className="flex w-full h-16 items-center">
        <div className="ml-8">
          <a href="/">
            <img src={logo} className="h-10" />
          </a>
        </div>
        <div className="flex-grow grid px-20">
          {/* <motion.div
            className="flex-grow h-4 rounded-full bg-red-200"
            animate={{
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }} */}
          <button className="justify-self-end" onClick={() => toggleTheme()}>
            {theme}
          </button>
        </div>
        <div className="mr-4">
          <a href="/about" className="m-4">
            About
          </a>
          <a href="/explore" className="m-4">
            Explore
          </a>
        </div>
      </div>
      <motion.div
        animate={{ x: x }}
        className="w-24 h-24 bg-red-200"
        onClick={() => {
          setX(x + 100);
        }}
      />
    </div>
  );
}
