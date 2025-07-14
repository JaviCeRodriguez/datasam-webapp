"use client";

import * as React from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppHeader() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || "dev";
  const shortSha = commitSha.length > 7 ? commitSha.substring(0, 7) : commitSha;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-3 p-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image
                src="/images/logo_v_claro_final.svg"
                alt="DataSam Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold text-sm">DATA SAM</span>
              <span className="text-xs text-muted-foreground">{shortSha}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Commit: {commitSha}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
