import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const ForgotPassword = () => {
  return (
    <div className="relative h-screen grid place-items-center bg-gradient-to-br from-[#f3ecf1] via-[#fae5df] to-[#e3b8b8] overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#f0d0c7] rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#f09410] rounded-full blur-3xl opacity-20 animate-ping"></div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/40 backdrop-blur-md p-0 mx-4 sm:mx-0">
          <CardContent className="p-8 space-y-6 rounded-xl">
            {/* Heading */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#f37656]">
                Forgot Password?
              </h2>
              <p className="text-sm text-zinc-500">
                Don't worry! Enter your email and we'll send you a reset link.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-zinc-400" />
                </div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/80 border border-zinc-400/40 p-5 pl-10 rounded-lg 
                  focus:ring-2 focus:ring-[#ee8e76] transition-all duration-300 
                  placeholder:text-zinc-400"
                />
              </div>

              <Button
                type="submit"
                className="cursor-pointer uppercase w-full p-6 tracking-[2px] 
                bg-[#ee8e76] hover:bg-[#f18064] transition-all duration-300 
                shadow-md hover:shadow-lg hover:scale-[1.01]"
              >
                Send Reset Link
              </Button>
            </form>

            {/* Bottom Text */}
            <p className="text-center text-zinc-500 tracking-tighter">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#ee9c87] font-medium hover:underline hover:underline-offset-2"
              >
                Sign up now
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
