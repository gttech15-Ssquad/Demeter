import { createReportableStore } from "../middleware/report"

interface GlobalStore {
	loading: boolean
	isSidebarOpen: boolean
	toggleSidebar: () => void
}

const initialState: GlobalStore = {
	loading: false,
	isSidebarOpen: false,
	toggleSidebar: () => {},
}

const useGlobalStore = createReportableStore<GlobalStore>((set) => ({
	...initialState,
	setLoading: (loading: boolean) => set({ loading }),
	toggleSidebar: () =>
		set((state) => ({
			...state,
			isSidebarOpen: !state.isSidebarOpen,
		})),
}))

export { useGlobalStore }
