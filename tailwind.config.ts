
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
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				'display': 'var(--font-size-display)',
				'h1': 'var(--font-size-h1)',
				'h2': 'var(--font-size-h2)', 
				'h3': 'var(--font-size-h3)',
				'h4': 'var(--font-size-h4)',
				'h5': 'var(--font-size-h5)',
				'h6': 'var(--font-size-h6)',
				'body-lg': 'var(--font-size-body-lg)',
				'body': 'var(--font-size-body)',
				'body-sm': 'var(--font-size-body-sm)',
				'caption': 'var(--font-size-caption)',
				'helper': 'var(--font-size-helper)',
				'code': 'var(--font-size-code)',
			},
			lineHeight: {
				'display': 'var(--line-height-display)',
				'h1': 'var(--line-height-h1)',
				'h2': 'var(--line-height-h2)',
				'h3': 'var(--line-height-h3)',
				'h4': 'var(--line-height-h4)',
				'h5': 'var(--line-height-h5)',
				'h6': 'var(--line-height-h6)',
				'body-lg': 'var(--line-height-body-lg)',
				'body': 'var(--line-height-body)',
				'body-sm': 'var(--line-height-body-sm)',
				'caption': 'var(--line-height-caption)',
				'helper': 'var(--line-height-helper)',
				'code': 'var(--line-height-code)',
			},
			fontWeight: {
				'display': 'var(--font-weight-display)',
				'h1': 'var(--font-weight-h1)',
				'h2': 'var(--font-weight-h2)',
				'h3': 'var(--font-weight-h3)',
				'h4': 'var(--font-weight-h4)',
				'h5': 'var(--font-weight-h5)',
				'h6': 'var(--font-weight-h6)',
				'body-lg': 'var(--font-weight-body-lg)',
				'body': 'var(--font-weight-body)',
				'body-sm': 'var(--font-weight-body-sm)',
				'caption': 'var(--font-weight-caption)',
				'helper': 'var(--font-weight-helper)',
				'code': 'var(--font-weight-code)',
			},
			letterSpacing: {
				'display': 'var(--letter-spacing-display)',
				'h1': 'var(--letter-spacing-h1)',
				'h2': 'var(--letter-spacing-h2)',
				'h3': 'var(--letter-spacing-h3)',
				'h4': 'var(--letter-spacing-h4)',
				'h5': 'var(--letter-spacing-h5)',
				'h6': 'var(--letter-spacing-h6)',
				'body-lg': 'var(--letter-spacing-body-lg)',
				'body': 'var(--letter-spacing-body)',
				'body-sm': 'var(--letter-spacing-body-sm)',
				'caption': 'var(--letter-spacing-caption)',
				'helper': 'var(--letter-spacing-helper)',
				'code': 'var(--letter-spacing-code)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
