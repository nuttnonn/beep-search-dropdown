import React, { useState } from 'react'
import SyncSearch from './components/SyncSearch.tsx';
import Card from './components/Card.tsx';
import AsyncSearch from './components/AsyncSearch.tsx'
import CardItem from './components/CardItem.tsx'

const mockData: { currency: { name: string; description: string; display: string; displayAlt: string }[] } = {
  currency: [
    { name: 'Euro', description: 'EUR', display: 'eur-image-path', displayAlt: 'eur-image' },
    { name: 'US Dollar', description: 'USD', display: 'usd-image-path', displayAlt: 'usd-image' },
    { name: 'Canadian Dollar', description: 'CAD', display: 'cad-image-path', displayAlt: 'cad-image' },
    { name: 'Swiss Franc', description: 'CHF', display: 'chf-image-path', displayAlt: 'chf-image' },
    { name: 'Japanese Yen', description: 'JPY', display: 'jpy-image-path', displayAlt: 'jpy-image' },
    { name: 'Thai Bath', description: 'THB', display: 'thb-image-path', displayAlt: 'thb-image' },
  ],
};

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectedItemsChange = (items: string[]) => {
    setSelectedItems(items);
    console.log('Selected items:', selectedItems)
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-[#f3f4f6]">
      <Card className="relative flex-col">
        <CardItem tile="Async Search" description="With description and custom results display">
          <AsyncSearch data={mockData.currency} onSelectedItemsChange={handleSelectedItemsChange} />
        </CardItem>
        <CardItem tile="Sync Search" description="With default display and search on focus">
          <SyncSearch data={mockData.currency} onSelectedItemsChange={handleSelectedItemsChange} />
        </CardItem>
      </Card>
    </div>
  );
};

export default App;