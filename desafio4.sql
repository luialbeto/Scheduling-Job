-- Todos os Jobs devem ser executados dentro da janela de execução (data início e fim).

SELECT id, data_maxima_de_conclusao FROM vivoJobs.data_maxima
WHERE data_maxima_de_conclusao
BETWEEN '2019 - 11 - 10' AND '2019 - 11 - 11';
