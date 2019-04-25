Three different ways to send data to an endpoint:
  1. request body Objects (req) - Needed for POST and PUT
  Object information is sent on the body of the request

  example: server.post('/hobbits', (req, res) => {
             const hobbit = req.body;
             hobbit.id = nextId++;

             hobbits.push(hobbit);

             res.status(201).json(hobbits);
           });

server.put('/hobbits', (req, res) => {
  res.status(200).json({ url: '/hobbits', operation: 'PUT'});
}); // UPDATE data


  2. key/value pairs inside a query string
    example: server.get('/hobbits',(req,res)=>{
	     // query string params get added to req.query
	     const sortField = req.query.sortby || 'id';
	     const hobbits = [
	       {
		 id: 1,
		 name: 'Samwise Gamgee'
	       },
	       {
		 id: 2,
		 name: 'Frodo Baggins'
               }
	     ];

	     // apply the sorting
	     const response = hobbits.sort((a, b) =>
	       a[sortField] < b[sortField] ? -1 : 1
	     );
	     res.status(200).json(response);
             })

  3. dynamic route parameters
    example: server.delete('hobbits/:id',(req,res)=>{
               const id = req.params.id;
               res.status(204).
             });

status codes:
201 - successful post
200 - successful put
204 - successful delete
