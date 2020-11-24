--  Deve ser respeitada a data máxima de conclusão do Job

SELECT
id.descricao AS limite,
data_maxima_de_conclusao.data_maxima
FROM vivoJobs.tipo
INNER JOIN vivoJobs.data_maxima
ON id.tipo = id.data_maxima_de_conclusao
WHERE id.data_maxima_de_conclusao = `2019 - 11 - 11`
ORDER BY limite;
