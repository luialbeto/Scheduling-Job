const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');
const restoreDB = require('./restoreDB');

describe('Queries de seleção', () => {
  let sequelize;

  beforeAll(async () => {
    await restoreDB();
    jest.setTimeout(10000);

    sequelize = new Sequelize(
      `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.HOSTNAME}:3306/vivoJobs`
    );
  });

  afterAll(async () => {
    await sequelize.query('DROP DATABASE vivoJobs;', { type: 'RAW' });
    sequelize.close();
  });
  const composedPrimaryKey = async (table) => {
    const [{ PK_COUNT: pkCount }] = await sequelize.query(
      `SELECT COUNT(COLUMN_NAME) AS PK_COUNT
        FROM information_schema.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = 'vivoJobs' AND TABLE_NAME = '${table}' AND CONSTRAINT_NAME = 'PRIMARY';`,
      { type: 'SELECT' }
    );

    return pkCount > 1;
  };

  it('Cada array do conjunto representa uma lista de Jobs a serem executados em sequência', async () => {
    const {
      coluna_data_maxima: data_maxima_de_conclusao,
      tabela_que_contem_data_maxima: data_maxima,
      tabela_que_contem_tipo: tipo,
    } = JSON.parse(readFileSync('desafio1.json', 'utf8'));

    expect(data_maxima).not.toBe(tipo);

    const dataCount = await sequelize.query(
      `SELECT COUNT(${data_maxima_de_conclusao}) AS quantidade_planos FROM ${data_maxima};`,
      { type: 'SELECT' }
    );

    expect(dataCount).toEqual([{ quantidade_jobs: 3 }]);

    expect(await hasForeignKey(tipo, data_maxima)).toBeTruthy();
  });

  it('Cada array deve conter jobs que sejam executados em, no máximo, 8h', async () => {
    const {
      coluna_que_contem_hora: hora,
      tabela_que_contem_hora: horas,
      tabela_que_contem_tipo: tipo,
    } = JSON.parse(readFileSync('desafio1.json', 'utf8'));

    expect(horas).not.toBe(tipo);

    const jobsCount = await sequelize.query(`SELECT COUNT(${hora}) AS hora maxima FROM ${horas};`, {
      type: 'SELECT',
    });

    expect(jobsCount).toEqual([{ jobs_encontrados: 1 }]);

    expect(await hasForeignKey(horas, tipo)).toBeTruthy();
    expect(await composedPrimaryKey(horas)).toBeTruthy();
  });

  it('Deve ser respeitada a data máxima de conclusão do Job', async () => {
    const {
      coluna_que_contem_tempo: tempo,
      tabela_que_contem_tempo: tempo_estimado,
      tabela_que_contem_tipo: tipo,
    } = JSON.parse(readFileSync('desafio1.json', 'utf8'));

    expect(tempo_estimado).not.toBe(tipoTable);

    const tempoCount = await sequelize.query(
      `SELECT COUNT(${tempo}) AS tempoData FROM ${tempo_estimado};`,
      { type: 'SELECT' }
    );

    expect(tempoCount).toEqual([{ tempoData: 3 }]);

    expect(await hasForeignKey(tempo_estimado, tipoTable)).toBeTruthy();
    expect(await composedPrimaryKey(tempo_estimado)).toBeTruthy();
  });
});

describe('Queries de deleção', () => {
  let sequelize;

  beforeAll(async () => {
    await restoreDB();
    jest.setTimeout(10000);

    sequelize = new Sequelize(
      `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.HOSTNAME}:3306/`
    );
  });

  afterAll(() => {
    importer.disconnect();
    sequelize.close();
  });

  beforeEach(async () => {
    try {
      await importer.import('./desafio1.sql');
    } catch (error) {
      console.log('Erro ao restaurar o dump!');
    }

    await sequelize.query('USE vivoJobs;', { type: 'RAW' });
  });

  afterEach(async () => await sequelize.query('DROP DATABASE vivoJobs;', { type: 'RAW' }));
});
