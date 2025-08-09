import { Avatar, AvatarFallback } from "./ui/avatar";
import type { Comment } from "../models/comment";
import { Separator } from "./ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import * as React from "react";

export function CommentComponent({ comment }: { comment: Comment }) {
  return (
    <React.Fragment>
      <div className="flex flex-row space-x-2 gap-2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar>
              <AvatarFallback className="select-none">
                {comment.email?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="inline-flex flex-col">
            <span className="text-start flex flex-row">
              <h4 className="text-sm font-semibold whitespace-pre">
                {"Name: "}
              </h4>
              <h3 className="text-sm font-semibold text-ellipsis line-clamp-1">
                {comment.name}
              </h3>
            </span>
            <span className="text-start flex flex-row">
              <h4 className="text-sm font-semibold whitespace-pre">
                {"Email: "}
              </h4>
              <h3 className="text-sm font-semibold">{comment.email}</h3>
            </span>
          </HoverCardContent>
        </HoverCard>
        <div className="flex flex-col">
          <h3>{comment.name}</h3>
          <p>{comment.body}</p>
        </div>
      </div>
      <Separator className="my-2" />
    </React.Fragment>
  );
}
