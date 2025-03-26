'use client'

import { ArrowLeftFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";

const BackBtn = () => {
  const router = useRouter();
  return (
    <div>
      <div>
        <Button onClick={() => router.back()} size="icon">
          <ArrowLeftFromLine />
        </Button>
      </div>
    </div>
  );
};

export default BackBtn;
