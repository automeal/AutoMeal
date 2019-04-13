const { app } = require('./app');

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`));
