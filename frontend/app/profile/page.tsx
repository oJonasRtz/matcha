import UserImages from "../components/profile/showImages";
import UserInfo from "../components/profile/userInfo";
import { Card } from "../components/public/card";
import Sidebar from "../components/users/sidebar";

const userData = {
	name: "Luna",
	age: 27,
	location: "Recife - PE, Brazil",
	lastSeen: Date.now() - 5 * 60 * 1000, // 5 minutes ago
	isOnline: false,
	bio: "UI designer by day, sunset hunter by weekend. I like museums, street food, and people that can make me laugh in three messages or less. Looking for a good conversation and maybe something real.",
	images: [
		"/images/First.jpg",
		"/images/wonderWoman.jpg",
		"/images/veneza.jpg",
		"/images/candle.jpg",
		"/images/tree-analogic.jpg",
	],
	tags: [
		"Travel",
		"Games",
		"Beach",
		"Books",
		"Vegan",
		"Cooking",
		"Photography",
	]
}

export const metadata = {
	title: userData.name,
}

export default function Profile() {
	const mainStyle = "mx-auto min-h-screen p-4 md:p-8";
	const cardStyle = "p-4 md:p-6 max-w-6xl mx-auto";

	return (
		<Sidebar>
			<main className={mainStyle}>
				<Card className={cardStyle}>
					<section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
						<UserImages images={userData.images} />
						<UserInfo {...userData} />
					</section>
				</Card>
			</main>
		</Sidebar>
	)
}
