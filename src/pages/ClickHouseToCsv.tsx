
import React, { useEffect, useState } from 'react';
import TableSelector, { JoinConfig } from '@/components/TableSelector';
import DataPreview from '@/components/DataPreview';
import ProcessingSummary, { ProcessingResult } from '@/components/ProcessingSummary';
import { api, Table } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download } from 'lucide-react';

interface ClickHouseToCsvProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetFlow: () => void;
}

const ClickHouseToCsv: React.FC<ClickHouseToCsvProps> = ({
  currentStep,
  setCurrentStep,
  resetFlow,
}) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [joinConfig, setJoinConfig] = useState<JoinConfig | undefined>();
  const [previewData, setPreviewData] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTables, setLoadingTables] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  // Fetch tables on mount
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const fetchedTables = await api.listTables();
        setTables(fetchedTables);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch tables',
          variant: 'destructive',
        });
        console.error('Error fetching tables:', error);
      } finally {
        setLoadingTables(false);
      }
    };
    
    fetchTables();
  }, []);

  // Handle table selection
  const handleSelectTable = (tableName: string) => {
    setSelectedTable(tableName);
  };

  // Handle column selection
  const handleSelectColumns = (columns: string[]) => {
    setSelectedColumns(columns);
  };

  // Handle table and column submission
  const handleSubmitSelection = async (
    tableName: string, 
    columns: string[],
    join?: JoinConfig
  ) => {
    setIsLoading(true);
    setJoinConfig(join);
    
    try {
      const data = await api.previewData(tableName, columns, join);
      setPreviewData(data);
      setCurrentStep(4);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to preview data',
        variant: 'destructive',
      });
      console.error('Error previewing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle export to CSV
  const handleExport = async () => {
    setIsLoading(true);
    
    try {
      // Show progress updates
      const interval = setInterval(() => {
        setProgressValue(prev => {
          const newValue = prev + 10;
          return newValue > 90 ? 90 : newValue;
        });
      }, 500);
      
      const result = await api.exportToCSV(selectedTable, selectedColumns, joinConfig);
      clearInterval(interval);
      setProgressValue(100);
      
      setProcessingResult(result);
      setCurrentStep(5);
    } catch (error) {
      toast({
        title: 'Export Error',
        description: 'Failed to export data to CSV',
        variant: 'destructive',
      });
      console.error('Export error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file download
  const handleDownload = () => {
    if (processingResult?.downloadUrl) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = processingResult.downloadUrl;
      link.download = `${selectedTable}-export.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Download Started',
        description: 'Your CSV file download has started',
      });
    }
  };

  // Render the appropriate step
  if (currentStep === 3) {
    return (
      <div className="w-full max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ClickHouse to CSV Export</CardTitle>
            <CardDescription>
              Select the data you want to export from your ClickHouse database
            </CardDescription>
          </CardHeader>
        </Card>
        
        {loadingTables ? (
          <Card>
            <CardContent className="py-6">
              <p className="text-center">Loading tables...</p>
            </CardContent>
          </Card>
        ) : (
          <TableSelector 
            tables={tables}
            isLoading={isLoading}
            onSelectTable={handleSelectTable}
            onSelectColumns={handleSelectColumns}
            onSubmit={handleSubmitSelection}
            allowJoins={true}
          />
        )}
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="w-full max-w-6xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preview and Export</CardTitle>
            <CardDescription>
              Review your data before exporting to CSV
            </CardDescription>
          </CardHeader>
        </Card>
        
        {isLoading ? (
          <Card>
            <CardContent className="py-12 flex flex-col items-center gap-4">
              <p>Exporting data...</p>
              <Progress value={progressValue} className="w-full max-w-md" />
              <p className="text-sm text-gray-500">{progressValue}% Complete</p>
            </CardContent>
          </Card>
        ) : (
          <DataPreview 
            data={previewData}
            columns={Object.keys(previewData[0] || {})}
            onContinue={handleExport}
            isLoading={isLoading}
            title="Data Preview (First 3 Rows)"
          />
        )}
      </div>
    );
  }

  if (currentStep === 5 && processingResult) {
    return (
      <ProcessingSummary 
        result={processingResult}
        onReset={resetFlow}
        onDownload={handleDownload}
      />
    );
  }

  return null;
};

export default ClickHouseToCsv;
