import React from 'react';
import styles from './Contact.module.css';
import { FormInputProps } from './types';

export const FormInput: React.FC<FormInputProps> = ({ label }) => (
  <div className={styles.formGroup}>
    <label className={styles.formLabel}>{label}</label>
    <div className={styles.inputUnderline} />
  </div>
);