"use client";

import { type ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { CopyButton } from "./CopyButton";

export function Pre({ children, ...props }: ComponentProps<"pre">) {
    const preRef = useRef<HTMLPreElement>(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (preRef.current) {
            setContent(preRef.current.innerText || "");
        }
    }, []);

    return (
        <div className="group relative">
            <CopyButton
                text={content}
                className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 "
            />
            <pre
                ref={preRef}
                className={cn("m-0 overflow-x-auto", props.className)}
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}
