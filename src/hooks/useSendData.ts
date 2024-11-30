import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendData = async (data: any) => {
  const response = await axios.post(`https://www.example.com/api/submit`, data);
  return response;
};

const useSendData = () => {
  return useMutation({
    mutationFn: sendData,
  });
};
export default useSendData;
