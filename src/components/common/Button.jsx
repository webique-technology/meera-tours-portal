"use client";

import { useState, forwardRef, isValidElement, cloneElement } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const detectIconType = (iconElement) => {
  if (!isValidElement(iconElement)) return "default";

  const iconName =
    iconElement.type?.displayName || iconElement.type?.name || "";

  if (iconName.toLowerCase().includes("arrowupright")) {
    return "arrowUpRight";
  }
  if (iconName.toLowerCase().includes("arrowright")) {
    return "arrowRight";
  }
  return "default";
};

const iconAnimation = {
  // for arrow up right aniamtion
  arrowUpRight: {
    primary: {
      initial: { x: 0, y: 0, opacity: 1 },
      hover: { x: 18, y: -18, opacity: 0 },
    },
    clone: {
      initial: { x: -18, y: 18, opacity: 0 },
      hover: { x: 0, y: 0, opacity: 1 },
    },
  },

  // for arrow right animtion
  arrowRight: {
    primary: {
      initial: { x: 0, opacity: 1 },
      hover: { x: 18, opacity: 0 },
    },
    clone: {
      initial: { x: -18, opacity: 1 },
      hover: { x: 0, opacity: 0 },
    },
  },

  default: {
    primary: {
      initial: { scale: 1, rotate: 0 },
      hover: { scale: 1.1, rotate: 15 },
    },
    clone: null,
  },
};

export const CommonBtn = forwardRef(
  (
    {
      children,
      href,
      className = "",
      leftIcon,
      rightIcon,
      normalBtn= "",
      smallBtn = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const sizeClass = smallBtn ? "smallBtn" : normalBtn ? "normalBtn" : "";

    const combinedClasses =
      `commanBtnClass d-flex align-items-center gap-2 text-decoration-none ${sizeClass} ${className}`.trim();

    const iconType = detectIconType(rightIcon);
    const selectedAnimation = iconAnimation[iconType] || iconAnimation.default;

    const transitionConfig = {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    };

    const content = (
      <>
        {leftIcon && (
          <motion.span
            className="btn-icon-left left-icon d-inline-flex align-items-center"
            variants={{
              initial: { x: 0 },
              hover: { x: -3 },
            }}
            transition={transitionConfig}
          >
            {leftIcon}
          </motion.span>
        )}

        <span>{children}</span>

        {rightIcon && (
          <span
            className="rigth-icon rounded-circle bg-gold text-center d-inline-flex align-items-center justify-content-center position-relative overflow-hidden flex-shrink-0"
          >
            {/* Primary active icon */}
            <motion.span
              className="d-inline-flex align-items-center justify-content-center w-100 h-100 position-absolute"
              variants={selectedAnimation.primary}
              transition={transitionConfig}
            >
              {rightIcon}
            </motion.span>

            {/* Ghost clone icon for infinite directional loop (only for directional arrows) */}
            {selectedAnimation.clone && (
              <motion.span
                className="d-inline-flex align-items-center justify-content-center w-100 h-100 position-absolute"
                variants={selectedAnimation.clone}
                transition={transitionConfig}
              >
                {cloneElement(rightIcon)}
              </motion.span>
            )}
          </span>
        )}
      </>
    );

    const buttonMotionProps = {
      initial: "initial",
      whileHover: "hover",
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400, damping: 25 },
    };

    if (href) {
      return (
        <MotionLink
          href={href}
          ref={ref}
          className={combinedClasses}
          {...buttonMotionProps}
          {...props}
        >
          {content}
        </MotionLink>
      );
    }

    return (
      <motion.button
        type={type}
        ref={ref}
        className={combinedClasses}
        {...buttonMotionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  },
);

CommonBtn.displayName = "CommonBtn";

export const FaveHeartButton = ({
  initialLiked = false,
  onToggle,
  className = "",
  ...props
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents triggering card navigation when inside a Link
    const nextState = !isLiked;
    setIsLiked(nextState);
    if (onToggle) onToggle(nextState);
  };

  return (
    <motion.button
      onClick={handleHeartClick}
      aria-label="Add to favorites"
      className={`p-2 border rounded-circle bg-white position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center favHeartBtn ${
        isLiked ? "favHeart--active" : ""
      } ${className}`.trim()}
      {...props}
    >
      <Heart
        size={16}
        className={`transition-colors ${isLiked ? "fill-danger text-danger" : "text-muted"}`}
        fill={isLiked ? "currentColor" : "none"}
      />
    </motion.button>
  );
};

// export const CommonButton = ({
//   children,
//   className,
//   variant = "primary",
//   leftIcon,
//   rightIcon,
//   ...props
// }) => (
//   <Button className={`btn btn-${variant} ${className}`} {...props}>
//     {leftIcon && <span className="me-2">{leftIcon}</span>}
//     {children}
//     {rightIcon && <span className="ms-2">{rightIcon}</span>}
//   </Button>
// );
