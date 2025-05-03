
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ConnectionForm, { ConnectionDetails } from '@/components/ConnectionForm';
import FlowTypeSelector, { FlowType } from '@/components/FlowTypeSelector';
import StepProgress from '@/components/StepProgress';
import { api } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClickHouseToCsv from './ClickHouseToCsv';
import CsvToClickHouse from './CsvToClickHouse';

const steps = [
  { id: 1, name: 'Connect' },
  { id: 2, name: 'Select Flow' },
  { id: 3, name: 'Configure' },
  { id: 4, name: 'Process' },
  { id: 5, name: 'Result' },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState<ConnectionDetails | null>(null);
  const [flowType, setFlowType] = useState<FlowType | null>(null);

  const handleConnect = async (connectionDetails: ConnectionDetails) => {
    setIsLoading(true);
    
    try {
      const success = await api.connect(connectionDetails);
      
      if (success) {
        toast({
          title: 'Connection Successful',
          description: 'Successfully connected to ClickHouse server',
        });
        setConnection(connectionDetails);
        setCurrentStep(2);
      } else {
        toast({
          title: 'Connection Failed',
          description: 'Unable to connect to ClickHouse server',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'An error occurred while connecting to ClickHouse',
        variant: 'destructive',
      });
      console.error('Connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFlow = (type: FlowType) => {
    setFlowType(type);
    setCurrentStep(3);
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setConnection(null);
    setFlowType(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 container max-w-6xl my-8 px-4">
        <StepProgress steps={steps} currentStep={currentStep} />
        
        <div className="flex justify-center">
          {currentStep === 1 && (
            <ConnectionForm onConnect={handleConnect} isLoading={isLoading} />
          )}
          
          {currentStep === 2 && (
            <FlowTypeSelector onSelectFlow={handleSelectFlow} />
          )}
          
          {currentStep >= 3 && flowType === 'clickhouse-to-csv' && (
            <ClickHouseToCsv 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              resetFlow={resetFlow}
            />
          )}
          
          {currentStep >= 3 && flowType === 'csv-to-clickhouse' && (
            <CsvToClickHouse 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              resetFlow={resetFlow}
            />
          )}
          
          {currentStep >= 3 && !flowType && (
            <Card>
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Flow type not selected. Please restart the process.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
