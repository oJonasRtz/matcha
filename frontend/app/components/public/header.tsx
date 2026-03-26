import { Search } from "lucide-react";

export default function Header() {
	return (
	<header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-md border-b border-white/20">
	      <h1 className="text-white text-xl font-bold">
        	Seductor
	      </h1>

	        <div className="flex items-center gap-4">
        	        <div className="flex items-center rounded-xl border border-white/20 bg-white/10 px-6 py-2">
                	          <Search className="w-6 h-4 text-white/70 mr-2" />
                        	  <input
	                            type="text"
        	                    placeholder="Search..."
                	            className="bg-transparent outline-none text-white placeholder-white/50"
                       		  />
	                </div>
        	</div>

	      <nav className="flex items-center gap-4">
        	<a
	          href="/login"
        	  className="text-white font-medium hover:text-red-400 transition-colors"
        	>
	          Login
        	</a>

	        <a
        	  href="/register"
	          className="rounded-xl bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-600 transition-colors"
        	>
	          Create new account
        	</a>
	      </nav>
    </header>
);
}
