
import React from 'react';
import { Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">ClickHouse Connector Flow</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline">Documentation</Button>
          <Button variant="outline">GitHub</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
