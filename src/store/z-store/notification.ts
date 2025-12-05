// import { createReportableStore } from "../middleware/report"

// // import { NotificationProps } from "@/types/notification"

// interface NotificationStore {
// 	notifications: NotificationProps[]
// 	addNotification: (notification: NotificationProps) => void
// 	removeNotification: (id: string) => void
// 	toggleRead: () => void
// }

// const initialState: NotificationStore = {
// 	notifications: [],
// 	addNotification: () => {},
// 	removeNotification: () => {},
// 	toggleRead: () => {},
// }

// export const useNotificationStore = createReportableStore<NotificationStore>(
// 	(set) => ({
// 		...initialState,
// 		addNotification: (notification) => {
// 			set((state) => ({
// 				notifications: [...state.notifications, notification],
// 			}))
// 		},
// 		removeNotification: (id) => {
// 			set((state) => ({
// 				notifications: state.notifications.filter(
// 					(notification) => notification.id !== id
// 				),
// 			}))
// 		},
// 		toggleRead: () => {
// 			set((state) => ({
// 				notifications: state.notifications.map((notification) => ({
// 					...notification,
// 					isRead: !notification.isRead,
// 				})),
// 			}))
// 		},
// 	})
// )
