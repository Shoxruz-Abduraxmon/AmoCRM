// экземпляр Client
const { client } = require('../client');

const run = async () => {
    
    const pagination = await client.leads.get();

    const lead = await client.leads.getById(123);
    lead.name = 'Walter Scott';
    await lead.save();
    

    const leads = await client.leads.create([
        {
            name: "Lead 1"
        },
        {
            name: "Lead 2"
        }
    ]);

    const lead1 = leads[0];
    lead1.price = 350;
    await lead1.save();

    const newLead = new client.Lead;

    const anotherLeads = await client.leads.create([
        {
            name: "Lead 1"
        },
        newLead
    ]);

    const existingLead = await client.leads.getById(123);

    const updatedLeads = await client.leads.update([
        {
            id: 122,
            name: 'Walter Scott'
        },
        existingLead
    ]);

    const updatedLead2 = updatedLeads[1];
    updatedLead2.name = 'Updated Name';
    updatedLead2.price = 100;
    await updatedLead2.save();
}
run();