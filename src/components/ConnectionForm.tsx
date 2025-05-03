
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

interface ConnectionFormProps {
  onConnect: (connectionDetails: ConnectionDetails) => void;
  isLoading: boolean;
}

export interface ConnectionDetails {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  useJwt: boolean;
  jwtToken: string;
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({ onConnect, isLoading }) => {
  const [useJwt, setUseJwt] = useState(false);
  const [formData, setFormData] = useState<ConnectionDetails>({
    host: 'localhost',
    port: '8123',
    database: 'default',
    username: 'default',
    password: '',
    useJwt: false,
    jwtToken: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.host || !formData.port) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onConnect({
      ...formData,
      useJwt,
    });
  };

  const handleJwtToggle = (checked: boolean) => {
    setUseJwt(checked);
    setFormData(prev => ({ ...prev, useJwt: checked }));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Connect to ClickHouse</CardTitle>
        <CardDescription>Enter your ClickHouse server connection details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input 
                id="host" 
                name="host" 
                placeholder="localhost" 
                value={formData.host}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input 
                id="port" 
                name="port" 
                placeholder="8123" 
                value={formData.port}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="database">Database</Label>
            <Input 
              id="database" 
              name="database" 
              placeholder="default" 
              value={formData.database}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                name="username" 
                placeholder="default" 
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="useJwt" 
              checked={useJwt} 
              onCheckedChange={handleJwtToggle} 
            />
            <Label htmlFor="useJwt">Use JWT Authentication</Label>
          </div>

          {useJwt && (
            <div className="space-y-2">
              <Label htmlFor="jwtToken">JWT Token</Label>
              <Input 
                id="jwtToken" 
                name="jwtToken" 
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                value={formData.jwtToken}
                onChange={handleChange}
                required={useJwt}
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Connect'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConnectionForm;
