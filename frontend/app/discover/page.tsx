import Sidebar from "../components/users/sidebar";
import DiscoverExplorer from "../components/users/discoverExplorer";
import CheckLogin from "../lib/auth";

export const metadata = {
  title: "Discover",
}

export default async function Discover() {
	await CheckLogin();

	return (
		<Sidebar>
			<main className="flex min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.96)_40%),linear-gradient(180deg,rgba(20,6,18,0.98),rgba(10,2,10,0.98))] px-4 py-6 md:px-6 md:py-8">
				<section className="mx-auto w-full max-w-[1320px]">
					<div className="mb-6 rounded-3xl border border-rose-300/20 bg-gradient-to-r from-rose-500/20 via-red-500/10 to-transparent p-5 backdrop-blur-sm">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200/80">Discover</p>
						<h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Find People by Region</h1>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-rose-100/70">Spin the globe, search country/state manually and confirm your selected location.</p>
					</div>

					<DiscoverExplorer />
				</section>
			</main>
		</Sidebar>
	)
}