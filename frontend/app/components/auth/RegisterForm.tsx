import Link from "next/link";
import { Card } from "../public/card";

export default function RegisterForm() {
  return (
    <Card className="max-w-md">
      <h1 className="mb-6 text-center text-white text-3xl font-bold">Register</h1>

      <form className="flex flex-col gap-1.75">
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            className="peer w-full text-white font-bold rounded-xl border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
	<label
    	     htmlFor="email"
    	     className="pointer-events-none absolute left-4
      		top-2 translate-y-0
      		text-sm font-semibold text-white
      		transition-all duration-200

      		peer-placeholder-shown:top-1/2
      		peer-placeholder-shown:-translate-y-1/2
      		peer-placeholder-shown:text-base

      		peer-focus:top-2
      		peer-focus:translate-y-0
      		peer-focus:text-sm
      		peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
	        peer-not-placeholder-shown:translate-y-0
   	        peer-not-placeholder-shown:text-sm
		peer-not-placeholder-shown:text-pink-400"
  	>
    		Email
  	</label>
        </div>

<div className="relative">
          <input
            id="username"
            name="username"
            type="text"
            placeholder=" "
            className="peer w-full text-gray font-bold rounded-xl border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
        <label
             htmlFor="username"
             className="pointer-events-none absolute left-4
                top-2 translate-y-0
                text-sm font-bold text-white
                transition-all duration-200

                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base

                peer-focus:top-2
                peer-focus:translate-y-0
                peer-focus:text-sm
                peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:text-pink-400"
        >
                Username
        </label>
        </div>


<div className="relative">
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder=" "
            className="peer w-full rounded-xl text-gray font-bold border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <label
            htmlFor="firstname"
                className="pointer-events-none absolute left-4
                top-2 translate-y-0
                text-sm font-bold text-white
                transition-all duration-200

                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base

                peer-focus:top-2
                peer-focus:translate-y-0
                peer-focus:text-sm
                peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:text-pink-400"
          >
            Firstname
          </label>
        </div>

<div className="relative">
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder=" "
            className="peer w-full rounded-xl font-bold text-gray border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <label
            htmlFor="lastname"
                className="pointer-events-none absolute left-4
                top-2 translate-y-0
                text-sm font-semibold text-white
                transition-all duration-200

                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base

                peer-focus:top-2
                peer-focus:translate-y-0
                peer-focus:text-sm
                peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:text-pink-400"
          >
            Lastname
          </label>
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            placeholder=" "
            className="peer w-full rounded-xl text-gray border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <label
            htmlFor="password"
		className="pointer-events-none absolute left-4
                top-2 translate-y-0
                text-sm font-semibold text-white
                transition-all duration-200

                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base

                peer-focus:top-2
                peer-focus:translate-y-0
                peer-focus:text-sm
                peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:text-pink-400"
          >
            Password
          </label>
        </div>

	<div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder=" "
            className="peer w-full rounded-xl font-bold text-white border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <label
            htmlFor="confirmPassword"
                className="pointer-events-none absolute left-4
                top-2 translate-y-0
                text-sm font-semibold text-white
                transition-all duration-200

                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base

                peer-focus:top-2
                peer-focus:translate-y-0
                peer-focus:text-sm
                peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:text-pink-400"
          >
            Confirm Password
          </label>
        </div>

    <div className="text-center space-y-2">
  	<p className="text-sm font-semibold text-white">Gender</p>

  	<div className="flex text-center justify-center flex-wrap gap-12 text-white">
    		<label className="flex text-center items-center gap-3">
      			<input type="radio" name="gender" value="male" required/>
      			<strong>Male</strong>
    		</label>

    		<label className="flex text-center items-center gap-2">
      			<input type="radio" name="gender" value="female" />
      			<strong>Female</strong>
    		</label>
		<label className="flex text-center justify-center items-center gap-2">
                	<input type="radio" name="gender" value="other" />
                	<strong>Other</strong>
        	</label>
  </div>

</div>

<div className="text-center space-y-2">
        <p className="text-sm font-semibold text-white">Sexual Orientation</p>

        <div className="flex text-center justify-center flex-wrap gap-6 text-white">
                <label className="flex text-center items-center gap-3">
                        <input type="radio" name="sexualOrientation" value="heterosexual" required/>
                        <strong>Heterosexual</strong>
                </label>

                <label className="flex text-center items-center gap-2">
                        <input type="radio" name="sexualOrientation" value="bissexual" />
                        <strong>Bisexual</strong>
                </label>
                <label className="flex text-center justify-center items-center gap-2">
                        <input type="radio" name="sexualOrientation" value="homosexual" />
                        <strong>Homosexual</strong>
                </label>
  </div>
</div>
        <button
          type="submit"
          className="mt-2 rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div className="mt-5 flex flex-col items-center gap-4 text-sm">
        <Link
          href="#"
          className="text-white/80 transition hover:text-blue-300 hover:underline"
        >
          <strong>Forgot password?</strong>
        </Link>

        <Link
          href="/login"
          className="font-semibold text-white transition hover:text-blue-300 hover:underline"
        >
          <strong>Login</strong>
        </Link>
      </div>
      <footer className="mt-4 border-t border-white/20 pt-4">
        <div className="flex justify-center gap-4 text-xs text-white/70">
          <Link href="#" className="transition hover:text-blue-300 hover:underline">
            <strong>Terms of Service</strong>
          </Link>
          <Link href="#" className="transition hover:text-blue-300 hover:underline">
            <strong>Privacy Policy</strong>
          </Link>
        </div>
      </footer>
    </Card>
  );
}
