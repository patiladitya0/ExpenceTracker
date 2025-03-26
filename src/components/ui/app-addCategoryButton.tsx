"use client";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";



import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";


export function CreateCategoryButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Plus />
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create Category</DrawerTitle>
            <DrawerDescription>
              Create category with unique name.
            </DrawerDescription>
          </DrawerHeader>
          <Card className="m-2">
            
            <CardContent>
            <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" placeholder="Name of your category" />
            </div>
            <div className="flex flex-col space-y-1.5">
             
            </div>
          </div>
        </form>
            </CardContent>
           
          </Card>

          <DrawerFooter>
            <Button >Submit</Button>
            <DrawerClose>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
