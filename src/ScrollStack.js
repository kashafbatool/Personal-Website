import { useRef, useEffect } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  stackPosition = 120, // Pixels from top where cards lock
  scaleStep = 0.05,    // How much each card shrinks
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      
      const cards = wrapperRef.current.querySelectorAll(".scroll-stack-card-wrapper");
      
      cards.forEach((cardWrapper, index) => {
        const cardInner = cardWrapper.firstElementChild;
        if (!cardInner) return;

        // Get position of the wrapper relative to the viewport
        const rect = cardWrapper.getBoundingClientRect();
        
        // Calculate distance from the "stick" point
        // If rect.top is 0, it's at the very top of screen.
        // We want to know how far it is into the "stuck" zone.
        const distanceFromStick = stackPosition - rect.top;

        if (distanceFromStick > 0) {
          // The card is currently stuck (or has been passed)
          // We scale it down based on how far we've scrolled past it
          // Limit the scale so it doesn't disappear completely
          const scale = Math.max(1 - (distanceFromStick / 1000) * (index + 1), 0.8);
          
          // We also fade it slightly for depth
          const opacity = Math.max(1 - (distanceFromStick / 2000), 0.8);
          
          cardInner.style.transform = `scale(${scale})`;
          cardInner.style.opacity = opacity;
        } else {
          // Reset if we scroll back up
          cardInner.style.transform = "scale(1)";
          cardInner.style.opacity = "1";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stackPosition]);

  return (
    <div className={`scroll-stack-container ${className}`} ref={wrapperRef}>
      {/* We map over children to wrap them in our sticky containers */}
      {Array.isArray(children) && children.map((child, i) => (
        <div
          key={i}
          className="scroll-stack-card-wrapper"
          style={{
            // This is the magic: Sticky locks it, Top sets the lock position
            position: "sticky",
            top: `${stackPosition + (i * 10)}px`, // Offset slightly so we see the tops of back cards
            paddingTop: `${i * 20}px`, // Visual spacing
            zIndex: i + 1,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;