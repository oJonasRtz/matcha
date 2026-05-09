import Notifications from "../components/notifications/notifications"
import NotificationsContainer from "../components/notifications/notificationsContainer";
import Statistics from "../components/notifications/statistics";
import Sidebar from "../components/users/sidebar"

export const metadata = {
  title: "Notifications",
}

//template data
const notifications = [
	{
		id: 1,
		type: "like",
		content: "Alice liked your profile.",
		time: Date.now() - 3600 * 1000, // 1 hour ago
		read: true,
	},
	{
		id: 2,
		type: "match",
		content: "You matched with Bob!",
		time: Date.now() - 7200 * 1000, // 2 hours ago
		read: false,
	},
	{
		id: 3,
		type: "message",
		content: "Charlie sent you a message.",
		time: Date.now() - 1800 * 1000, // 30 minutes ago
		read: false,
	},
	{
		id: 4,
		type: "visit",
		content: "Dave visited your profile.",
		time: Date.now() - 5400 * 1000, // 1.5 hours ago
		read: true
	},
	{
		id: 5,
		type: "like",
		content: "Eve liked your profile.",
		time: Date.now() - 300 * 1000, // 5 minutes ago
		read: false,
	},
	{
		id: 6,
		type: "match",
		content: "You matched with Frank!",
		time: Date.now() - 9000 * 1000, // 2.5 hours ago
		read: true
	},
	{
		id: 7,
		type: "message",
		content: "Grace sent you a message.",
		time: Date.now() - 1200 * 1000, // 20 minutes ago
		read: false,
	}
]


export default function NotificationsPage() {
	// ===== STYLES =====
	const mainStyle = "flex min-h-screen items-stretch";

	return (
		<main className={mainStyle}>
		<Sidebar>
			<NotificationsContainer n={notifications} />
		</Sidebar>
		</main>
	)
}