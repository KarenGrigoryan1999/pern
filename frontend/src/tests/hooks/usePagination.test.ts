import { renderHook, act } from '@testing-library/react-hooks';
import { usePagination } from '../../helpers/hooks';

describe('Тест хука usePagination', () => {
    test('Установка страницы', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));
        act(() => result.current.setPage(4));
        expect(result.current.page).toBe(4);
        expect(result.current.firstContentIndex).toBe(30);
        expect(result.current.lastContentIndex).toBe(40);
    });

    test('Перелистывание на страницу вперед', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));
        act(() => result.current.nextPage());
        expect(result.current.page).toBe(2);

        act(() => result.current.setPage(10));
        act(() => result.current.nextPage());
        expect(result.current.page).toBe(10);
    });

    test('Перелистывание на страницу назад', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));
        act(() => result.current.setPage(2));
        act(() => result.current.prevPage());
        expect(result.current.page).toBe(1);

        act(() => result.current.setPage(1));
        act(() => result.current.prevPage());
        expect(result.current.page).toBe(1);
    });
});