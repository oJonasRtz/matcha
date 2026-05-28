import Sidebar from "../components/users/sidebar";
import CheckLogin from "../lib/auth";
import SwipeSession from "./swipe-session";

export interface UserData {
	name: string;
	age: number;
	location: string;
	lastSeen: number;
	isOnline: boolean;
	bio: string;
	images: string[];
	tags: string[];
}

export const metadata = {
	  title: "Swipe",
}

// we will get 20 users per page, so we can use this as a placeholder for pagination
const pagination: UserData[] = [
	{
		name: "Luna",
		age: 27,
		location: "Recife - PE, Brazil",
		lastSeen: Date.now() - 5 * 60 * 1000,
		isOnline: false,
		bio: "UI designer by day, sunset hunter by weekend. I like museums, street food, and people that can make me laugh in three messages or less.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Travel", "Games", "Beach", "Books", "Vegan", "Cooking", "Photography"]
	},
	{
		name: "Lana",
		age: 30,
		location: "Recife - PE, Brazil",
		lastSeen: Date.now() - 10 * 60 * 1000,
		isOnline: false,
		bio: "Graphic designer with a passion for travel and adventure. I love exploring new cultures and trying new foods.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Travel", "Games", "Beach", "Books", "Vegan", "Cooking", "Photography"]
	},
	{
		name: "Marina",
		age: 25,
		location: "São Paulo - SP, Brazil",
		lastSeen: Date.now() - 15 * 60 * 1000,
		isOnline: true,
		bio: "Marketing strategist who loves playlists for every mood, coffee shops, and long walks after work.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Music", "Coffee", "Travel", "Movies", "Fitness", "Design", "Dogs"]
	},
	{
		name: "Clara",
		age: 29,
		location: "Belo Horizonte - MG, Brazil",
		lastSeen: Date.now() - 20 * 60 * 1000,
		isOnline: false,
		bio: "Product manager, board game nerd, and the friend who always finds the best brunch spot in town.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Board Games", "Brunch", "Travel", "Tech", "Books", "Movies", "Coffee"]
	},
	{
		name: "Helena",
		age: 31,
		location: "Curitiba - PR, Brazil",
		lastSeen: Date.now() - 25 * 60 * 1000,
		isOnline: true,
		bio: "Architect who loves calm mornings, rainy afternoons, and spontaneous weekend escapes.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Architecture", "Nature", "Travel", "Tea", "Photography", "Art", "Wine"]
	},
	{
		name: "Bianca",
		age: 24,
		location: "Rio de Janeiro - RJ, Brazil",
		lastSeen: Date.now() - 30 * 60 * 1000,
		isOnline: false,
		bio: "Copywriter with a loud laugh, a small dog, and a big love for beach days and live music.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Beach", "Music", "Writing", "Dogs", "Travel", "Food", "Sunsets"]
	},
	{
		name: "Nina",
		age: 28,
		location: "Fortaleza - CE, Brazil",
		lastSeen: Date.now() - 35 * 60 * 1000,
		isOnline: true,
		bio: "Developer by profession, surfer by obsession, and always down for trying a new restaurant.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Surf", "Code", "Travel", "Food", "Beach", "Fitness", "Nature"]
	},
	{
		name: "Sofia",
		age: 26,
		location: "Salvador - BA, Brazil",
		lastSeen: Date.now() - 40 * 60 * 1000,
		isOnline: false,
		bio: "Teacher who finds joy in good conversations, music festivals, and slow Sunday mornings.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Music", "Teaching", "Travel", "Books", "Coffee", "Art", "Dance"]
	},
	{
		name: "Aline",
		age: 32,
		location: "Porto Alegre - RS, Brazil",
		lastSeen: Date.now() - 45 * 60 * 1000,
		isOnline: false,
		bio: "Photographer and breakfast enthusiast, always looking for the next city to explore.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Photography", "Travel", "Coffee", "Art", "Nature", "Books", "Wine"]
	},
	{
		name: "Julia",
		age: 23,
		location: "Florianópolis - SC, Brazil",
		lastSeen: Date.now() - 50 * 60 * 1000,
		isOnline: true,
		bio: "Entrepreneur with a soft spot for ocean views, fitness routines, and smart banter.",
		images: [
			"/images/First.jpg",
			"/images/wonderWoman.jpg",
			"/images/veneza.jpg",
			"/images/candle.jpg",
			"/images/tree-analogic.jpg",
		],
		tags: ["Fitness", "Beach", "Travel", "Business", "Music", "Coffee", "Books"]
	}
]

export default async function Swipe() {
	await CheckLogin();

	return (
		<Sidebar>
			<main className="flex min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.96)_40%),linear-gradient(180deg,rgba(20,6,18,0.98),rgba(10,2,10,0.98))] px-2 py-3 md:px-6 md:py-8">
				<section className="mx-auto w-full max-w-[1320px]">
					<SwipeSession users={pagination} />
				</section>
			</main>
		</Sidebar>
	)
}
