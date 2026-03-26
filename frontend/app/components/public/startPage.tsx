import Link from "next/link";
import { Search } from "lucide-react";

export default function StartPage() {
  return (
    <section className="min-h-screen w-full bg-black/20 text-white px-6 py-10 pt-30">

        <section className="grid gap-6 md:grid-cols-3">
	  <Link href="#">
	          <article className="h-60 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
        	    <h2 className="text-xl font-semibold mb-3">Relationship Statistics</h2>
	            <p className="font-bold text-gray-300">
        	      Explore insights about attraction, compatibility, communication,
	              and modern dating behavior.
        	    </p>
	          </article>
	</Link>

	<Link href="#">
	          <article className="h-60 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
        	    <h2 className="text-xl font-semibold mb-3">How to Be Interesting?</h2>
	            <p className="font-bold text-gray-300">
        	      Learn how curiosity, confidence, communication, and lifestyle can
	              make someone more attractive and memorable.
        	    </p>
	          </article>
	</Link>

          <article className="h-60 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-3">Get Started</h2>
            <p className="font-bold text-gray-300 mb-4">
              Join the platform, create your profile, or log in to continue.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="rounded-xl bg-pink-500 px-4 py-2 text-center font-semibold hover:bg-pink-400 transition"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-white/20 px-4 py-2 text-center font-semibold hover:bg-white/10 transition"
              >
                Create account
              </Link>
            </div>
          </article>

	  <Link href="#">
	  	<article className="h-60 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
	            <h2 className="text-xl font-semibold mb-3">What the women are saying about men?</h2>
        	    <p className="font-bold text-gray-300">
              		Are you interested in know more about what the women are saying about man?
            	    </p>
	          </article>
	  </Link>

	<Link href="#">
	  <article className="h-60 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-3">What the men are saying about women?</h2>
            <p className="font-bold text-gray-300">
              Come here and we will let you know more about what the men told us about women.
            </p>
          </article>
	</Link>

	<Link href="#">
		<article className="h-60 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
        	    <h2 className="text-xl font-semibold mb-3">What is your favourite place to date?</h2>
	            <p className="font-bold text-gray-300">
        	      Learn how the environment can impact positivetly or negativetly your relationship.
	            </p>
        	  </article>
	</Link>

        </section>
      </section>
  );
}
