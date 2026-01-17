const MenuItem = require('../models/menuSchema');

const getMenuItems = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {}
        const menu = await MenuItem.find(filter).sort({ createdAt: -1 })
        
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error: error.message });
    }
}
const getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await MenuItem.findById(id);
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu item', error: error.message });
    }
}

module.exports = { getMenuItems,getMenuItemById };