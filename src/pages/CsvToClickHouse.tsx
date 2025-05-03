
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import DataPreview from '@/components/DataPreview';
import ProcessingSummary, { ProcessingResult } from '@/components/ProcessingSummary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { api, Column } from '@/services/api';

interface CsvToClickHouseProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetFlow: () => void;
}

const CsvToClickHouse: React.FC<CsvToClickHouseProps> = ({
  currentStep,
  setCurrentStep,
  resetFlow,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [tableName, setTableName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  // Handle file upload
  const handleFileUpload = async (uploadedFile: File) => {
    setIsLoading(true);
    setFile(uploadedFile);
    
    try {
      // Parse the CSV file
      const { columns: parsedColumns, sampleData } = await api.parseCSV(uploadedFile);
      setColumns(parsedColumns);
      setPreviewData(sampleData);
      
      // Generate a default table name from the filename
      const defaultTableName = uploadedFile.name
        .replace('.csv', '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_');
      setTableName(defaultTableName);
      
      setCurrentStep(4);
    } catch (error) {
      toast({
        title: 'File Error',
        description: 'Failed to parse CSV file',
        variant: 'destructive',
      });
      console.error('File parsing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle import to ClickHouse
  const handleImport = async () => {
    if (!file || !tableName) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a table name',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Show progress updates
      const interval = setInterval(() => {
        setProgressValue(prev => {
          const newValue = prev + 8;
          return newValue > 90 ? 90 : newValue;
        });
      }, 500);
      
      const result = await api.importCSV(file, tableName);
      clearInterval(interval);
      setProgressValue(100);
      
      setProcessingResult(result);
      setCurrentStep(5);
    } catch (error) {
      toast({
        title: 'Import Error',
        description: 'Failed to import data to ClickHouse',
        variant: 'destructive',
      });
      console.error('Import error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render the appropriate step
  if (currentStep === 3) {
    return (
      <div className="w-full max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>CSV to ClickHouse Import</CardTitle>
            <CardDescription>
              Upload a CSV file to import into your ClickHouse database
            </CardDescription>
          </CardHeader>
        </Card>
        
        <FileUpload 
          onFileUpload={handleFileUpload} 
          isLoading={isLoading} 
        />
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="w-full max-w-6xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configure Import</CardTitle>
            <CardDescription>
              Preview your data and set the destination table name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label htmlFor="tableName">Destination Table Name</Label>
              <Input
                id="tableName"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="Enter table name"
                className="max-w-md"
              />
            </div>
          </CardContent>
        </Card>
        
        {isLoading ? (
          <Card>
            <CardContent className="py-12 flex flex-col items-center gap-4">
              <p>Importing data...</p>
              <Progress value={progressValue} className="w-full max-w-md" />
              <p className="text-sm text-gray-500">{progressValue}% Complete</p>
            </CardContent>
          </Card>
        ) : (
          <DataPreview 
            data={previewData}
            columns={columns.map(col => col.name)}
            onContinue={handleImport}
            isLoading={isLoading}
            title="File Preview (First 3 Rows)"
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
      />
    );
  }

  return null;
};

export default CsvToClickHouse;
