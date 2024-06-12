// экземпляр Client
const { client } = require('../client');

const run = async () => {

    const pagination = await client.leads.get();

    const leads = pagination.getData();

    await pagination.next();

    const currentPage = pagination.getPage();

    const leads2 = pagination.getData();

    const leads3 = await pagination.next();

    await pagination.next();

    const prevLeads = await pagination.prev();

    await pagination.first();

    const refreshedData = await pagination.refresh();

    if (!pagination.hasNext()) {
        console.log('Невозможно перейти на следующую страницу');
    }
    if (!pagination.hasPrev()) {
        console.log('Невозможно перейти на предыдущую страницу');
    }
    if (!pagination.hasFirst()) {
        console.log('Невозможно перейти на первую страницу');
    }

    // фильтр сделок, см. https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-list
    const criteria = {
        order: 'created_at',
        page: 2,
        query: 'Иванов'
    };
    const pagination2 = await client.leads.get(criteria);
};

run();