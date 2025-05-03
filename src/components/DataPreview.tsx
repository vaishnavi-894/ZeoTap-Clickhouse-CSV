
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface DataPreviewProps {
  data: Record<string, any>[];
  columns: string[];
  onContinue: () => void;
  isLoading?: boolean;
  title?: string;
}

const DataPreview: React.FC<DataPreviewProps> = ({
  data,
  columns,
  onContinue,
  isLoading = false,
  title = "Data Preview",
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Preview of the first {data.length} rows</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={`${index}-${column}`}>
                      {row[column] !== null && row[column] !== undefined 
                        ? String(row[column]) 
                        : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="mt-4">
          <Button 
            onClick={onContinue} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataPreview;
