import axios, { AxiosError } from "axios";

export default function setupAxiosInterceptors() {
	const handleResponseError = async (error: AxiosError) => {
		return Promise.reject(error);
	};

	axios.interceptors.response.use(
		(response) => response.data,
		handleResponseError
	);
};
