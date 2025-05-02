// Import the LoginForm component from the function components directory
import LoginForm from "@/components/function/LoginForm";

// Login page component that renders the login interface
export default function Login() {
    return (
        // Main container with full height and centered content
        <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
            {/* Login form container with max width and styling */}
            <div className="w-full max-w-lg space-y-8 bg-white p-10 rounded-md shadow-lg">
                {/* Header section with title and description */}
                <div className="text-center space-y-2">
                    <h1 className="text-[#5A1818] text-3xl md:text-4xl font-serif font-semibold tracking-tight">Texas A&M OSSF Center SCADA</h1>
                    <p className="text-gray-600 mt-4">Login to access your account</p>
                </div>
                {/* Render the LoginForm component */}
                <LoginForm/>
            </div>
        </div>
    )
}
