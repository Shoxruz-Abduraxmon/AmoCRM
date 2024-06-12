const { client } = require('../client');

const run = async () => {
    const company = new client.Company;
    company.name = 'Elvis Forever';

    await company.save();

    const lead = new client.Lead;
    lead.name = 'Elvis House';

    lead.embeddedCompanies.add([
        company
    ]);
    await lead.save();

    const leads = client.leads.get({
        limit: 2,
        with: ['companies']
    });

    const companies = leads[0].embeddedCompanies.get();
}

run();