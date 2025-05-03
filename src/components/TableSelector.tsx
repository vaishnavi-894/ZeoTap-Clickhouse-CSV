
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface Column {
  name: string;
  type: string;
}

interface Table {
  name: string;
  columns: Column[];
}

interface TableSelectorProps {
  tables: Table[];
  isLoading: boolean;
  onSelectTable: (tableName: string) => void;
  onSelectColumns: (columns: string[]) => void;
  onSubmit: (tableName: string, columns: string[], joinConfig?: JoinConfig) => void;
  allowJoins?: boolean;
}

export interface JoinConfig {
  secondTable: string;
  joinType: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
  joinKeys: {
    firstTableKey: string;
    secondTableKey: string;
  }[];
}

const TableSelector: React.FC<TableSelectorProps> = ({
  tables,
  isLoading,
  onSelectTable,
  onSelectColumns,
  onSubmit,
  allowJoins = false,
}) => {
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [enableJoin, setEnableJoin] = useState(false);
  const [joinConfig, setJoinConfig] = useState<JoinConfig>({
    secondTable: '',
    joinType: 'INNER',
    joinKeys: [{ firstTableKey: '', secondTableKey: '' }],
  });

  const handleTableChange = (value: string) => {
    setSelectedTable(value);
    setSelectedColumns([]);
    onSelectTable(value);
  };

  const handleColumnToggle = (columnName: string) => {
    setSelectedColumns(prev => {
      const newSelection = prev.includes(columnName)
        ? prev.filter(col => col !== columnName)
        : [...prev, columnName];
      
      onSelectColumns(newSelection);
      return newSelection;
    });
  };

  const handleSelectAllColumns = () => {
    const table = tables.find(t => t.name === selectedTable);
    if (table) {
      const allColumns = table.columns.map(c => c.name);
      setSelectedColumns(allColumns);
      onSelectColumns(allColumns);
    }
  };

  const handleClearColumns = () => {
    setSelectedColumns([]);
    onSelectColumns([]);
  };

  const handleSubmit = () => {
    if (selectedTable && selectedColumns.length > 0) {
      onSubmit(
        selectedTable,
        selectedColumns,
        enableJoin ? joinConfig : undefined
      );
    }
  };

  const handleJoinTypeChange = (value: string) => {
    setJoinConfig(prev => ({
      ...prev,
      joinType: value as 'INNER' | 'LEFT' | 'RIGHT' | 'FULL',
    }));
  };

  const handleSecondTableChange = (value: string) => {
    setJoinConfig(prev => ({
      ...prev,
      secondTable: value,
    }));
  };

  const handleJoinKeyChange = (index: number, field: 'firstTableKey' | 'secondTableKey', value: string) => {
    setJoinConfig(prev => {
      const newKeys = [...prev.joinKeys];
      newKeys[index] = { ...newKeys[index], [field]: value };
      return { ...prev, joinKeys: newKeys };
    });
  };

  const addJoinKey = () => {
    setJoinConfig(prev => ({
      ...prev,
      joinKeys: [...prev.joinKeys, { firstTableKey: '', secondTableKey: '' }],
    }));
  };

  const removeJoinKey = (index: number) => {
    setJoinConfig(prev => ({
      ...prev,
      joinKeys: prev.joinKeys.filter((_, i) => i !== index),
    }));
  };

  const getSelectedTable = () => {
    return tables.find(t => t.name === selectedTable);
  };

  const getSecondTable = () => {
    return tables.find(t => t.name === joinConfig.secondTable);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Table and Columns</CardTitle>
        <CardDescription>Choose which data you want to work with</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="table-select">Select Table</Label>
            <Select value={selectedTable} onValueChange={handleTableChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a table" />
              </SelectTrigger>
              <SelectContent>
                {tables.map((table) => (
                  <SelectItem key={table.name} value={table.name}>
                    {table.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTable && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Select Columns</Label>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSelectAllColumns}
                    >
                      Select All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleClearColumns}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="h-60 border rounded-md p-4">
                  <div className="space-y-2">
                    {getSelectedTable()?.columns.map((column) => (
                      <div key={column.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={`column-${column.name}`}
                          checked={selectedColumns.includes(column.name)}
                          onCheckedChange={() => handleColumnToggle(column.name)}
                        />
                        <Label htmlFor={`column-${column.name}`} className="flex-1">{column.name}</Label>
                        <span className="text-xs text-gray-500">{column.type}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {allowJoins && (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="enable-join"
                      checked={enableJoin}
                      onCheckedChange={(checked) => setEnableJoin(!!checked)}
                    />
                    <Label htmlFor="enable-join">Enable Join with Another Table</Label>
                  </div>

                  {enableJoin && (
                    <div className="space-y-4 border rounded-md p-4 bg-secondary/20">
                      <div className="space-y-2">
                        <Label htmlFor="join-type">Join Type</Label>
                        <Select value={joinConfig.joinType} onValueChange={handleJoinTypeChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select join type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INNER">INNER JOIN</SelectItem>
                            <SelectItem value="LEFT">LEFT JOIN</SelectItem>
                            <SelectItem value="RIGHT">RIGHT JOIN</SelectItem>
                            <SelectItem value="FULL">FULL OUTER JOIN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="second-table">Second Table</Label>
                        <Select value={joinConfig.secondTable} onValueChange={handleSecondTableChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select second table" />
                          </SelectTrigger>
                          <SelectContent>
                            {tables
                              .filter(t => t.name !== selectedTable)
                              .map((table) => (
                                <SelectItem key={table.name} value={table.name}>
                                  {table.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Join Keys</Label>
                        {joinConfig.joinKeys.map((keyPair, index) => (
                          <div key={index} className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor={`first-key-${index}`}>
                                {selectedTable} Column
                              </Label>
                              <Select
                                value={keyPair.firstTableKey}
                                onValueChange={(value) => handleJoinKeyChange(index, 'firstTableKey', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select column" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getSelectedTable()?.columns.map((column) => (
                                    <SelectItem key={column.name} value={column.name}>
                                      {column.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`second-key-${index}`}>
                                {joinConfig.secondTable} Column
                              </Label>
                              <Select
                                value={keyPair.secondTableKey}
                                onValueChange={(value) => handleJoinKeyChange(index, 'secondTableKey', value)}
                                disabled={!joinConfig.secondTable}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select column" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getSecondTable()?.columns.map((column) => (
                                    <SelectItem key={column.name} value={column.name}>
                                      {column.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            {index > 0 && (
                              <Button
                                variant="destructive"
                                size="sm"
                                className="mt-2"
                                onClick={() => removeJoinKey(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addJoinKey}
                        >
                          Add Join Condition
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <Button
                onClick={handleSubmit}
                disabled={
                  isLoading || 
                  !selectedTable || 
                  selectedColumns.length === 0 ||
                  (enableJoin && 
                    (!joinConfig.secondTable || 
                     !joinConfig.joinKeys[0].firstTableKey || 
                     !joinConfig.joinKeys[0].secondTableKey))
                }
                className="w-full"
              >
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TableSelector;
