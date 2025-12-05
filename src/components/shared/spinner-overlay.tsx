import React from "react";

// Assuming you have a basic Spinner component (replace content with your actual spinner)
const Spinner = () => (
  // Example simple rotating Tailwind spinner
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
);

// Define the full-page overlay component
const SpinnerOverlay = () => {
  return (
    // 1. Fixed position to cover the entire viewport
    // 2. z-50 to ensure it sits on top of all other content
    // 3. Flexbox properties to center the content (the spinner)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        // 4. Dark/Blurred Background Effect
        // The background uses a semi-transparent dark color
        // And the backdrop-blur utility creates the frosted glass effect.
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark semi-transparent color
        backdropFilter: "blur(4px)", // Apply blur (Note: 'backdrop-blur' Tailwind utility is preferred if available)
        WebkitBackdropFilter: "blur(4px)", // For better compatibility
      }}
    >
      {/* Container for the Spinner to make it stand out against the blur */}
      <div className="p-6 rounded-lg  shadow-2xl">
        <Spinner />
      </div>
    </div>
  );
};

export default SpinnerOverlay;
