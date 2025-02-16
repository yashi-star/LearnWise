import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",   // Ensure all pages are included
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Include components for styling
    "./app/**/*.{js,ts,jsx,tsx,mdx}",      // Add app-specific paths
  ],
  darkMode: "class", // Enables dark mode by using 'dark' class on html element
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],   // Ensure Poppins font is loaded correctly
        foreground: ["var(--font-Josefin)"], // Ensure Josefin Sans font is loaded correctly
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',  // Radial gradient support
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))', // Conic gradient support
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px", 
        "1200px": "1200px", 
        "1300px": "1300px",  
        "1500px": "1500px",  
        "800px": "800px",    
        "400px": "400px",    
      },
    },
  },
  plugins: [], // No plugins specified, you can add them here if needed
};

export default config;
