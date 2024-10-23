import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { registeredUserOtpVerificationAPI } from "@/helper/API/user";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import { toast } from "@/components/hooks/use-toast";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTP_Verification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const imageURL =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";

  useEffect(() => {
    // Check if a message was passed via navigate
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const decode = jwtDecode(token);
      if (decode) {
        toast.success(`You'hv submitted ${data.pin}`);
        await dispatch(
          registeredUserOtpVerificationAPI({
            OTP: data.pin,
            email: decode.userEmail,
          })
        );
      }
    }
  };

  return (
    <div className="relative w-full h-[88%] flex flex-col items-center justify-center">
      <ToastContainer />
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${imageURL})` }}
      ></div>
      <div className="otp-input-box shadow-lg shadow-[#005CC8] border-[#005CC8] rounded-md relative z-10 w-1/4 h-1/2 border-4 flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-center w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mt-10">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OTP_Verification;
