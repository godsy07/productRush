import { FaPlus } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddCategory,
  useGetParentCategories,
} from "@/utils/react-query/queries";
import FileUploader from "../FileUploader/FileUploader";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(40, {
      message: "Name must be at most 3 characters",
    }),
  parent_id: z.string(),
  filters: z.array(z.string()).optional(),
  // image: z.custom<File[]>(),
  image: z.custom<File[]>((files: any) => {
    if (!files || files.length === 0) {
      throw new Error("Image is required");
    }
    return files;
  }),
});

const AddCategory = () => {
  const { toast } = useToast();
  const { mutateAsync: addCategory } = useAddCategory();
  const { data: categories } = useGetParentCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      parent_id: "",
      image: [],
      filters: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, parent_id, image, filters } = values;
    const parent = parent_id && parent_id !== "no_parent" ? parent_id : "";
    const filterValue = filters?filters:[];

    const response = await addCategory({ name, parent_id: parent, image, filters: filterValue });
    if (response.status) {
      toast({
        title: "Success",
        variant: "success",
        description: response.message,
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: response.message,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FaPlus className="me-1" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Photos</FormLabel>
                  <FormControl>
                    <FileUploader fieldChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="no_parent">No Parent</SelectItem>
                        {categories.map((item: any) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="filters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filters (Required if parent is selected)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter filters (comma separated)"
                      {...field}
                      onChange={(e) => {
                        const filters = e.target.value
                          .split(",")
                          .map((filter) => filter.trim());
                        field.onChange(filters);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
