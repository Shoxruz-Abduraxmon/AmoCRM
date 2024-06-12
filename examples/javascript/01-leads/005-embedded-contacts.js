const { client } = require('../client');

const run = async () => {
    const contact = new client.Contact;
    contact.name = 'Elvis Presley';

    await contact.save();

    const lead = new client.Lead;
    lead.name = 'Elvis House';

    lead.embeddedContacts.add([
        contact
    ]);
    await lead.save();

    const leads = client.leads.get({
        limit: 2,
        with: ['contacts']
    });

    const contacts = leads[0].embeddedContacts.get();
};

run();