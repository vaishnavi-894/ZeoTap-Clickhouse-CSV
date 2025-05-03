
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export interface ProcessingResult {
  success: boolean;
  recordsProcessed: number;
  message: string;
  downloadUrl?: string;
  error?: string;
}

interface ProcessingSummaryProps {
  result: ProcessingResult;
  onReset: () => void;
  onDownload?: () => void;
}

const ProcessingSummary: React.FC<ProcessingSummaryProps> = ({
  result,
  onReset,
  onDownload,
}) => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Processing Summary</CardTitle>
          {result.success ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-600" />
          )}
        </div>
        <CardDescription>
          {result.success ? 'Operation completed successfully' : 'Operation failed'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Status</div>
          <div className={result.success ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {result.success ? 'Success' : 'Error'}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Records Processed</div>
          <div className="font-medium">{result.recordsProcessed}</div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Details</div>
          <div className="text-sm">{result.message}</div>
        </div>
        
        {result.error && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Error</div>
              <div className="text-sm text-red-600 p-2 bg-red-50 rounded border border-red-100">
                {result.error}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Start New Process
        </Button>
        
        {result.success && result.downloadUrl && onDownload && (
          <Button onClick={onDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProcessingSummary;
