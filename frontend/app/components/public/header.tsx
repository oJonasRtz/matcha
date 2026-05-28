export default function Header() {
	return (
		<header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-3 bg-gradient-to-r from-black/60 via-transparent to-black/40 backdrop-blur-md border-b border-white/10 shadow-sm">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/95 shadow-md">
						<span className="font-bold text-white">S</span>
					</div>
					<div>
						<h1 className="text-white text-lg font-bold leading-none">Seductor</h1>
						<p className="text-xs text-white/60 -mt-0.5">Find better connections</p>
					</div>
				</div>
			</div>

			<nav className="flex items-center gap-4">
				<a href="/login" className="text-white font-medium hover:text-pink-300 transition-colors">
					Login
				</a>

				<a href="/register" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-pink-500 px-4 py-2 text-white font-semibold hover:bg-pink-600 transition-transform transform hover:-translate-y-0.5">
					Create account
				</a>
			</nav>
		</header>
	);
}
