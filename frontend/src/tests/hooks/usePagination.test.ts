import { renderHook, act } from '@testing-library/react-hooks';
import { usePagination } from '../../helpers/hooks';

describe('Тест хука usePagination для управления перелистывания страниц', () => {
    test('Установка конкретной страницы с помощью setPage. Ожидается изменение страницы', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));
        act(() => result.current.setPage(4));
        expect(result.current.page).toBe(4);
        expect(result.current.firstContentIndex).toBe(30);
        expect(result.current.lastContentIndex).toBe(40);
    });

    test('Установка несуществующей страницы с помощью setPage. Ожидается что произойдет переход на максимально доступную страницу', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));
        act(() => result.current.setPage(15));
        expect(result.current.page).toBe(10);
        expect(result.current.firstContentIndex).toBe(90);
        expect(result.current.lastContentIndex).toBe(100);
    });

    test('Перелистывание на страницу вперед при помощи nextPage', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));
        act(() => result.current.nextPage());
        expect(result.current.page).toBe(2);
    });

    test('Перелистывание на страницу вперед, находясь на последней странице при помощи nextPage․ Ожидается что хук останется на последней странице', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));

        act(() => result.current.setPage(10));
        act(() => result.current.nextPage());
        expect(result.current.page).toBe(10);
    });

    test('Перелистывание на страницу назад при помощи prevPage', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));
        act(() => result.current.setPage(2));
        act(() => result.current.prevPage());
        expect(result.current.page).toBe(1);
    });

    test('Перелистывание на страницу назад, находясь на первой странице при помощи prevPage.  Ожидается что хук останется на первой странице', () => {
        const {result} = renderHook(() => usePagination({
                contentPerPage: 10,
                count: 100,
            }));

        act(() => result.current.setPage(1));
        act(() => result.current.prevPage());
        expect(result.current.page).toBe(1);
    });
});