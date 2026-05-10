'use strict';

const LEADS_TABLE = 'leads';
const OLD_STATUS_COLUMN = 'status';
const NEW_STATUS_COLUMN = 'lead_status';

module.exports = {
  async up(knex) {
    const hasLeadsTable = await knex.schema.hasTable(LEADS_TABLE);
    if (!hasLeadsTable) {
      return;
    }

    const hasOldStatus = await knex.schema.hasColumn(LEADS_TABLE, OLD_STATUS_COLUMN);
    if (!hasOldStatus) {
      return;
    }

    const hasNewStatus = await knex.schema.hasColumn(LEADS_TABLE, NEW_STATUS_COLUMN);
    if (!hasNewStatus) {
      await knex.schema.table(LEADS_TABLE, (table) => {
        table.renameColumn(OLD_STATUS_COLUMN, NEW_STATUS_COLUMN);
      });
      return;
    }

    await knex(LEADS_TABLE)
      .whereNull(NEW_STATUS_COLUMN)
      .whereNotNull(OLD_STATUS_COLUMN)
      .update({ [NEW_STATUS_COLUMN]: knex.ref(OLD_STATUS_COLUMN) });
  },
};
