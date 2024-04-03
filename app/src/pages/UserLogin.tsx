import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navigate, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { useUserLogin } from "@/utils/react-query/queries";
import Spinner from "@/components/shared/Spinner/Spinner";

const formSchema = z.object({
  username: z.string().toLowerCase().min(3, {
    message: "Username must be atleast 3 characters",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, {
      message: "Password must be at most 32 characters.",
    }),
});

const UserLogin = () => {
  const { authUser, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: userLogin } = useUserLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    const response = await userLogin({ username, password });
    if (response.status) {
      // set response.token as cookie
      toast({
        title: "Success",
        variant: "success",
        description: response.message,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: response.message,
      });
    }
  }
  return (
    <div className="flex justify-center items-center p-3 mt-5 lg:mt-12">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-24">
            <Spinner />
          </div>
        </div>
      ) : authUser ? (
        <>
          {authUser.role === "admin" ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/" />
          )}
        </>
      ) : (
        <div className="justify-center items-center w-full lg:w-1/2 xl:w-1/4 border-2 px-3 py-4 border-spacing-1 rounded-xl">
          <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
              <h2 className="h3-bold md:h2-bold">User Login</h2>
              <hr className="my-2" />

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Login</Button>
              </form>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
