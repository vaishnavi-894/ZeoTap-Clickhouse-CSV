
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, FileSpreadsheet, ArrowDown } from 'lucide-react';

export type FlowType = 'clickhouse-to-csv' | 'csv-to-clickhouse';

interface FlowTypeSelectorProps {
  onSelectFlow: (flowType: FlowType) => void;
}

const FlowTypeSelector: React.FC<FlowTypeSelectorProps> = ({ onSelectFlow }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl">
      <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
        onClick={() => onSelectFlow('clickhouse-to-csv')}>
        <CardHeader>
          <CardTitle>ClickHouse to CSV</CardTitle>
          <CardDescription>Export data from ClickHouse to a CSV file</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 py-4">
          <Database className="h-16 w-16 text-primary" />
          <ArrowDown className="h-6 w-6" />
          <FileSpreadsheet className="h-16 w-16 text-green-600" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => onSelectFlow('clickhouse-to-csv')}>
            Select
          </Button>
        </CardFooter>
      </Card>

      <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
        onClick={() => onSelectFlow('csv-to-clickhouse')}>
        <CardHeader>
          <CardTitle>CSV to ClickHouse</CardTitle>
          <CardDescription>Upload and import data from a CSV file to ClickHouse</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 py-4">
          <FileSpreadsheet className="h-16 w-16 text-green-600" />
          <ArrowDown className="h-6 w-6" />
          <Database className="h-16 w-16 text-primary" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => onSelectFlow('csv-to-clickhouse')}>
            Select
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FlowTypeSelector;
