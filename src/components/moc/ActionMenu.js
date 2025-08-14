import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/router";
import Button from "../ui/Button";

export const ActionMenu = ({ row, setData }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [router.isReady]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              router.push(`/view/${row.asset_display_id}`);
              setOpen(false);
            }}
          >
            View
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              router.push(`/edit/${row.asset_display_id}`);
              setOpen(false);
            }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            onClick={() => {
              if (window.confirm(`Delete ${row.asset_display_id}?`)) {
                setData((prev) => prev.filter((item) => item.id !== row.id));
              }
              setOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
