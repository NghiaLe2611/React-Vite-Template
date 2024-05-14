import { useMemo } from 'react';

const useDivideArr = (data) => {
	const slices = useMemo(() => {
		if (data) {
            return Math.round(data.length / 2);
        }
        return 0;
	}, [data]);

	return {
		firstData: data?.slice(0, slices) || [],
		secondData: data?.slice(slices) || [],
	};
};

export default useDivideArr;
