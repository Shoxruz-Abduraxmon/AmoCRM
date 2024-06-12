// экземпляр Client
const { client } = require('../client');

const run = async () => {
    
    const lead = await client.leads.getById(123);
    lead.name = 'Ivan';
    lead.price = 100;

    await lead.save();

    console.log(lead.id); // 123

    const newLead1 = new client.Lead;

    lead.isNew(); // true

    newLead1.name = 'Walter Scott';
    await newLead1.save();
    lead.isNew(); // false

    const newLead2 = new client.Lead({
        name: 'Walter Scott'
    });
    newLead2.price = 100;
    await newLead2.save();

    const fetchedLead = await newLead2.fetch();
};

run();