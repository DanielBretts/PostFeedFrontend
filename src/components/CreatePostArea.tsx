import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ApiConfig } from "../utils/ApiConfig";
import { toast } from "sonner";
import type { Post } from "../models/Post";

export function CreatePostArea() {
  //   const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);

    if (!payload.title || !payload.body) return;

    try {
      const response = await ApiConfig.post<Post, Post>("/posts", {
        title: payload.title as string,
        body: payload.body as string,
      });

      toast.success("Your post is live!", {
        description: `Your post has been posted successfully with id ${response.id}`,
        duration: 3000,
      });

      form.reset();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  }

  return (
    <div className="flex flex-row w-full p-2">
      <div className="hidden md:block flex-1"></div>
      <form
        className="flex-1 flex-col items-center p-2 w-full bg-input rounded-2xl"
        onSubmit={createPost}
      >
        <h3 className="text-1xl font-semibold p-2">Create Post</h3>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          className="rounded-t-md border-foreground/20"
        />
        <Textarea
          typeof="text"
          name="body"
          className="resize-none border-foreground/20"
          placeholder="What's on your mind?"
        />
        <div className="w-full flex flex-row items-center justify-end gap-2 pt-1.5">
          <Button type="submit" className="w-1/4 bg-chart-2">
            Post
          </Button>
        </div>
      </form>
      <div className="hidden md:block flex-1"></div>
    </div>
  );
}
