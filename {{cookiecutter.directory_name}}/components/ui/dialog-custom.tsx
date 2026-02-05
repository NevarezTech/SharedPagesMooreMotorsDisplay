import {
  FC,
  ReactNode,
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
  isValidElement,
  cloneElement,
} from "react";
import { X } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogTriggerProps {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

const DialogContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const Dialog: FC<DialogProps> = ({ children, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger: FC<DialogTriggerProps> = ({
  asChild = false,
  children,
  className = "",
}) => {
  const { setIsOpen } = useContext(DialogContext);

  const handleClick = () => {
    setIsOpen(true);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...(children.props as any),
      onClick: handleClick,
    });
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

const DialogContent: FC<DialogContentProps> = ({
  children,
  className = "",
}) => {
  const { isOpen, setIsOpen } = useContext(DialogContext);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" />

      {/* Dialog */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-50 grid w-full max-w-lg gap-4 border border-gray-200 bg-white text-gray-900 p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 sm:rounded-lg md:w-full",
          className,
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 text-gray-500 hover:text-gray-700 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogHeader: FC<DialogHeaderProps> = ({ children, className = "" }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
  >
    {children}
  </div>
);

const DialogFooter: FC<DialogFooterProps> = ({ children, className = "" }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
  >
    {children}
  </div>
);

const DialogTitle: FC<DialogTitleProps> = ({ children, className = "" }) => (
  <h3
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
  >
    {children}
  </h3>
);

const DialogDescription: FC<DialogDescriptionProps> = ({
  children,
  className = "",
}) => <p className={cn("text-sm text-gray-500", className)}>{children}</p>;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
