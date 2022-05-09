import { useQuery } from 'react-query';
import { api } from '../../services/api';

async function getData({ searchParam = '' }) {
	if (searchParam !== '') {
		const response = await api.get(`/images?per_page=10&query=${searchParam}`);
		const photos = response.data;
		return photos;
	} else {
		const response = await api.get(`/images`);
		const photos = response.data;
		return photos;
	}
}

export function useImages(searchParam = '') {
	return useQuery(['photos', searchParam], () => getData({ searchParam }));
}
