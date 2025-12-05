const requiredEnvs = [
	"API_URL",
	"NEXT_PUBLIC_API_URL",
	"NEXT_PUBLIC_GOOGLE_ID",
	"NEXT_PUBLIC_GOOGLE_SECRET",
	"NEXT_PUBLIC_ANALYTICS_ID",
	"NODE_ENV",
] as const

type RequiredEnvs = (typeof requiredEnvs)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredEnvs, string> {
			readonly API_URL: string
			readonly NEXT_PUBLIC_API_URL: string
			readonly NEXT_PUBLIC_GOOGLE_ID: string
			readonly NEXT_PUBLIC_GOOGLE_SECRET: string
			readonly NEXT_PUBLIC_ANALYTICS_ID: string
			readonly NODE_ENV: "development" | "production"
		}
	}
}

export {}
