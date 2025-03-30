import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Expense",
      url: "/dashboard/expense",
    },
    {
      title: "Transactions",
      url: "/dashboard/passbook/transaction",
    },

    {
      title: "Payment Reminders",
      url: "#",
    },
    {
      title: "Loan Book",
      url: "",
      items: [
        {
          title: "Borrowed",
          url: "/dashboard/loanbook/borrowed",
        },
        {
          title: "Lended",
          url: "/dashboard/loanbook/lended",
        },
      ],
    },
    {
      title: "Analysis",
      url: "/dashboard/analysis",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            // isActive={item.isActive}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
