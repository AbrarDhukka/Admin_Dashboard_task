// Importing the 'config' module from the '../constants' directory
import config from "../constants";

// Function to calculate the total number of pages based on the given length of records
export const getTotalPages = (length) => {
  // Calculate the total pages by dividing the length by the predefined page size (10 in this case)
  return Math.ceil(length / 10);
};

// Function to calculate the starting index of records for a given page
export const getRecordIndex = (page) => {
  // Calculate the starting index by subtracting 1 from the page number and multiplying it by the predefined page size
  return (page - 1) * config.PAGE_SIZE;
};
