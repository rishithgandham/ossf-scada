// Import the redirect function from Next.js navigation
import { redirect } from "next/navigation";

// Root page component that redirects to the login page
export default function Home() {
  // Redirect users to the login page when they visit the root URL
  return redirect('/login')
}
