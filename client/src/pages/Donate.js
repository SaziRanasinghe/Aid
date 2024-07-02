import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from '@mui/material';
import img1 from '../assets/category-images/food.webp'
import img2 from '../assets/category-images/cloth.png'
import img3 from '../assets/category-images/furniture.png'
import img4 from '../assets/category-images/medicines.png'
import img5 from '../assets/category-images/electronic.png'
import img6 from '../assets/category-images/other.png'
 


function Donate() {

  const [open, setOpen] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowAdditionalFields(false);
  };

  const handleGoodsChange = (event) => {
    setShowAdditionalFields(event.target.value === 'yes');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const imageFile = formData.get('image'); // Getting the image file
    console.log(formJson, imageFile);
    handleClose();
  };
  return (
<div class="p-20">
<div class="flex justify-center mb-10 " >


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
        <DialogTitle><center>Item Details</center></DialogTitle>
        <DialogContent>
          <DialogContentText>
            To donate items through this website, please enter your details here. We
            will send updates occasionally.
          </DialogContentText>
           
          <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Do you want to donate items?</FormLabel>
            <RadioGroup
              aria-label="goods"
              name="goods"
              onChange={handleGoodsChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
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
                >
                  <MenuItem value="clothing">Foods</MenuItem>
                  <MenuItem value="electronics">Clothes</MenuItem>
                  <MenuItem value="furniture">Furniture</MenuItem>
                  <MenuItem value="toys">Medicines</MenuItem>
                  <MenuItem value="books">Electronics</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
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
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="location"
                name="location"
                label="Location"
                type="text"
                fullWidth
                variant="standard"
              />
               <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Condition</FormLabel>
                <RadioGroup
                  aria-label="condition"
                  name="condition"
                >
                  <FormControlLabel value="new" control={<Radio />} label="New" />
                  <FormControlLabel value="used" control={<Radio />} label="Used" />
                </RadioGroup>
              </FormControl>

            

              <FormControl margin="dense" fullWidth>
                <FormLabel>Upload Image</FormLabel>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </FormControl>
              <DialogTitle><center>Contact Details</center></DialogTitle>
               
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Donor's Name"
                type="name"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="telephone"
                name="telephone"
                label="Telephone Number"
                type="tel"
                fullWidth
                variant="standard"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Post</Button>
        </DialogActions>
      </Dialog>
     
     <div className='ml-40 justify-between'>
      <a
        href="/funds"
        className="inline-block bg-orange-600 hover:animate-bounce text-white font-bold py-4 px-8 rounded"
      >
        Donate Funds
      </a></div>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  {/* <!-- First Card --> */}
  <div class="bg-white rounded-lg shadow-2xl flex">
    <img src={img1} alt="Laptop on Desk" class="w-1/3 rounded-l-lg" />
    <div class="p-6 flex flex-col justify-center">
      <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Non-Perishable Food</h2>
      <p class="text-orange-700">
      Donate food items that have a long shelf life and do not require refrigeration to stay fresh.
      </p>
    </div>
  </div>

  {/* <!-- Second Card --> */}
  <div class="bg-white rounded-lg shadow-2xl flex">
    <img src={img2} alt="Laptop on Desk" class="w-1/3 rounded-l-lg" />
    <div class="p-6 flex flex-col justify-center">
      <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Clothing and Accessories</h2>
      <p class="text-orange-700">
      Donate gently used or new items such as shirts, pants, dresses, jackets, and coats.
      </p>
    </div>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  {/* <!-- Third Card --> */}
  <div class="bg-white rounded-lg shadow-2xl flex">
    <img src={img3}alt="Laptop on Desk" class="w-1/3 rounded-l-lg" />
    <div class="p-6 flex flex-col justify-center">
      <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Household Items</h2>
      <p class="text-orange-700">
      Donate linens, furniture and kitchenwear items (typically accepted by special pick-up services) 
      </p>
    </div>
  </div>

  {/* <!-- Fourth Card --> */}
  <div class="bg-white rounded-lg shadow-2xl flex">
    <img src= {img4}alt="Laptop on Desk" class="w-1/3 rounded-l-lg" />
    <div class="p-6 flex flex-col justify-center">
      <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Medical Supplies</h2>
      <p class="text-orange-700">
      Various types of medical donations to help those in need.
      </p>
    </div>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* <!-- Fifth Card --> */}
  <div class="bg-white rounded-lg shadow-2xl flex">
    <img src={img5} alt="Laptop on Desk" class="w-1/3 rounded-l-lg" />
    <div class="p-6 flex flex-col justify-center">
      <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Electronics</h2>
      <p class="text-orange-700">
      Computers, phones, and other small household appliances (working condition).
      </p>
    </div>
  </div>

  {/* <!-- Sixth Card --> */}
  <div class="bg-white rounded-lg shadow-2xl flex">
    <img src={img6} alt="Laptop on Desk" class="w-1/3 rounded-l-lg" />
    <div class="p-6 flex flex-col justify-center">
      <h2 class="font-bold text-xl md:text-3xl mb-2 text-orange-700">Others</h2>
      <p class="text-orange-700">
      Donate various types of items such as monetart, art, craft, books, sports...
      </p>
    </div>
  </div>
</div>


</div>

    
  )
}

export default Donate