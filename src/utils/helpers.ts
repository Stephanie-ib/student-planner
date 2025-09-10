export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const isOverdue = (deadline: string) => {
  return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString();
};