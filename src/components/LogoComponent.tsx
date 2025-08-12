import { usePosts } from "@/PostsContext";
import { Link } from "react-router-dom";

export function LogoComponent() {
  const { setSearchInput } = usePosts();
  return (
    <div
      className="flex flex-row md:flex-1 flex-0.5 justify-start"
      onClick={() => {
        setSearchInput("");
      }}
    >
      <Link to={"/"}>
        <img
          src="/logo.png"
          alt=""
          className="h-8 w-auto max-w-full object-contain md:h-16"
        />
      </Link>
    </div>
  );
}
