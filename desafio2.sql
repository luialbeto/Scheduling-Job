--  Cada array deve conter jobs que sejam executados em, no máximo, 8h

SELECT * FROM vivoJobs.horas
WHERE hora = (SELECT MAX(hora) FROM horas) ORDER BY hora;
