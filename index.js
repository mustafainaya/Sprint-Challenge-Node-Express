// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 6000;

server.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
