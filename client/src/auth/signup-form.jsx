import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const SignupForm = () => {
  const { register, regError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(name, email, password);
  };

  return (
    <Card className="w-full shadow-xl border border-zinc-100">
      <CardContent className="space-y-6 ">
        <h2 className="text-xl md:text-2xl font-bold leading-tight text-center text-[#f37656]">
          Sign up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-zinc-400" />
            </div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="bg-white/20 p-5.5 pl-10 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="text-zinc-400" />
            </div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="bg-white/20 p-5.5 pl-10 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-zinc-400" />
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-white/20 p-5.5 pl-10 transition-all duration-200"
            />
          </div>

          <div className="flex items-center">
            <Checkbox id="terms" className="border-zinc-500" />

            <div className="ml-2 text-sm">
              <label htmlFor="terms" className="text-zinc-500">
                I agree to the{" "}
                <span className="text-[#ee9c87] font-medium">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-[#ee9c87] font-medium">
                  Privacy Policy
                </span>
              </label>
            </div>
          </div>

          {regError && <p className="text-sm text-red-500">{regError}</p>}
          <Button
            type="submit"
            className="uppercase w-full p-6 tracking-[3px] bg-[#ee8e76] hover:bg-[#f18064]
            transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01]"
          >
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
