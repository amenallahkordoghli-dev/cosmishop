#!/bin/bash

echo "🚀 Initializing ComiShop Project..."

# Create backend structure
mkdir -p backend/{models,routes,middlewares,config}

# Create backend models
cat > backend/models/User.js << 'EOF'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: String,
    phone: String,
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
EOF

cat > backend/models/Product.js << 'EOF'
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, enum: ['homme', 'femme', 'unisexe'], required: true },
    image: String,
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
EOF

cat > backend/models/Cart.js << 'EOF'
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    products: [{ productId: String, quantity: Number, price: Number }],
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
EOF

cat > backend/models/Order.js << 'EOF'
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    products: Array,
    totalPrice: Number,
    status: { type: String, default: 'pending' },
    shippingAddress: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
EOF

# Create routes
cat > backend/routes/products.js << 'EOF'
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        const saved = await product.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
EOF

cat > backend/routes/users.js << 'EOF'
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
EOF

cat > backend/routes/cart.js << 'EOF'
const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
    res.json({ message: 'Get cart' });
});

router.post('/add', (req, res) => {
    res.json({ message: 'Item added' });
});

module.exports = router;
EOF

cat > backend/routes/orders.js << 'EOF'
const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
    res.json({ message: 'Get orders' });
});

router.post('/create', (req, res) => {
    res.json({ message: 'Order created' });
});

module.exports = router;
EOF

# Create backend main files
cat > backend/app.js << 'EOF'
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Error:', err));

app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
    res.json({ message: '✅ ComiShop API Running' });
});

module.exports = app;
EOF

cat > backend/server.js << 'EOF'
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
EOF

cat > backend/.env.example << 'EOF'
MONGODB_URI=mongodb://localhost:27017/cosmishop
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
EOF

cat > backend/package.json << 'EOF'
{
  "name": "cosmishop-backend",
  "version": "1.0.0",
  "description": "Backend for ComiShop E-commerce",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
EOF

# Create frontend structure
mkdir -p frontend/src/{pages,components,services,context,styles}
mkdir -p frontend/public

cat > frontend/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ComiShop - E-commerce de Cosmétiques</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
EOF

cat > frontend/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
EOF

cat > frontend/src/App.js << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
EOF

cat > frontend/src/pages/Home.js << 'EOF'
import React from 'react';

const Home = () => (
  <div>
    <h1>🧴 Bienvenue sur ComiShop</h1>
    <p>Vos produits cosmétiques préférés</p>
  </div>
);

export default Home;
EOF

cat > frontend/src/pages/Shop.js << 'EOF'
import React from 'react';

const Shop = () => <h1>Boutique</h1>;

export default Shop;
EOF

cat > frontend/src/pages/CartPage.js << 'EOF'
import React from 'react';

const CartPage = () => <h1>Mon Panier</h1>;

export default CartPage;
EOF

cat > frontend/package.json << 'EOF'
{
  "name": "cosmishop-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version"]
  }
}
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. cd backend && npm install"
echo "2. cp .env.example .env"
echo "3. cd ../frontend && npm install"
echo "4. Backend: npm run dev (port 5000)"
echo "5. Frontend: npm start (port 3000)"