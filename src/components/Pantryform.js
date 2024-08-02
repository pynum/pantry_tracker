'use client'; // Ensure this is at the top if using client-side hooks

import { useState } from 'react';
import { db, collection, addDoc } from '../firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PantryForm = () => {
  const [item, setItem] = useState({ name: '', quantity: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    if (!item.name || !item.quantity || isNaN(item.quantity)) {
      setError('Please enter a valid item name and quantity.');
      return;
    }

    console.log('Submitting item:', item);
    try {
      // item.name = item.name.toLowerCase();
      await addDoc(collection(db, 'pantry'), {
        ...item,
        quantity: parseInt(item.quantity, 10) // Ensure quantity is an integer
      });
      console.log('Item added successfully');
      setItem({ name: '', quantity: '' });
    } catch (error) {
      console.error('Error adding document:', error);
      setError('Error adding item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        name="name"
        value={item.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number" // Ensure only numbers are input
        value={item.quantity}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">Add Item</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </form>
  );
};

export default PantryForm;
