import type { Config } from 'tailwindcss';

// ضوابط رياح الزمكان - تكوين Tailwind للوعي الكوني
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  darkMode: 'class',
  
  theme: {
    extend: {
      // ألوان الكون
      colors: {
        // الألوان الأساسية للكون
        cosmic: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        
        // ألوان الكوانتوم
        quantum: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        
        // ألوان الطاقة المظلمة
        'dark-energy': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        
        // ألوان المجرة
        galaxy: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
      },
      
      // خطوط الكون
      fontFamily: {
        cosmic: ['Inter', 'system-ui', 'sans-serif'],
        quantum: ['JetBrains Mono', 'monospace'],
        galaxy: ['Poppins', 'sans-serif'],
      },
      
      // أحجام الشاشات الكونية
      screens: {
        'quantum': '320px',
        'cosmic': '1440px',
        'multiverse': '2560px',
      },
      
      // المسافات الكونية
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'cosmic': '42rem',
        'infinite': '999rem',
      },
      
      // الحركات الكونية
      animation: {
        'cosmic-pulse': 'cosmic-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'quantum-spin': 'quantum-spin 3s linear infinite',
        'galaxy-rotate': 'galaxy-rotate 10s linear infinite',
        'particle-float': 'particle-float 4s ease-in-out infinite',
        'energy-flow': 'energy-flow 5s linear infinite',
        'dimension-shift': 'dimension-shift 8s ease-in-out infinite',
      },
      
      // إطارات الحركة الكونية
      keyframes: {
        'cosmic-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.8',
            transform: 'scale(1.05)',
          },
        },
        'quantum-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'galaxy-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'particle-float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'energy-flow': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        'dimension-shift': {
          '0%, 100%': {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          },
          '25%': {
            transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
          },
          '50%': {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(10deg)',
          },
          '75%': {
            transform: 'perspective(1000px) rotateX(-5deg) rotateY(5deg)',
          },
        },
      },
      
      // تدرجات الكون
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'quantum-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'galaxy-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'dark-energy': 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
        'multiverse': 'radial-gradient(ellipse at center, #667eea 0%, #764ba2 50%, #000000 100%)',
      },
      
      // ظلال الكون
      boxShadow: {
        'cosmic': '0 25px 50px -12px rgba(102, 126, 234, 0.25)',
        'quantum': '0 25px 50px -12px rgba(217, 70, 239, 0.25)',
        'galaxy': '0 25px 50px -12px rgba(250, 204, 21, 0.25)',
        'dark-energy': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'multiverse': 'inset 0 0 50px rgba(102, 126, 234, 0.1), 0 0 100px rgba(102, 126, 234, 0.1)',
      },
      
      // حدود الكون
      borderRadius: {
        'cosmic': '2rem',
        'quantum': '1.5rem',
        'infinite': '50%',
      },
      
      // شفافية الكون
      backdropBlur: {
        'cosmic': '20px',
        'quantum': '15px',
        'infinite': '50px',
      },
      
      // أحجام الكون
      fontSize: {
        'cosmic': ['2.5rem', { lineHeight: '1.2' }],
        'quantum': ['1.875rem', { lineHeight: '1.3' }],
        'infinite': ['10rem', { lineHeight: '1' }],
      },
    },
  },
  
  plugins: [
    // إضافات مخصصة للكون
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        '.cosmic-dark': {
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        },
        '.quantum-glow': {
          boxShadow: '0 0 20px rgba(217, 70, 239, 0.5), inset 0 0 20px rgba(217, 70, 239, 0.1)',
        },
        '.galaxy-shimmer': {
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          backgroundSize: '200% 100%',
          animation: 'energy-flow 2s infinite',
        },
        '.multiverse-border': {
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(217, 70, 239, 0.3))',
          backgroundClip: 'padding-box',
        },
        '.cosmic-text-gradient': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
};

export default config;

