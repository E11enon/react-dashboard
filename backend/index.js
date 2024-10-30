const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sequelize = require('./config/database');
const Card = require('./models/Card');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Error fetching cards", error });
  }
});

app.post('/cards', upload.single('image'), async (req, res) => {
  try {
    const { title, link } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const card = await Card.create({ title, link, imageUrl });
    res.json(card);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file", error });
  }
});

app.delete('/cards/:id', async (req, res) => {
  const cardId = req.params.id;
  try {
    
    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    
    if (card.imageUrl) {
      const imagePath = path.join(__dirname, card.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    
    await card.destroy();
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ message: "Error deleting card", error });
  }
});


app.put('/cards/:id', upload.single('image'), async (req, res) => {
  const cardId = req.params.id;
  const { title, link } = req.body;

  try {
   
    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    if (req.file) {
      if (card.imageUrl) {
        const oldImagePath = path.join(__dirname, card.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      card.imageUrl = `/uploads/${req.file.filename}`;
    }

    card.title = title;
    card.link = link;
    await card.save();

    res.json(card);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ message: "Error updating card", error });
  }
});

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3456, () => {
    console.log(`Server running on port ${process.env.PORT || 3456}`);
  });
});
