'use client';
import React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function PricesPagination({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (e, page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      count={totalPages}
      page={parseInt(searchParams.get("page")) || 1}
      onChange={handlePageChange}
      sx={{ marginTop: 2 }}
    />
  );
}
