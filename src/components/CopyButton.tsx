"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface CopyButtonProps {
    text: string;
    className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className={cn("h-8 w-8 rounded-lg", className)}
            onClick={copy}
        >
            {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
            ) : (
                <Copy className="h-4 w-4 text-zinc-400" />
            )}
            <span className="sr-only">Copy code</span>
        </Button>
    );
}
