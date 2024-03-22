import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useAdminLogin } from "@/utils/react-query/queries";

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
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }).max(32, {
//     message: "Password must be at most 32 characters.",
//   }).refine((password) => {
//     // Check if password contains at least one uppercase letter,
//     // one lowercase letter, and one of the specified special characters
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasSpecialCharacter = /[@]/.test(password); // Add more special characters if needed

//     return hasUpperCase && hasLowerCase && hasSpecialCharacter;
//   }, {
//     message: "Password must contain at least one uppercase letter, one lowercase letter, and one of the specified special characters.",
//   }),
// })

const AdminLogin = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: adminLogin } = useAdminLogin();

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
    const response = await adminLogin({ username, password });
    if (response.status) {
      // set response.token as cookie
      toast({
        title: "Success",
        variant: "success",
        description: response.message,
      });
      login(response.token);
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
      <div className="justify-center items-center w-full lg:w-1/2 xl:w-1/4 border-2 px-3 py-4 border-spacing-1 rounded-xl">
        <Form {...form}>
          <div className="sm:w-420 flex-center flex-col">
            <h2 className="h3-bold md:h2-bold">Admin Login</h2>
            <hr className="my-2" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
              <button type="submit" className="button button--success">Login</button>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
