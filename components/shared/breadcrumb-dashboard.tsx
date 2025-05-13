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

const isUUID = (value: string) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    value
  );
};

export function BreadcrumbDashboard() {
  const pathname = usePathname();

  const formatPath = (path: string) => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        isUUID(segment)
          ? segment
          : segment.charAt(0).toUpperCase() + segment.slice(1)
      )
      .slice(1);
  };

  const getPartialUrl = (segment: string) => {
    const segments = pathname.split("/").slice(1);
    const index = segments.indexOf(segment.toLowerCase());
    return `/${segments.slice(0, index + 1).join("/")}`;
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
