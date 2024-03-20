import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  username: z.string().toLowerCase().min(3, {
    message: "Username must be atleast 3 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(32, {
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

const AdminLoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default AdminLoginPage