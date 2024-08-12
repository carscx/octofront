import React from 'react';
import { Chip } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface JobStatusProps {
  jobState: {
    state: string;
  };
}

const JobStatus: React.FC<JobStatusProps> = ({ jobState }) => {
  const { t } = useTranslation('features', { keyPrefix: 'PrinterStatus' });

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'Operational':
        return 'dark';
      case 'Printing':
        return 'teal';
      case 'Paused':
        return 'yellow';
      case 'Error':
        return 'red';
      case 'Offline':
        return 'gray';
      default:
        return 'blue';
    }
  };

  const getStatusText = (state: string) => {
    switch (state) {
      case 'Operational':
        return t('readyToPrint');
      case 'Printing':
        return t('printing');
      case 'Paused':
        return t('paused');
      case 'Error':
        return t('error');
      case 'Offline':
        return t('offline');
      default:
        return t('unknown');
    }
  };

  const state = jobState?.state || 'Unknown';

  return (
    <Chip checked color={getStatusColor(state)}>
      {getStatusText(state)}
    </Chip>
  );
};

export default JobStatus;
