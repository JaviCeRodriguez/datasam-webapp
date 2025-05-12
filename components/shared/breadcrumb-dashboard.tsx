"use client";

import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbDashboard() {
  const pathname = usePathname();

  const formatPath = (path: string) => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .slice(1);
  };

  const getPartialUrl = (segment: string) => {
    const segments = pathname.split("/");
    const index = segments.indexOf(segment);
    return segments.slice(0, index + 1).join("/");
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {formatPath(pathname).map((segment, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <BreadcrumbLink href={getPartialUrl(segment)}>
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
