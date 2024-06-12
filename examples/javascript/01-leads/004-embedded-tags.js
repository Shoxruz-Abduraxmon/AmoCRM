const { client } = require('../client');

const run = async () => {
    
    const [tag] = await client.leads.tags.create([
        {
            name: 'Building',
            color: 'DDEBB5'
        },
        {
            name: 'VIP',
            color: '9D2B32'
        }
    ]);

    const [tag2] = await client.leads.tags.get({
        query: 'VIP',
        limit: 1
    });

    const lead = new client.Lead;
    lead.name = 'Elvis House';

    lead.embeddedTags.add([
        tag,
        tag2
    ]);
    await lead.save();

    lead.embeddedTags.remove();

    await lead.save();

    lead.embeddedTags.set([tag2]);

    await lead.save();
};

run();