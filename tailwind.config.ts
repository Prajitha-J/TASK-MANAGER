
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				dark: {
					background: '#221B17',      // Rich dark brown
					card: '#2E221E',            // Soft cocoa brown
					input: '#3A2F2A',           // Muted warm brown
					primaryAccent: '#5C3B31',   // Deep reddish-brown
					secondaryAccent: '#804D3E', // Burnt sienna
					textPrimary: '#EAE0D5',     // Warm white
					textSecondary: '#D2B48C',   // Soft beige
					border: '#4E4037',          // Soft brown-gray
					error: '#993333',           // Deep red-brown
					success: '#6B8E23',         // Warm greenish-brown
					warning: '#B8860B',         // Golden brown
					sidebar: '#1A1410',         // Deep espresso brown
					inactive: '#574840',        // Muted brown-gray
					placeholder: '#A89582'       // Muted warm beige
				},
				light: {
					background: '#FAF7F1',      // Soft warm ivory
					card: '#F5F1E9',            // Light beige
					input: '#F5F1E9',           // Very pale cream
					primaryAccent: '#C0A27E',   // Warm sand
					secondaryAccent: '#D6B98C', // Golden beige
					textPrimary: '#1E1B16',     // Rich dark brown
					textSecondary: '#4D443A',   // Warm gray-brown
					border: '#C2B8A3',          // Light taupe
					error: '#C17A6F',           // Muted red-brown
					success: '#A3A656',         // Soft olive green
					warning: '#D6A349',         // Golden sand
					sidebar: '#F8F4EC',         // Warm off-white
					inactive: '#A69F91',        // Soft taupe-gray
					placeholder: '#A69F91'       // Soft sand
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'slide-down': 'slide-down 0.4s ease-out',
				'scale': 'scale 0.3s ease-out'
			},
			boxShadow: {
				'task-card': '0 4px 6px rgba(0, 0, 0, 0.05)',
				'dark-card': '0 4px 6px rgba(42, 30, 25, 0.4)',
				'light-card': '0 4px 6px rgba(194, 184, 163, 0.4)'
			},
			fontFamily: {
				sans: ['Inter', 'Poppins', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
