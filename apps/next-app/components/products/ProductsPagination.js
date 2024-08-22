
'use client';
import React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductsPagination() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();


    const setPage = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value !== "" && value !== null) {
            params.set("page", value);
        } else {
            params.delete("page");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }



  return (
    <Pagination
      count={searchParams.get("totalPages") || 10}
      page={parseInt(searchParams.get("page")) || 1}
        onChange={(e, page) => setPage(page)}
      sx={{ marginTop: 2 }}
    />
  )
}
