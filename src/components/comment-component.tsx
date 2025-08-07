import { Avatar, AvatarFallback } from "./ui/avatar";
import type { Comment } from "../models/comment";
import { Separator } from "./ui/separator";
import * as React from "react";
export function CommentComponent({ comment }: { comment: Comment }) {
  return (
    <React.Fragment>
      <div className="flex flex-row gap-2">
        <Avatar>
          <AvatarFallback>{comment.email?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3>{comment.name}</h3>
          <p>{comment.body}</p>
        </div>
      </div>
      <Separator className="my-2" />
    </React.Fragment>
  );
}
