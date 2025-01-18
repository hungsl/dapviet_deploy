"use client";
import React, { useState } from "react";
import styles from "./ProductReviews.module.css";
export default function SortButton({
  options,
  selectedSort,
  setSelectedSort,
}: {
  options: string[];
  setSelectedSort: (selectedSort: string) => void;
  selectedSort: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedSort || options[0]
  );
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSelectedSort(option);
  };

  return (
    <div className={styles.sortWrapper}>
      <div
        className={styles.sortButton}
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
      >
        <span className={styles.sortText}>{selectedOption}</span>
        <span className={styles.arrow}>&#9660;</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdownItem} ${
                selectedOption === option ? styles.active : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
