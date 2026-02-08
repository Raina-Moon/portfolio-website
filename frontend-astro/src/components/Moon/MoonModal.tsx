import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { X } from "lucide-react";
import MoonPhaseBoard from "./MoonPhaseBoard";

const MoonScene = lazy(() => import("./MoonScene"));

interface MoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoonModal = ({ isOpen, onClose }: MoonModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative w-[min(96vw,980px)] rounded-2xl overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1 transition"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="w-full aspect-square">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    Loading...
                  </div>
                }
              >
                <MoonScene />
              </Suspense>
            </div>
            <MoonPhaseBoard className="moon-phase-board--modal" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoonModal;
