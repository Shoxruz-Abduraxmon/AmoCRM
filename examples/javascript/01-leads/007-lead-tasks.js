const { client } = require('../client');

const run = async () => {
    const [lead] = await client.leads.create([
        {
            name: 'Walter Scott',
        },
    ]);

    const [createdTask] = await lead.tasks.create([
        {
            text: 'Lead task',
            complete_till: 2280001362
        }
    ]);

    const [leadTask] = await lead.tasks.get();

    console.log(leadTask.id === createdTask.id) // true
    const [createdTask2] = new lead.Task({
        text: 'Lead task',
        complete_till: 2280001362
    });

    createdTask2.save();
};

run();