import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "./components/User";

export default async function Home() {
	const session = await getServerSession(authOptions); // server side rendered
	return (
		<section>
			<h1>Home</h1>
      <br /><br />
			<h2>Server side rendered</h2>
			<pre>{JSON.stringify(session)}</pre>
      <br /><br />
			<h2>Client side rendered</h2>
			<pre>
				<User />
			</pre>
		</section>
	);
}
