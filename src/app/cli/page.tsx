"use client";

import { useState, useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";

const CLIMenu = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, label: 'Add Book', command: 'add_book' },
    { id: 2, label: 'Register Member', command: 'register_member' },
    { id: 3, label: 'Checkout Book', command: 'checkout_book' },
    { id: 4, label: 'Return Book', command: 'return_book' },
    { id: 5, label: 'Search Books', command: 'search_books' },
    { id: 6, label: 'Generate Report', command: 'generate_report' },
    { id: 7, label: 'Exit', command: 'exit' },
  ]);

  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [cliOutput, setCliOutput] = useState('');

  useEffect(() => {
    if (selectedCommand) {
      // Simulate command execution
      const output = `Executing command: ${selectedCommand}\n... (simulated output) ...`;
      setCliOutput(output);
    }
  }, [selectedCommand]);

  const handleMenuClick = (command: string) => {
    setSelectedCommand(command);
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => handleMenuClick(item.command)}>
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 p-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>CLI Output</CardTitle>
            <CardDescription>
              {selectedCommand ? `Results for command: ${selectedCommand}` : 'Select a command from the menu.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100%-8rem)]">
              <pre className="font-mono text-sm">
                {cliOutput || 'No output yet.'}
              </pre>
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
