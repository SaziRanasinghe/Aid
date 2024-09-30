import React, {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';


import img1 from '../assets/category-images/food.webp'
import img2 from '../assets/category-images/cloth.png'
import img3 from '../assets/category-images/furniture.png'
import img4 from '../assets/category-images/medicines.png'
import img5 from '../assets/category-images/electronic.png'
import img6 from '../assets/category-images/other.png'
import {toast, ToastContainer} from "react-toastify";
 


function Donate() {

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    condition: '',
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoodsChange = (event) => {
    setFormData({ ...formData, goods: event.target.value });
    setShowAdditionalFields(event.target.value === 'yes');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });
    const userId = localStorage.getItem('userId')
    submitData.append('user_id', userId);

    try {
      const response = await axios.post('http://localhost:5000/api/donate_items', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Donation submitted successfully:', response.data);
      handleClose();
      toast.success('Donation added successfully! Thank you for your generosity.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast.error('Error submitting donation. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
      <div className="p-20">
        <ToastContainer/>
        <div className="flex justify-center mb-10">
          <a
              href="#"
              className="inline-block justify-between bg-orange-600 hover:animate-bounce text-white font-bold py-4 px-8 rounded"
              onClick={handleClickOpen}
          >
            Donate Items
          </a>
          <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
              }}
          >
            <DialogTitle>
              <center>Item Details</center>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To donate items through this website, please enter your details here. We will send updates occasionally.
              </DialogContentText>
              <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Do you want to donate items?</FormLabel>
                <RadioGroup
                    aria-label="goods"
                    name="goods"
                    onChange={handleGoodsChange}
                >
                  <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                  <FormControlLabel value="no" control={<Radio/>} label="No"/>
                </RadioGroup>
              </FormControl>
              {showAdditionalFields && (
                  <>
                    <FormControl fullWidth margin="dense">
                      <InputLabel id="category-label">Select Category</InputLabel>
                      <Select
                          labelId="category-label"
                          id="category"
                          name="category"
                          label="Category"
                          value={formData.category}
                          onChange={handleInputChange}
                      >
                        {categories.map((category) => (
                            <MenuItem key={category.category_id} value={category.category_id}>
                              {category.category_name}
                            </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="location"
                        name="location"
                        label="Location"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                    <FormControl component="fieldset" margin="dense">
                      <FormLabel component="legend">Condition</FormLabel>
                      <RadioGroup
                          aria-label="condition"
                          name="condition"
                          value={formData.condition}
                          onChange={handleInputChange}
                      >
                        <FormControlLabel value="new" control={<Radio/>} label="New"/>
                        <FormControlLabel value="used" control={<Radio/>} label="Used"/>
                      </RadioGroup>
                    </FormControl>
                    <FormControl margin="dense" fullWidth>
                      <FormLabel>Upload Image</FormLabel>
                      <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={handleFileChange}
                      />
                    </FormControl>
                  </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Post</Button>
            </DialogActions>
          </Dialog>
          <div className="ml-40 justify-between">
            <a
                href="/funds"
                className="inline-block bg-orange-600 hover:animate-bounce text-white font-bold py-4 px-8 rounded"
            >
              Donate Funds
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-2xl flex">
            <img src={img1} alt="Laptop on Desk" className="w-1/3 rounded-l-lg"/>
            <div className="p-6 flex flex-col justify-center">
              <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Non-Perishable Food</h2>
              <p className="text-orange-700">
                Donate food items that have a long shelf life and do not require refrigeration to stay fresh.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-2xl flex">
            <img src={img2} alt="Laptop on Desk" className="w-1/3 rounded-l-lg"/>
            <div className="p-6 flex flex-col justify-center">
              <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Clothing and Accessories</h2>
              <p className="text-orange-700">
                Donate gently used or new items such as shirts, pants, dresses, jackets, and coats.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-2xl flex">
            <img src={img3} alt="Laptop on Desk" className="w-1/3 rounded-l-lg"/>
            <div className="p-6 flex flex-col justify-center">
              <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Household Items</h2>
              <p className="text-orange-700">
              Donate linens, furniture, and kitchenware items (typically accepted by special pick-up services).
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-2xl flex">
            <img src={img4} alt="Laptop on Desk" className="w-1/3 rounded-l-lg"/>
            <div className="p-6 flex flex-col justify-center">
              <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Medical Supplies</h2>
              <p className="text-orange-700">
                Various types of medical donations to help those in need.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-2xl flex">
            <img src={img5} alt="Laptop on Desk" className="w-1/3 rounded-l-lg"/>
            <div className="p-6 flex flex-col justify-center">
              <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Electronics</h2>
              <p className="text-orange-700">
                Computers, phones, and other small household appliances (working condition).
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-2xl flex">
            <img src={img6} alt="Laptop on Desk" className="w-1/3 rounded-l-lg"/>
            <div className="p-6 flex flex-col justify-center">
              <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Others</h2>
              <p className="text-orange-700">
                Donate various types of items such as monetary donations, art, craft, books, sports equipment, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Donate;