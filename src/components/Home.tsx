import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  useFloating,
  offset,
  autoUpdate,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import logo from "../../public/logo.svg";
import compass from "../../public/compass.svg";

/*
TODO: 
1. For smaller screens, make the theme toggler drawer
*/

export default function Home() {
  // * Hooks
  // theme - light or dark
  const [theme, setTheme] = useState<null | string>(null);
  // is the theme toggle open or not
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // useFloating hook, provides context, styles and references to the floating components and triggers
  const { refs, floatingStyles, context } = useFloating({
    // whether the popover is open or not
    open: isOpen,
    middleware: [offset(10)],
    // Makes sure the popover's position is updated
    whileElementsMounted: autoUpdate,
    // What to do when popover is triggered
    onOpenChange: setIsOpen,
  });

  // Allows for the clicking of esc or tapping elsewhere to close the popover
  const dismiss = useDismiss(context);

  // Adds ARIA attributes
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  // when component is mounted
  useEffect(() => {
    // if it's darkmode
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      // then set the theme to dark
      localStorage.theme = "dark";
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      //otherwise leave it light
      localStorage.theme = "light";
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // theme toggle
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
    <div className="text-black dark:text-white h-full min-h-screen w-full min-w-screen min-w-screen dark:bg-slate-950 bg-slate-50">
      {/* navbar */}
      <nav className="flex w-full h-16 items-center md:justify-normal justify-center">
        {/* logo */}
        <div className="md:ml-8">
          <a href="/">
            <img src={logo} className="h-12" />
          </a>
        </div>
        {/* Theme toggle */}
        <div className="flex-grow md:grid px-20 hidden">
          <button
            className="justify-self-end"
            // * When button clicked, make theme toggle visible
            onClick={() => setIsOpen(!isOpen)}
            // * Context, props, ref to this component...
            ref={refs.setReference}
            {...getReferenceProps}
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 stroke-yellow-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 stroke-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </button>
          {isOpen && (
            // * Theme Toggle: FloatingFocusManager component manages focus
            <FloatingFocusManager context={context} modal={false}>
              <div
                // * Again, props, ref and styling
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="w-60 h-24 dark:bg-slate-900 bg-slate-200 border-none md:flex p-2 rounded-lg shadow-lg hidden"
              >
                <span className="self-center">Light</span>
                {/* Button that rotates when clicked and toggles theme */}
                <motion.button
                  className="h-16 flex-grow mx-6 self-center flex"
                  onClick={toggleTheme}
                  animate={{ rotate: theme === "dark" ? 0 : 180 }}
                >
                  <img src={compass} className="self-center" />
                </motion.button>
                <span className="self-center">Dark</span>
              </div>
            </FloatingFocusManager>
          )}
        </div>
        <div className="mr-4 md:inline hidden">
          <a href="/about" className="m-4">
            About
          </a>
          <a href="/explore" className="m-4 md:inline hidden">
            Explore
          </a>
        </div>
      </nav>
    </div>
  );
}
