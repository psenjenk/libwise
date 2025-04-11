"use client";

import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { AddBookForm } from "@/components/cli/add-book-form";
import { RegisterMemberForm } from "@/components/cli/register-member-form";
import { CheckoutBookForm } from "@/components/cli/checkout-book-form";
import { ReturnBookForm } from "@/components/cli/return-book-form";
import { SearchBooks } from "@/components/cli/search-books";
import { Reports } from "@/components/cli/reports";

const CLIMenu = () => {
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);

  const renderContent = () => {
    switch (selectedCommand) {
      case 'add_book':
        return <AddBookForm />;
      case 'register_member':
        return <RegisterMemberForm />;
      case 'checkout_book':
        return <CheckoutBookForm />;
      case 'return_book':
        return <ReturnBookForm />;
      case 'search_books':
        return <SearchBooks />;
      case 'generate_report':
        return <Reports />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to LibWise CLI</h2>
            <p className="text-muted-foreground">
              Select a command from the menu to get started.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider>
        <Sidebar className="w-64 border-r flex-shrink-0">
          <SidebarHeader>
            <h4 className="font-semibold text-lg">LibWise CLI</h4>
            <p className="text-sm text-muted-foreground">
              Manage your library with ease.
            </p>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-full">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedCommand('add_book')}>
                    Add Book
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedCommand('register_member')}>
                    Register Member
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedCommand('checkout_book')}>
                    Checkout Book
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedCommand('return_book')}>
                    Return Book
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedCommand('search_books')}>
                    Search Books
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedCommand('generate_report')}>
                    Generate Report
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 p-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Library Management</CardTitle>
              <CardDescription>
                {selectedCommand
                  ? `Selected command: ${selectedCommand.replace('_', ' ')}`
                  : 'Select a command from the menu'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100%-8rem)]">
                {renderContent()}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </SidebarProvider>
      <Toaster />
    </div>
  );
};

export default CLIMenu;
