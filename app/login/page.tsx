import LoginForm from "@/components/function/LoginForm";


export default function Login() {


    return (
        <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg space-y-8 bg-white p-10 rounded-md shadow-lg">
                <div className="text-center space-y-2">
                    <h1 className="text-[#5A1818] text-3xl md:text-4xl font-serif font-semibold tracking-tight">Texas A&M OSSF Center SCADA</h1>
                    <p className="text-gray-600 mt-4">Login to access your account</p>
                </div>
                {/* <LoginForm /> */}
                <LoginForm/>
            </div>
        </div>
    )
}
