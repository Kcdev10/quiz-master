export const FetchData = async (apiUrl: string) => {
  const respone = await fetch(apiUrl);
  const responseData = await respone.json();
  return responseData;
};
