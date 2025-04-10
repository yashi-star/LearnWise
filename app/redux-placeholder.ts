// This file replaces Redux functionality with placeholder functions
// All Redux imports should be updated to use this file

export const useLoadUserQuery = () => {
  return {
    data: null,
    isLoading: false,
    refetch: () => Promise.resolve(),
  };
};

export const useActivationMutation = () => {
  return [
    () => Promise.resolve(),
    { isSuccess: false, error: null, isLoading: false },
  ];
};

export const useGetHeroDataQuery = () => {
  return {
    data: { categories: [], reviews: [], layout: { faq: [] } },
    isLoading: false,
    refetch: () => Promise.resolve(),
  };
};

export const useGetAllCoursesQuery = () => {
  return {
    data: { courses: [] },
    isLoading: false,
    refetch: () => Promise.resolve(),
  };
};

// Add more placeholder functions as needed to replace Redux queries and mutations
