"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";

const NavButton = () => {
  const router = useRouter();
  return (
    <div>
      <div className="space-x-4">
        <Button onClick={() => router.back()} size="icon">
          <ArrowLeftFromLine />
        </Button>
        <Button onClick={() => router.forward()} size="icon">
          <ArrowRightFromLine />
        </Button>
      </div>
    </div>
  );
};

export default NavButton;
