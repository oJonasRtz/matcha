import UserImages from "../components/profile/showImages";
import UserInfo from "../components/profile/userInfo";
import { Card } from "../components/public/card";
import Sidebar from "../components/users/sidebar";
import CheckLogin from "../lib/auth";
import { UserData } from "../swipe/page";

const userData: UserData = {
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

export default async function Profile() {
	await CheckLogin();
    
    const mainStyle = "mx-auto min-h-screen p-4 md:p-12 flex items-start justify-center bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.06),rgba(15,23,42,0.96)_40%),linear-gradient(180deg,rgba(20,6,18,0.96),rgba(10,2,10,0.98))]";
    const cardStyle = "p-6 md:p-8 max-w-6xl w-full mx-auto"

	return (
		<Sidebar>
			<main className={mainStyle}>
				<Card className={cardStyle}>
					<section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-start">
						<UserImages images={userData.images} />
						<UserInfo {...userData} />
					</section>
				</Card>
			</main>
		</Sidebar>
	)
}
