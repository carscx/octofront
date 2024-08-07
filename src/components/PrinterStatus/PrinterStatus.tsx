/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconTemperature } from '@tabler/icons-react';
import { Badge, Box, Progress } from '@mantine/core';
import { getPrinterState, getJobState } from '@/api/octoprint';
import TemperatureChart from '@/components/TemperatureChart/TemperatureChart'; // Importa el nuevo componente
import styles from './PrinterStatus.module.scss';

const PrinterStatus: React.FC = () => {
  const [printerState, setPrinterState] = useState<any>(null);
  const [jobState, setJobState] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPrinterState = async () => {
      try {
        const state = await getPrinterState();
        setPrinterState(state);
      } catch (error) {
        console.error('PrinterStatus.tsx : Error al obtener el estado de la impresora:', error);
      }
    };

    const fetchJobState = async () => {
      try {
        const stateJob = await getJobState();
        setJobState(stateJob);
      } catch (error) {
        console.error('PrinterStatus.tsx : Error al obtener el estado del trabajo:', error);
      }
    };

    fetchPrinterState();
    fetchJobState();

    const intervalId = setInterval(fetchPrinterState, 5000); // Intervalo de 5 segundos
    const intervalJobId = setInterval(fetchJobState, 5000); // Intervalo de 5 segundos

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalJobId);
    };
  }, []);

  if (!printerState || !jobState) {
    return <div>Cargando...</div>;
  }

  const icon = <IconTemperature style={{ width: 'rem(12)', height: 'rem(12)' }} />;

  const printTime = jobState?.progress?.printTime ?? 0;
  const printTimeLeft = jobState?.progress?.printTimeLeft ?? 0;
  const completionPercentage =
    printTime + printTimeLeft > 0 ? (printTime / (printTime + printTimeLeft)) * 100 : 0;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const estimatedCompletionTime = new Date(Date.now() + printTimeLeft * 1000);

  const formatDate = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div>
      <h1>{t('statePrinter')}</h1>
      <div>
        Temperatura de la cama:{' '}
        <Badge size="xl" leftSection={icon}>
          {printerState?.temperature?.bed?.actual}
        </Badge>
      </div>
      <div>
        Temperatura del hotend:{' '}
        <Badge size="xl" leftSection={icon}>
          {printerState?.temperature?.tool0?.actual}
        </Badge>
      </div>
      <div>{jobState?.state === 'Operational' ? 'Todo listo para imprimir' : 'Imprimiendo'}</div>
      <div>Tiempo de impresión: {formatTime(printTime)}</div>
      <div>Tiempo restante de impresión: {formatTime(printTimeLeft)}</div>
      <div>Hora estimada de finalización: {formatDate(estimatedCompletionTime)}</div>
      <div>
        Impreso: {formatSize(jobState?.progress?.filepos ?? 0)} /{' '}
        {formatSize(jobState?.job?.file?.size ?? 0)}
      </div>
      <div>
        Progreso de impresión:
        <Box className={styles.progressBox} my="xs">
          <Progress.Root transitionDuration={200} className={styles.root} size="xl">
            <Progress.Section value={completionPercentage} className={styles.section}>
              <Progress.Label className={styles.label}>
                {`${completionPercentage.toFixed(2)}%`}{' '}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Box>
      </div>
      <TemperatureChart printerState={printerState} />
    </div>
  );
};

export default PrinterStatus;
