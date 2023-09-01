export const convertTimestampToDate = (timestamp) => {
    if (!timestamp) {
      return '';
    }
    
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    
    return `${formattedMonth}/${year}`;
  };