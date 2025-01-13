import React from 'react';
import styles from './UserProfile.module.css';
import { ProfileFieldProps } from './types';

export const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => {
  return (
    <div className={styles.fieldContainerNoEdit }>
      <label className={styles.fieldLabelNoEdit }>{label}</label>
      <div className={styles.fieldValueNoEdit }>{value}</div>
    </div>
  );
};